import React, { Component } from 'react';
import { AppBar, InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Home from './Home';
import Artist from './Artist'

class Navigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            search : ""
        }
    }
  
    componentDidMount() {

    }

    handleChangeSearch = event => {
        console.log(event.target.value);
        this.setState({ 
            search: event.target.value
        })
    }


    render(){
        return (
        <Router>
            <AppBar position="static">
            <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/artist/:name">Artist</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <div>

            <InputBase
              placeholder="Search…"
              onChange={this.handleChangeSearch}
              inputProps={{ 'aria-label': 'search' }}
            />

          </div>
            </ul>
            {this.state.search}
            
          </AppBar>

          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/artist/:name">
            <Artist />
          </Route>
          <Route path="/users">
            <Home />
          </Route>
        </Switch>
        </Router>
        
        )
    }
}

export default Navigation

/** 


export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
**/




