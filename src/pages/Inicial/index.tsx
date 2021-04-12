import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

import './styles.css';
import api from '../../services/api';

function Inicial () {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(()=>{
    api.get('/connections').then(response =>{
      const total = response.data;
      setTotalConnections(total);
    });
  },[totalConnections]);

  return (
    <div>
      <div id="page-landing">
        <div id="page-landing-content" className="container">
          
          <div className="title-container">
            <h1>MONEYTORIA</h1>
            <h2>Sua plataforma de monitoria online</h2>
          </div>

          <div className="buttons-container">
            <Link to="/study" className="study">
              Estudar
            </Link>

            <Link to="/give-classes" className="give-classes">
              Dar aulas
            </Link>
          </div>

          <span className="total-connections">
            Total de {totalConnections} conexões já realizadas
          </span>

        </div>
      </div>
    
    </div>
  );
}

export default Inicial;