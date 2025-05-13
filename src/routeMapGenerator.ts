import fsPromises from 'node:fs/promises';

import { getDirectories, saveRouteMap } from './utils';

export const generateRouteMap = async (dir?: string) => {
    if (await checkAppDirectory(dir ?? './src/app')) {
        console.log('Found: The App directory was found in the src directory✅.');
        return processRouteMap(dir ?? './src/app');
    }

    if (await checkAppDirectory(dir ?? './app')) {
        console.log('Found: The App directory was found in the root directory✅.');
        return processRouteMap(dir ?? './app');
    }

    console.error('Error: Cannot find App directory in src or root directory❌');
}

const processRouteMap = async (directory: string) => {
    const directoryTree = await getDirectories(directory)
    console.log(JSON.stringify(directoryTree, null, 2));

    saveRouteMap(directoryTree);
}

async function checkAppDirectory(appPath: string): Promise<boolean> {
    try {
        const stats = await fsPromises.lstat(appPath);
        if (stats.isDirectory()) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}