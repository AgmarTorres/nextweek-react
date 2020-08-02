import path from 'path'
import express, { response } from 'express'
import routes from './routes'
//Rota : Enderço complet da requisição
//Recurso: qual entidade estamos acessando do sistema
const app = express()

app.use(express.json())
app.use(routes)
app.use('/uploads', express.static(path.resolve(__dirname,'..','uploads')))

app.listen(3333, ()=>{
    console.log( 'Servidor funcionando!!!')
})