const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const cookieParser = require('cookie-parser');
const axios = require('axios');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const {GridFsStorage} = require('multer-gridfs-storage');

require('./server/config/mongoose.config');
require('dotenv').config();

app.use(cookieParser());
app.use(cors({
    credentials: true, 
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
    
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

require('./server/routes/user.routes')(app);

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = Grid(conn.getClient().db(), mongoose.mongo);
    gfs.collection('uploads');
});

// Set up multer and GridFS storage
const storage = new GridFsStorage({
    url: 'mongodb://localhost/practimatch',
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      return {
        filename: file.originalname
      }
    }
});
const upload = multer({ storage });

// Route to upload a file
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

// Route to download a file
app.get('/download/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).json({ message: 'File not found' });
      }
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    });
});
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );