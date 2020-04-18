import styled from 'styled-components';

export const Actions = styled.div`
   display: flex;
   justify-content: space-between;

   div.search {
      display: flex;
      align-items: center;
      width: 237px;
      padding: 9px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;

      button.search-button {
         display: flex;
         align-items: center;
         margin-right: 8px;
      }
   }

   button.add-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 142px;
      border-radius: 4px;
      background-color: #7d40e7;
      color: #fff;
      font-weight: 500;

      svg {
         margin-right: 5px;
      }
   }
   input::placeholder {
      color: #777;
   }
`;

export const Menu = styled.div`
   display: ${(props) => (props.visible ? 'block' : 'none')};
   position: absolute;
   background-color: #fff;
   border: 1px solid #00000026;
   border-radius: 4px;
   padding: 5px;
   box-shadow: 2px 2px 5px #8875;
`;

export const MenuItem = styled.div`
   display: flex;
   align-items: center;
   cursor: pointer;
   margin-bottom: 10px;
   color: #999;
   font-size: 14px;
   padding: 5px;

   svg {
      margin-right: 8px;
   }

   &:hover {
      background-color: rgba(0, 0, 0, 0.075);
`;

export const Button = styled.button`
   padding: 0 8px 4px;
   border-radius: 4px;

   &:hover {
      background-color: rgba(0, 0, 0, 0.1);
   }
`;
