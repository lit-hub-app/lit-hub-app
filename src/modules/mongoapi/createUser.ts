import type { NextApiRequest, NextApiResponse } from 'next'
import connection from '@/lib/database';
import User from '@/models/User';

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


    try {
        await connection();
        const user = await User.create(body);
        res.status(201).json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ success: false, error });
    }
}