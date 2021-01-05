const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const multer = require("multer");

const _storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: _storage });

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", express.static("uploads"));
app.locals.pretty = true;
app.set("views", "./views_file");
app.set("view engine", "jade");

app.get("/upload", (req, res) => {
  res.render("upload");
});
app.post("/upload", upload.single("userfile"), (req, res) => {
  res.send("Uploaded : " + req.file.filename);
});
app.get("/topic/new", (req, res) => {
  fs.readdir("data", (err, files) => {
    if (err) {
      console.log(err);
    }
    res.render("new", { topics: files });
  });
});
// app.get(["/topic", "/topic/:id"], (req, res) => {
//   fs.readdir("data", (err, files) => {
//     if (err) {
//       console.log(err);
//     }
//     // id값이 있을 때
//     let id = req.params.id;
//     if (id) {
//       fs.readFile("data/" + id, "utf8", (err, data) => {
//         if (err) {
//           console.log(err);
//         }
//         res.render("view", {
//           topics: files,
//           title: id,
//           description: data,
//         });
//       });
//     } else {
//       //id값이 없을 때
//       res.render(`view`, {
//         topics: files,
//         title: "Welcom",
//         description: "Hello,Hyebin",
//       });
//     }
//   });
// });
// app.get("/topic/:id", (req, res) => {
//   let id = req.params.id;
//   fs.readdir("data", (err, files) => {
//     if (err) {
//       console.log(err);
//     }
//     fs.readFile("data/" + id, "utf8", (err, data) => {
//       if (err) {
//         console.log(err);
//       }
//       res.render("view", {
//         topics: files,
//         title: id,
//         description: data,
//       });
//     });
//   });
// });
// app.post("/topic", (req, res) => {
//   const title = req.body.title;
//   const description = req.body.description;
//   fs.writeFile("data/" + title, description, (err) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     }
//     res.redirect("/topic/" + title);
//   });
// });
app.listen(3000, () => {
  console.log("Conneted, 3000 port");
});
