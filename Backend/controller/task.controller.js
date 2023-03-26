const taskModel = require("../models/task.model");


const getTask = async () => {
    try {
        const data = await taskModel.find({});

        return {
            flag: true,
            data,
            message: "Task Get Successfully",
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

const addTask = async ({ ...payload }) => {
    console.log('payload:', payload)
    try {
        const createData = new taskModel(payload);
        await createData.save();

        const data = await taskModel.find({});

        return {
            flag: true,
            data,
            message: "Task added Successfully",
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

const deleteTask = async ({ id }) => {
    // console.log('id:', id)
    try {
        await taskModel.findByIdAndDelete({ _id: id });
        const data = await taskModel.find({});

        return {
            flag: true,
            data,
            message: "Task Delete Successfully",
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

const updateTask = async ({ id, ...payload }) => {
    console.log('id, ...payload from update:', id, payload)
    try {
        await taskModel.findByIdAndUpdate({ _id: id }, payload)
        const data = await taskModel.find({});
        return {
            flag: true,
            data,
            message: "Task Update Successfully",
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

const filterTaskBySprintId = async ({ sprintId }) => {
    console.log('sprintId :', sprintId)
    try {
        const todo = await taskModel.find({ sprintId, status: "todo" });
        const progress = await taskModel.find({ sprintId, status: "progress" });
        const done = await taskModel.find({ sprintId, status: "done" });
        return {
            flag: true,
            data: {
                todo,
                progress,
                done
            },
            message: "Task Filter Successfully",
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

const userTask = async ({ userName }) => {

    try {
        const data = await taskModel.aggregate([{ $match: { "assignedTo": userName } }]);

        return {
            flag: true,
            data,
            message: "Individual Task Get Successfully",
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
module.exports = { addTask, getTask, deleteTask, updateTask, filterTaskBySprintId, userTask };