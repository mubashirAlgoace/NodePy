// Code for testing node + python
const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;

app.use(express.json());

// Route to trigger the AI processing in Python
app.post("/process", (req, res) => {
  // Input data to send to the Python script
  const inputData = req.body;

  // Replace 'python3' with 'python' if needed, depending on your Python version
  const pythonProcess = spawn("python", [
    "ai_processing.py",
    JSON.stringify(inputData),
  ]);

  pythonProcess.stdout.on("data", (data) => {
    // Process the data returned by the Python script (assuming it's JSON)
    const result = JSON.parse(data);
    res.json({ result });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Error from Python script: ${data}`);
    res.status(500).json({ error: "An error occurred in the Python script." });
  });

  pythonProcess.on("close", (code) => {
    if (code !== 0) {
      console.error(`Python script exited with code ${code}`);
      res
        .status(500)
        .json({ error: "An error occurred in the Python script." });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
