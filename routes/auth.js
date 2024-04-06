
const express = require('express');
const router = express.Router();
const user = require('../models/users'); 
const bcrypt = require('bcrypt'); 



// Route de signup
router.post('/signup', async (req, res) => {
  const newFirstName = req.body.FirstName;
  const newLastName = req.body.LastName;
  const newCarType = req.body.CarType; 
  const newCarId = req.body.CarId; 
  const newPhoneNumber = req.body.PhoneNumber;
  const newEmail = req.body.email;
  const newPassword = req.body.password;
  const confirmPassword = req.body.confirmPassword; 
  const newUser = new user();

  if (!newFirstName || !newLastName || !newEmail || !newPhoneNumber || !newPassword || !confirmPassword) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  if (newPassword.length < 8) {
    return res.status(400).send({ message: 'Password must be at least 8 characters long' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).send({ message: 'Passwords do not match' });
  }


  const existingUser = await user.findOne({ email: newEmail });
  if (existingUser) {
    res.status(400).send("An account with this email address already exists");
    return; 
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(newPassword)) {
    return res.status(400).send({ message: 'The password must contain at least one uppercase letter, one lowercase letter, and one number' });
  }

   
  const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  newUser.FirstName = newFirstName;
  newUser.LastName = newLastName;
  newUser.CarType = newCarType; 
  newUser.CarId = newCarId; 
  newUser.PhoneNumber = newPhoneNumber;
  newUser.email = newEmail;
  newUser.password = hashedPassword;


try {
  await newUser.save();
  res.status(201).send({ message: 'Successful registration' });
} catch (error) {
  if (error.errors) {
    const validationErrors = Object.keys(error.errors).map(key => {
      return { field: key, message: error.errors[key].message };
    });
    res.status(400).send({ message: 'Failed validation', errors: validationErrors });
  } else {
    console.error(error);
    res.status(500).send({ message: 'Sign-up failed' });
  }
}
});




module.exports = router;
