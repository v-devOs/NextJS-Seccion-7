import type { NextApiRequest, NextApiResponse } from 'next'
import { db, seedData } from '</database>'
import { EntryDB } from '</models>'

type Data = {
  message: string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {

  if( process.env.NODE_ENV === 'production'){
    return res.status(401).json({ message: 'No tiene accceso a este servicio'})
  }

  await db.connect()
  
  // await EntryDB.deleteMany({});
  
  // await EntryDB.insertMany( seedData.entries );

  console.log( await EntryDB.find({}));
  
  
  await db.disconnect()

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}