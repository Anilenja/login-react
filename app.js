const express = require('express');
const app = express();
const db = require('./src/config/database');
const authRoutes = require('./src/routes/authRoutes');
const path = require('path');

app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'src/views')); // Set the 'views' directory


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (like CSS) if needed
app.use(express.static('public'));

app.use('/auth', authRoutes);
// Routes to render signup and login pages
app.get('/', (req, res) => {
  res.render('index'); // Assuming 'index.ejs' contains the buttons or links
});
app.get('/signup', (req, res) => {
  res.render('signup'); // Assuming 'index.ejs' contains the buttons or links
});
app.get('/login', (req, res) => {
  res.render('login'); // Assuming 'index.ejs' contains the buttons or links
});


const PORT = process.env.PORT || 3000;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
