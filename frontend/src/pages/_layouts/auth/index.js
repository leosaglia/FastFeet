import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../../components/Header';
import { Wrapper } from './styles';

export default function authLayout({ children }) {
   return (
      <Wrapper>
         <Header />
         {children}
      </Wrapper>
   );
}

authLayout.propTypes = {
   children: PropTypes.element.isRequired,
};
