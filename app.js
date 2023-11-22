import Lab5 from "./lab5.js";
import cors from "cors";
import express from "express";
import CourseRoutes from "./modules/routes.js";
import ModuleRoutes from "./courses/routes.js";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
Lab5(app);
CourseRoutes(app);
ModuleRoutes(app);

app.listen(process.env.PORT || 4000);


