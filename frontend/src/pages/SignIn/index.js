import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { Form } from '@unform/web';
import Input from '../../components/Form/input';

import logo from '../../assets/logo.PNG';

import { SignInRequest } from '../../store/modules/auth/actions';

export default function SignIn() {
   const loading = useSelector((state) => state.auth.loading);
   const formRef = useRef(null);
   const dispatch = useDispatch();

   async function handleSubmit(data) {
      try {
         formRef.current.setErrors({});

         const schema = Yup.object().shape({
            email: Yup.string()
               .email('Insira um e-mail válido')
               .required('O e-mail é obrigatório'),
            password: Yup.string().required('A senha é obrigatória'),
         });

         await schema.validate(data, {
            abortEarly: false, // Realizar todas as validações
         });

         const { email, password } = data;

         dispatch(SignInRequest(email, password));
      } catch (err) {
         const validationErrors = {};

         if (err instanceof Yup.ValidationError) {
            err.inner.forEach((error) => {
               validationErrors[error.path] = error.message;
            });

            formRef.current.setErrors(validationErrors);
         }
      }
   }

   return (
      <>
         <img src={logo} alt="FastFeet" />
         <Form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor="email">
               SEU E-MAIL
               <Input
                  name="email"
                  type="email"
                  placeholder="exemplo@email.com"
               />
            </label>
            <label htmlFor="password">
               SUA SENHA
               <Input
                  name="password"
                  type="password"
                  placeholder="***********"
               />
            </label>

            <button type="submit">
               {loading ? 'Carregando...' : 'Entrar no Sistema'}
            </button>
         </Form>
      </>
   );
}
