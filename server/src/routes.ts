import express from 'express'
import knex from './database/connection'
import PointsController from './controllers/PointsController'
import ItemsController from './controllers/ItemsController'

const routes = express.Router()
const pointsController = new PointsController()
const itemsController = new ItemsController()

routes.post('/points', pointsController.create)
routes.get('/points', pointsController.index)

routes.get('/items', itemsController.index)

routes.get('/points/:id', pointsController.show)

/*
routes.get('/items', async (req, res) =>{
    const items = await knex('items').select('*')
    const serializedItems = items.map( item => {
        return { 
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/`+item.image
        }
    })
    res.json(serializedItems)
 })
*/
/*
 routes.post('/points', async (req, res) =>{
    const {name, email, whatsapp, latitude, longitude, city, uf, items} = req.body

    const trx = await knex.transaction()
    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    })

    const point_id = insertedIds[0]
    const pointItems = items.map(( item_id: number) =>{
        return {
            item_id,
            point_id
        }
    })
    
    await trx('point_items').insert(pointItems)
    return res.json('ok')
})
*/
 export default routes