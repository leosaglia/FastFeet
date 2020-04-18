import React, { useEffect, useState } from 'react';

import MainActions from '../../components/MainActions';

import api from '../../services/api';

export default function Orders() {
   const [orders, setOrders] = useState([]);

   useEffect(() => {
      async function loadOrders() {
         const response = await api.get('packages');

         const data = response.data.map((order) => ({
            ...order,
            fomattedId: `#${
               order.id < 10 ? +'0' + String(order.id) : order.id
            }`,
         }));

         setOrders(data);
      }
      loadOrders();
   }, []);

   return (
      <>
         <h1>Gerenciando encomendas</h1>
         <MainActions />
         <table>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Destinatários</th>
                  <th>Entregador</th>
                  <th>Cidade</th>
                  <th>Estado</th>
                  <th>Status</th>
                  <th align="center">Ações</th>
               </tr>
            </thead>
            <tbody>
               {orders.map((order) => {
                  let status;
                  let className;
                  if (order.canceled_at) {
                     status = 'CANCELADA';
                     className = 'red';
                  } else if (order.end_date) {
                     status = 'ENTREGUE';
                     className = 'green';
                  } else if (order.start_date) {
                     status = 'RETIRADA';
                     className = 'blue';
                  } else {
                     status = 'PENDENTE';
                     className = 'yellow';
                  }

                  return (
                     <tr>
                        <td>{order.fomattedId}</td>
                        <td>{order.destinatario.name}</td>
                        <td>{order.entregador.name}</td>
                        <td>{order.destinatario.address_city}</td>
                        <td>{order.destinatario.uf}</td>
                        <td>
                           <span className={className}>
                              <div />
                              {status}
                           </span>
                        </td>
                        <td align="center">...</td>
                     </tr>
                  );
               })}
            </tbody>
         </table>
      </>
   );
}
