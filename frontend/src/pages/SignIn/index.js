import React from 'react';

import logo from '../../assets/logo.PNG';

export default function SignIn() {
   return (
      <>
         <img src={logo} alt="FastFeet" />
         <form action="">
            <label htmlFor="email">
               SEU E-MAIL
               <input
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
               />
            </label>
            <label htmlFor="password">
               SUA SENHA
               <input
                  name="password"
                  type="password"
                  placeholder="***********"
               />
            </label>

            <button type="submit">Entrar no Sistema</button>
         </form>
      </>
   );
}
