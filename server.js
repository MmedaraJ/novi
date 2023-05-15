const express = require('express');
const session = require('express-session');
const app = express();
const cors = require('cors');
const port = 8000;
const cookieParser = require('cookie-parser');
const axios = require('axios');
const multer = require('multer');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const methodOverride = require( 'method-override');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongodb = require('mongodb');
const fs = require('fs');
const path = require('path');
const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

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
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  })
);

require('./server/routes/user.routes')(app);
require('./server/routes/job.routes')(app);
require('./server/routes/application.routes')(app);

// Configure multer storage (you can also use multer's memoryStorage for in-memory storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ 
    message: 'File uploaded successfully',
    file: req.file
  });
});

app.get('/api/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'uploads', filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File not found:', err.message);
      return res.status(404).json({ message: 'File not found' });
    }

    // Set the headers and stream the file
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

// client.indices.delete({index: 'jobs'}, function(err, res) {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log('Indexes have been deleted!', res);
//   }
// });

// client.indices.exists({index: 'jobs'}, function(err, res) {
//   if (res) {
//     console.log('Index already exists');
//   } else {
//     // proceed to create index
    // client.indices.create({ 
    //   index: 'jobs',
    //   body: {
    //     mappings: {
    //       properties: {
    //         title: { type: 'text' },
    //         location_type: {type: 'text'},
    //         country: {type: 'text'},
    //         province: {type: 'text'},
    //         city: {type: 'text'},
    //         complete_location: {type: 'text'},
    //         types: {type: 'text'},
    //         category: {type: 'text'},
    //         intro: {type: 'text'},
    //         responsibilities: {type: 'text'},
    //         qualifications: {type: 'text'},
    //         extra_description: {type: 'text'},
    //         benefits: {type: 'text'},
    //         schedule: {type: 'text'},
    //         experience: {type: 'text'},
    //         language_requirement: {type: 'text'},
    //         certification: {type: 'text'},
    //         description: {type: 'text'},
    //         description_summary: {type: 'text'},
    //         currency: {type: 'text'},
    //         compensation_frequency: {type: 'text'},
    //         yearly_compensation: {type: 'integer'},
    //         hourly_compensation: {type: 'integer'},
    //         max_hourly_compensation: {type: 'integer'},
    //         max_yearly_compensation: {type: 'integer'},
    //         range: {type: 'boolean'},
    //         compensation_info: {type: 'text'},
    //         show_compensation: {type: 'boolean'},
    //         urgently_hiring: {type: 'boolean'},
    //         start_date: {type: 'date'},
    //         expiry_date: {type: 'date'},
    //         company_name: {type: 'text'},
    //         company_url: {type: 'text'},
    //         company_logo_url: {type: 'text'},
    //         company_email: {type: 'text'},
    //         application_instruction: {type: 'text'},
    //         upgrade: {type: 'text'},
    //       }
    //     }
    //   }
    // }, (err, resp, status) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   else {
    //     console.log("create", resp);
    //   }
    // });

    // client.indices.create({ 
    //   index: 'applications',
    //   body: {
    //     mappings: {
    //       properties: {
    //         user_id: { type: 'text' },
    //         job_id: {type: 'text'},
    //       }
    //     }
    //   }
    // }, (err, resp, status) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   else {
    //     console.log("create", resp);
    //   }
    // });
  //}
// });

// const db = mongoose.connection.getClient().db('practimatch');
// const bucket = new mongodb.GridFSBucket(db, {bucketName: "uploads"});

// // Route to upload a file
// app.post('/api/upload', (req, res) => {
//   const filename = req.body.filename;
//   console.log(req.body.filename);
//   const stream = fs.createReadStream(req.body.formData.file).
//     pipe(bucket.openUploadStream(filename, {
//       chunkSizeBytes: 1048576
//     }));
//   console.log(stream);
//   //res.json({ file: req.file });
// });
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );