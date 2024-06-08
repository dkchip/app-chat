import express, { Express } from 'express';

const configStaticFile = (app: Express) => {
    app.use(express.static('./src/public'));
    app.use('/images', express.static('images/'));
};

export default configStaticFile;
