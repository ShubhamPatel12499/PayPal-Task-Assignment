
const { Schema, model } = require("mongoose");

const sprintSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    startDate: {
        type: String,
        require: true,
    },
    endDate: {
        type: String,
        require: true,
    }
});

const sprintModel = model("sprint", sprintSchema);

module.exports = sprintModel;