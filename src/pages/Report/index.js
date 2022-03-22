import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Headerrs";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './style.css'
import { saveAs } from 'file-saver'

import firebase from 'firebase';


import { Document, Page, Font, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';

var NUMERO_PAGINAS = 10

const styles = StyleSheet.create({
  view: {
    margin: 0,
    height: '100vh',
    width: '100vw',
  },
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  pageDados: {
    width: '100%',
    padding: 30,
    border: '0.5px solid #bbbbbb',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 50,
  },
  conteinerDados: {
    width: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 10,
    fontFamily: 'Lato Bold'
  },
  conjunto: {
    marginBottom: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 10,
    margin: 2
  },
  row: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    margin: 0,
  },
  rodape: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  ass: {
    width: 100,
    height: 100,
    objectFit: 'contain'
  }
});
Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const Welcome = () => {
  const paramUrl = useParams();
  const [search, setSearch] = useState([]);
  const [count, setCount] = useState(1);
  const [searchDados, setSearchDados] = useState([]);
  const [page, setPage] = React.useState(1);
  const [menor, setMenor] = React.useState(1);
  const [maior, setMaior] = React.useState(1);
  const [imagem, setImagem] = React.useState();
  const handleChange = (event, value) => {
    setMaior(value * NUMERO_PAGINAS - 1)
    setMenor(value * NUMERO_PAGINAS - NUMERO_PAGINAS)
    setPage(value);
  };




  useEffect(() => {

    var questions = []
    axios
      .get(`${process.env.REACT_APP_HOST}/respostaPesquisa/${paramUrl.id}`)
      .then((res) => {
        res.data.map((pesq) => {
          pesq.questions.map((quest) => {
            questions.push(quest.query)
          })
        })
        setSearch(questions)

      });

    axios
      .get(`${process.env.REACT_APP_HOST}/respostaPesquisa/62110d8cb8c6276b71bd9bb0`)
      .then((res) => {
        setSearchDados(res.data);
      });

  }, [paramUrl.id]);

  useEffect(() => {
    var Paginas = Math.ceil((search.length + searchDados.length) / NUMERO_PAGINAS)
    setMaior(1 * NUMERO_PAGINAS - 1)
    setMenor(1 * NUMERO_PAGINAS - NUMERO_PAGINAS)
    console.log(Paginas)
    setCount(Paginas)
  }, [search, searchDados])

  function toBase64String(img) {
    console.log(img)
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    console.log(dataURL)
    return dataURL;
  }

  function downloadImage(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function (e) {
      if (this.status == 200) {
        var reader = new FileReader();
        reader.onload = function (e) {
          callback.call(callback, e.target.result);
        }
        reader.readAsDataURL(this.response);
      }
    };
    xhr.send();
  }

  return (

    <PDFViewer style={styles.view}>
      <Document>


        {/* {searchDados.map((search, index) => (
            index >= menor && index <= maior &&

            <div key={`${index}search`} className="page-dados">
              
            

              </div>
              <div className="rodape">
                <img className="ass" src={search.questions[63].query.response.res[0]} alt="" />
                <div className="linha"></div>
                <Text className="text-ass">ASSINATURA DO DECLARANTE</Text>

                <Text style={{ textAlign: 'right', width: '100%', marginRight: 40 }} className="text-ass">{index}</Text>
              </div>
            </div>

          ))} */}
        {searchDados.map((search, index) => (
          <Page size="A4" style={styles.pageDados}>
            <Header />
            <Text style={{ ...styles.title, marginBottom: 10 }}>Requerimento</Text>
            <View style={styles.conteinerDados}>
              <Text style={styles.title}>DADOS PESSOAIS DO REQUERENTE:</Text>
              <View style={styles.conjunto}>
                <Text style={styles.text}>NOME: {search.questions[2].query.response.res[0]}</Text>
                <Text style={styles.text}>NACIONALIDADE: {search.questions[4].query.response.res[0]}</Text>
                <Text style={styles.text}>SEXO: {search.questions[1].query.response.res[0]}</Text>
                <Text style={styles.text}>COR: {search.questions[5].query.response.res[0]}</Text>
                <Text style={styles.text}>DATA DE NASCIMENTO: {search.questions[6].query.response.res[0]}</Text>
                <Text style={styles.text}>CPF: {search.questions[3].query.response.res[0]}</Text>
                <Text style={styles.text}>Nº DA CARTEIRA DE IDENTIDADE: {search.questions[7].query.response.res[0]}</Text>
                <Text style={styles.text}>ÓRGÃO EMISSOR DA CARTEIRA DE IDENTIDADE: {search.questions[8].query.response.res[0]}</Text>
                <Text style={styles.text}>DATA DA EMISSÃO DA CARTEIRA DE IDENTIDADE: {search.questions[9].query.response.res[0]}</Text>
                <Text style={styles.text}>NOME DA MÃE: {search.questions[10].query.response.res[0]}</Text>
                <Text style={styles.text}>NOME DO PAI: {search.questions[11].query.response.res[0]}</Text>
                <Text style={styles.text}>ESCOLARIDADE: {search.questions[12].query.response.res[0]}</Text>
                <Text style={styles.text}>PROFISSÃO OU OCUPAÇÃO: {search.questions[13].query.response.res[0]}</Text>
                <Text style={styles.text}>ESTADO CIVIL: {search.questions[14].query.response.res[0]}</Text>
                <Text style={styles.text}>RENDA MENSAL: {search.questions[29].query.response.res[0]}</Text>
                <Text style={styles.text}>BENEFÍCIO SOCIAL: {search.questions[30].query.response.res[0]}</Text>
                <Text style={styles.text}>N° DE PESSOAS QUE RESIDE NO DOMICÍLIO: {search.questions[32].query.response.res[0]}</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>ENDEREÇO COMPLETO: {search.questions[57].query.response.res[0]}</Text>
                  <Text style={styles.text}>BAIRRO: {search.questions[58].query.response.res[0]}</Text>
                  <Text style={styles.text}>CIDADE: {search.questions[59].query.response.res[0]}</Text>
                </View>
              </View>
              <Text style={styles.title}>SE CASADO, OU ESTEJA EM UMA UNIÃO ESTÁVEL:</Text>
              <Text style={styles.title}>DADOS DO (DA) CÔNJUGE OU COMPANHEIRO (A):</Text>

              <View style={styles.conjunto}>
                <Text style={styles.text}>NOME: {search.questions[20].query.response.res[0]}</Text>
                <Text style={styles.text}>CPF: {search.questions[21].query.response.res[0]}</Text>
                <Text style={styles.text}>NACIONALIDADE: {search.questions[22].query.response.res[0]}</Text>
                <Text style={styles.text}>DATA DE NASCIMENTO: {search.questions[23].query.response.res[0]}</Text>
                <Text style={styles.text}>Nº DA CARTEIRA DE IDENTIDADE: {search.questions[24].query.response.res[0]}</Text>
                <Text style={styles.text}>ÓRGÃO EMISSOR DA CARTEIRA DE IDENTIDADE: {search.questions[25].query.response.res[0]}</Text>
                <Text style={styles.text}>DATA DA EMISSÃO DA CARTEIRA DE IDENTIDADE: {search.questions[26].query.response.res[0]}</Text>
                <Text style={styles.text}>NOME DA MÃE: {search.questions[27].query.response.res[0]}</Text>
                <Text style={styles.text}>NOME DO PAI: {search.questions[28].query.response.res[0]}</Text>
              </View>

              <Text style={styles.title}>DADOS DO CASAMENTO, SE HOUVER:</Text>

              <View style={styles.conjunto}>
                <Text style={styles.text}>PERÍDO DA UNIÃO ESTÁVEL: {search.questions[15].query.response.res[0]}</Text>
                <Text style={styles.text}>DADOS DO CASAMENTO: {search.questions[16].query.response.res[0]}</Text>
                <Text style={styles.text}>DATA DO CASAMENTO: {search.questions[17].query.response.res[0]}</Text>
                <Text style={styles.text}>MATRICULA DO CASAMENTO: {search.questions[18].query.response.res[0]}</Text>
                <Text style={styles.text}>CARTÓRIO ONDE FOI CELEBRADO O CASAMENTO: {search.questions[19].query.response.res[0]}</Text>
              </View>
              <View style={styles.rodape}>

                {search.questions[63].query.response.res[0].length > 0 ?
                  <Image style={styles.ass} src={search.questions[63].query.response.res[0]} alt="err" />
                  :
                  <View style={styles.ass}>

                  </View>
                }


                <View style={{
                  height: 1,
                  backgroundColor: '#333333',
                  width: 200,
                  marginBottom: 10
                }}></View>
                <Text style={{
                  fontSize: 10
                }}>ASSINATURA DO DECLARANTE</Text>

                <Text style={{ textAlign: 'right', width: '100%', marginRight: 40, fontSize: 5 }} className="text-ass">{index}</Text>
              </View>
            </View>
          </Page>
        ))}

        {search.map((question, index) => (
          question.response.type === "image" &&
          <Page key={`${index}QUESTION`} style={styles.pageDados}>

            <Header />
            <View style={{
              width: '100%',
              display: "flex",
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden'
            }}>
              <Text style={{ ...styles.title, marginBottom: 10 }}>Documentos</Text>
              <Image style={{height: 600, objectFit: 'contain'}} src={question.response.res[0]} alt="" />
            </View>
            <Text style={{ textAlign: 'right', width: '100%', marginRight: 40, fontSize: 5 }} className="text-ass">{index}</Text>
          </Page>
        ))}

      </Document>
    </PDFViewer>


    /* {search.map((question, index) => (
      index >= menor && index <= maior &&
      question.response.type === "image" &&
      <div key={`${index}QUESTION`} className="page-dados">

        <Header />
        <div style={{
          width: '100%',
          height: '100%',
          display: "flex",
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <h4 style={{ marginBottom: 100 }}>Documentos</h4>
          <img className="foto" src={question.response.res[0]} alt="" />
        </div>
        <Text style={{ textAlign: 'right', width: '100%', marginRight: 40 }} className="text-ass">{index}</Text>
      </div>
    ))}
*/
    /* <Stack width={'100%'} spacing={2} alignItems='center'>
      <Typography>Page: {page}</Typography>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack> */

  );
};

export default Welcome;
