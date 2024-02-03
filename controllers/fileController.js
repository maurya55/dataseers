

const multer = require('multer');
const fs = require('fs');
const { readFilesFromJson, writeFilesToJson, getNextId, getImageFileById, deleteImageFile } = require('../utilities/jsonFileHandle');


const uploadFile = async (req, res) => {
    const fileData = {
        id: getNextId(),
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
    };

    const files = await readFilesFromJson();
    files.push(fileData);
    await writeFilesToJson(files);
    res.status(200).json({ message: 'File uploaded successfully', file: fileData });

};

const listFiles = async (req, res) => {
    const files = await readFilesFromJson();
    res.status(200).json({ files });
};


const getFileById = async (req, res) => {
    const fileId = Number(req.params.id);
    const file = await getImageFileById(fileId);
    if (!file) {
        return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ file });
};


const updateFile = async (req, res) => {
    const fileId = parseInt(req.params.id);
    const files = await readFilesFromJson();
    const fileIndex = files.findIndex(file => file.id === fileId);

    if (fileIndex === -1) {
        return res.status(404).json({ error: 'File not found' });
    }

    const previousFileName = files[fileIndex].filename;

    const updatedFileData = {
        id: fileId,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
    };

    files[fileIndex] = updatedFileData;
    await writeFilesToJson(files);
    await deleteImageFile(previousFileName);
    res.status(200).json({ message: 'File updated successfully', file: updatedFileData });
};


const deleteFile = async (req, res) => {
    const fileId = parseInt(req.params.id);
    const file = getImageFileById(fileId);
    if (!file) {
        return res.status(404).json({ error: 'File not found' });
    }
    await deleteImageFile(file.filename);
    const files = readFilesFromJson().filter(file => file.id !== fileId);
    writeFilesToJson(files);
    res.status(200).json({ message: 'File deleted successfully' });
};

module.exports = {
    uploadFile,
    listFiles,
    getFileById,
    updateFile,
    deleteFile
};
