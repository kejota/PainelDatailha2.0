import React, { useContext, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import axios from "axios";

import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import {
    Typography,
    Card,
    Container,
    Toolbar,
    AppBar,
    Button,
    CardContent,
    TextField,
    AccordionDetails,
    AccordionSummary,
    Accordion,
    ButtonGroup,
    IconButton,
    MenuItem,
    Menu,
    LinearProgress,
    Snackbar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Grow from '@mui/material/Grow';
import { TransitionGroup } from 'react-transition-group';
import Collapse from '@mui/material/Collapse';

import { IoIosArrowDown, IoMdMore, IoMdClose } from "react-icons/io";
import { BsViewList, BsCardList } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";

import context from "./context";

import './style.css'
import Limites from './Limites'
import Respostas from "./Respostas";

const stateGlobal = {
    card: {
        inicial: {
            title: "Saudação",
            content: "",
            buttons: [
                {
                    content: "",
                }
            ]
        },
        button: {
            title: "Botões",
            type: "button",
            content: "",
            buttons: [
                {
                    content: "",
                }
            ]
        },
        list: {
            title: "Lista",
            type: "list",
            content: "",
            itens: [
                {
                    content: "",
                }
            ]
        }
    }
}


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const SearchWhatsApp = () => {
    const [checked, setChecked] = React.useState(false);
    const [carregando, setCarregando] = React.useState(true);
    const [aviso, setAviso] = React.useState({
        type: 'success',
        msg: 'Salvo com sucesso!'
    });
    const [open, setOpen] = React.useState(false);

    const [abrir, setAbrir] = React.useState(false);

    const [stateInicial, setInicial] = useState({
        limites: [
        ],
        inicial: {
            title: "Saudação",
            content: "",
            buttons: [
                {
                    content: "",
                }
            ]
        },
        questions: [
        ],
        final: {
            title: "Despedida",
            content: "",
            buttons: [
                {
                    content: "",
                }
            ]
        },
    })

    const handleClose = () => {
        setAbrir(false);
    };

    const handleClickOpen = () => {
        setAbrir(true);
    };


    useEffect(() => {
        setCarregando(true)
        axios.get(`${process.env.REACT_APP_HOST_LOCAL}/get-pesquisa`).then((res) => {
            console.log(res.data)
            setInicial(res.data)
            setAviso({
                type: 'success',
                msg: 'Atualizado!'
            })
            setOpen(true);
            setChecked(true)
            setCarregando(false)
        }).catch((err) => {
            setAviso({
                type: 'error',
                msg: 'Verifique a conexão com a internet!'
            })
            setOpen(true);
        })

    }, [])

    const newCard = (type) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions.push(type == "button" ? stateGlobal.card.button : stateGlobal.card.list)
        setInicial(copia)
    }

    const Salvar = async () => {

        var val = Validar(stateInicial)
        if (val.erro == true) {
            console.log("VALIDAÇÂO ERRO")
            setAviso({
                type: 'error',
                msg: 'Verifique se todos os campos estão preenchidos!'
            })
            setOpen(true);
            return
        }
        setCarregando(true)
        await axios
            .post(`${process.env.REACT_APP_HOST_LOCAL}/set-pesquisa`, stateInicial).then((res) => {
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
                console.log(err)
            })
    }

    const Home = async () => {
        await Salvar()

        window.location.href = "/painel"
    }

    const Disparar = async () => {
        setAbrir(false);
        await Salvar()
        setCarregando(true)
        axios.get(`${process.env.REACT_APP_HOST_LOCAL}/whatsapp-disparar`).then((res) => {
            console.log(res.data)
            setAviso({
                type: 'success',
                msg: 'Disparado com sucesso!'
            })
            setOpen(true);
            setCarregando(false)
            //setInicial(res.data)
        }).catch((err) => {
            setCarregando(false)
            setAviso({
                type: 'error',
                msg: 'Verifique a conexão com a internet!'
            })
            setOpen(true);
        })
    }

    return (
        <context.Provider value={{ stateInicial, setInicial, checked }}>
            <AppBar position="fixed" sx={{ height: 65 }} >
                <Toolbar>
                    <AiFillHome onClick={() => { Home() }} size={25} style={{ marginRight: 50, cursor: 'pointer' }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Pesquisa por WhatsApp
                    </Typography>
                    <Button onClick={handleClickOpen} color="inherit">Disparar</Button>
                    <Button onClick={Salvar} color="inherit">Salvar</Button>
                </Toolbar>
            </AppBar>
            {carregando ?
                <Box sx={{ width: '100%', marginTop: 9 }}>
                    <LinearProgress />
                </Box>
                :
                <Stack alignItems={'center'} direction={'row'} sx={{
                    width: '100%'
                }}>
                    <Limites />
                    <div style={{ background: "#dddddd", overflowY: 'scroll', height: '100vh', width: '60vw', paddingTop: 65 }}>
                        <Stack padding={2} sx={{ zIndex: 100 }} position={'fixed'}>
                            <ButtonGroup orientation="vertical" variant="contained" size="large" aria-label="large button group">
                                <Button key="two" onClick={() => newCard('button')}><BsViewList size={30} style={{ margin: '10px 15px' }} /></Button>
                                <Button key="three" onClick={() => newCard('list')}><BsCardList size={30} style={{ margin: '10px 15px' }} /></Button>
                            </ButtonGroup>
                        </Stack>

                        <Stack sx={{ transition: '0.5s' }} paddingTop={5} paddingBottom={5} spacing={2} alignItems={'center'} >
                            <CardInicial />
                            {stateInicial.questions.map((query, key) => (
                                query.type == "button"
                                    ? <CardButton key={key} query={query} index={key} />
                                    : <CardList key={key} query={query} index={key} />
                            ))}
                            <CardFinal />
                        </Stack>


                    </div>
                    <Respostas />
                </Stack>
            }
            <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
                <Alert onClose={() => setOpen(false)} severity={aviso.type} sx={{ width: '100%' }}>
                    {aviso.msg}
                </Alert>
            </Snackbar>
            <Dialog
                open={abrir}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Disparar quetionário?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Não há como cancelar o disparo!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Agora não</Button>
                    <Button onClick={Disparar} autoFocus>
                        Disparar
                    </Button>
                </DialogActions>
            </Dialog>
        </context.Provider>
    )
}


const CardButton = ({ query, index }) => {
    console.log("RENDER CARD", index)
    const { stateInicial, setInicial, checked } = useContext(context)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const removerCard = () => {
        var copia = Object.assign({}, stateInicial);
        copia.questions.splice(index, 1)
        console.log(copia)
        handleClose()
        setInicial(copia)
    }

    const editarInputPergunta = (value) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions[index].content = value
        console.log(copia.questions[index].content, index)
        setInicial(copia)
    }

    const editarInputResposta = (value, id) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions[index].buttons[id].content = value
        console.log(value)
        setInicial(copia)
    }

    const newOpcion = () => {
        var copia = Object.assign({}, stateInicial);

        if (copia.questions[index].buttons.length >= 3) return;

        copia.questions[index].buttons.push({
            content: ""
        })
        setInicial(copia)
    }

    const removerOpcion = (id) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions[index].buttons.splice(id, 1)
        // console.log(copia)
        setInicial(copia)
    }

    return (
        <Grow in={checked}>
            <Card key={`${index}carbt`} sx={{ minWidth: '40vw' }}>

                <CardContent>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h6" component="div">
                            {query.title}
                        </Typography>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}>
                            <IoMdMore />
                        </IconButton>
                    </Stack>

                    <TextField
                        id="standard-textarea"
                        label="Pergunta"
                        placeholder="Placeholder"
                        multiline
                        variant="standard"
                        value={query.content}
                        sx={{
                            width: '100%'
                        }}
                        onChange={(e) => editarInputPergunta(e.target.value)}
                    />

                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >

                        <MenuItem key={"ex"} onClick={() => removerCard()}>
                            Excluir
                        </MenuItem>

                    </Menu>
                </CardContent >

                <Stack sx={{ transition: 'heigth 2s' }} spacing={2} padding={2}>

                    {query.buttons.map((button, key) => (
                        <Grow key={key} in={checked}>
                            <Box key={key} sx={{ display: 'flex', alignItems: 'center' }} >
                                <TextField
                                    key={key}
                                    id="outlined-textarea"
                                    label={`Opção ${key + 1}`}
                                    placeholder="Placeholder"
                                    multiline
                                    sx={{
                                        width: '100%'
                                    }}
                                    value={button.content}
                                    onChange={(e) => editarInputResposta(e.target.value, key)}
                                />
                                <IconButton onClick={() => removerOpcion(key)}>
                                    <IoMdClose size={20} color={'#888888'} />
                                </IconButton>

                            </Box>
                        </Grow>
                    ))}

                    <Button variant="text" onClick={newOpcion}>Mais opção</Button>
                </Stack>
            </Card>
        </Grow>
    )
}

