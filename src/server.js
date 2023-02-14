const express = require('express');
const app = require('./app');
const router = require('./router');
require('dotenv').config();

const PORT = process.env.PORT || 3333

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log('Server running at port 3333'));