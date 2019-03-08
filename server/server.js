const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname,'..', 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/test',(req,res)=>{
  res.json({message : 'this is a test message'});
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});