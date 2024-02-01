const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect.connection.readyState === 1) {
      console.log("DB connection is success");
    } else {
      console.log("DB connection is failed");
    }
  } catch (error) {
    console.log("DB connection is failed");
    throw new Error(error);
  }
};

module.exports = dbConnect;
