import { isValidObjectId } from "mongoose"
import { db } from '</database>';
import { EntryDB, IEntry } from "</models>";

export const getEntryByID = async( id: string ): Promise<IEntry | null> => {
  
  if( !isValidObjectId(id) ) return null;

  await db.connect();
  const entry = await EntryDB.findById(id).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(entry));
}

export const deleteEntryById = async( id: string ) => {

  if( !isValidObjectId(id) ) return null;

  await db.connect();

  await EntryDB.deleteOne({ _id: id })

  await db.disconnect();

  return null;
}