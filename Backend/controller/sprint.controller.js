const sprintModel = require("../models/sprint.model");

const getSprint = async () => {
    try {
        const data = await sprintModel.find({});

        return {
            flag: true,
            data,
            message: "Sprint Successfully Get",
            desc: "",
        };
    } catch (e) {
        return {
            flag: false,
            message: "Error",
            data: [],
            desc: e.message,
        };
    }
};

const addSprint = async ({ name, startDate, endDate, sprintTasks }) => {
    try {
        const createData = new sprintModel({ name, startDate, endDate, sprintTasks });
        await createData.save();

        const data = await sprintModel.find({});

        return {
            flag: true,
            data,
            message: "Sprint added Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            flag: false,
            message: "Error!",
            data: [],
            desc: e.message,
        };
    }
};

const deleteSprint = async ({ id }) => {
    try {
        await sprintModel.findByIdAndDelete({ _id: id });
        const data = await sprintModel.find({});

        return {
            flag: true,
            data,
            message: "Sprint Delete Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            flag: false,
            message: "Error!",
            data: [],
            desc: e.message,
        };
    }
};

const updateSprint = async ({ id, ...payload }) => {
    try {
        return {
            flag: true,
            data,
            message: "Sprint Update Successfully",
            desc: "",
        };
    } catch (e) {
        return {
            flag: false,
            message: "Error!",
            data: [],
            desc: e.message,
        };
    }
}

module.exports = { addSprint, getSprint, deleteSprint, updateSprint };