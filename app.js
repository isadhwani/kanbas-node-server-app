import Lab5 from "./lab5.js";
import cors from "cors";
import express from "express";
import CourseRoutes from "./modules/routes.js";
import ModuleRoutes from "./courses/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

const app = express();
app.use(
 cors({
   credentials: true,
   origin: "http://localhost:3000",
 })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  app.use(
    session(sessionOptions)
  );
  

mongoose.connect("mongodb://127.0.0.1:27017/kanbas");

app.use(express.json());
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);


app.listen(process.env.PORT || 4000);


