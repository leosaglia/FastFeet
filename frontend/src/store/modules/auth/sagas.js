import { all, call, takeLatest, put } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { SignInSuccess, SignFailure } from './actions';

export function* signIn({ payload }) {
   try {
      const { email, password } = payload;

      const response = yield call(api.post, 'sessions', {
         email,
         password,
      });

      const { token } = response.data;

      api.defaults.Authorization = `Bearer ${token}`;

      yield put(SignInSuccess(token));

      history.push('/orders');
   } catch (err) {
      toast.warn('Falha na tentativa de login. Tente novamente.');
      yield put(SignFailure());
   }
}

export function setToken({ payload }) {
   if (!payload) return;
   const { token } = payload.auth;

   if (token) {
      api.defaults.Authorization = `Bearer ${token}`;
   }
}

export function SignOut() {
   history.push('/');
}

export default all([
   takeLatest('persist/REHYDRATE', setToken),
   takeLatest('@auth/SIGN_IN_REQUEST', signIn),
   takeLatest('@auth/SIGN_OUT', SignOut),
]);
