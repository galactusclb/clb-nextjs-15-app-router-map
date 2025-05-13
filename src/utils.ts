import fs from 'node:fs/promises';
import path from 'node:path';

import { ConfigProp } from './types';

export type DirectoryProp = Record<string, any>

const config: ConfigProp = {
    skipNoPageFile: false
}

const rootRoute: DirectoryProp = {
    "/": {
        path: "/"
    }
}

export async function getDirectories(dir: string, baseDir?: string): Promise<DirectoryProp> {
    const result: DirectoryProp = !baseDir ? rootRoute : {};

    const resolvedBaseDir = baseDir ? path.resolve(baseDir) : path.resolve(dir);

    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (!entry.isDirectory()) continue;
        if (isPrivateDirectory(entry.name)) continue;
        if (config?.skipNoPageFile && !(await hasPageFileInDirectory(fullPath))) continue;

        const relativePath = resolveRelativePath(resolvedBaseDir, fullPath);

        if (!baseDir) {
            result['/'][entry.name] = {
                path: relativePath,
                ...(await getDirectories(fullPath, resolvedBaseDir))
            }
        } else if (isRouteGroupDirectory(entry.name)) {

            const children = await getDirectories(fullPath, resolvedBaseDir);
            Object.assign(result, children);
            
        } else if (isDynamicDirectory(entry.name)) {

            result[entry.name?.slice(1, -1)] = {
                path: relativePath,
                ...(await getDirectories(fullPath, resolvedBaseDir))
            };
            
        } else {
            result[entry.name] = {
                path: relativePath,
                ...(await getDirectories(fullPath, resolvedBaseDir))
            };
        }
    }

    return result;
};

function resolveRelativePath(baseDir: string, targetDir: string): string {
    return '/' + path.relative(baseDir, targetDir).replace(/\\/g, '/');
}

function isRouteGroupDirectory(directoryName: string): boolean {
    return directoryName?.slice(0, 1) === "(";
}

function isPrivateDirectory(directoryName: string): boolean {
    return directoryName?.slice(0, 1) === "_";
}

function isDynamicDirectory(directoryName: string): boolean {
    return directoryName?.slice(0, 1) === "[" && directoryName?.slice(0, 4) !== "[..." && directoryName?.slice(0, 5) !== "[[...";
}

async function hasPageFileInDirectory(dir: string): Promise<boolean> {
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
