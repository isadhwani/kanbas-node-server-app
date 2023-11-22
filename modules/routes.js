import db from "../Database/index.js";

function ModuleRoutes(app) {
    app.get("/api/modules", (req, res) => {
        const modules = db.modules;
        res.json(modules);
    });

    app.get("/api/courses/:cid/modules", (req, res) => {
        // console.log("getting modules for course ", req.params.cid)
        const { cid } = req.params;
        const modules = db.modules
            .filter((m) => m.course === cid);
        res.send(modules);
    });


    app.get("/api/modules/:id", (req, res) => {
        const { id } = req.params;
        const module = db.modules.find((module) => module._id === id);
        if (!module) {
            res.status(404).send("Module not found");
            return;
        }
        res.json(module);
    });

    app.delete("/api/modules/:mid", (req, res) => {
        console.log("deleting module with id ", req.params.mid);
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id !== mid);
        res.sendStatus(200);
    });


    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        console.log("adding module to course ", cid);
        console.log("module is ", req.body);
        const newModule = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        };
        db.modules.push(newModule);
        res.send(newModule);
    });


    app.put("/api/modules/:mid", (req, res) => {
        console.log("updating module ", req.params.mid + 
            " with ", JSON.stringify(req.body));
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex(
            (m) => m._id === mid);
        db.modules[moduleIndex] = {
            ...db.modules[moduleIndex],
            ...req.body
        };
        res.sendStatus(204);
    });

}

export default ModuleRoutes;