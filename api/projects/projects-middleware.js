// add middlewares here related to projects
const Projects = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
       const projectId = await Projects.get(req.params.id)
       if(!projectId) {
           res.status(404).json({
               message: 'Project ID not found'
           })
       } else {
           req.body.id = projectId
           next()
       } 
    } catch (err) {
       next(err)
    }
}

function validateProject(req, res, next) {
    const { name, description, completed } = req.body
    if ((!(name && description)) || (!(name.trim() && description.trim()))) {
        res.status(400).json({
            message: "missing name or description"
        })
    } else {
        req.name = name.trim()
        req.description = description.trim()
        req.completed
        next()
    }
}

module.exports = {validateProjectId, validateProject}