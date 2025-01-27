const mongoose = require("mongoose");

const dbURL = process.env.DB_URL;

const connectDb = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to database");
    } catch (e) {
        console.log(e);
    }
};

module.exports = connectDb;