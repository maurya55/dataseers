const fs = require('fs');
const path = require('path');


const FILE_DATA_PATH = path.join(__dirname, '../db/index.json');

const readFilesFromJson = () => {
    try {
        const data = fs.readFileSync(FILE_DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading file data:', err);
        return [];
    }
};

const writeFilesToJson = (data) => {
    try {
        return fs.writeFileSync(FILE_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing file data:', err);
    }
};

const getNextId = () => {
    const files = readFilesFromJson();
    return files.length === 0 ? 1 : Math.max(...files.map(file => file.id)) + 1;
};

const getImageFileById = (id) => {
    const files = readFilesFromJson();
    return files.find(file => file.id === id);
};

const deleteImageFile = (fileName) => {
    return fs.unlinkSync(`public/uploads/${fileName}`);
}


module.exports = {
    readFilesFromJson,
    writeFilesToJson,
    getNextId,
    getImageFileById,
    deleteImageFile
};