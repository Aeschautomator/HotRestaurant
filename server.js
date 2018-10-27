// Dependencies
var express = require("express");
var path = require("path");
var inquirer = require("inquirer");


// Sets up Express App
var app = express();
var PORT = process.env.PORT || 3000;
// Starts the server to begin listening
// =============================================================

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
 

// Sets UP the Express app to handle  data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

// Table Parties (DATA)
var Tables = [
   {
       table: "1",
       guests:"4",
       phone:"804-440-0004",
       Party:"Betty",
   }
]

app.get("/welcome", function(req, res) {
   res.sendFile(path.join(__dirname, "welcome.html"));
});

app.get("/add", function(req, res) {
   res.sendFile(path.join(__dirname, "add.html"));
 });
 app.get("/Reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "Reservations.html"));
});
app.get("/table", function(req, res) {
  res.sendFile(path.join(__dirname, "table.html"));
});

// Displays all Reservations
app.get("/api/Reservations", function(req, res) {
   return res.json(Tables);
 });

// Create New reservations - takes in JSON input
app.post("/api/Reservations", function(req, res) {
   // req.body hosts is equal to the JSON post sent from the user
   // This works because of our body parsing middleware
   var newReservation = req.body;

   // Using a RegEx Pattern to remove spaces from newReservation
   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
   newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();
  
   newReservation.push(Tables);
  
   console.log(Tables);

  

   res.json(newReservation);
 });