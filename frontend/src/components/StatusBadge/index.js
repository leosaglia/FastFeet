import React from 'react';

import { Container } from './styles';

export default function StatusBadge({ canceled, endDate, startDate }) {
   let status;
   let className;
   if (canceled) {
      status = 'CANCELADA';
      className = 'red';
   } else if (endDate) {
      status = 'ENTREGUE';
      className = 'green';
   } else if (startDate) {
      status = 'RETIRADA';
      className = 'blue';
   } else {
      status = 'PENDENTE';
      className = 'yellow';
   }
   return (
      <Container>
         <span className={className}>
            <div />
            {status}
         </span>
      </Container>
   );
}
