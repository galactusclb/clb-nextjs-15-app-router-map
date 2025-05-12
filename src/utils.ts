import fs from 'node:fs/promises';
import path from 'node:path';

export type DirectoryProp = Record<string, any>

export type ConfigProp = {
    skipNoPage: boolean
}

const config: ConfigProp = {
    skipNoPage: true
}

const initialRoute: DirectoryProp = {
    "/": {
        path: "/"
    }
}

export async function getDirectories(dir: string, baseDir?: string): Promise<DirectoryProp> {
    const result: DirectoryProp = !baseDir ? initialRoute : {};

    const resolvedBaseDir = baseDir ? path.resolve(baseDir) : path.resolve(dir);

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        if (isPrivateDirectory(entry.name)) continue;

        const fullPath = path.join(dir, entry.name);

        if (config?.skipNoPage && !(await hasPageJsInDirectory(fullPath))) continue;

        const relativePath = '/' + path.relative(resolvedBaseDir, fullPath).replace(/\\/g, '/');

        result[entry.name] = {
            path: relativePath,
            ...(await getDirectories(fullPath, resolvedBaseDir))
        };
    }

    return result;
};

function isPrivateDirectory(directoryName: string): boolean {
    return directoryName?.slice(0, 1) === "_";
}

async function hasPageJsInDirectory(dir: string): Promise<boolean> {
    const pageFiles = ['page.js', 'page.ts', 'page.tsx', 'page.jsx'];

    for (const file of pageFiles) {
        const filePath = path.join(dir, file);
        try { 
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    return false;
}


export async function saveRouteMap(directoryTree: DirectoryProp, savePath: string = './src/routeMap.ts') {
    const fileContent = generateTSContent(directoryTree);

    const outputPath = path.resolve(process.cwd(), savePath);

    try {
        await fs.writeFile(outputPath, fileContent, 'utf8');
        console.log('\nrouteMap.ts file has been written successfully.');
    } catch (error) {
        console.error('Error writing routeMap.ts:', error);
    }
}

function generateTSContent(directoryTree: DirectoryProp): string {
    return `
import { type RouteMap } from "app-router-map";

export const routeMap: RouteMap = ${JSON.stringify(directoryTree, null, 2)};\n
`;
}
