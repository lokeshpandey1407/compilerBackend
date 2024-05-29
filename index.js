import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.send("Welcome");
});

app.post("/api/compile", (req, res, next) => {
  let code = req.body.code;
  let language = req.body.language;
  const url = "https://api.jdoodle.com/v1/execute";
  let data = {
    script: code,
    language: language,
    versionIndex: "0",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  };
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post(url, data, config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.listen(3001, () => {
  console.log("Server is listening at port 3001");
});
