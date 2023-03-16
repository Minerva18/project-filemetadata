var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer = require('multer');

const storageEngine = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
});

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {

  console.log('req.file', req.file);
  
  let {originalname, mimetype, size} = req.file;
  
  res.json({
    name: originalname,
    type: mimetype,
    size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
