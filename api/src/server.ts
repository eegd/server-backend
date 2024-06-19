import express from "express";

const app = express();

app.use((req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("server is running in port 3000");
});
