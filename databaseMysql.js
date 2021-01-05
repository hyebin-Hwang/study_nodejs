const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "@@da8611zi",
  database: "review",
});

conn.connect();

// let sql = "select * from review";
// conn.query(sql, function (err, rows, fields) {
//   if (err) {
//     console.log(err);
//   }
//   rows.map((item) => console.log(item));
// });
// const sql =
//   "insert into review (rindex,category,postingname,cname) values(?,?,?,?)";
// const params = ["5", "앨범", "맥밀러는쩐당", "맥밀러"];

// conn.query(sql, params, function (err, rows, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });

// const sql =
//   "update review set category=?, postingname=?,cname=? where rindex=?";
// const param = ["영화", "바람은재밋다", "바람", "4"];
// conn.query(sql, param, function (err, rows, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });
// const sql = "delete from review where rindex=?";
// const param = [5];
// conn.query(sql, param, function (err, rows, fields) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(rows);
// });
const sql = "select * from review";
conn.query(sql, (err, rows, fields) => {
  if (err) {
    console.log(err);
  }
  console.log(rows);
});

conn.end();
