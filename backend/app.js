const express=require ('express');
const bodyParser=require ('body-parser');
const path=require('path');
const postsRoutes= require("./routes/posts");
const userRoutes= require("./routes/user");
const mongoose=require ('mongoose');


const app=express();


mongoose.connect("mongodb+srv://swatijha98:" + process.env.MONGO_ATLAS_PW + "@cluster0-nucqi.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true }).then(() => {
	console.log('connected to mongodb');
}).catch(error => {
	console.log(error);
});





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/images", express.static(path.join("images")));

app.use((req,res,next)=>{
	
	res.setHeader("Access-Control-Allow-Origin","*");
	res.setHeader("Access-Control-Allow-Headers",
	"Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.setHeader("Access-Control-Allow-Methods",
	"GET, POST, PATCH, PUT, DELETE, OPTIONS");
	next();
});

app.use("/api/posts",postsRoutes);
app.use("/api/user",userRoutes);

module.exports=app;