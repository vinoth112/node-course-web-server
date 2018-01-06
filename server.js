const express = require('express');
const hbs = require('hbs');
var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req ,res , next) => {
    var now = new Date().toString();
    var log = `${now}: method: ${req.method} url:${req.url}`;
    console.log(log);
    fs.appendFile('server-log', log + '\n', (err) => {
        if(err){
            console.log('File cannot be appended. Please upgrade your node to latest version');
        }
    });
    next();
});
/* app.use((req, res, next) =>{
    res.render('maintenance');
});
 */
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('getUppercase', (text) => {
    return text.toUpperCase();
})

app.get('/', (req,res) => {
    // res.send('<h1>Hello all</h1>');
 res.render('home.hbs', {pageTitle:'Home Page',
  welcomeMessage:'Welcome To my page'
    })
});

app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle:'About Page',
        welcomeMessage: 'Welcome to about page'
    });
})

app.get('/bad', (req,res) => {
    res.send({
        errorMessage:'Page not found'
    })
})

app.listen(3000);