const CardList = ({ query, index }) => {

    const { stateInicial, setInicial } = useContext(context)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const removerCard = () => {
        var copia = Object.assign({}, stateInicial);
        copia.questions.splice(index, 1)
        console.log(copia)
        handleClose()
        setInicial(copia)
    }

    const editarInputPergunta = (value) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions[index].content = value
        console.log(value)
        setInicial(copia)
    }

    const editarInputResposta = (value, id) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions[index].itens[id].content = value
        console.log(value)
        setInicial(copia)
    }

    const newOpcion = () => {
        var copia = Object.assign({}, stateInicial);

       // if (copia.questions[index].itens.length >= 10) return;

        copia.questions[index].itens.push({
            content: ""
        })
        setInicial(copia)
    }

    const removerOpcion = (id) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions[index].itens.splice(id, 1)
        console.log(copia)
        setInicial(copia)
    }



    return (
        <Grow in={true}>
            <Card sx={{ minWidth: '40vw' }}>

                <CardContent>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h6" component="div">
                            {query.title}
                        </Typography>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}>
                            <IoMdMore />
                        </IconButton>
                    </Stack>

                    <TextField
                        id="standard-textarea"
                        label="Pergunta"
                        placeholder="Placeholder"
                        multiline
                        variant="standard"
                        value={query.content}
                        sx={{
                            width: '100%'
                        }}
                        onChange={(e) => editarInputPergunta(e.target.value)}
                    />

                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >

                        <MenuItem key={"ex"} onClick={() => removerCard()}>
                            Excluir
                        </MenuItem>

                    </Menu>
                </CardContent >

                <Stack spacing={2} padding={2}>
                    <Accordion elevation={0}>
                        <AccordionSummary
                            expandIcon={<IoIosArrowDown />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Escolha uma opção</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={2} padding={2}>

                                {query.itens.map((item, key) => (
                                    <Box key={key} sx={{ display: 'flex', alignItems: 'center' }} >
                                        <TextField
                                            key={key}
                                            id="outlined-textarea"
                                            label={`Opção ${key + 1}`}
                                            placeholder="Placeholder"
                                            multiline
                                            sx={{
                                                width: '100%'
                                            }}
                                            value={item.content}
                                            onChange={(e) => editarInputResposta(e.target.value, key)}
                                        />
                                        <IconButton onClick={() => removerOpcion(key)}>
                                            <IoMdClose size={20} color={'#888888'} />
                                        </IconButton>

                                    </Box>

                                ))}
                                <Button variant="text" onClick={newOpcion}>Mais opção</Button>
                            </Stack>

                        </AccordionDetails>
                    </Accordion>



                </Stack>
            </Card>
        </Grow>
    )
}

