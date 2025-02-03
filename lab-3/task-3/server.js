const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
    console.log(`Сервер працює на http://localhost:${port}`);
});