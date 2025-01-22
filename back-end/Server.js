const express = require("express");
const cors = require("cors");
const ConnectDb = require("./db.js");
const user = require("./Routes/UserRoute.js");
const admin = require("./Routes/AdminRoute.js");
const pizza = require("./Routes/PizzaRoute.js");
const order = require("./Routes/OrderRoutes.js");

require("dotenv").config();

const corsoption = {
  origin: process.env.APPLICATION_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

ConnectDb(); //Connect a data base

const app = express();
app.use(express.json());
app.use(cors(corsoption));
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/admin", admin);
app.use("/order", order);
app.use("/pizza", pizza);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server connect at ${PORT}`);
});
