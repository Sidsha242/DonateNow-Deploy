const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        // const db = mongoose.connection;
        // db.on("error", console.error.bind(console, "connection error: "));
        // db.once("open", function () {
        //     console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
        // });
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;