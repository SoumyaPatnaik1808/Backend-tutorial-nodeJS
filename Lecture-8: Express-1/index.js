const express = require('express');
const app = express(); 
const http = require('http');

app.get('/', (req, res) => {
    res.send('Home page');
});  

app.get('/about', (req, res) => {
    res.send('About page ' + 'HI ' + req.query.name + ' you are ' + req.query.age + ' years old');
});

app.get('/contact', (req, res) => {
    res.send('Contact page');
});

app.get('/signup', (req, res) => {
    res.send('Signup page');
});

app.post('/signup', (req, res) => {
    res.send('Successfully signed up');
});

http.createServer(app).listen(9500, () => {
    console.log('Server initialized on port 9500');
});


