const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.locals.pretty = true;
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello home page");
});
app.get("/login", (req, res) => {
  res.send("Login Please");
});
app.get("/dynamic", (req, res) => {
  let lis = "";
  for (i = 0; i < 5; i++) {
    lis = lis + `<li>${i}Cooding</li>`;
  }
  const output = `
  <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        Hello Dynamic
        <ul>
            ${lis}
        </ul>
    </body>
    </html>`;
  res.send(output);
});
app.get("/route", (req, res) => {
  res.send("Hello route,<img src='/node.png'>");
});
app.listen(3000, () => console.log("Connected 3000 port"));
app.get("/view", (req, res) => {
  res.render("index", { time: Date() });
});

app.get("/topic/:id", (req, res) => {
  const topics = ["javascript is...", "node is...", "Express is..."];
  const output = `
    <a href="/topic/0">javascirpt</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br>
    ${topics[req.params.id]}
  `;
  res.send(output);
});
app.get("/topic/:id/:mode", (req, res) => {
  res.send(req.params.id + `,` + req.params.mode);
});

app.get("/form", (req, res) => {
  res.render("form");
});
app.get("/form_receiver", (req, res) => {
  const title = req.query.title;
  const description = req.query.description;
  res.send(title + "," + description);
});
app.post("/form_receiver", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  res.send(title + "," + description);
});
