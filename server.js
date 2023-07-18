const express = require("express")

// initialization
const app = express()

const toDoList = ["Complete Node Byte", "Play Cricket"]

// application will now use json format for data
app.use(express.json())

const port = 8081


// http://localhost:8081/todos
app.get("/todos", (request, response) => {
    response.status(200).send(toDoList)
})

app.listen(port, () => {
    console.log(`Nodejs server starte d on port ${port}`)
})

app.post("/todos", (request, response) => {
    let newToDoItem = request.body.item;
    toDoList.push(newToDoItem);
    response.status(201).send({
        message: "Task added successfully"
    })
})


app.delete("/todos", (request, response) => {
    const itemToDelete = request.body.item;

    toDoList.find((element, index) => {
        if (element === itemToDelete) {
            toDoList.splice(index, 1)
        }
    })

    response.status(200).send({
        message: `Deleted item -${request.body.item}`
    })
})


// all the other methods
app.all("/todos", (request, response) => {
    response.status(501).send();
})

// all the other routes
app.all("*", (request, response) => {
    response.status(404).send()
})

// http:localhost:8081 