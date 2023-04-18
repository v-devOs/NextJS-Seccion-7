import mongoose from "mongoose";



const mongoConection = {
  isConected: 0
}


export const connect = async() => {

  if( mongoConection.isConected ){
    console.log('Ya estamos conectados');
    return;
  }

  if( mongoose.connections.length > 0 ){
    mongoConection.isConected = mongoose.connections[0].readyState;

    if( mongoConection.isConected === 1  ){
      console.log('Usando conexion anterior');
      return;
    }

    await mongoose.disconnect();
  }

  await mongoose.connect('')
  mongoConection.isConected = 1;
  console.log('Conectado a MongoDB');
  

}

export const disconnect = async() => {

  if( mongoConection.isConected !== 0 ) return;

  await mongoose.disconnect();
  console.log('Desconectado de MongoDB');
}




