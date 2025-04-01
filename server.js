const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const app = express();
const tempUsers = require("./modules/TempUsers")

const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 4433;

app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: false}))

app.get('/', (req, res) => {
  res.redirect("/register")
});

app.get("/login", (req, res) => {
    res.render("login", {errorMsg: ""})
})

app.post("/login", (req, res) => {
    tempUsers.checkUser(req.body).then(() => {
        res.render("message", {message: "login successful!"})
    }).catch(err => {
        res.render("login", {errorMsg: err})
    })
})

app.get("/register", (req, res) => {
    res.render("register", {errorMsg: ""})
})

app.post("/register", (req, res) => {
    tempUsers.addUser(req.body).then(() => {
        res.render("message", {message: "registration successful!"})
    }).catch(err => {
        res.render("register", {errorMsg: err})
    })
})

app.use((req, res) => {
    res.status(404).render("404")
})

// read in the contents of the HTTPS certificate and key

const https_options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt'),
};

// listen on ports HTTP_PORT and HTTPS_PORT.

http.createServer(app).listen(HTTP_PORT, () => {
  console.log(`http server listening on: ${HTTP_PORT}`);
});
https.createServer(https_options, app).listen(HTTPS_PORT, () => {
  console.log(`https server listening on: ${HTTPS_PORT}`);
});