import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../appDatabase/database';

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse
    ) {
        const { body } = req;
        
        try {
            const client = await clientPromise;
            const db = client.db(process.env.DATABASE_NAME);
        
            const doc: object = {
                userName: body.userName,
                password: body.password,
                passwordConfirm: body.passwordConfirm
            }

            const user = await db
                .collection('users')
                .insertOne(doc)

            console.log(`A document was inserted with the _id: ${user.insertedId}`);
            res.status(201).json(user.insertedId)
    } catch (error) {
        console.log('DB Create User', error);
    } 
}
