import type { NextApiRequest, NextApiResponse } from 'next'
<<<<<<<< HEAD:src/modules/mongoapi/createUser.ts
import connection from '@/lib/database';
import User from '@/models/User';
========
import connection from '../../../../lib/database';
import User from '../../../../models/User';
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/user/createUser.ts

export default async function createUser(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { body } = req;

    if (body.password !== body.passwordConfirm) {
        return res.status(500).json({ error: 'Passwords do not match' });
    }
    // Password Validation
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!PASSWORD_REGEX.test(body.password)) {
        return res.status(500).json({ error: 'Password is too weak.' });
    }

<<<<<<<< HEAD:src/modules/mongoapi/createUser.ts
    try {
        await connection();
        const user = await User.create(body);
        res.status(201).json({ success: true, user });
========
    res.status(201).json({ success: true, user });
>>>>>>>> 6ffa379e21a9d899272f823822275cd1913d3a40:src/pages/api/MongoAPI/user/createUser.ts
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
}