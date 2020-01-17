const actionModel = require("../helpers/actionModel");
const projectModel = require("../helpers/projectModel");



// project validation
function validateProject(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "Missing name" });
    } else {
      next();
    }
  }


// action validation
function validateAction(req, res, next) {
    if (req.body) {
      res.status(400).json({
        error: "Missing required field"
      });
    } else {
      next();
    }
  }



// project ID validation
function validateProjectID(req, res, next) {
  const id = req.params.id
  projectModel.get(id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ error: `Project not found` });
      }
    })
    .catch(err => res.status(500).json(Error_Message));
}

// action ID validation  
function validateActionID(req, res, next) {
    const id = req.params.id
    actionModel.get(id)
      .then(action => {
        if (action) {
          req.action = action;
          next();
        } else {
          res.status(404).json({ error: `Action not found` });
        }
      })
      .catch(err =>
        res.status(500).json("Error getting action")
      );
  }


  module.exports = { validateAction, validateProject, validateProjectID, validateActionID} 