import React from "react"
import { Link } from 'react-router-dom'
import './index.css'
import '../../styles/global.css'

import addElement from '../../assets/add_circle-24px.svg'
import searchOffElement from '../../assets/search_off.svg'
import personResearch from '../../assets/personReasearch.svg'
import adminIcon from '../../assets/manage_accounts.svg'

import painelElement from '../../assets/summarize-24px.svg'
import timeElement from '../../assets/time.svg'

import { FaRobot, FaCalendarTimes } from "react-icons/fa";
import { RiFilePaper2Fill, RiAddCircleFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { AiFillClockCircle } from "react-icons/ai";
import { TiGroup } from "react-icons/ti";

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

function SideNav() {

    var style = {
        menuItem: {
            height: 60
        }
    }
    return (
        <div id="menu_painel">
            <div id="menuElements">
                <MenuList>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <RiFilePaper2Fill color="#102C49" size={20} style={{ marginRight: 20 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/painel">
                                Painel de Controle
                            </Link>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <RiAddCircleFill color="#102C49" size={20} style={{ marginRight: 20 }} />

                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/novaPesquisa">
                                Nova Pesquisa
                            </Link>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <AiFillClockCircle color="#102C49" size={20} style={{ marginRight: 20 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/aguardandoLiberacao">
                                Em liberação
                            </Link>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <FaCalendarTimes color="#102C49" size={20} style={{ marginRight: 20 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/pesquisasEncerradas">
                                Encerradas
                            </Link>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <TiGroup color="#102C49" size={20} style={{ marginRight: 20 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/novaPesquisa">
                                <Link to="/pesquisadores">
                                    Pesquisadores
                                </Link>
                            </Link>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <MdAdminPanelSettings color="#102C49" size={20} style={{ marginRight: 20 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/novaPesquisa">
                                <Link to="/admin">
                                    Acesso Administrativo
                                </Link>
                            </Link>
                        </ListItemText>
                    </MenuItem>
                    <MenuItem sx={style.menuItem}>
                        <ListItemIcon>
                            <FaRobot color="#102C49" size={20} style={{ marginRight: 20 }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Link to="/novaPesquisa">
                                <Link style={{ textAlign: 'center' }} to="/whatsapp">
                                    WhatsApp
                                </Link>
                            </Link>
                        </ListItemText>
                    </MenuItem>
                </MenuList>
            </div>

        </div>
    )
}

export default SideNav