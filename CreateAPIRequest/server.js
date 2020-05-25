// Imports

// Constants
let express = require("express")
let mongodb = require("mongodb")
let connectionString = "mongodb+srv://timmanas:Apple@cluster0-9czdc.mongodb.net/ToDoApp?retryWrites=true&w=majority"
let db

// Initializers
let app = express()
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))           //Allows all content from public folder to be available from the root of the server. Initialixzes the browser.js file
app.use(express.json())

// Core Logic
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    db = client.db()
    app.listen(3003)
})

// API Request
app.get('/', function(req, res) {
    db.collection('items').find().toArray(function(err, items) {
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
            <h1 class="display-4 text-center py-1">To-Do App !!! </h1>
            
            <div class="jumbotron p-3 shadow-sm">
              <form id="create-form" action="/create-item" method="POST">
                <div class="d-flex align-items-center">
                  <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
                  <button class="btn btn-primary">Add New Item</button>
                </div>
              </form>
            </div>
            
            <ul id="item-list" class="list-group pb-5">
            
            </ul>
            
          </div>
        

        <script>
        // Client Side Rendering
        let items = ${JSON.stringify(items)} 
        </script>

        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  
        <script src="/browser.js"></script>  
        </body>
        </html>`)        
    })
  })

// CRUD - 'C' Create Post using insertOne()
app.post('/create-item', function(req, res) {
    console.log("Sending to DB: New Item")
    db.collection("items").insertOne({text: req.body.text}, function(err, info) {
        console.log("Create Request -  Mongo Database should have this  message: " + req.body.item)
        res.json(info.ops[0])
    })
}) 


// CRUD - 'R' Read Post is in response above


// CRUD - 'U' Update Post using findOnAndUpdate()
app.post('/update-item', function(req, res) {
    console.log("Sending to DB: Update Item")
    db.collection("items").findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {$set: {text: req.body.text}}, function() {
        console.log("Update Request - Success: " + req.body.id)
        res.send("Success")
    })

})

// CRUD - 'D' Delete Post using deleteOne()
app.post('/delete-item', function(req,res) {
    console.log("Sending to DB: Delete Item")
    db.collection("items").deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function() {
        console.log("Delete Request - Success: " + req.body.id)
        res.send("Success")
    })
    
})




// Utilities



/**
 

How to create CRUD Operations
Create
- Create app.post()
- Set up DB collection to fetch ietms
- Use insertOne() to send post to the DB
- Redirect user to the same page upon start up

Reads
- Fetch items from the DB 
- Use items.map(function(item)) to generate a list of all the items in the DB
- Modify the GUI as per the contents of the DB

Update
- Create app.post()
- Set up Db connection
- Use findOneAnduPDATE() to send to DB which post we want to modify
    > We sent it the unique mondoDB _id, body to modify and a function to do after we finish the update

Delete 
- Create app.post()
- Set up DB connection 
- Use deleteOne() to delete a specific post
    > We send it unique mondoDB _id to be deleted

 Notes
 - The difference between the browser.js and server.js is
    > browser.js deals with the frontEnd application Actions (i.e: Clicking, EventListener)
    > server.js deals with the connection to the backend (i.e Mongo DB)


 Questions
 - Why does code fail when we move document.addEventListener() to server.js file ? 
 > Document DOES NOT work in a node environment, hence you need a seperate file to use document
 */