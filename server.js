const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });

  next();

});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    name: 'Brian',
    // currentYear: new Date().getFullYear(),
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website',
    hobbies: [
      'woodworking',
      'photography',
      'programming'
    ]
  });
  // res.send({
  //   name: 'Brian',
  //   likes: [
  //     'woodworking',
  //     'photography',
  //     'programming'
  //   ]
  // });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    name: 'Brian',
    pageTitle: 'My About Page'//,
    // currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({
      "error": "Error Occured"
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
