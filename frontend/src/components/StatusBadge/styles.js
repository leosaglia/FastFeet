import styled from 'styled-components';

export const Container = styled.div`
   span {
      height: 30px;
      width: 110px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      font-size: 14px;
      font-weight: 500;

      div {
         height: 10px;
         width: 10px;
         border-radius: 50%;
      }
   }

   span.red {
      color: #de3b3b;
      background-color: #fab0b0;
      div {
         background-color: #de3b3b;
      }
   }
   span.green {
      color: #2ca42b;
      background-color: #dff0df;
      div {
         background-color: #2ca42b;
      }
   }
   span.blue {
      color: #4d85ee;
      background-color: #bad2ff;
      div {
         background-color: #4d85ee;
      }
   }
   span.yellow {
      color: #c1bc35;
      background-color: #f0f0df;
      div {
         background-color: #c1bc35;
      }
   }
`;
