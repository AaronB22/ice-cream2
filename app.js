// Import the express module
import express from "express";

// Create an instance of an Express application
const app = express();

app.set('view engine', 'ejs')

// Define the port number where our server will listen
const PORT = 3010;

app.use(express.static('public'));



// Define a default "route" ('/')
app.get("/", (req, res) => {
  res.render('home');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
