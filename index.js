require('dotenv').config();
const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Note = require('./models/note');

const app = express();

app.use(express.json());
// app.use(cors());

morgan.token('data', (request) => JSON.stringify(request.body));
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :data'
	)
);

app.use(express.static('dist'));

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes);
	});
});

app.get('/api/notes/:id', (request, response) => {
	Note.findById(request.params.id).then((note) => {
		response.json(note);
	});
});

app.delete('/api/notes/:id', (request, response) => {
	Note.findByIdAndDelete(request.params.id).then(() => {
		response.status(204).end();
	});
});

app.post('/api/notes', (request, response) => {
	const body = request.body;

	if (!body.content) {
		return response.status(400).json({ error: 'content missing' });
	}

	const note = new Note({
		content: body.content,
		important: body.important || false
	});

	note.save().then((savedNote) => {
		response.json(savedNote);
	});
});

app.put('/api/notes/:id', (request, response) => {
	const body = request.body;

	if (!body.content) {
		return response.status(400).json({ error: 'content missing' });
	}

	const noteUpdates = {
		content: body.content,
		important: body.important || false
	};

	Note.findByIdAndUpdate(request.params.id, noteUpdates, { new: true }).then(
		(updatedNote) => {
			response.json(updatedNote);
		}
	);
});

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
