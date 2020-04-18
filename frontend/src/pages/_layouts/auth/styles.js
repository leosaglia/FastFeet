import styled from 'styled-components';

export const Wrapper = styled.div`
   background: #f5f5f5;
   height: 100%;

   main {
      width: 95%;
      max-width: 1200px;
      margin: 0 auto;

      h1 {
         margin: 35px 0;
         font-size: 24px;
         font-weight: bold;
         color: #444;
      }
   }
`;

export const Table = styled.table`
   margin-top: 20px;
   width: 100%;
   text-align: left;
   font-size: 16px;

   border-spacing: 0 20px;

   th {
      padding: 0 15px;
      color: #444;
   }

   td {
      padding: 15px;
      color: #666;
   }

   tbody tr {
      background-color: #fff;
   }
`;