const CardInicial = () => {

    const theme = createTheme({
        palette: {
            primary: {
                light: '#fff',
                main: '#FFF',
                dark: '#FFF',
                contrastText: '#fff',
            },
            secondary: {
                light: '#FFF',
                main: '#FFF',
                dark: '#FFF',
                contrastText: '#FFF',
            },
            action: {


            },
            text: {
                primary: "#FFF",
                secondary: "#FFF",
                disabled: "#FFF",
            }
        },
    });


    const { stateInicial, setInicial } = useContext(context)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const removerCard = (index) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions.splice(index, 1)
        console.log(copia)
        handleClose()
        setInicial(copia)

    }

    const editarInputResposta = (value, id) => {
        var copia = Object.assign({}, stateInicial);
        stateInicial.inicial.buttons[id].content = value
        console.log(value)
        setInicial(copia)
    }

    const newOpcion = () => {
        var copia = Object.assign({}, stateInicial);

        stateInicial.inicial.buttons.push({
            content: ""
        })
        setInicial(copia)
    }

    const removerOpcion = (id) => {
        var copia = Object.assign({}, stateInicial);
        stateInicial.inicial.buttons.splice(id, 1)
        // console.log(copia)
        setInicial(copia)
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ minWidth: '40vw', backgroundColor: '#1976d2' }}>

                <CardContent>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white' }}>
                            {stateInicial.inicial.title}
                        </Typography>
                    </Stack>


                </CardContent >

                <Stack spacing={2} padding={2}>

                    {stateInicial.inicial.buttons.map((button, key) => (
                        <Box key={key} sx={{ display: 'flex', alignItems: 'center' }} >
                            <TextField

                                id="outlined-textarea"
                                label={`Saudação ${key + 1}`}
                                multiline

                                value={button.content}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        }
                                    },
                                    width: '100%'
                                }}
                                onChange={(e) => editarInputResposta(e.target.value, key)}
                            />
                            <IconButton onClick={() => removerOpcion(key)}>
                                <IoMdClose size={20} color={'#fff'} />
                            </IconButton>

                        </Box>

                    ))}

                    <Button variant="text" onClick={newOpcion}>Mais opção</Button>
                </Stack>
            </Card>
        </ThemeProvider>

    )
}

