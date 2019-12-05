import React, { Component } from 'react';
import { AppBar, InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import axios from 'axios';


import Home from './Home';
import Artist from './Artist';
import Completion from './Completion';

class Navigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            search : "",
            completion: []
        }
    }

    componentDidMount() {
      /*fetch("https://wasabi.i3s.unice.fr/search/fulltext/"+this.state.search)
        .then(response => response.json())
        .then(data => this.setState({ completion: data.data }))*/
    }

    handleChangeSearch = event => {
        console.log(event.target.value);
        this.setState({
            search: event.target.value
        })
        axios.get("https://wasabi.i3s.unice.fr/search/fulltext/"+event.target.value)
          .then(res => {
              this.setState({ completion: res.data });
          })
        console.log(this.state.completion)
    }


    render(){

      let comp = (<div>)
      if (this.state.completion.length != 0){
        for(var i=0;i<this.state.completion.length-1;i++){
          if (this.state.completion[i].title=null){
            comp.push(<a>{this.state.completion[0].name}</a>)
          }
        }
        //comp = (<a>{this.state.completion[0].name}</a>)
      }
      comp.push(</div>)

        return (
        <Router>
            <AppBar position="static">
            <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/artist/test">Artist</Link>
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
            <div id="suggestion">
              {comp}
            </div>


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
