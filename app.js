// Import the express module
import express from "express";
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create an instance of an Express application
const app = express();

app.set('view engine', 'ejs')

// Define the port number where our server will listen
const PORT = 3011;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))


const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

app.get('/db-test', async (req, res) => {
  try {
    const orders = await pool.query('SELECT * FROM orders');
    res.send(orders[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error' + err.message);
  }
})

// Define a default "route" ('/')
app.get("/", (req, res) => {
  res.render('home');
});

app.post('/submit-order', async(req, res) => {
  try{
    const order=req.body;
    console.log('New order submittted:', order);
    order.toppings= Array.isArray(order.toppings) ?
    order.toppings.join(",") : "";
    const params = [
      order.name,
      order.email,
      order.flavor,
      order.cone,
      order.toppings
    ]
    const sql = `INSERT INTO orders(customer, email,flavor,cone,toppings)
                  values (?,?,?,?,?);`;

    const result= await pool.execute(sql, params);
    console.log(result)
  
    res.render('confirmation', { order })

  }
  catch(err){
    console.error(err)
    res.status(500).send('Sorry, there was an error processing your order. Please try again')
  }
})

app.get('/admin', async(req, res) => {
  try{
    const [orders]= await pool.query('SELECT * FROM orders ORDER BY timestamp DESC');
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
})
