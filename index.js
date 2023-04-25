const express = require('express');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

const upload = multer();

const app = express();

app.use(cors());
app.use('/public', express.static(`${process.cwd()}/public`));

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).send('Please upload a file');
    return;
  }

  const metadata = {
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  };

  res.json(metadata);
});

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  if (!file) {
    res.status(400).send('Please upload a file');
    return;
  }

  try {
    const metadata = {
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    };
    console.log(metadata);
    res.json(metadata);
  } catch (error) {
    console.error(error);
    res.status(500).send('There was an error parsing the metadata');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
