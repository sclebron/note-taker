const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
const port = 3000

app.use(express.json());
app.use(express.static('public'))

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
})

app.get('/api/notes', (req, res) => {

  let db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));

  res.send(JSON.stringify(db));
})

app.post('/api/notes', (req, res) => {
  let db = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));
  
  db.push(req.body);
  fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(db), 'utf-8');
  
  res.sendStatus(201);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})