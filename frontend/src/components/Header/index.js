import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Container, Content } from './styles';

import { SignOut } from '../../store/modules/auth/actions';

import logo from '../../assets/logo-small.svg';

export default function Header() {
   const dispatch = useDispatch();

   function handleSignOut() {
      dispatch(SignOut());
   }

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
               <button type="button" onClick={handleSignOut}>
                  Sair do Sistema
               </button>
            </aside>
         </Content>
      </Container>
   );
}
