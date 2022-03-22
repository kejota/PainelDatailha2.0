import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
    Typography,
    Card,
    Button,
    CardContent,
    TextField,
    IconButton,
    MenuItem,
    Menu
} from '@mui/material';


import { IoMdMore, IoMdClose } from "react-icons/io";


import context from "./context";

import './style.css'





const Limites = () => {

    const { stateInicial, setInicial } = useContext(context)
    

    const editarInputResposta = (value, id) => {
        let up = stateInicial.limites
        up[id].limite = Number(value)
        setInicial({ ...stateInicial, limites: up })
    }
    const editarInputDdd = (value, id) => {
        let up = stateInicial.limites
        up[id].ddd = value
        setInicial({ ...stateInicial, limites: up })
    }

    const newOpcion = () => {
        var copia = Object.assign({}, stateInicial);

        if (copia.limites.length >= 3) return;

        copia.limites.push({
            ddd: "",
            limite: ""
        })
        setInicial(copia)
    }

    const removerOpcion = (id) => {
        var copia = Object.assign({}, stateInicial);
        copia.limites.splice(id, 1)
        // console.log(copia)
        setInicial(copia)
    }

    function Save() {
        /*  var copia = Object.assign({}, stateInicial);
         copia.limites = query
         console.log(query.content)
         setInicial(copia) */
    }

    return (
        <Stack sx={{ minWidth: '20vw', maxWidth: '22vw', height: '100vh', paddingTop: 10 }}>

            <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography gutterBottom variant="h6" component="div">
                        Limites
                    </Typography>
                </Stack>
            </CardContent >

            <Stack spacing={2} padding={2}>

                {stateInicial.limites.map((button, key) => (
                    <Stack key={key} alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                        <TextField
                            key={`${key}ddd`}
                            id="outlined-textarea"
                            label={`DDD`}
                            multiline
                            sx={{
                                width: '100%',
                            }}
                            value={button.ddd}
                            onChange={(e) => editarInputDdd(e.target.value, key)}
                        />
                        <TextField
                            key={`${key}limite`}
                            id="outlined-textarea"
                            label={`Limite`}
                            multiline
                            sx={{
                                width: '100%'
                            }}
                            value={button.limite}
                            onChange={(e) => editarInputResposta(e.target.value, key)}
                        />
                        <IconButton onClick={() => removerOpcion(key)}>
                            <IoMdClose size={20} color={'#888888'} />
                        </IconButton>

                    </Stack>

                ))}

                <Button variant="text" onClick={newOpcion}>Mais opção</Button>
            </Stack>
        </Stack>
    )
}

export default Limites