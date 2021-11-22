
const express = require('express'); 
const app = express();


app.set("view engine", "ejs");
app.set("views", __dirname + '/views')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname +"/public"));

// data
let fruits = [ 
    {name: "tomato", color: "red", shape: "rounded"}, 
    {name: "carrots", color: "orange", shape: "stretch"}, 
    {name: "eggplant", color: "violet", shape: "rounded-longue"}, 
];

function getWeather(req, res, next) {
    req.visitorWeatherRaining = true;
    next();
}

app.get('/', getWeather , (req, res) => {
    res.render('home', {
        isRaining: req.visitorWeatherRaining,
        fruits,
    })
});

app.get('/about', (req, res) => {
    res.send("Welcome to About page")
});

app.get('/help', (req, res) => {
    res.send("Welcome to Help page")
});

app.post('/result', (req, res) => {
    if(req.body.color === "blue") {
        res.send(`<h2> Your response is ${req.body.color}: Correct !</h2> `);
    } else {
        res.send(`<h2>Tomorrow will be a better day !</h2> `);
    }
});

app.get('/api/vegetables', (req, res) => {
    res.json({fruits})
});
    
app.listen(3000, () => {
    console.log('Server running on port 3000')
});