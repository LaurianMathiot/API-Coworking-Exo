const coworkings = require('./mock-coworkings')
const mockCoworkings = require('./mock-coworkings')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.get('/api/coworkings/:id', (req, res) => {
    let foundCoworking = coworkings.find(element => element.id === parseInt(req.params.id))

    if(foundCoworking) {
        res.json({message:`Le coworking avec l'id ${foundCoworking.id} a bien été récupéré`, data:foundCoworking})
    } else {
        res.json({result:`Le coworking avec l'id ${req.params.id} n'existe pas`})
    }
})

app.get('/api/coworkings', (req, res) => {
    const criterium = req.query.criterium || 'capacity'
    const orderBy = req.query.orderBy || 'ASC'
    const nosort = req.query.nosort

    if (!nosort && (orderBy === 'ASC' || orderBy === 'DESC') && (criterium === 'superficy' || criterium ==='capacity')){
        mockCoworkings.sort((a, b) => {
            if(criterium === 'capacity' || criterium === 'superficy'){
                return orderBy === 'ASC' ? a[criterium] - b[criterium] : b[criterium] - a[criterium]
            }
        })
    }
    res.json({message: `Voilà la liste des coworkings`, data: mockCoworkings})
})

app.post('/api/coworkings', (req, res) => {
    const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    const newCoworking = {id: newId, ...req.body}
    mockCoworkings.push(newCoworking)
    return res.json({message:`Un nouveau coworking n°${newCoworking.id} a été créé`, data:newCoworking})
})

app.put('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })
    
    if(indexInArray === -1) {
        return res.json({message: `Le coworking avec l'id ${req.params.id} n'existe pas`})
    } else {
        let updatedCoworking = {...mockCoworkings[indexInArray], ...req.body} 
        mockCoworkings[indexInArray] = updatedCoworking
        return res.json({message: `Le coworking ${updatedCoworking.name} a été modifié`, data: updatedCoworking})
    }

})

app.delete('/api/coworkings/:id', (req, res) => {
    const indexInArray = mockCoworkings.findIndex((element) => {
        return element.id === parseInt(req.params.id)
    })

    if(indexInArray === -1){
        return res.json({message: `L'id ${req.params.id} ne correspond à aucun élément`})
    } else {
        mockCoworkings.splice(indexInArray, 1)
        return res.json({message: `Le coworking avec l'id ${req.params.id} a été supprimé`, data: mockCoworkings})
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})