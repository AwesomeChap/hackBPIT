const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const DATA_FILE = path.join(__dirname,'data.json');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'..', 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/test',(req,res)=>{
  res.json({message : 'this is a test message'});
})

app.post('/data',(req,res)=>{
  // console.log(req.body);
  const {data} = req.body;
  let readDataObj = [];
  fs.readFile(DATA_FILE,(err,readData)=>{
    console.log(JSON.stringify(readData));
    readDataObj = JSON.parse(readData) || [];
    console.log(readDataObj);
    readDataObj.push(data);
    fs.writeFile(DATA_FILE,JSON.stringify(readDataObj,null,2), ()=>{
      res.json({success : 'data written successfully'});
    });
  })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});