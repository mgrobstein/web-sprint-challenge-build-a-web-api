// add middlewares here related to actions

const Actions = require('./actions-model')

async function validateActionId(req, res, next) {
    try {
       const actionId = await Actions.get(req.params.id)
       if(!actionId) {
           res.status(404).json({
               message: 'Action ID not found'
           })
       } else {
           req.body.id = projectId
           next()
       } 
    } catch (err) {
       res.status(500)
       next()
    }
}

function validateAction(req, res, next) {
    const { project_id, notes, description } = req.body
    if ((!(project_id && notes && description)) || (!(notes.trim() && description.trim()))) {
        res.status(400).json({
            message: "missing notes or description"
        })
    } else {
        project_id
        req.notes = notes.trim()
        req.description = description.trim()
        next()
    }
}

module.exports = {validateActionId, validateAction}