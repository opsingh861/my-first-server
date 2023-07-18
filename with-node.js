const http = require("http")

const port = 8081
let body = ""

const todoList = ["Complete Node Byte", "Play Cricket"]

http.createServer((request, response) => {
    const { method, url } = request;
    console.log(method, url)
    if (url === "/todos") {
        if (method === "GET") {
            response.writeHead(200, { "Content-Type": "text/html" })
            response.write(todoList.toString())
        }
        else if (method === "POST") {
            request.on("error", (err) => {
                console.log(err)
            }).on("data", (chunk) => {
                let body = ""
                body += chunk;
                // console.log(chunk)
            }).on("end", () => {
                body = JSON.parse(body);
                // console.log("data: ", body)
                let newToDo = todoList;
                newToDo.push(body.Item)
                console.log(newToDo)
                response.writeHead(201)
            })
        } else if (method === "DELETE") {
            // let body = "";
            request.on("error", (err) => {
                console.log(err)
            }).on("data", (chunk) => { 
                body += chunk;

            }).on("end", () => {
                body = JSON.parse(body);
                let deleteThis = body.Item;

                for (let i = 0; i < todoList.length; i++) {
                    if (todoList[i] === deleteThis) {
                        todoList.splice(i, 1)
                        break;
                    }
                }
                console.log(todoList)
            })
        }
    }

    response.end();
}).listen(port, () => {
    console.log(`Nodejs server started on port ${port}`)
});


// http:localhost:8081 