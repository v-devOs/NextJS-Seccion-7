import { db } from '</database>';
import { EntryDB } from '</models>';
import type { NextApiRequest, NextApiResponse } from 'next'
import { IEntry } from '../../../models/Entry';

type Data = 
  | { message: string }
  | IEntry[]

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  switch (req.method) {
    case 'GET':
      return getEntries( res )
  
    default:
      return res.status(400).json({ message: 'Endpoint no existe' });
  }
    
}

const getEntries = async ( res: NextApiResponse<Data> ) => {

  await db.connect();
  const entries = await EntryDB.find().sort({ createdAt: 'ascending'})
  await db.disconnect();

  res.status(200).json(entries)

}