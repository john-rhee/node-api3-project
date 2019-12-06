require("dotenv").config();

const server = require("./server.js")

const port = process.env.PORT || 7001;
server.listen(port, () => {
    console.log(`***Server running on ${port}***`)
})
