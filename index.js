const express = require('express');
// commonJS modules vs ES2015 modules on client side import express from 'express';
const app = express();
// single Express app here. we will use this to set up config

app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

const PORT = process.env.PORT || 5000; // if there is no environment variable that already defined by Heroku, assign that variable to PORT. otherwise, use the default value of 5000.

app.listen(PORT);
