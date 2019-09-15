// commonJS modules vs ES2015 modules on client side import express from 'express';
const express = require("express");
require("./services/passport");

// single Express app here. we will use this to set up config
const app = express();

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000; // if there is no environment variable that already defined by Heroku, assign that variable to PORT. otherwise, use the default value of 5000.

app.listen(PORT);
