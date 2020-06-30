const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/mymusicstore';

const colors = require('colors');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("open", () => {
    console.log('[+]'.yellow + ' Database is connected'.blue);
});

mongoose.connection.on("error", () => {
    console.log('[-]'.brightYellow + " There's an error :(".red);
});