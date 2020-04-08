import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
   /** Reactotron start */
   const enhancer =
      process.env.NODE_ENV === 'development'
         ? compose(
              console.tron.createEnhancer(),
              applyMiddleware(...middlewares)
           )
         : applyMiddleware(...middlewares);
   /** Reactotron end */

   return createStore(reducers, enhancer);
};
