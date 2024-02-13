const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")

const UserRoute = require("./routes/users")
const cors = require("cors")
const app = express();
const postRoute = require("./routes/posts")
const CommentRoute = require("./routes/comments");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
//middleware
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",UserRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",CommentRoute)

//image upload
const storage = multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.img)
        //fn(null,"brother-logo.png")
    }
}) 

const upload = multer({storage:storage})
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has been successfully uploaded");
});



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to database Successfully")
}).then(()=>{
    app.listen(process.env.port)
}).catch((err)=>{
    console.log(err)
})
//MIZ7Wu1AN6vBrTxk