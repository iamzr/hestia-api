const express = require("express");
const spawn = require("child_process").spawn;

const app = express();

app.get("/", (req, res) => {
  const pythonProcess = spawn("python3", ["./script.py"]);

  pythonProcess.stdout.on("data", (data) => {
    res.send(`<p>${data}</p>`);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
