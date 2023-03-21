import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../models/User';
import connection from '../../../lib/database';

export default async function saveBook(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    try {

    }
    catch (error) {
        res.status(400).json({success: false, error});
    }
}