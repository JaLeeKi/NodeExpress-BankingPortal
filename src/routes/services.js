const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { accounts, writeJSON } = require("../data");

router.get("/transfer", function (req, res) {
  res.render("transfer");
});
router.get("/payment", function (req, res) {
  res.render("payment", { account: accounts.credit });
});

router.post("/transfer", (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount);
  writeJSON();
  fs.writeFileSync(
    path.join(__dirname, "json/accounts.json"),
    writeJSON(),
    "utf8"
  );
  res.render("transfer", { message: "Transfer Completed" });
});

router.post("/payment", (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);
  writeJSON();
  fs.writeFileSync(
    path.join(__dirname, "json/accounts.json"),
    writeJSON(),
    "utf8"
  );
  res.render("payment", {
    message: "Payment Successful",
    account: accounts.credit,
  });
});

module.exports = router;
