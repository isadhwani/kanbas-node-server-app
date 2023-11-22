import Database from "../Database/index.js";

function CourseRoutes(app) {
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.json(courses);
    });
    
    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses.find((course) => course._id.$oid === id);
        if (!course) {
            res.status(404).send("Course not found");
            return;
        }
        res.json(course);
    });

    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        console.log("deleting course with id ", JSON.stringify(id));
        Database.courses = Database.courses
          .filter((c) => c._id.$oid  !== id);
        res.sendStatus(204);
      });

    

    app.post("/api/courses", (req, res) => {
        const newCourse = {
            ...req.body,
            _id: new Date().getTime().toString(),
        };
        Database.courses.unshift(newCourse);
        res.json(newCourse);
    });
    
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        //console.log("puttting course in DB ", course, "with id ", JSON.stringify(id)); 
        Database.courses = Database.courses.map((c) =>
          c._id.$oid === id ? { c, ...course } : c
        );
        // res.sendStatus(204);
        res.json(course);
      });

    
    
}

export default CourseRoutes;