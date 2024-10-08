import 'dotenv/config'
import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import mainRouter from "./server/routes/main.js";
import adminRouter from "./server/routes/admin.js";
import connectDB from "./server/config/db.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import session from "express-session";
import methodOverride from 'method-override'

const app = express();
const PORT = 8000 || process.env.PORT;

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(methodOverride('_method'))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
}))
// connect to DB
connectDB();

app.use(express.static("public"));

// Templating Engine
app.use(expressEjsLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.use("/", mainRouter);
app.use("/", adminRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
