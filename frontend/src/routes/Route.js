import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import authLayout from '../pages/_layouts/auth';
import defaultLayout from '../pages/_layouts/default';

export default function RouteWrapper({
   component: Component,
   isPrivate,
   ...rest
}) {
   const signed = true;

   if (!signed && isPrivate) {
      return <Redirect to="/" />;
   }

   if (signed && !isPrivate) {
      return <Redirect to="/orders" />;
   }

   const Layout = signed ? authLayout : defaultLayout;

   return (
      <Route
         {...rest}
         render={(props) => (
            <Layout>
               <Component {...props} />
            </Layout>
         )}
      />
   );
}

RouteWrapper.propTypes = {
   isPrivate: PropTypes.bool,
   component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
      .isRequired,
};

RouteWrapper.defaultProps = {
   isPrivate: false,
};