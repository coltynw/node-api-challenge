const router = require("express").Router();

const actionModel = require("../helpers/actionModel");
const middleware = require("../middleware/middleware");


// get
router.get("/", (req, res) => {
    actionModel.get()
        .then(actions => res.status(200).json(actions))
        .catch(error => res.status(400).json("couldn't get actions"));
});

// middleware
router.get("/:id", middleware.validateActionID, (req, res) => {
    res.status(200).json(req.action);
});

// insert
router.post("/", middleware.validateProjectID, middleware.validateAction, (req, res) => {
    actionModel.insert(req.body)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json("Could not get actions"));
});




// updates id
router.put("/:id", middleware.validateActionID, middleware.validateAction, (req, res) => {
    actionModel.update(req.params.id, req.body)
        .then(action => res.status(200).json({ message: `Action ${id} has been updated` }))
        .catch(err => res.status(500).json("could not update actions"));
});



// checks if id exists then deletes id
router.delete("/:id", middleware.validateActionID, (req, res) => {
    actionModel.remove(req.params.id)
        .then(action => {
            res.status(202).json({ message: `Action ${id} has been removed` })
        })
        .catch(err => res.status(500).json({ error: "could not delete that action" })
        );
});




module.exports = router; 