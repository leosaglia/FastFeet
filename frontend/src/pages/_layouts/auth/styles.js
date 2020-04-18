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

   table {
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
      }

      tbody tr {
         background-color: #fff;
      }
   }
`;
