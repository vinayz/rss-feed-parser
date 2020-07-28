const express = require('express');
const app = express();
const port = 3000;

let Parser = require('rss-parser');
let parser = new Parser();

app.use(express.static('./app'));
app.get('/', function (req, res) {
  res.sendFile(__dirname + 'index.html');
});

app.get('/api', (req, res) => {

  if (!req.query || !req.query.feedUrl) {
    res.send({ "data": "Please send params", status: false })
  } else {
    parser.parseURL(req.query.feedUrl, function (err, feed) {
      if (err) {
        res.send({ "data": "Something went wrong!", status: false });
      } else {
        res.send({ "data": feed.items, status: true });
      }
    });
  }

})

// Start the server on port 3000
app.listen(port, () => console.log(`App is listening at http://localhost:${port}`));