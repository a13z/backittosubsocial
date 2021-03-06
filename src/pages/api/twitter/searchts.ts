import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt';

export default async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: any; data?: never[]; }): any; new(): any; }; }; }) => {
  
  const session = await getSession({ req });
  const token = await getToken({ req });
  
  console.log('session', session);
  console.log('token', JSON.stringify(token, null, 2));

  try {
    return res.status(200).json({
      status: 'Ok',
      data: []
    });
  } catch(e) {
    return res.status(400).json({
      status: e.message
    });
  }
}