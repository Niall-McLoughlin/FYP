const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const shopRoutes = require('./routes/shop');

app.use(express.json()); // Won't parse JSON data sent to server without this
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', shopRoutes.routes);

//app.use((req, res, next) => {
    //  res.status(404).render('404', { pageTitle: 'Page Not Found' });
//});

mongoose.set('strictQuery', true);

// Replace the connection string with your MongoDB Atlas connection string
const uri = 'mongodb+srv://niall:bingbong96@cluster0.nhluxoj.mongodb.net/pro';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB Atlas')
        app.listen(3000);
    })
    .catch(err => {
        console.log('Mongoose connection error: ' + err);
    });
