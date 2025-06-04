const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();

// ✅ Set the view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // look in /views folder

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const UserSchema = mongoose.Schema({
  name: String,
  age: Number,
});

const UserModel = mongoose.model("employees", UserSchema);

// ✅ Serve the UI using render
app.get("/", async (req, res) => {
  const users = await UserModel.find();
  res.render("index", { users });
});

app.post("/add", async (req, res) => {
  const { name, age } = req.body;
  await UserModel.create({ name, age });
  res.redirect("/?action=added");
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await UserModel.findByIdAndDelete(id);
  res.redirect("/?action=deleted");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
