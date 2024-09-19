import fs from 'fs';
import path from 'path';

export const deleteFile = (filePath: string) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
        } else {
            console.log(`File deleted: ${filePath}`);
        }
    });
};
