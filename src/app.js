// when we use index.html name in html file
// it is considered as the defult home page
// by the express, we do not need a GET route to index.html file
// it will be already served at base url

// While running nodemon using flag "-e" and
// giving file extensions by separted by comma like this  "-e js,hbs"
// it will look for all extn files for changes and restart server

// requiring modules and files we created
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/weather");
// const dotenv = require("dotenv");
// dotenv.config();

// setting up port value
const port = process.env.PORT || 5000;

// setting up the express app
const app = express();

//setting up path for express config
const public_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

// setting up paths for serving files
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

// setting up express static file path
app.use(express.static(public_path));

app.get("", (req, res) => {
    res.render("index", {
        title: "Home",
        name: "Dhaval Changani",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        name: "Dhaval Changani",
        helptext: "we will help all.",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Dhaval Changani",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address.",
        });
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send(error);
        }

        forecast(longitude, latitude, (error, data) => {
            if (error) {
                return res.send(error);
            }
            res.send({
                givenLocation: req.query.address,
                location,
                forecast: data,
            });
        });
    });
});

app.listen(port, (req, res) => {
    console.log(`http://localhost:${port}`);
});
