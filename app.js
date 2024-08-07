const express = require("express");
const { connectToDB } = require("./db");
const { List } = require("./models/list");
const date = require(__dirname + "/date.js");
const app = express();

// console.log("date => ", date.getDate());
// console.log("day => ", date.getDay());

// Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

connectToDB();

// set view engine for express
app.set("view engine", "ejs");

let workItems = [];

app.get("/", async function (req, res) {
  try {
    const day = date.getDate();
    const items = await List.find({});
    res.render("list", { listTitle: day, newListItems: items });
  } catch (err) {
    console.error("Error in getting todo list", err);
  }
});

/**
 * @method: POST
 * @param {String} req
 * @return Object
 */
app.post("/", async function (req, res) {
  try {
    const listName = req.body.listName;
    const listItems = new List({
      name: listName,
    });

    const listSaved = await listItems.save();
    console.log("Todo List Saved Successfully ==> ", listSaved);
    res.redirect("/");
  } catch (err) {
    console.error("Error in inserting document ==> ", err);
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.newItems;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
