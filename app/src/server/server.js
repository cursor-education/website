var express = require('express');
var cookieParser = require('cookie-parser');
let session = require('express-session');
let favicon = require('serve-favicon');
let geolang = require("geolang-express");
let i18n = require('i18n-express');
let bodyParser = require('body-parser');

let environment = require('./helpers/environment');

var app = express();

app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

app.use(favicon(__dirname + '/../assets/favicon/favicon.png'));
app.use(express.static(__dirname + '/../assets'));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

let siteLangs = ['uk', 'en', 'ru'];
app.use(geolang({
  siteLangs: siteLangs,
  cookieLangName: 'ulang'
}));
app.use(i18n({
  translationsPath: __dirname + '/i18n',
  siteLangs: siteLangs,
  paramLangName: 'lang',
  textsVarName: 'translation',
  cookieLangName: 'ulang'
}));

app.locals.pretty = environment.isDevelopment() ? '  ' : false;

app.use((req, res, next) => {
  // GET /?lang=ua
  // will be proceed by i18n middleware before this request
  if (req.query.lang) {
    return res.redirect('/');
  }

  // GET /ua
  // will check if requested language is supported,
  // and will redirect to the appropriate set-language url
  if (req.method.toUpperCase() == 'GET') {
    let searchLang = req.originalUrl.split('/')[1];
    if (searchLang == 'ua') searchLang = 'uk';

    if (siteLangs.indexOf(searchLang) != -1) {
      return res.redirect('/?lang=' + searchLang);
    }
  }

  let config = require('./helpers/config');

  res.locals = {
    'config': config.getConfig(),
    'revision': config.getRevisionsMapping(),
    'data': config.getDataContent(),
  };

  next()
});

app.use('/', require('./routes/home'))
app.use('/course', require('./routes/course'))
app.use('/teacher', require('./routes/teacher'))
app.use('/our-history', require('./routes/our-history'))
app.use('/job-support', require('./routes/job-support'))
app.use('/true-about-it', require('./routes/true-about-it'))
app.use('/test', require('./routes/test'))
app.use('/testimonials', require('./routes/testimonials'))
app.use('/lead', require('./routes/lead'))

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.listen(8080);
