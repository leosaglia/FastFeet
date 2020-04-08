import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
   background: #7d40e7;
   height: 100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   max-width: 360px;
   padding: 60px 30px;
   background: #fff;
   border-radius: 4px;

   img {
      width: 259px;
      margin-bottom: 42px;
   }

   form {
      label {
         font-size: 14px;
         font-weight: 500;
         color: #444;

         input {
            width: 100%;
            padding: 12px 15px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
         }
      }

      button {
         width: 100%;
         padding: 12px 0;
         border-radius: 4px;
         font-size: 15px;
         font-weight: 500;
         background: #7d40e7;
         color: #fff;
         transition: background 0.3s;

         &:hover {
            background: ${darken(0.05, '#7d40e7')};
         }
      }
   }
`;
