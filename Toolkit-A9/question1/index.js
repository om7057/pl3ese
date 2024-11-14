// Import MySQL2 module
const mysql = require('mysql2');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',  // Database host (for local MySQL use 'localhost')
    user: 'root',       // Your MySQL username
    password: 'Om7249@123', // Replace with your MySQL password
    database: 'example_db'  // Make sure this matches your database name
  });
  

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database!');
});

// Query the 'users' table to fetch data
connection.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error fetching data:', err.stack);
      return;
    }
  
    // Display the results
    console.log('Data retrieved from the users table:');
    console.log(results);  // This should display the actual data
  });

  
// Close the database connection
connection.end();
