const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const data = require("./data");
const { accounts, users, writeJSON } = data;
const accountRoutes = require("./routes/accounts");
const servicesRoutes = require("./routes/services");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("index", { title: "Account Summary", accounts: accounts });
});

app.get("/profile", function (req, res) {
  res.render("profile", { user: users[0] });
});

app.use("/account", accountRoutes);
app.use("/services", servicesRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
});
