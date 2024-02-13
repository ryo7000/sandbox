import express from 'express';

const app = express();
app.set('view engine', 'pug');

/* GET home page. */
app.get('/', function(req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.listen(4000, () => {
  console.log("start app with 4000");
});
