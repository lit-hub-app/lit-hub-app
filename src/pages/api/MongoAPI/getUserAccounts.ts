import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../appDatabase/database';

export default async function getUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const client = await clientPromise;
        const db = client.db(process.env.DATABASE_NAME);

        const users: object = await db
            .collection('users')
            .find({})
            .toArray()

        res.status(200).json(users);
    } catch (error) {
        console.log("Get users error", error);
    }
}