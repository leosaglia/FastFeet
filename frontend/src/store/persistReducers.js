import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (reducers) => {
   const persistConfig = {
      key: 'FastFeet',
      storage,
      whitelist: ['auth'],
   };

   const persistedReducer = persistReducer(persistConfig, reducers);

   return persistedReducer;
};
