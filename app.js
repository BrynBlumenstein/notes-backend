const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');
const notesRouter = require('./controllers/notes');
// const cors = require('cors');
// const morgan = require('morgan');

const app = express();

logger.info('connecting to', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(express.static('dist'));
app.use(express.json());
app.use(middleware.requestLogger);
// app.use(cors());
/* morgan.token('data', (request) => JSON.stringify(request.body));
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :data'
	)
); */

app.use('/api/notes', notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
