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
    Menu,
    Switch
} from '@mui/material';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { IoMdMore, IoMdClose } from "react-icons/io";

import pt from 'date-fns/locale/pt-BR';


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

        //if (copia.limites.length >= 3) return;

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


    const handleChange = (event) => {

        let up = stateInicial.sexo
        up.sexo = event.target.checked
        setInicial({ ...stateInicial, sexo: up })
    };

    const faixa = (event) => {

        let up = stateInicial.faixa
        up.faixa = event.target.checked
        setInicial({ ...stateInicial, faixa: up })
    };

    const escolaridade = (event) => {

        let up = stateInicial.escolaridade
        up.escolaridade = event.target.checked
        setInicial({ ...stateInicial, escolaridade: up })
    };

    const editarInputSexo = (value, typo) => {
        let up = stateInicial.sexo
        up[typo] = Number(value)
        setInicial({ ...stateInicial, sexo: up })
    }

    const editarInputFaixa = (value, typo) => {
        let up = stateInicial.faixa
        up[typo] = Number(value)
        setInicial({ ...stateInicial, faixa: up })
    }
    
    const editarInputEscolaridade = (value, typo) => {
        let up = stateInicial.escolaridade
        up[typo] = Number(value)
        setInicial({ ...stateInicial, escolaridade: up })
    }

    return (
        <Stack sx={{ minWidth: '20vw', maxWidth: '22vw', height: '100vh', paddingTop: 10, overflowY: 'scroll' }}>

            <CardContent>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography gutterBottom variant="h6" component="div">
                        Limites
                    </Typography>
                </Stack>
            </CardContent >

            <Stack spacing={2} paddingX={2}>

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

                <Button variant="text" onClick={newOpcion}>Mais op????o</Button>
            </Stack>

            <Stack alignItems={'center'} direction={'row'} padding={1} sx={{
                width: '100%',
            }}>
                <Typography sx={{
                    width: '100%',
                    textAlign: 'center'
                }}>
                    Sexo
                </Typography>
                <Switch
                    checked={stateInicial.sexo.sexo}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Stack>

            <Stack spacing={2} paddingX={2}>

                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Sexo`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"Feminino"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.sexo.feminino}
                        onChange={(e) => editarInputSexo(e.target.value, 'feminino')}
                        disabled={!stateInicial.sexo.sexo}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Sexo`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"Masculino"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.sexo.masculino}
                        onChange={(e) => editarInputSexo(e.target.value, "masculino")}
                        disabled={!stateInicial.sexo.sexo}
                    />
                </Stack>
            </Stack>

            <Stack alignItems={'center'} direction={'row'} padding={1} sx={{
                width: '100%',
            }}>
                <Typography sx={{
                    width: '100%',
                    textAlign: 'center'
                }}>
                    Faixa et??ria
                </Typography>
                <Switch
                    checked={stateInicial.faixa.faixa}
                    onChange={faixa}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Stack>

            <Stack spacing={2} paddingX={2}>

                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Faixa et??ria`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"16 a 24 anos"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.faixa['16 a 24 anos']}
                        onChange={(e) => editarInputFaixa(e.target.value, '16 a 24 anos')}
                        disabled={!stateInicial.faixa.faixa}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Faixa et??ria`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"25 a 34 anos"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.faixa['25 a 34 anos']}
                        onChange={(e) => editarInputFaixa(e.target.value, "25 a 34 anos")}
                        disabled={!stateInicial.faixa.faixa}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Faixa et??ria`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"35 a 44 anos"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.faixa['35 a 44 anos']}
                        onChange={(e) => editarInputFaixa(e.target.value, "35 a 44 anos")}
                        disabled={!stateInicial.faixa.faixa}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Faixa et??ria`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"45 a 59 anos"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.faixa['45 a 59 anos']}
                        onChange={(e) => editarInputFaixa(e.target.value, "45 a 59 anos")}
                        disabled={!stateInicial.faixa.faixa}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Faixa et??ria`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"60 anos ou mais"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.faixa['60 anos ou mais']}
                        onChange={(e) => editarInputFaixa(e.target.value, "60 anos ou mais")}
                        disabled={!stateInicial.faixa.faixa}
                    />
                </Stack>
            </Stack>

            <Stack alignItems={'center'} direction={'row'} padding={1} sx={{
                width: '100%',
            }}>
                <Typography sx={{
                    width: '100%',
                    textAlign: 'center'
                }}>
                    Grau de escolaridade
                </Typography>
                <Switch
                    checked={stateInicial.escolaridade.escolaridade}
                    onChange={escolaridade}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </Stack>

            <Stack spacing={2} paddingX={2}>

                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Escolaridade`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"Analfabeto"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.escolaridade['Analfabeto']}
                        onChange={(e) => editarInputEscolaridade(e.target.value, 'Analfabeto')}
                        disabled={!stateInicial.escolaridade.escolaridade}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Escolaridade`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"N??vel Fundamental"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.escolaridade['N??vel Fundamental']}
                        onChange={(e) => editarInputEscolaridade(e.target.value, "N??vel Fundamental")}
                        disabled={!stateInicial.escolaridade.escolaridade}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Escolaridade`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"N??vel M??dio"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.escolaridade['N??vel M??dio']}
                        onChange={(e) => editarInputEscolaridade(e.target.value, "N??vel M??dio")}
                        disabled={!stateInicial.escolaridade.escolaridade}
                    />
                </Stack>
                <Stack alignItems={'center'} direction={'row'} spacing={2} sx={{}} >
                    <TextField
                        id="outlined-textarea"
                        label={`Escolaridade`}
                        multiline
                        sx={{
                            width: '100%',
                        }}
                        value={"N??vel Superior"}
                        disabled
                    />
                    <TextField
                        id="outlined-textarea"
                        label={`Limite`}
                        multiline
                        sx={{
                            width: '100%'
                        }}
                        value={stateInicial.escolaridade['N??vel Superior']}
                        onChange={(e) => editarInputEscolaridade(e.target.value, "N??vel Superior")}
                        disabled={!stateInicial.escolaridade.escolaridade}
                    />
                </Stack>
            </Stack>
            <Stack alignItems={'center'} spacing={2} padding={2}>
                <Typography>
                    Data de expira????o
                </Typography>
                <DatePicker locale={pt} dateFormat='dd/MM/yyyy' className="Data" selected={new Date(stateInicial.data)} onChange={(date) => {
                    setInicial({
                        ...stateInicial, data: date
                    })
                }} />
            </Stack>
        </Stack>
    )
}

export default Limites