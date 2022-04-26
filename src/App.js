import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import isAutheticated from '../src/services/auth'

import Home from "./pages/Home"
import Login from "./pages/Login";
import Painel from "./pages/Painel";
import New_Search from "./pages/New_search";
import LiberationResearchs from "./pages/LiberationResearchs"
import Search from "./pages/Search/index";
import GraphicPage from "./pages/GraphicPage";
import EditSearch from "./pages/EditSearch"
import Localization from "./pages/Localization";
import CloseSSearch from "./pages/CloseSearch"
import Researchs from "./pages/Researchs"
import Admin from "./pages/Perfil"
import Report from "./pages/Report"
import ResponseSearchPage from "./pages/ResponseSearchPage";
import Logic from "./pages/Logic";
import SearchWhatsAppPA from "./pages/SearchWhatsAppPA";


const PrivateRoute = ({roles, component: Component, ...rest}) =>{
  const role = localStorage.getItem('role')
  return <Route {...rest} render={props=>(
    isAutheticated() ? (
      roles.includes(role) ? (
        <Component {...props} />
      ):(
        <Redirect to={{pathname: '/painel', state: {from: props.location}}}/>
      )
    ) : (
      <Redirect to={{pathname: '/acesso', state: {from: props.location}}}/>
    )
  )} />
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact={true}  path="/" component={Home}/>

          <Route path="/acesso" component={Login} />
          
          <PrivateRoute path="/painel" component={Painel} roles={['Master','Slave']}/>
          <PrivateRoute path="/novaPesquisa" component={New_Search} roles={['Master','Slave']} />
          <PrivateRoute path="/aguardandoLiberacao" component={LiberationResearchs} roles={['Master','Slave']}/>
          <PrivateRoute path="/pesquisa/:id" component={Search} roles={['Master']}/>
          <PrivateRoute path="/grafico/:id" component={GraphicPage} roles={['Master']} />
          <PrivateRoute path="/editarPesquisa/:id" component={EditSearch} roles={['Master']} />
          <PrivateRoute path="/localizacao/:id" component={Localization} roles={['Master']}/>
          <PrivateRoute path="/pesquisasEncerradas" component={CloseSSearch} roles={['Master']}/>
          <PrivateRoute path="/pesquisadores" component={Researchs} roles={['Master','Slave']}/>
          <PrivateRoute path="/admin" component={Admin} roles={['Master']}/>

          <PrivateRoute path="/requerimento/:id" component={Report} roles={['Master']}/>
          <PrivateRoute path="/logica/:id" component={Logic} roles={['Master']}/>
          <PrivateRoute path="/whatsapp/:id" component={SearchWhatsAppPA} roles={['Master']}/>
          <Route path="/resposta/:id" component={ResponseSearchPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
