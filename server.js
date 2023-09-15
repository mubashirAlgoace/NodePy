const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
// Define a route to send JSON data to Colab
app.post("/send-to-colab", async (req, res) => {
  try {
    const json_data = req.body;

    // URL of your Colab notebook
    const colabNotebookUrl =
      "https://colab.research.google.com/drive/1q5gpQiZf7507L2AJhewkcwO6B3whyBPP?usp=sharing"; // Replace with your Colab notebook URL

    // Send a POST request to Colab
    const colabResponse = await axios.post(colabNotebookUrl, {
      code: json_data,
    });

    // Process the response from Colab (assuming Colab returns JSON)
    const processed_data = colabResponse.data;

    // Send the processed data back to the client (Node.js server)
    res.json({ processed_data });
  } catch (error) {
    console.error("Error sending data to Colab:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending data to Colab." });
  }
});

app.listen(port, () => {
  console.log(`Node.js server is running on port ${port}`);
});
