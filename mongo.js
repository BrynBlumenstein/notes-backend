const mongoose = require('mongoose');

if (process.argv.length < 3) {
	console.log('give password as argument');
	process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://notes-user:${password}@notes-cluster.euneowj.mongodb.net/noteApp?retryWrites=true&w=majority&appName=notes-cluster`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
	content: String,
	important: Boolean
});

const Note = mongoose.model('Note', noteSchema);

if (process.argv.length < 4) {
	Note.find({}).then((result) => {
		result.forEach((note) => {
			console.log(note);
		});
		mongoose.connection.close();
	});
} else {
	const note = new Note({
		content: process.argv[3],
		important: process.argv[4] === 'true'
	});

	note.save().then((result) => {
		console.log('note saved!', result);
        mongoose.connection.close();
	});
}
