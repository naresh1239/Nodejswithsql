const express = require('express');

const router = express.Router();

// Sample route
router.get('/', (req, res) => {
  res.send('Hello World! user');
});

module.exports = router;
  
//   // CREATE: Add a new user
//   router.post('/api/AddToDo', (req, res) => {
//       const { id, value,Date,Status } = req.body;
//       const query = 'INSERT INTO list_of_todo (id, value,Date,Status) VALUES (?, ?,?,?)';
//       db.query(query, [id, value,Date,Status], (err, result) => {
//         if (err) {
//           console.error('Error inserting data:', err);
//           res.status(500).send('Server error');
//           return;
//         }
//         res.status(201).send(`User added with ID: ${result.insertId}`);
//       });
//     });
    
//     // READ: Get all users
//     router.get('/api/getToDos', (req, res) => {
//       const query = 'SELECT * FROM list_of_todo';
//       db.query(query, (err, results) => {
//         if (err) {
//           console.error('Error fetching data:', err);
//           res.status(500).send('Server error');
//           return;
//         }
//         res.json(results);
//       });
//     });
  
  