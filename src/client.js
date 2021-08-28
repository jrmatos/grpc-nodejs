const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const protoObject = protoLoader.loadSync(path.resolve(__dirname, '../notes.proto'));
const NotesDefinition = grpc.loadPackageDefinition(protoObject);

const client = new NotesDefinition.NoteService('localhost:50051', grpc.credentials.createInsecure());

client.list({}, (err, notes) => {
    if (err) throw err;

    console.log(notes);
});

setInterval(() => {
    client.find({ id: 1 }, (err, response) => {
        if (err) return console.error(err.details);
        if (!response.note) return console.error('Not found');
    
        return console.log(response.note);
    })
}, 1000);


