import React from "react";
import brasao from '../../assets/Brasao_UFPA.jpg'
import paru from '../../assets/paru.jpeg'
import './index.css'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
const styles = StyleSheet.create({
    conteiner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        margin: 0,
        paddingTop: 0
    },
    conteinerTitle: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagemReport: {
        minHeight: 70,
        maxHeight: 70,
        minWidth: 100,
        objectFit: 'contain'
    },
    titleReport: {
        textAlign: 'center',
        fontSize: 10,
        margin: 0,
        padding: 0,
    },
    
});
const Header = () => {
    return (
        <View style={styles.conteiner}>
            <Image style={styles.imagemReport} src={brasao} alt="" />
            <View style={styles.conteinerTitle}>
                <Text style={styles.titleReport}>
                    UNIVERSIDADE FEDERAL DO PARÁ
                </Text>
                <Text style={styles.titleReport}>
                    INSTITUTO DE CIÊNCIAS SOCIAIS APLICADAS
                </Text>
                <Text style={styles.titleReport}>
                    PROGRAMA DE APOIO À REFORMA URBANA - PARU
                </Text>
                <Text style={styles.titleReport}>
                    PROJETO DE REGULARIZAÇÃO FUNDIÁRIA DE INTERESSE SOCIAL
                </Text>
                <Text style={styles.titleReport}>
                    – REURB -S
                </Text>
               
            </View>
            <Image style={styles.imagemReport} src={paru} alt="" />
        </View>
    )
}

export default Header