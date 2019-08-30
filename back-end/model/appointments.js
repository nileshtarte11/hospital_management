const mongoose = require('mongoose');

const Schema = mongoose.Schema

const appointmentsSchema = new Schema({
    doctorId: String,
    date: String,
    status: String,
    user: Object
});

module.exports = mongoose.model('appointment', appointmentsSchema, 'appointments');