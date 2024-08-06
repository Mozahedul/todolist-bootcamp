const express = require("express");
const date = require(__dirname + "/date.js");
const app = express();

// console.log("date => ", date.getDate());
// console.log("day => ", date.getDay());

// Parse request body
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// set view engine for express
app.set("view engine", "ejs");

let items = ["food", "chocolate", "candy"];
let workItems = [];

app.get("/", function (req, res) {
  const day = date.getDate();
  res.render("list", { listTitle: day, newListItems: items });
});

/**
 * @method: POST
 * @param {String} req
 * @return Object
 */
app.post("/", function (req, res) {
  console.log(req.body);
  const item = req.body.listName;
  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
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
