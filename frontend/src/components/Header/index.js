import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import logo from '../../assets/logo-small.svg';

export default function Header() {
   return (
      <Container>
         <Content>
            <nav>
               <img src={logo} alt="FastFeet" />
               <Link to="/orders">ENCOMENDAS</Link>
               <Link to="/deliverymen">ENTREGADORES</Link>
               <Link to="/recipients">DESTINATÁRIOS</Link>
               <Link to="/problems">PROBLEMAS</Link>
            </nav>
            <aside>
               <strong>Admin FastFeet</strong>
               <button type="button">Sair do Sistema</button>
            </aside>
         </Content>
      </Container>
   );
}
