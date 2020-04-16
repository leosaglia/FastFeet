export function SignInRequest(email, password) {
   return {
      type: '@auth/SIGN_IN_REQUEST',
      payload: { email, password },
   };
}

export function SignInSuccess(token) {
   return {
      type: '@auth/SIGN_IN_SUCCESS',
      payload: { token },
   };
}

export function SignFailure() {
   return {
      type: '@auth/SIGN_FAILURE',
   };
}

export function SignOut() {
   return {
      type: '@auth/SIGN_OUT',
   };
}
