const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;