import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';

import Inicial from './pages/Inicial';
import MonitorList from './pages/MonitorList';
import MonitorForm from './pages/MonitorForm';

function Routes (){
  return(
    <BrowserRouter>
        <Route path="/" component={Inicial} exact  />
        <Route path="/study" component={MonitorList} />
        <Route path="/give-classes" component={MonitorForm} />
    </BrowserRouter>
  );
}

export default Routes;