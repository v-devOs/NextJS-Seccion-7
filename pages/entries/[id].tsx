import { ChangeEvent, useMemo, useState, FC } from "react";
import { GetServerSideProps } from 'next'

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, IconButton } from "@mui/material";

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { Layout } from "</components/layouts>";
import { Entry, EntryStatus } from "</interfaces>";

import { dbEntries } from "</database>";

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props{
  entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
  
  const [inputValue, setInputValue] = useState( entry.description )
  const [status, setStatus] = useState<EntryStatus>( entry.status );
  const [touched, settouched] = useState(false)

  const onInputValueChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  const onStatusChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setStatus( event.target.value as EntryStatus )
  } 

  const onSave = () => {
    console.log({ inputValue, status});
    
  }

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  return (
    <Layout title={ inputValue.substring(0,20) + "..."}>
      <Grid 
        container
        justifyContent='center'
        sx={{ marginTop: 2}}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader
              title={`Entrada:`}
              subheader={`Creada hace: ${entry.createdAt} minutos `}
            />
            <CardContent>
              <TextField 
                sx={{ marginTop: 2, marginBottom: 1}}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label='Nueva Entrada'
                value={ inputValue }
                onChange={ onInputValueChange }
                onBlur={ () => settouched( true )}
                helperText={ isNotValid && 'Ingrese un valor' }
                error={ isNotValid }
              />

              <FormControl>
                <FormLabel>Estado</FormLabel>
                <RadioGroup 
                  row
                  value={status}
                  onChange={ onStatusChange }
                >
                  {
                    validStatus.map( opt => (
                      <FormControlLabel 
                        key={opt}
                        value={ opt }
                        control={ <Radio/> }
                        label={ capitalize(opt) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>

            <CardActions>
              <Button
                startIcon={<SaveOutlinedIcon/>}
                variant="contained"
                fullWidth
                onClick={ onSave }
                disabled = { inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton sx={{
        position: 'fixed',
        bottom: 30,
        right: 30,
        backgroundColor: 'error.dark'
      }}>
        <DeleteOutlineOutlinedIcon/>
      </IconButton>
    </Layout>
  );
};



// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryByID(id);

  if( !entry ){
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage
