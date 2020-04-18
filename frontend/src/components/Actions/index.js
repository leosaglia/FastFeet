import React, { useState } from 'react';

import {
   MdSearch,
   MdAdd,
   MdVisibility,
   MdEdit,
   MdDeleteForever,
} from 'react-icons/md';

import { Actions, Button, Menu, MenuItem } from './styles';

const icons = {
   Visualizar: <MdVisibility size={15} color="#8E5BE8" />,
   Editar: <MdEdit size={15} color="#4D85EE" />,
   Excluir: <MdDeleteForever size={15} color="#DE3B3B" />,
};

export function MainActions() {
   return (
      <Actions>
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
      </Actions>
   );
}

export function ToggleMenu({ children }) {
   const [visible, setVisible] = useState(false);

   function handleToggleVisible() {
      setVisible(!visible);
   }

   return (
      <>
         <Button type="button" onClick={handleToggleVisible}>
            ...
         </Button>
         <Menu visible={visible}>{children}</Menu>
      </>
   );
}

export function ItemModal({ text }) {
   return (
      <MenuItem>
         {icons[text]}
         <span>{text}</span>
      </MenuItem>
   );
}
