const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let tabs = [];

io.on("connection", (socket) => {
    tabs.push(socket.id);
    updateTabs();

    socket.on("disconnect", () => {
        tabs = tabs.filter(id => id !== socket.id);
        updateTabs();
    });
});

function updateTabs() {
    tabs.forEach((id, index) => {
        io.to(id).emit("tabType", index === 0 ? "Головна вкладка" : "Другорядна вкладка");
    });
}

server.listen(3000, () => {
    console.log("Сервер запущено на порту 3000");
});