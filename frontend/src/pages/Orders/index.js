import React, { useEffect, useState } from 'react';

import { MainActions, ToggleMenu, ItemModal } from '../../components/Actions';
import StatusBadge from '../../components/StatusBadge';

import { Table } from '../_layouts/auth/styles';

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
         <Table>
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
               {orders.map((order) => (
                  <tr key={order.id}>
                     <td>{order.fomattedId}</td>
                     <td>{order.destinatario.name}</td>
                     <td>{order.entregador.name}</td>
                     <td>{order.destinatario.address_city}</td>
                     <td>{order.destinatario.uf}</td>
                     <td>
                        <StatusBadge
                           canceled={order.canceled_at}
                           endDate={order.end_date}
                           startDate={order.start_date}
                        />
                     </td>
                     <td align="center">
                        <ToggleMenu>
                           <ItemModal text="Visualizar" />
                           <ItemModal text="Editar" />
                           <ItemModal text="Excluir" />
                        </ToggleMenu>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
      </>
   );
}
