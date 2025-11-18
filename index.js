const express = require('express');
const app = express();
const port = process.env.PORT || 3600;
const ejs = require('ejs');
app.set('view engine', 'ejs');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MongoDB_URI = 'mongodb+srv://feranmiayodeji24_db_user:NcNgltKGtddb76Yq@positivemind1.nyrmxeh.mongodb.net/Signup?retryWrites=true&w=majority'

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(MongoDB_URI)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.log('You are not connected', err);
    });

// const userSchema = new mongoose.Schema({
//     firstname: {
//         type: String,
//         // required: [true, 'firstname is required'],
//         // match: [/^[A-Za-z]+$/, 'Please enter a valid firstname'],
//         trim: true,
//     },
//     lastname: {
//         type: String,
//         // required: [true, 'lastname is required'],
//         // match: [/^[A-Za-z]+$/, 'Please enter a valid lastname'],
//         trim: true,
//     },
//     email: {
//         type: String,
//         // required: [true, 'email is required'],
//         unique: [true, 'email already exists'],
//         // match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
//         trim: true,
//         lowercase: true,
//     },
//     password: {
//         type: String,
//         required: [true, 'password is required'],
//     },
// });

// const User = mongoose.model('User', userSchema);


// app.post('/signup', (req, res) => {
//     const { firstname, lastname, email, password } = req.body;

//     //   const strongPasswordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
//     //   if (!strongPasswordRegex.test(password)) {
//     //     return res.status(400).send(
//     //       "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit"
//     //     );
//     //   }

//     User.findOne({ email })
//         .then((existingUser) => {
//             if (existingUser) {
//                 res.status(400).send('Email already exists');
//                 return Promise.reject('user already exists');
//             }
//             const saltRounds = 10;
//             return bcrypt.hash(password, saltRounds);
//         })
//         .then((hashedPassword) => {
//             if (!hashedPassword) return;
//             const newUser = new User({
//                 firstname,
//                 lastname,
//                 email,
//                 password: hashedPassword,
//             });
//             return newUser.save();
//         })
//         .then((savedUser) => {
//             if (!savedUser) return;
//             console.log('User registered successfully');

//             let transporter = nodemailer.createTransport({
//                 service: 'gmail',
//                 auth: {
//                     user: 'israeloye2019@gmail.com',
//                     pass: 'zuegcnabukvzyziz'
//                 }
//             })
//             let mailOptions = {
//                 from: 'israeloye2019@gmail.com',
//                 to: [req.body.email],
//                 subject: 'Welcome to our Application',
//                 html: `
//         <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
//             <h1 style="color: #4CAF50;">Welcome to Light Tracker!</h1>
//             <p>Hi <strong>${firstname} ${lastname}</strong>,</p>
//             <p>Thank you for signing up for our application. We are thrilled to have you on board!</p>
//             <p>Here are some quick links to get you started:</p>
//             <ul>
//             <li><a href="http://localhost:${port}/signin" style="color: #4CAF50; text-decoration: none;">Sign In</a></li>
//             <li><a href="http://localhost:${port}/dashboard" style="color: #4CAF50; text-decoration: none;">Visit Dashboard</a></li>
//             </ul>
//             <p>If you have any questions, feel free to reply to this email. We're here to help!</p>
//             <p>Best regards,</p>
//             <p>The Light Tracker Team</p>
//             <footer style="margin-top: 20px; font-size: 12px; color: #777;">
//             <p>You are receiving this email because you signed up for Light Tracker.</p>
//             <p>&copy; 2025 Light Tracker. All rights reserved.</p>
//             </footer>
//         </div>
//         `
//             }
//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     console.log('Email sent:' + info.response)
//                 }
//             });
//             res.redirect('/signin');
//         })
//         .catch((err) => {
//             if (err !== 'user already exists') {
//                 console.log('Error saving user:', err);
//                 res.status(500).send('Internal server error');
//             }
//         });
// });




// app.post('/signin', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).send('Invalid email or password');
//         }

//         const match = await bcrypt.compare(password, user.password);
//         if (!match) {
//             return res.status(400).send('Invalid email or password');
//         }

//         res.redirect('/dashboard');
//     } catch (err) {
//         console.error('Login error:', err);
//         res.status(500).send('Internal server error');
//     }
// });



const userRoutes = require('./routes/users.routes')
const cors = require('cors')
app.use(cors ({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE','PATCH'],
    credentials:true
}))

app.use('/user', userRoutes)

app.get('/', (req, res) => {
    res.send('hello world, this is working. Good now we can proceed!');
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard', { title: 'Dashboard' });
});



app.listen(port, (err) => {
    if (err) {
        console.log('not active');
    } else {
        console.log(`Server active on port ${port}`);
    }
});