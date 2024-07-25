const fs = require('fs');
const path = require('path');

function printDirectorySync(dirPath, indent = '') {
    let files;
    try {
        files = fs.readdirSync(dirPath);
    } catch (err) {
        console.error(`Erreur lors de la lecture du dossier ${dirPath}: ${err}`);
        return;
    }

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (file === 'node_modules' || file === '.git') return; // Exclure node_modules et .git

        let stats;
        try {
            stats = fs.statSync(fullPath);
        } catch (err) {
            console.error(`Erreur lors de la lecture des informations du fichier ${fullPath}: ${err}`);
            return;
        }

        if (stats.isDirectory()) {
            console.log(`${indent}${file}/`);
            printDirectorySync(fullPath, `${indent}  `); // Appel récursif
        } else {
            console.log(`${indent}${file}`);
        }
    });
}

// Remplacez 'votre_dossier' par le chemin de votre dossier de projet
printDirectorySync('C:\\Users\\johan\\WebstormProjects\\time_management\\time-management');
