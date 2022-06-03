// Write your "projects" router here!
const Projects = require('./projects-model')
const express = require('express')
const router = express.Router()

const {validateProjectId, validateProject} = require('./projects-middleware')

router.get('/', (req, res) => {
    Projects.get()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        res.status(500).json({
            message: 'project fetch error'
        })
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.body.id)
})

router.post('/', validateProject, (req, res) => {
    const newProject = req.body
    Projects.insert(newProject)
    .then(project => {
        res.status(201).json(newProject)
    })
    .catch( err => {
        res.status(500).json({
            message: "there was an unknown error adding your project"
        })
    })
})

router.put('/:id', (req, res) => {
        if (req.body.completed == null || req.body.name == null || req.body.description == null){
            res.status(400).json({
                message: "missing field"
            })
            next()
        }
        Projects.update(req.params.id, req.body)
        .then((objt) => {
            res.status(200).json(objt)
        })
        .catch((err => {
            next(err)
        }))
})

router.delete('/:id', validateProjectId, (req, res, next) =>{
    Projects.remove(req.params.id)
    .then(next())
    .catch((err => {
        next(err)
    }))
})

router.get('/:id/actions', validateProjectId, async (req, res, next) =>{
Projects.getProjectActions(req.params.id)
.then((actions) => res.json(actions))
.catch((err) => next())
})

module.exports = router