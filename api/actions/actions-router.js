// Write your "actions" router here!

const express = require('express')

const router = express.Router()
const Actions = require('./actions-model')

const {
    validateActionId, validateAction
} = require('./actions-middlware')

router.get('/', (req, res, next) =>{
    Actions.get()
    .then((action) => {
        res.status(200).json(action)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
    Actions.get(req.params.id)
    .then(objt => {
        res.json(objt)
    })
    .catch((err) =>{
        next(err)
    })
})

router.post('/', validateAction, validateActionId, (req, res) =>{
    const newAction = req.body
    Actions.insert(newAction)
    .then(() =>{
        res.status(201).json(newAction)
    })
    .catch( err => {
        res.status(500).json({
            message: "there was an unknown error adding your action"
        })
    })
})

router.put('/:id', validateActionId, validateAction, async (req, res) => {
    const actionId = req.params.id
    const {notes, description, project_id, completed } = req.body
    const newAction = {notes, description, project_id, completed }
    const rez = await Actions.update(actionId, newAction)
    try {
        res.json(rez)
    }
    catch{
        next()
    }
})

router.delete('/:id', validateActionId, (req,res,next) => {
    Actions.remove(req.params.id)
    .then(res.json({message: 'action was successfully deleted'}))
    .catch()
})

module.exports = router