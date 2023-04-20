import { db } from '</database>';
import { EntryDB, IEntry } from '</models>';
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = 
  | {  message: string }
  | IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  
  const { id } = req.query;

  if( !mongoose.isValidObjectId( id ) ){
    return res.status(400).json({ message: 'El id no es valido'})
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry( req, res );
  
    default:
      return res.status(400).json({ message: 'Metodo no existe'})

  }
}

const updateEntry = async( req: NextApiRequest, res: NextApiResponse) => {

  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await EntryDB.findById( id )

  if( !entryToUpdate ){
    await db.disconnect()
    return res.status(400).json({ message: `No hay entrada con el id ${ id }`})
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body

  try {
    const updatedEntry = await EntryDB.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true})
    
    res.status(200).json( updatedEntry! )
    await db.disconnect()

  } catch (error: any) {
    await db.disconnect()
    res.status(400).json({ message: error.errors.status.message})

  }
}