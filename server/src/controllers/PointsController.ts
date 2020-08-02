import{Request, Response, response } from 'express'
import knex from '../database/connection'

class PointsController{
    async index(req: Request, res: Response){
        const { city, uf, items} = req.query

        const parsedItems = String(items).split(',').map(item => Number(item.trim()))
        const points = await knex('points').join('point_items', 'points.id', '=', 'point_items.point_id').whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
        console.log(points)

        return res.json(points)
    }

    async show( req: Request, res: Response){
        const { id } = req.params;

        const point = await knex('points').where('id', id).first()
        
        if(!point){
            return response.status(400).json({message: 'Point not found!'})
        }

        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')

        return res.json({point, items})
    }

    async create( req :Request , res: Response) {
        const {name, email, whatsapp, latitude, longitude, city, uf, items} = req.body

        const trx = await knex.transaction()
        const point = {
            image: 'https://http2.mlstatic.com/notebook-dell-g3-3590-i7-9750h-26ghz8gb512ssdgtx1660ti-D_NQ_NP_921072-MLB42260140296_062020-F.webp',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point)
        
        const point_id = insertedIds[0]
        const pointItems = items.map(( item_id: number) =>{
            return {
                item_id,
                point_id
            }
        })
        
        await trx('point_items').insert(pointItems)
        await trx.commit()
        return res.json({Id: point_id, ...point})
    }
}
export default PointsController