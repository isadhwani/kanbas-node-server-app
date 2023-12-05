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
        origin: process.env.FRONTEND_URL
    })
);

const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));



const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;// || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

app.use(express.json());
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);
UserRoutes(app);


app.listen(process.env.PORT || 4000);


