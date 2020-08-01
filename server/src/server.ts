import express, { response } from 'express'

//Rota : Enderço complet da requisição
//Recurso: qual entidade estamos acessando do sistema
const app = express()

app.use(express.json())


const users = [
    'Agmar',
    'Torres',
    'Teste',
    'rr'
]



app.get('/users', (req, res) =>{
    const search = String(req.query.search)
    const filteredUser = search ? users.filter( user => user.includes(search)) : users
    
    res.json(filteredUser)

})


app.post('/users', (req, res) =>{
    const data = req.body
    const user = { name: data.name, email: data.email}
   // console.log("teste")
    return res.json(user)
})

app.get('/users/:id', (req, res) =>{
    const id = Number(req.params.id)
    const user = users[id]
    return res.json(user)
})

app.listen(3333, ()=>{
    console.log( 'Servidor funcionando!!!')
})