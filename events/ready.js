const client = require("../index");
const mongoose = require("mongoose");
const { mongo } = require("../config.json");

client.on("ready", () => {
    console.log(`${client.user.username} ✅`)

    if (!mongo) return;

    mongoose.connect(mongo, {
        useFindAndModify: true,
        useUnifiedTopology: true,
    });
});
