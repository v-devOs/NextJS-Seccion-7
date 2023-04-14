import { ChangeEvent, useState } from "react";
import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const NewEntry = () => {

  const [isAdding, setIsAdding] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {
        isAdding ? (
          <>
            <TextField 
              fullWidth
              sx={{ marginTop: 2, marginBottom: 1}}
              placeholder="Nueva entrada"
              autoFocus
              multiline
              label='Nueva entrada'
              helperText= {inputValue.length <= 0 && touched && 'Ingrese un valor'}
              error={ inputValue.length <= 0 && touched}
              value={ inputValue }
              onChange={onTextFieldChange}
              onBlur={ () => setTouched( true )}
            />
            <Box display={'flex'} justifyContent={'space-between'}>
              
              <Button
                variant="text"
                onClick={ () => setIsAdding( false )}
              >
                Cancelar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={ <SaveOutlinedIcon/> }
              >
                Guardar
              </Button>
            </Box>
          </>
        ) 
        : (
          <Button
            startIcon={ <AddIcon/> }
            fullWidth
            variant="outlined"
            onClick={ () => setIsAdding( true )}
          >
            Agregar tarea
          </Button>
        )
      }
    </Box>
  )
}
