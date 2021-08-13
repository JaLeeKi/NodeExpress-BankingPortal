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

// const accountData = fs.readFileSync('src/json/accounts.json', {encoding: 'utf8'});
// const accounts = JSON.parse(accountData);
// const userData = fs.readFileSync('src/json/users.json', {encoding: 'utf8'});
// const users = JSON.parse(userData);

const port = 3000;
app.listen(port, () => {
  console.log(`PS Project Running on port ${port}!`);
});
