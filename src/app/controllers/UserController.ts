import { Request, Response } from 'express';
import { getMongoRepository } from 'typeorm';

import User from '../models/User';

class UserController {
    index(req: Request, res: Response) {
        return res.send({ userId: req.userId })
    }
    
    async store (req: Request, res: Response) {
        const repository = getMongoRepository(User);
        const { name, email, password} = req.body;

        const userExist = await repository.findOne({ 
            where: { 
                email : {$eq: email}
            }
        });

        if(userExist) {
            return res.sendStatus(409)
        }

        const user = repository.create({ name, email, password})
        await repository.save(user)

        return res.json(user)
    }
}

export default new UserController();