import { db } from '@/lib/db';
import { withMethods } from '@/lib/middlewares/withMethods';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send({ message: 'Email not provided' });
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  let status = 'login';
  if (!user) {
    status = 'register';
  }

  res.status(200).send({
    status,
  });
}

export default withMethods(['POST'], handler);
