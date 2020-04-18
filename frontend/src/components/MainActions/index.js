import React from 'react';

import { MdSearch, MdAdd } from 'react-icons/md';

import { Container } from './styles';

export default function MainActions() {
   return (
      <Container>
         <div className="main-actions">
            <div className="search">
               <button type="button" className="search-button">
                  <MdSearch size={20} color="#777" />
               </button>
               <input type="text" placeholder="Buscar por encomendas" />
            </div>
            <button type="button" className="add-button">
               <MdAdd size={20} color="#fff" />
               CADASTRAR
            </button>
         </div>
      </Container>
   );
}
