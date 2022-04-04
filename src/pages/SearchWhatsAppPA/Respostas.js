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
import CircularProgress from '@mui/material/CircularProgress';


import { IoMdMore, IoMdClose } from "react-icons/io";


import context from "./context";

import './style.css'

import axios from "axios";





const Respostas = () => {

    const [ stateInicial, setInicial ] = useState([])
    const [carregando, setCarregando] = React.useState(true);
    useEffect(() => {
        setCarregando(true)
        axios.get(`${process.env.REACT_APP_HOST_LOCAL}/whatsapp-repostas`).then((res) => {
            
            setInicial(res.data)
            setCarregando(false)
        }).catch((err) => {
           
        })

    }, [])

    return (
        <Stack sx={{ minWidth: '20vw', maxWidth: '22vw', height: '100vh', paddingTop: 10, overflowY: 'scroll' }}>

            <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography gutterBottom variant="h6" component="div">
                        Dados das respostas
                    </Typography>
                </Stack>
            </CardContent >

            <Stack spacing={2} padding={2}>
            {carregando &&
                <Box sx={{ width: '100%', marginTop: 9, display: "flex", alignItems: 'center', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            }
                { !carregando && stateInicial.map((button, key) => (
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
                            disabled
                        />
                        <TextField
                            key={`${key}limite`}
                            id="outlined-textarea"
                            label={`Quantidade`}
                            multiline
                            sx={{
                                width: '100%'
                            }}
                            value={button.limite}
                            disabled
                        />

                    </Stack>

                ))}
            
            </Stack>
        </Stack>
    )
}

export default Respostas