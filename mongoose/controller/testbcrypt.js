const bcrypt = require("bcryptjs")

const hashedPassword =  bcrypt.hash("password", 10).then((data)=>console.log(data))
