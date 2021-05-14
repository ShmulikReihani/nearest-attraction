import Location from './components/Location/Location';
import Attractions from './components/Attractions/Attractions';
import { FavoriteContext } from './components/Context/FavoriteContext';
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/UI/Container/Container';

require('dotenv').config();

function App() {

  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  return (
    <Container>
      <FavoriteContext>
        <Switch>
          <Route path='/attractions' component={() => <Attractions propsLongitude={longitude} propsLatitude={latitude} />} />
          <Route path='/' component={() => <Location propsLongitude={{ longitude, setLongitude }} propsLatitude={{ latitude, setLatitude }} />} />
        </Switch>
      </FavoriteContext>
    </Container>
  );
}

export default App;
