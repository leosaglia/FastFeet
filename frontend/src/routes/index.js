import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Orders from '../pages/Orders';
import DeliveryMen from '../pages/DeliveryMen';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

export default function Routes() {
   return (
      <Switch>
         <Route path="/" exact component={SignIn} />
         <Route path="/orders" component={Orders} isPrivate />
         <Route path="/deliveryMen" component={DeliveryMen} isPrivate />
         <Route path="/recipients" component={Recipients} isPrivate />
         <Route path="/problems" component={Problems} isPrivate />
      </Switch>
   );
}
