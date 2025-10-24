const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Manejador de errores global
app.use(errorMiddleware);

module.exports = app;
