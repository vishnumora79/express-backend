
// // Vishnu - This is a practice code which you typed from harkirth singh blogs
// const express = require('express')
// // creating an express object
// const app = express()
// const port = 3000


// const USERS = [];

// const QUESTIONS = [
//     {
//         title : "max element",
//         description : "Given an array, return the maximum element of array",
//         testCases : [
//             {
//                 input : "[1,2,3,4,5]",
//                 ouptut : "5"
//             }
//         ] 
//     }
// ]

// const SUBMISSIONS = [
//     {
//         userId : "1",
//         questionId : "1",
//         code : "function max(arr) { return Math.max(...arr) }",
//         status : "accepted"
//     },
//     {
//         userId : "1",
//         questionId : "1",
//         code : "function max(arr) { return Math.max(...arr) }"
//     }
// ]
// app.get('/mv', (req, res) => {
//   res.send('<h1 style = "color : blue"> this is the starting point </h1>')
// })

// app.post("/signup", function(req,res) {
//     // Add logic to decode body
//     // Body should have mail and password

//     // Store email and password in the USERS array above(only with the given email doesn't exists)
//     res.send("This is going to me the signup page")
//     // return the 200 status code to client
// })

// app.post("/login", function(req,res) {
//      // Add logic to decode body
//     // Body should have mail and password

//     // Check if the user with the given email exists in the USERS array
//     // Also ensure that the password is the same


//     // If the password is the same, return back 200 status code to the client
//     // Also send back a token(any random string will work for now)
//     // If the password is not the same, return back 401 status code to the  client
//     res.send("This is going to be the login page")
// })

// app.get("/questions", function(req,res) {
//     // return the user all the questions in the QUESTIONS array
//     res.send("This page is dedicated for displaying questions")
// })

// app.get("/submissions", function(req,res) {
//     // return the user submissions for this problem
//     res.send("This is the submissions page")
// })

// app.post("/submissions",function(req,res) {
//     // let the user submit a problem, randomly accept or reject the solution
//     // store the submissions in the SUBMISSIONS array above
// })
// // starts the HTTP server
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })


const express = require("express");

const app  = express();

const port = 3000;

var jwt = require("jsonwebtoken");

const { auth } = require("./middleware");

let USER_ID_COUNTER = 1;
const USERS = [];
const JWT_SECRET = "secret";
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended : false});
const cors = require("cors");
app.use(cors());
app.use(jsonParser);

// Root route
app.get("/", (req, res) => {
    res.send("Hello i am MERN!");
});


// Sign - Up
app.post("/signup", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    if(USERS.find((x) => x.email === email)) 
          return res.status(403).json({msg : "Email already exists"});
    
    USERS.push( {
        email,
        password,
        id : USER_ID_COUNTER++
    });

    return res.json({
        msg : "Success"
    });

});

// Login 

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = USERS.find((x) => x.email === email);

    if(!user) {
        return req.status(403).json({msg: "User not found"});
    }

    if(user.password !== password) {
        return res.status(403).json({msg : "Incorrect password"});
    }

    const token = jwt.sign(
        {
            id : user.id
        },
        JWT_SECRET
    );

    return res.json({token});
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
