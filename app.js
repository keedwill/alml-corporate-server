require("dotenv").config();
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const hbs = require("express-handlebars");
const passport = require("passport");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./config/database");
const path = require("path");


const app = express();
// Creation of the middleware containing the response headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Access the API from any origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //Add headers to requests to the API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //Methods allowed
  next();
});
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(
//   session({
//     key: "user_sid",
//     secret: "user",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       expires: 600000,
//     },
//     store: new SequelizeStore({
//       db: db,
//     }),
//   })
// );

// app.use(flash());

//create global variables for flash messages
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash("success_msg");
//   res.locals.error_msg = req.flash("error_msg");
//   res.locals.error = req.flash("error");

//   next();
// });
//handlebars helpers

// const { formatDate, capitalizeFirst, eq } = require("./helpers/hbs");

// app.engine(
//   ".hbs",
//   hbs({
//     helpers: { formatDate, capitalizeFirst, eq },
//     extname: ".hbs",
//     // defaultLayout:"layout"
//   })
// );

// app.set("view engine", ".hbs");

//static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//     res.clearCookie("user_sid");
//   }
//   next();
// });

db.sync();

//VERSION 1 API ROUTES
app.use("/v1/api/user", require("./routes/v1/user"));
app.use("/v1/api/admin", require("./routes/v1/admin"));
// app.use("/", require("./routes/user"));
// app.use("/admin", require("./routes/admin"));
app.all("*", (req, res) => {
  res.status(404).send("Url does not exist");
});

// app.use((req, res, next) => {

//   res.status(404).send("Sorry Cant find the Url");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log("Express is running on port " + PORT);
});
