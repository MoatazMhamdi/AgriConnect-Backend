// imageUtils.js

import fs from 'fs';

export function deleteOldImage(filePath) {
    // Votre logique pour supprimer l'ancienne image
    try {
        fs.unlinkSync(filePath);
        console.log(`Old image deleted: ${filePath}`);
    } catch (err) {
        console.error(`Error deleting old image: ${err.message}`);
    }
}
