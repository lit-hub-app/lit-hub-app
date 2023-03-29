import type { NextApiRequest, NextApiResponse } from 'next'
<<<<<<<< HEAD:src/modules/mongoapi/getUserAccounts.ts
import connection from '@/lib/database';
import User from '@/models/User';
========
import connection from '../../../../lib/database';
import User from '../../../../models/User';
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/user/getUserAccounts.ts

export default async function getUsers(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await connection();
        const users: Array<object> = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ success: false, error })
    }
}