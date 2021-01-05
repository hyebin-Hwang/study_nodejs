const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const multer = require("multer");
const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "@@da8611zi",
  database: "review",
});

conn.connect();

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
app.set("views", "./views_mysql");
app.set("view engine", "jade");

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("userfile"), (req, res) => {
  res.send("Uploaded : " + req.file.filename);
});

app.post("/topic/add", (req, res) => {
  const cname = req.body.cname;
  const postingname = req.body.postingname;
  const category = req.body.category;
  sql = "insert into review (cname,postingname,category) value(?,?,?)";
  conn.query(sql, [cname, postingname, category], (err, result, fields) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/topic/" + result.insertId);
    }
  });
});

app.get("/topic/:id/edit", (req, res) => {
  let sql = "select * from review";
  conn.query(sql, (err, topics, fields) => {
    let rindex = req.params.id;
    if (rindex) {
      sql = "select * from review where rindex=?";
      conn.query(sql, [rindex], (err, topic, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.render("edit", {
            topics: topics,
            topic: topic[0],
          });
        }
      });
    } else {
      console.log("There is no id.");
    }
  });
});

app.post("/topic/:id/edit", (req, res) => {
  const cname = req.body.cname;
  const postingname = req.body.postingname;
  const category = req.body.category;
  let rindex = req.params.id;
  sql = "update review set cname=?,postingname=?,category=? where rindex=?";
  conn.query(sql, [cname, postingname, category, rindex], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/topic/" + rindex);
    }
  });
});

app.get("/topic/add", (req, res) => {
  let sql = "select * from review";
  conn.query(sql, (err, topics, fields) => {
    res.render("add", { topics: topics });
  });
});

app.get(["/topic", "/topic/:id"], (req, res) => {
  let sql = "select * from review";
  conn.query(sql, (err, topics, fields) => {
    let rindex = req.params.id;
    if (rindex) {
      sql = "select * from review where rindex=?";
      conn.query(sql, [rindex], (err, topic, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.render("view", {
            topics: topics,
            topic: topic[0],
          });
        }
      });
    } else {
      res.render("view", { topics: topics });
    }
  });
});

app.get("/topic/:id/delete", (req, res) => {
  let sql = "select * from review";
  let rindex = req.params.id;
  conn.query(sql, (err, topics, fields) => {
    sql = "select * from review where rindex=?";
    conn.query(sql, [rindex], (err, topic) => {
      if (err) {
        console.log(err);
      } else {
        if (topic.length === 0) {
          console.log("There is no id");
        } else {
          res.render("delete", { topics: topics, topic: topic[0] });
        }
      }
    });
  });
});

app.post("/topic/:id/delete", (req, res) => {
  rindex = req.params.id;
  sql = "delete from review where rindex=?";
  conn.query(sql, [rindex], (err, result) => {
    res.redirect("/topic");
  });
});

app.listen(3000, () => {
  console.log("Conneted, 3000 port");
});
