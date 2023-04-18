import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '</database>'
import { EntryDB, IEntry } from '</models>'

type Data = 
  | { message: string }
  | IEntry[]

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production'){
    return res.status(401).json({ message: 'No tiene accceso a este servicio'})
  }

  await db.connect()
  
  await EntryDB.deleteMany({});
  
  await EntryDB.insertMany( seedData.entries );
  
  const entries = await EntryDB.find({})
  
  await db.disconnect()

  res.status(200).json(entries)
}