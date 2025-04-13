const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send("Hello testing");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})