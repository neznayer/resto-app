import React from 'react';
import {MainPage, CartPage, ItemPage} from '../pages';
import AppHeader from '../app-header';

import Background from './food-bg.jpg';
import { Route, Switch } from 'react-router-dom';

const App = () => {
    
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <Switch>
                <Route
                    path='/'
                    component={MainPage}
                    exact/>
                <Route
                    path='/cart'
                    component={CartPage}
                    />
                <Route
                    path='/:id'
                    component={ItemPage} //item page poluchaet props.match.param.id iz /:id
                    />
                
            </Switch>
        </div>
    )
}

export default App;