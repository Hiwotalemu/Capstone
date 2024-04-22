// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/my_app_db', { useNewUrlParser: true, useUnifiedTopology: true });

// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/api/login', async (req, res) => {
//   const { username, password } = req.body;

//   const user = await User.findOne({ username });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.status(200).json({ message: 'Login successful' });
//   } else {
//     res.status(401).json({ message: 'Invalid username or password' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// app.post('/api/register', async (req, res) => {
//   const { username, password } = req.body;

//   const existingUser = await User.findOne({ username });

//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = new User({ username, password: hashedPassword });

//   await newUser.save();
//   res.status(201).json({ message: 'User registered successfully' });
// });

