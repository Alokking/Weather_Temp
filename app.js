const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.render("list1");
    
}); 

app.post("/", function(req,res){

    var query = req.body.cityName;
    const apiKey = "77232fef4a7cdc23733f79c24c15ea7e"
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+ unit; 
    
    https.get(url,function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            var temp = weatherData.main.temp;
            var weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            // const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const show1 = "The temperature in "+query+" is "+ temp +" deg C";
            const show2 = "The weather is currently " + weatherDescription;
            res.render("list", {show1: show1, show2: show2});

        });
    });
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});