
const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {

    // Parse the requested URL
    const parsedUrl = url.parse(req.url, true);

    console.log("Path:", parsedUrl.pathname);
    console.log("Query Parameters:", parsedUrl.query);

    res.writeHead(200, { "Content-Type": "text/plain" });

    res.write(`Path: ${parsedUrl.pathname}\n`);

    if (parsedUrl.query.name) {
        res.write(`Hello, ${parsedUrl.query.name}!`);
    } else {
        res.write("Hello, Guest!");
    }

    res.end();
});

server.listen(3000, () => {
    console.log("Server is running at http://localhost:3000");
});
