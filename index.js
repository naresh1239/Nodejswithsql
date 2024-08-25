require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const path = require('path')
const cors = require('cors');
const db = require('./views/DBConnection')
const userRouter = require("./routes/user")
const apiRouter = require("./routes/api")
const app = express();
const bcrypt = require('bcryptjs');
const port = process.env.PORT || 3000;
const ejs = require('ejs');
const {hashPassword,comparePassword} = require("./controllers/hashpass")


app.set('view engine', 'ejs');

// Set the directory where your EJS files are located
app.set('views', path.join(__dirname, 'views'));
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors()); 
app.use("/user", userRouter)
app.use("/api", apiRouter)

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/signup', (req, res) => {
  res.render('Signup')
});
app.get('/login', (req, res) => {
  res.render('Login')
});

app.use(express.urlencoded({ extended: true }));

app.post("/postSignup", async (req,res)=>{
  const { name, email,password } = req.body;
   if(!name,!email,!password){
    return res.end('error all fields missing')
   }

   const user = 'SELECT email FROM users where email = ?'
   const query = 'INSERT INTO users (name, email,password) VALUES (?, ?, ?)';
   const hashedPassword = await hashPassword(password);;
   db.query(user, [email],(err,result)=>{
    if(err){
      console.log(err)
    }
    if(result){
      if(result.length > 0){
       return res.end('user exits alerdy')
      }
      if(!hashedPassword){
        return res.send("someting wend worgn")
      }
      db.query(query, [name, email,hashedPassword], (err, results) => {
        if (err) {
            console.error('Error inserting data: ', err);
            return res.status(500).send('Error inserting data');
        }
        if(results){
          res.redirect('login');
        }
       });
    }
   })
});

app.post("/postlogin",(req,res)=>{
  const { email,password } = req.body;
   if(!email,!password){
    return res.end('error all fields missing')
   }

   const user = 'SELECT password FROM users where email = ? '
 

   db.query(user, [email], async(err,result)=>{
    if(err){
      console.log(err)
    }
    if(result){
      if(result.length > 0){
        console.log(result)
         const match = await comparePassword(password, result[0].password);
         if(!match){
          return res.send('email of password wrogn')
         }
        res.redirect('Home')
      }
    } else {
      res.send('User not found');
    }
   })

});


app.get("/home",(req,res)=>{
  res.render('Home')
})
// CREATE: Add a new user
app.post('/api/AddToDo', (req, res) => {
    const { id, value,Date,Status } = req.body;
    const query = 'INSERT INTO list_of_todo (id, value,Date,Status) VALUES (?, ?,?,?)';
    db.query(query, [id, value,Date,Status], (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });
  
  // READ: Get all users
  app.get('/api/getToDos', (req, res) => {
    const query = 'SELECT * FROM list_of_todo';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Server error');
        return;
      }
      res.json(results);
    });
  });


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
