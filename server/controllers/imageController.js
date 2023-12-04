const { getGFS, getGFSBucket } = require("../config/mongoDB.config");

const getImage = async (req, res) => {
  try {
    const gfs = getGFS();
    const filename = req.params.filename;
    const gfsBucket = getGFSBucket();
    const file = await gfs.files.findOne({ filename });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      res.set("Content-Type", file.contentType);
      const readstream = gfsBucket.openDownloadStreamByName(filename);
      readstream.pipe(res);
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getImage };
