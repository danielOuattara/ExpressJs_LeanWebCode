
const express = require('express');

const app = express();

app.use(express.json());  //middleware

app.use(express.urlencoded({extended: false}))  //middleware

// custom middleware 
function getWeather(req, res, next) {
    req.visitorWeatherRaining = true;
    next();
}


app.get('/', getWeather , (req, res) => {
    console.log(req)
    res.send(`
        <h1> What is the color of th sky today ? </h1>
        
        <form action="/result" method="POST">
            <label for='name'> Color of the sky ? :&nbsp;
                <input type='text' name='color'/></br>
                <input type='submit' value='Submit Answer'/>
            </label>
        </form>
        <p>${req.visitorWeatherRaining ? 'It is raining' : 'It is not raining'}</p>
    `);
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
    

app.listen(3000, () => {
    console.log('Server running on port 3000')
});