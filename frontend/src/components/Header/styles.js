import styled from 'styled-components';

export const Container = styled.div`
   background: #fff;
   padding: 0 30px;
   border: 1px solid #ddd;
`;

export const Content = styled.header`
   height: 64px;
   padding: 15px 0;

   display: flex;
   align-items: center;
   justify-content: space-between;

   nav {
      display: flex;
      align-items: center;

      img {
         padding-right: 30px;
         margin-right: 10px;
         border-right: 1px solid #ddd;
      }

      a {
         font-size: 13.5px;
         color: #999;
         margin-left: 20px;
         font-weight: 500;

         &:hover {
            color: #444;
         }
      }
   }

   aside {
      strong {
         display: block;
         font-size: 14px;
         font-weight: 500;
         color: #666;
      }

      button {
         display: block;
         margin-top: 5px;
         margin-left: auto;
         font-size: 12px;
         font-weight: 500;
         background: none;
         color: #de3b3b;

         &:hover {
            color: #fd3b2f;
         }
      }
   }
`;
