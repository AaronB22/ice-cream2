// Import the express module
import express from "express";

// Create an instance of an Express application
const app = express();

app.set('view engine', 'ejs')

// Define the port number where our server will listen
const PORT = 3011;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
const orders = [];



// Define a default "route" ('/')
app.get("/", (req, res) => {
  res.render('home');
});

app.post('/submit-order', (req, res) => {
  const params = {
    name: req.body.name,
    email: req.body.email,
    cone: req.body.cone,
    flavor: req.body.flavor,
    toppings: req.body.toppings,
    comment: req.body.comment,
    timestamp: new Date()
  }


  res.render('confirmation', { order })
})

app.get('/admin', async(req, res) => {
  try{
    const [orders]= await createPool.query('SELECT * FROM orders ORDER BY timestamp DESC');
    res.render('admin', { orders });
  } catch(err){
    console.error('Database error:', err);
    res.status(500).send('Error loading orders'+ err.message)
  }
});

app.get('/confirmation', (req, res) => {
  res.render('confirmation');
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
