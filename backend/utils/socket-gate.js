
const { io } = require("../server");

exports.emit = async ({ eventName, payload }) => {
    console.log("socket-gate::emit", eventName);
    io.emit(eventName, payload);
};


