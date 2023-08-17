const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

//retrieving the persons array contents
app.get('/api/persons', (request, response) => {
    response.json(persons)
})

//single person details
app.get('/api/persons/:id', (request, response) =>{
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
})

//auto-generate id for the newly added person
const generateId = () => {
  const maxId = persons.length > 0
  ? Math.max(...persons.map(n => n.id))
  : 0
  return maxId + 1
}

//adding a new person's info
app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const person = {
    content: body.content,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(note)
})

//displaying the time the request was received
app.get('/info', (request, response) => {
    const currenTime = new Date().toString()
    const numEntries = persons.length

    const infoDetails = `
    <div>
    <p>Phonebook has info for ${numEntries} people</p>
    <p>${currenTime}</p>
    </div>
    `
    response.send(infoDetails)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  response.status(2004).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})