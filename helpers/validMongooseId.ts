

export const getIdFromPath = ( url: string ): string => {
  return url.replace('/api/entries/', '');
}

export const isValidMongooseID = ( id: string ): boolean => {
  const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$");

  return checkMongoIDRegExp.test( id )
}