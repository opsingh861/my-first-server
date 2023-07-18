const http = require("http")

const port = 8081

const todoList = ["Complete Node Byte", "Play Cricket"]
let body = ""

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
                body += chunk;
                // console.log(chunk)
            }).on("end", () => {
                body = JSON.parse(body);
                console.log("data: ", body)
            })
        }
    }

    response.end();
}).listen(port, () => {
    console.log(`Nodejs server started on port ${port}`)
});


// http:localhost:8081