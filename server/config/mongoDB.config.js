const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
let gfs, gfsBucket;
require("dotenv").config();
const connectDB = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Connected to MongoDB");
        gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
          bucketName: "photos",
        });
        gfs = Grid(mongoose.connection.db, mongoose.mongo);
        gfs.collection("photos");
        resolve(gfs);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getGFS = () => {
  if (!gfs) {
    throw new Error("gfs is not initialized. Call connectDB first.");
  }
  return gfs;
};
const getGFSBucket = () => {
  if (!gfsBucket) {
    throw new Error("gfsBucket is not initiallized.");
  }
  return gfsBucket;
};

module.exports = { connectDB, getGFS, getGFSBucket };
