import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./components/Headerrs";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './style.css'

var NUMERO_PAGINAS = 2

const Welcome = () => {
  const paramUrl = useParams();
  const [search, setSearch] = useState([]);
  const [count, setCount] = useState(1);
  const [searchDados, setSearchDados] = useState([]);
  const [page, setPage] = React.useState(1);
  const [menor, setMenor] = React.useState(1);
  const [maior, setMaior] = React.useState(1);
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

  useEffect(()=>{
    var Paginas = Math.ceil((search.length + searchDados.length) / NUMERO_PAGINAS)
    setMaior(1 * NUMERO_PAGINAS - 1)
    setMenor(1 * NUMERO_PAGINAS - NUMERO_PAGINAS)
    console.log(Paginas)
    setCount(Paginas)
  },[search, searchDados])

  return (
    <div className="conteiner-page">

      {searchDados.map((search, index) => (
        index >= menor && index <= maior &&
        <div key={`${index}search`} className="page-dados">
          <Header />
          <h4>Requerimento</h4>
          <div className="conteiner-dados">
            <p><strong>DADOS PESSOAIS DO REQUERENTE:</strong></p>

            <div className="conjunto">
              <p>NOME: {search.questions[2].query.response.res[0]}</p>
              <p>NACIONALIDADE: {search.questions[4].query.response.res[0]}</p>
              <p>SEXO: {search.questions[1].query.response.res[0]}</p>
              <p>COR: {search.questions[5].query.response.res[0]}</p>
              <p>DATA DE NASCIMENTO: {search.questions[6].query.response.res[0]}</p>
              <p>CPF: {search.questions[3].query.response.res[0]}</p>
              <p>Nº DA CARTEIRA DE IDENTIDADE: {search.questions[7].query.response.res[0]}</p>
              <p>ÓRGÃO EMISSOR DA CARTEIRA DE IDENTIDADE: {search.questions[8].query.response.res[0]}</p>
              <p>DATA DA EMISSÃO DA CARTEIRA DE IDENTIDADE: {search.questions[9].query.response.res[0]}</p>
              <p>NOME DA MÃE: {search.questions[10].query.response.res[0]}</p>
              <p>NOME DO PAI: {search.questions[11].query.response.res[0]}</p>
              <p>ESCOLARIDADE: {search.questions[12].query.response.res[0]}</p>
              <p>PROFISSÃO OU OCUPAÇÃO: {search.questions[13].query.response.res[0]}</p>
              <p>ESTADO CIVIL: {search.questions[14].query.response.res[0]}</p>
              <p>RENDA MENSAL: {search.questions[29].query.response.res[0]}</p>
              <p>BENEFÍCIO SOCIAL: {search.questions[30].query.response.res[0]}</p>
              <p>N° DE PESSOAS QUE RESIDE NO DOMICÍLIO: {search.questions[32].query.response.res[0]}</p>
              <div className="row">
                <p>ENDEREÇO COMPLETO: {search.questions[57].query.response.res[0]}</p>
                <p>BAIRRO: {search.questions[58].query.response.res[0]}</p>
                <p>CIDADE: {search.questions[59].query.response.res[0]}</p>
              </div>
            </div>

            <p><strong>SE CASADO, OU ESTEJA EM UMA UNIÃO ESTÁVEL:</strong></p>
            <p><strong>DADOS DO (DA) CÔNJUGE OU COMPANHEIRO (A):</strong></p>

            <div className="conjunto">
              <p>NOME: {search.questions[20].query.response.res[0]}</p>
              <p>CPF: {search.questions[21].query.response.res[0]}</p>
              <p>NACIONALIDADE: {search.questions[22].query.response.res[0]}</p>
              <p>DATA DE NASCIMENTO: {search.questions[23].query.response.res[0]}</p>
              <p>Nº DA CARTEIRA DE IDENTIDADE: {search.questions[24].query.response.res[0]}</p>
              <p>ÓRGÃO EMISSOR DA CARTEIRA DE IDENTIDADE: {search.questions[25].query.response.res[0]}</p>
              <p>DATA DA EMISSÃO DA CARTEIRA DE IDENTIDADE: {search.questions[26].query.response.res[0]}</p>
              <p>NOME DA MÃE: {search.questions[27].query.response.res[0]}</p>
              <p>NOME DO PAI: {search.questions[28].query.response.res[0]}</p>
            </div>

            <p><strong>DADOS DO CASAMENTO, SE HOUVER:</strong></p>

            <div className="conjunto">
              <p>PERÍDO DA UNIÃO ESTÁVEL: {search.questions[15].query.response.res[0]}</p>
              <p>DADOS DO CASAMENTO: {search.questions[16].query.response.res[0]}</p>
              <p>DATA DO CASAMENTO: {search.questions[17].query.response.res[0]}</p>
              <p>MATRICULA DO CASAMENTO: {search.questions[18].query.response.res[0]}</p>
              <p>CARTÓRIO ONDE FOI CELEBRADO O CASAMENTO: {search.questions[19].query.response.res[0]}</p>
            </div>

          </div>
          <div className="rodape">
            <img className="ass" src={search.questions[63].query.response.res[0]} alt="" />
            <div className="linha"></div>
            <p className="text-ass">ASSINATURA DO DECLARANTE</p>

            <p style={{ textAlign: 'right', width: '100%', marginRight: 40 }} className="text-ass">{index}</p>
          </div>
        </div>

      ))}

      {search.map((question, index) => (
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
          <p style={{ textAlign: 'right', width: '100%', marginRight: 40 }} className="text-ass">{index}</p>
        </div>
      ))}

      <Stack width={'100%'} spacing={2} alignItems='center'>
        <Typography>Page: {page}</Typography>
        <Pagination count={count} page={page} onChange={handleChange} />
      </Stack>
    </div>
  );
};

export default Welcome;
