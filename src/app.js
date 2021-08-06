const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { response } = require("express");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jesse Valley",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Jesse Valley",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    text: "How can I help you?",
    title: "Help",
    name: "Jesse Valley",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  let address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: data,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term.",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    error: "Help article not found",
    title: "404",
    name: "Jesse Valley",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    title: "404",
    name: "Jesse Valley",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
