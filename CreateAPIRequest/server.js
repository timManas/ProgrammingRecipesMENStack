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
    <h1 class="display-4 text-center py-1">To-Do App!</h1>
    
    <div class="jumbotron p-3 shadow-sm">
    <form action="/create-item" method="POST">
    <div class="d-flex align-items-center">
    <input name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
    <button class="btn btn-primary">Add New Item</button>
    </div>
    </form>
    </div>
    
    
    <ul class="list-group pb-5">
      ${items.map(function(item) {
        return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
        <span class="item-text">${item.text}</span>
        <div>
        <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
        <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
        </div>
        </li>`
      }).join('')}
    </ul>
    </div>
    
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>  
    <script src="/browser.js"></script>

    </body>
    </html>`)
    })
  })

// CRUD - 'C' Create Post using insertOne()
app.post('/create-item', function(req, res) {
    db.collection("items").insertOne({text: req.body.item}, function(err, info) {
      console.log("Mongo Database should have this  message: " + req.body.item)
      res.redirect('/')
    })
}) 

// CRUD - 'R' Read Post is in response above


// CRUD - 'U' Update Post using findOnAndUpdate()
app.post('/update-item', function(req, res) {
    db.collection("items").findOneAndUpdate({_id: new mongodb.ObjectID(req.body.id)}, {$set: {text: req.body.text}}, function() {
        res.send("Success")
    })

})

// CRUD - 'D' Delete Post using deleteOne()
app.post('/delete-item', function(req,res) {
    db.collection("items").deleteOne({_id: new mongodb.ObjectID(req.body.id)}, function() {
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
 */