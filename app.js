const express=require('express')
const axios=require('axios')
require('dotenv').config()
const app=express()
const port=8080;
const API_KEY=process.env.API_KEY

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine','ejs')

app.get("/",(req,res)=>{
res.render("index",{data:null});
})

app.post("/showInfo",(req,res)=>{
const cityName=req.body.city
const url=`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
axios.get(url)
.then(response=>{
const data=response.data
console.log(data.weather.main)
res.render('index',{data})
})
.catch((err)=>{
console.log(err);
res.status(500).send('Error Occured')
})
})

app.listen(port,()=>{
console.log(`Server is ready to accept request at port ${port}`)
})