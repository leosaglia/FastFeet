import { all, call, takeLatest, put } from 'redux-saga/effects';

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

      const { token, user } = response.data;

      api.defaults.Authorization = `Bearer ${token}`;

      yield put(SignInSuccess(token, user));

      history.push('/orders');
   } catch (err) {
      yield put(SignFailure());
   }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
