// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to check if the request is within working hours
function workingHoursMiddleware(req, res, next) {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // Check if it's Monday to Friday, 9 AM to 5 PM
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, from 9 to 17).');
    }
}

app.use(workingHoursMiddleware);

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/services', (req, res) => {
    res.render('services');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
