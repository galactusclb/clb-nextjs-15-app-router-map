import fsPromises from 'node:fs/promises';

import { getDirectories, saveRouteMap } from './utils';

export const generateRouteMap = async (dir?: string) => {    
    if (await checkAppDirectory(dir ?? './src/app')) {
        return processRouteMap(dir ?? './src/app');
    } else if (await checkAppDirectory(dir ?? './app')) {
        return processRouteMap(dir ?? './app');
    }

    console.error('Error: Cannot find App directory in "src" or root directory');
}

const processRouteMap = async (directory: string) => {
    const directoryTree = await getDirectories(directory)
    console.log(JSON.stringify(directoryTree, null, 2));

    saveRouteMap(directoryTree);
}

async function checkAppDirectory(appPath: string): Promise<boolean> {
    try {
        console.log('appPath', appPath);
        const stats = await fsPromises.lstat(appPath);
        if (stats.isDirectory()) {
            console.log('Directory exists.');
            return true;
        } else {
            console.log('Path exists but is not a directory.');
            return false;
        }
    } catch (err) {
        console.log('Directory does not exist.');
        return false;
    }
}