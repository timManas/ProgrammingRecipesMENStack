// Imports

// Constants
let express = require("express")
let mongodb = require("mongodb")      
let connectionString = "mongodb+srv://timmanas:Apple@cluster0-9czdc.mongodb.net/ToDoApp?retryWrites=true&w=majority"
let db

// Initializers
let app = express()
app.use(express.urlencoded({extended: false})) 

// Core Logic
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true},function(err, client) {             // DB Connection Logic 
  db = client.db()
  app.listen(3002)      // By time our app starts taking request, our DB is already connected
})

// API Request
app.get("/", function(req,res){  

    // When sending we use "BACK TICKS `` and NOT quotations"
    res.send(`<!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Simple To-Do App</title>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
    </head>
    <body>
      <div class="container">
        <h1 class="display-4 text-center py-1">To-Do App</h1>
        
        <div class="jumbotron p-3 shadow-sm">
          <form action="/create-item" method="POST">
            <div class="d-flex align-items-center">
              <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
              <button class="btn btn-primary">Add New Item</button>
            </div>
          </form>
        </div>
             
      </div>
      
    </body>
    </html>`)

})


// When user clicks on the "Add New Item" on the gui, we send the data (aka. req.body.item) to the Database
app.post('/create-item', function(req, res) {
    db.collection("items").insertOne({text: req.body.item}, function(err, info) {
      res.send("Mongo Database should have this  message: " + req.body.item)
    })
}) 


// Utilities

/**
How to create a MongoDB to work with express
1. Type in:
    npm install mongodb
2. Require mongdoDB into application  using:
    let mongodb =  require("mongodb")
3. Get the ConnecitonString from mongoDB Wesbite
4. Set up connection to MongoDB server 
    mongoDB.connect(connectionString, JS Object , function To Call AFTER its opened a connection )



How to get the connectionString ?
- Go to Mongodb website login > Clusters > Connect > Connect your Application
- Copy paste it here
- Note: You have to change the following
1. Password
2. test
ORIGINAL  -  mongodb+srv://timmanas:<password>@cluster0-9czdc.mongodb.net/test?retryWrites=true&w=majority
Modified   -  mongodb+srv://timmanas:Apple@cluster0-9czdc.mongodb.net/ToDoApp?retryWrites=true&w=majority


Note
- Notice we put the app.listen(3002) inside db connection 
  Why ? because we want the DB to be connecetd FIRST then allow our app to accept incoming messages

 */