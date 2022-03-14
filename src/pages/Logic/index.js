import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Switch from '@mui/material/Switch';
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import Stack from '@mui/material/Stack';
import { GrClose } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";


import './style.css'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Logic = () => {
    const paramUrl = useParams();
    const [open, setOpen] = React.useState(false);
    const [carregando, setCarregando] = React.useState(true);
    const [aviso, setAviso] = React.useState({
        type: 'success',
        msg: 'Salvo com sucesso!'
    });
    const [search, setSearch] = useState([]);
    const [regras, setRegras] = useState();
    useEffect(() => {
        setCarregando(true)
        axios
            .get(`${process.env.REACT_APP_HOST}/pesquisa/${paramUrl.id}`)
            .then((res) => {

                axios
                    .get(`${process.env.REACT_APP_HOST}/getRegra/${paramUrl.id}`)
                    .then((resposta) => {
                        console.log("GET REGRA", resposta)
                        res.data[0].questions.push({
                            query: {
                                idQuery: res.data[0].questions.length,
                                title: 'Todas',
                                response: { alternative: [] }
                            }
                        })
                        if (resposta.data && resposta.data.length > 0) {
                            setSearch(res.data[0])
                            setRegras(resposta.data[0])
                            setCarregando(false)
                        }
                        else {
                            var newRegras = {
                                _id: paramUrl.id,
                                questions: []
                            }
                            
                            res.data[0].questions.map((question) => {

                                newRegras.questions.push({
                                    title: question.query.title,
                                    idQuery: question.query.idQuery,
                                    alternative: question.query.response.alternative,
                                    visible: 'true',
                                    regras: [

                                    ]
                                })

                            })

                            axios
                                .post(`${process.env.REACT_APP_HOST}/setRegra`, newRegras).then((res) => {
                                    setSearch(res.data[0])
                                    setRegras(newRegras)
                                    setCarregando(false)
                                }).catch((err) => {
                                    setCarregando(false)
                                    setAviso({
                                        type: 'error',
                                        msg: 'Verifique a conexão com a internet!'
                                    })
                                    setOpen(true);
                                })
                        }
                      
                    }).catch((err) => {
                        setCarregando(false)
                        setAviso({
                            type: 'error',
                            msg: 'Verifique a conexão com a internet!'
                        })
                        setOpen(true);
                    })
            }).catch((err) => {
                setCarregando(false)
                setAviso({
                    type: 'error',
                    msg: 'Verifique a conexão com a internet!'
                })
                setOpen(true);
            })
    }, [paramUrl.id]);

    const handleChange = (event, idQuetion, idRegra) => {
        // setAge(event.target.value);
        var newR = Object.assign({}, regras);
        newR.questions[idQuetion].regras[idRegra].alternative = event.target.value
        setRegras(newR)
    };

    const handleVisible = (event, idQuetion, idRegra) => {
        // setAge(event.target.value);
        var newR = Object.assign({}, regras);
        newR.questions[idQuetion].regras[idRegra].visible = event.target.checked.toString()
        setRegras(newR)
    };

    const handleVisibleQuestion = (event, idQuetion) => {
        // setAge(event.target.value);
        var newR = Object.assign({}, regras);
        newR.questions[idQuetion].visible = event.target.checked.toString()
        setRegras(newR)
    };

    const handleQuestionSelect = (event, idQuetion, idRegra) => {
        var newR = Object.assign({}, regras);
        newR.questions[idQuetion].regras[idRegra].idQuery = event.target.value
        setRegras(newR)
    };

    const deleteRegra = (idQuetion, idRegra) => {
        var newR = Object.assign({}, regras);
        newR.questions[idQuetion].regras.splice(idRegra, 1)
        setRegras(newR)
    };

    const newRegra = (idQuetion) => {

        var newR = Object.assign({}, regras);
        newR.questions[idQuetion].regras.push(({
            alternative: "",
            idQuery: "0",
            visible: "true"
        }))
        setRegras(newR)
        console.log(Boolean(regras.questions[idQuetion].regras[0].visible))
    }

    const Salvar = async () => {
        setCarregando(true)
        await axios
            .post(`${process.env.REACT_APP_HOST}/updateRegra`, regras).then((res) => {
                setCarregando(false)
                setAviso({
                    type: 'success',
                    msg: 'Salvo com sucesso!'
                })
                setOpen(true);
                console.log("Salvo")
            }).catch((err) => {
                setCarregando(false)
                setAviso({
                    type: 'error',
                    msg: 'Verifique a conexão com a internet!'
                })
                setOpen(true);
            })
    }

    const Home = async () =>{
        await Salvar()
        window.location.href = "/painel"
    }

    return (
        <div className="conteiner-logic">
            <AppBar position="static">
                <Toolbar>
                    <AiFillHome onClick={() => {Home()}} size={25} style={{marginRight: 50, cursor: 'pointer'}}/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Regras - {search.title}
                    </Typography>
                    <Button onClick={() => Salvar()} color="inherit" size="large">{<FaSave size={20} style={{marginRight: 10}}/>}Salvar</Button>
                </Toolbar>
            </AppBar>
            {carregando &&
                <Box sx={{ width: '100%', marginTop: 2 }}>
                    <LinearProgress />
                </Box>
            }
            <Stack alignItems={'center'} justifyContent={'center'} spacing={2} padding={3}  >

                {regras ?
                    <>
                        {regras && regras.questions.map((question, index) => (
                            question.title != "Todas" &&
                            <Paper key={`${index}paper`} sx={{
                                overflow: 'hidden',
                                width: '80%',

                            }}>
                                <Stack >
                                    <Stack key={`${index}questions`} padding={1} alignItems={'center'} justifyContent={'space-between'} direction={'row'} sx={{ background: '#eeeeee' }} >
                                        <h5 style={{ maxWidth: '70vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{question.title}</h5>
                                        <FormControlLabel control={<Switch checked={Boolean(question.visible == 'true')} onChange={(e) => handleVisibleQuestion(e, index)}/>} label="Visível" />
                                    </Stack>
                                    <Stack borderRadius={2} padding={1} >

                                        {question.regras.map((regra, key) => (

                                            <Stack key={`${key}alternative`} borderRadius={2} spacing={4} direction={'row'} margin={1} paddingX={2} paddingY={2} alignItems={'center'} justifyContent={'space-between'} sx={{
                                                background: '#eeeeee'
                                            }}>
                                                <GrClose size={50} onClick={() => deleteRegra(index, key)} />
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Alternativa</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={regra.alternative}
                                                        label={"Alternativa"}
                                                        onChange={(e) => handleChange(e, index, key)}
                                                    >
                                                        {question.alternative.map((alternative, key) => (
                                                            <MenuItem value={alternative}>{alternative}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Questão</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={regra.idQuery}
                                                        label={"Questão"}
                                                        onChange={(e) => handleQuestionSelect(e, index, key)}
                                                        sx={{
                                                            width: '100%',

                                                        }}>
                                                        {search.questions && search.questions.map((query, key) => (
                                                            <MenuItem value={`${key}`}>{query.query.title}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControlLabel control={<Switch checked={Boolean(regra.visible == 'true')} onChange={(e) => handleVisible(e, index, key)} />} label="Ativo" />
                                            </Stack>

                                        ))}
                                    </Stack>
                                    <Button variant="outlined" sx={{ margin: 2 }} onClick={() => newRegra(index)}>NOVA REGRA</Button>
                                </Stack>
                            </Paper>
                        ))
                        }
                    </>
                    :
                    <>
                        <Skeleton id={'Skeleton1'} variant="rectangular" width={'80%'} height={218} />
                        <Skeleton id={'Skeleton2'} variant="rectangular" width={'80%'} height={218} />
                        <Skeleton id={'Skeleton3'} variant="rectangular" width={'80%'} height={218} />
                        <Skeleton id={'Skeleton4'} variant="rectangular" width={'80%'} height={218} />
                    </>
                }
            </Stack >

            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={aviso.type} sx={{ width: '100%' }}>
                    {aviso.msg}
                </Alert>
            </Snackbar>
        </div>



    )
}

export default Logic