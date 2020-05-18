// Imports

// Constants
let express = require("express")



// Initalizers
let app = express() 



// Core Logic
app.use(express.urlencoded({extended: false}))      // Boiler plate code, Express will add all FORM objects to body object. Then add body object to request object. By default express does not do this
app.listen(3030)         // App will listen at Port 3000



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

// This will record what we place in the form and try to send a POST request
// Notice we use a 'POST' Method in the form    <form action="/create-item" method="POST">
app.post('/create-item', function(req, res) {
    console.log(req.body.item)
    res.send("Thanks for submitting")
})



// Utilities




/**
 How to:
 1. Initialize a Web App
 - Create a JS file called server.js
 - Go to terminal with current directory (in this case it is CreateWebApp folder)
 - Type in:
    npm init -y
- This should create the package.json file


2. Initialize Express
- Type in:
    npm install express
- Create a constant
    let express = require("express") 
- Then finally initialize express using
    let app = express()


3. How to start application ?
- Go to command line and type:
    node server.js
- Then go to localhost:3030 


Question
- What does this do ?
app.get("/", function(req,res){}
> If the user goes to localhost home page (aka localhost:3030) then we will display the following HTML back as a RESPONSE


Note
- There is 'POST'  in this line which allows us to send a POST REQUEST <form id="create-form" action="/create-item" method="POST">
- This "server" file constantly runs forever. Hence you have to close it manually
- Once installed you will see node_modules Folder  and package-lock.json
- Notice when we installed express, package.json file NOW has express in its list of dependenciesß



 */