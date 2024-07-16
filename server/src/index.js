require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/github-token", async (req, res) => {
  try {
    const code = req.query.code;

    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          code,
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          redirect_uri: process.env.GITHUB_REDIRECT_URI,
        }),
      }
    );

    const data = await response.json();

    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error while getting github token", error });
  }
});

app.listen(port, () => {
  console.log(`server running on: http://localhost:${port}`);
});
