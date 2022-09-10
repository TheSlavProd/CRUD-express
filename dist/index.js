"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const port = 3001;
const db = {
    todos: [
        { id: 1, title: "front bag" },
        { id: 2, title: "alo" },
        { id: 3, title: "has mik" },
        { id: 4, title: "mik" },
    ],
};
//-----------------------------------
app.get("/", (req, res) => {
    res.json({ message: "Ehhh ashxarq" });
});
//QUERY vnutri req.query-----------------------
app.get("/todos", (req, res) => {
    let foundedTodos = db.todos;
    if (req.query.title) {
        foundedTodos = foundedTodos.filter((c) => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundedTodos);
});
//URI PARAMETRS VNUTRI PARAMS haykmkrtich@yahoo.com
app.get("/todos/:id", (req, res) => {
    const foundedTodo = db.todos.find((c) => c.id === +req.params.id);
    if (!foundedTodo) {
        res.sendStatus(404);
        return;
    }
    res.json(foundedTodo);
});
//create post
app.post("/todos", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const newTodo = {
        id: +new Date(),
        title: req.body.title,
    };
    db.todos.push(newTodo);
    res.status(201).json(newTodo);
});
//delete post
app.delete("/todos/:id", (req, res) => {
    db.todos = db.todos.filter((c) => c.id !== +req.params.id);
    res.sendStatus(204);
});
//PUT
app.put("/todos/:id", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const foundedTodo = db.todos.find((c) => c.id === +req.params.id);
    if (!foundedTodo) {
        res.sendStatus(404);
        return;
    }
    foundedTodo.title = req.body.title;
    res.sendStatus(204);
});
//------------------------------------------------------
app.listen(port, () => {
    console.log("Serer started on port ", port);
});
// const http = require("http");
// const fs = require("fs");
// let reqCount = 0;
// const server = http.createServer(async (req, res) => {
//   reqCount++;
//   switch (req.url) {
//     case "/Alik":
//       res.write("barev alik");
//       break;
//     case "/Hasmik":
//       res.write("bare hasmik");
//       break;
//     case "/home":
//       const data = fs.readFileSync("pages/home.html");
//       res.write(data);
//       break;
//     default:
//       res.write("Default " + reqCount);
//   }
//   res.end();
// });
// server.listen(3001);
