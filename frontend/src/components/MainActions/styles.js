import styled from 'styled-components';

export const Container = styled.div`
   div.main-actions {
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
   }

   input::placeholder {
      color: #777;
   }
`;
