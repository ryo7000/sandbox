import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/login', (req, res) => {
  console.log('access GET /');
  res.render('login', { title: 'Express' });
});

app.post('/login', (req, res) => {
  console.log(`access POST /`);
  if(req.body.userName=="ice" || req.body.password=="man") {
    res.cookie('token', 'yes_token', {maxAge:60000000, httpOnly:true, sameSite: 'strict'});
    return res.redirect("/");
  }
  res.send("error!");
});

app.get('/auth_request', function(req, res) {
  if(req.cookies?.token == "yes_token"){
    console.log("auth_request returns 200");
    return res.send('sucsess!!') //成功したばあいは200OK
  }
  console.log("auth_request returns 500");
  res.status(500).send('auth failed')//失敗の場合は500 errorとしている
});

app.listen(3000, () => {
  console.log("start auth with 3000");
});
