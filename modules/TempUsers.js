//Encryption
const bcrypt = require("bcryptjs")

let users = [] 

function addUser(userData) {
    return new Promise((resolve, reject) => {
        let foundUser = users.find(user => userData.username == user.username)

        if(foundUser) {
            reject("User Already exists")
        } else {
            //if password and confirm password match
            if (userData.password == userData.password2) {
                bcrypt.hash(userData.password, 10).then(password=> {
                    let {username, email} = userData
                    users.push({
                        username, email, password
                    })
                    console.log(users)
                    resolve()
                }).catch(err=>{
                    reject("error hashing password")
                })
            } else {
                reject("Passwords don't match")
            }
        }
    })
}

function checkUser(userData) {
    return new Promise((resolve, reject) => {
        let foundUser = users.find(user => userData.username == user.username)

        if(foundUser) {
            //if password and confirm password match
                bcrypt.compare(userData.password, foundUser.password).then(match=> {
                if(match) {
                    resolve()
                } else {
                    reject("error hashing password")
                }
        }).catch(err=> {
            reject("unable to validate password")
        })
            } else {
                reject("User not found")
            }
        })
}

module.exports = {addUser, checkUser}