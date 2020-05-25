// Imports

// Constants

// Initializers

// Display Logic
function itemTemplate(item) {
    return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

// Initial Page load Render
let ourHTML = items.map(function(item){     // Note: Map will Actually return an Array
    return itemTemplate(item)
}).join("")
document.getElementById("item-list").insertAdjacentHTML("beforeend", ourHTML)

// Event Logic
// CRUD - Create Functionality
let createField = document.getElementById("create-field")
document.getElementById("create-form").addEventListener("submit", function (e) {
    e.preventDefault()

    axios.post("/create-item", { text: createField.value }).then(function (response) {
        // Create HTML for new item
        document.getElementById("item-list").insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ""
        createField.focus()
    }).catch(function () {
        console.log("Please try again later")
    })          
})


// Event Logic of Clicking
document.addEventListener("click", function(event) {

    // CRUD - Replace Functionality
    if (event.target.classList.contains("edit-me")) {
        console.log("Edit Button was clicked")
        let userInput = prompt("you clicked Edit button", event.target.parentElement.parentElement.querySelector(".item-text").innerHTML)

        if (userInput) {
            // This will return a Promise
            // Axios will send of a asynchronous call to the database WITHOUT having to reload the entire page
            axios.post("/update-item", { text: userInput, id: event.target.getAttribute("data-id") }).then(function () {
                event.target.parentElement.parentElement.querySelector(".item-text").innerHTML = userInput
            }).catch(function () {
                console.log("Please try again later")
            })          
        }
    }

    // CRUD - Delete Functionality
    if (event.target.classList.contains("delete-me")) {
        console.log("Delete Button was clicked")
        if (confirm("Do you want to Delete Permanately ?")) {        // Create a confirm pop up
            axios.post("/delete-item", { id: event.target.getAttribute("data-id") }).then(function () {
                event.target.parentElement.parentElement.remove()
            }).catch(function () {
                console.log("Please try again later")
            })          
        }

    }


})

// API Request

// Utililties