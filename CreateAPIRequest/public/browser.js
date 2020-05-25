// Imports

// Constants

// Initializers

// Event Logic
document.addEventListener("click", function(event) {

    // CRUD - Replace Functionality
    if (event.target.classList.contains("edit-me")) {
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