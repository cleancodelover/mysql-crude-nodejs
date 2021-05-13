const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "EmployeeDB",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection failed. \n Error:" + JSON.stringify(err, undefined, 2)
    );
});

app.listen(4000, () =>
  console.log("Express server is running at port number 4000")
);

///Gets all employees from the database
app.get("/employees", (req, res) => {
  mysqlConnection.query("SELECT * FROM employees", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

///Gets all employees from the database
app.get("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employees WHERE EmpID=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

///Gets all employees from the database
app.delete("/deleteemployee/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE * FROM employees WHERE EmpID=?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted");
      else console.log(err);
    }
  );
});