const CardFinal = () => {

    const theme = createTheme({
        palette: {
            primary: {
                light: '#fff',
                main: '#FFF',
                dark: '#FFF',
                contrastText: '#fff',
            },
            secondary: {
                light: '#FFF',
                main: '#FFF',
                dark: '#FFF',
                contrastText: '#FFF',
            },
            action: {


            },
            text: {
                primary: "#FFF",
                secondary: "#FFF",
                disabled: "#FFF",
            }
        },
    });


    const { stateInicial, setInicial } = useContext(context)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const removerCard = (index) => {
        var copia = Object.assign({}, stateInicial);
        copia.questions.splice(index, 1)
        console.log(copia)
        handleClose()
        setInicial(copia)

    }

    const editarInputResposta = (value, id) => {
        var copia = Object.assign({}, stateInicial);
        stateInicial.final.buttons[id].content = value
        console.log(value)
        setInicial(copia)
    }

    const newOpcion = () => {
        var copia = Object.assign({}, stateInicial);

        stateInicial.final.buttons.push({
            content: ""
        })
        setInicial(copia)
    }

    const removerOpcion = (id) => {
        var copia = Object.assign({}, stateInicial);
        stateInicial.final.buttons.splice(id, 1)
        // console.log(copia)
        setInicial(copia)
    }

    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ minWidth: '40vw', backgroundColor: '#1976d2' }}>

                <CardContent>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ color: 'white' }}>
                            {stateInicial.final.title}
                        </Typography>
                    </Stack>


                </CardContent >

                <Stack spacing={2} padding={2}>

                    {stateInicial.final.buttons.map((button, key) => (
                        <Box key={key} sx={{ display: 'flex', alignItems: 'center' }} >
                            <TextField

                                id="outlined-textarea"
                                label={`Despedida ${key + 1}`}
                                multiline

                                value={button.content}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        }
                                    },
                                    width: '100%'
                                }}
                                onChange={(e) => editarInputResposta(e.target.value, key)}
                            />
                            <IconButton onClick={() => removerOpcion(key)}>
                                <IoMdClose size={20} color={'#fff'} />
                            </IconButton>

                        </Box>

                    ))}

                    <Button variant="text" onClick={newOpcion}>Mais opção</Button>
                </Stack>
            </Card>
        </ThemeProvider>

    )
}

function Validar(stateInicial) {

    //se inicial não está vazio
    if (stateInicial.inicial.buttons.length <= 0) {
        return ({
            erro: true
        })
    }

    //se final não está vazio
    if (stateInicial.final.buttons.length <= 0) {
        return ({
            erro: true
        })
    }

    //se limites não tem valor vazio
    for (const itemInicial of stateInicial.limites) {
        if (itemInicial.ddd.trim().length == 0) {
            return ({
                erro: true
            })
        }
        if (itemInicial.limite.toString().trim().length == 0) {
            return ({
                erro: true
            })
        }
    }
    for (const itemInicial of stateInicial.inicial.buttons) {
        if (itemInicial.content.trim().length == 0) {
            return ({
                erro: true
            })
        }
    }
    for (const quetion of stateInicial.questions) {
        if (quetion.content.trim().length == 0) {
            return ({
                erro: true
            })
        }
        if (quetion.buttons) {
            if (quetion.buttons.length <= 0) {
                return ({
                    erro: true
                })
            }
            for (const resposta of quetion.buttons) {
                if (resposta.content.trim().length == 0) {
                    return ({
                        erro: true
                    })
                }
            }
        }
        if (quetion.itens) {
            if (quetion.itens.length <= 0) {
                return ({
                    erro: true
                })
            }
            for (const resposta of quetion.itens) {
                if (resposta.content.trim().length == 0) {
                    return ({
                        erro: true
                    })
                }
            }
        }
    }

    for (const itemFinal of stateInicial.final.buttons) {
        if (itemFinal.content.trim().length == 0) {
            return ({
                erro: true
            })
        }
    }

    return "OK"
}
export default SearchWhatsApp