import React, { useContext } from 'react'
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ItemListContainer } from "./pages/itemListContainer/itemListContainer"
import { PageNotFound} from './pages/pageNotFound/pageNotFound'
import { Cart } from './pages/cart/cart'
import { Profile } from './pages/profile/profile.jsx'
import {Context} from './context/context.jsx'
import {Login} from './pages/login/login.jsx'
import {Signup} from './pages/signup/signup.jsx'
import {ItemDetailContainer} from './pages/itemDetailContainer/itemDetailContainer.jsx'


function Routes() {

  const {sessionUser} = useContext(Context)

  if(sessionUser) {
    return (<Router>
      <Switch>
        <Route exact path='/'>
          <ItemListContainer/>
        </Route> 
        <Route path='/category/:categoryId'>
          <ItemListContainer/>
        </Route>
        <Route path='/item/:itemId'>
          <ItemDetailContainer/>
        </Route>
        <Route path='/carrito'>
          <Cart/>
        </Route>
        <Route path='/profile'>
          <Profile/>
        </Route>
        <Route path='*'>
          <PageNotFound/>
        </Route>
      </Switch>
    </Router>)
  }
  else {
    return(<Router>
      <Switch>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='*'>
          <Login/>
        </Route>
      </Switch>
    </Router>)
  }

}

export { Routes };
