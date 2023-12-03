const mongoose = require("mongoose");
const GFS = mongoose.model(
  "GFS",
  new mongoose.Schema({}, { strict: false }),
  "photos.files"
);
const articleSchema = new mongoose.Schema({
  title: String,
  articleBody: String,
  publisher: { type: String, default: "MeRing HQ" },
  date: { type: Date, default: Date.now() },
  articleImage: { type: mongoose.Schema.Types.ObjectId, ref: "GFS" },
});
const Article = mongoose.model("Articles", articleSchema);

module.exports = Article;
