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
import GoogleMaps from './GoogleMaps';
import SearchBar from './SearchBar';

class Navigation extends Component{
    constructor(props){
        super(props)
        this.state = {
            search : "",
            completion: [],
            focus: false
        }
    }

    componentDidMount() {
      
    }

    focus = () => (
      this.setState({ 
        focus: true
      })
    )

    blur = () => (
      this.setState({ 
        focus: false
      })
    )

    handleChangeSearch = event => {
        console.log("entry: "+event.target.value);
        this.setState({
            search: event.target.value
        })
        console.log("test: "+event.target)
        if(event.target.value===""){
            this.setState({
                completion: []
            })
        } else {
            axios.get("https://wasabi.i3s.unice.fr/search/fulltext/"+event.target.value)
            .then(res => {  
                this.setState({ 
                    completion: res.data 
                });
            })
        }

    }

    /**suggestion = () => {
      const comp = []
      comp.push(<div>)
      if (this.state.completion.length != 0){
        comp.push("test")
      }


      comp.push(</div>)
      return comp
    }**/

    render(){

      const suggestion = []
      
      console.log(this.state.completion)

      console.log("longueur" + this.state.completion.length + " type : "+ typeof(this.state.completion.length))

      if(this.state.focus == true){
        if(this.state.completion.length!=="0"){
            console.log(this.state.completion.length)
          for (const [index, value] of this.state.completion.entries()) {
            if(value.title!=null){
              suggestion.push(<li key={index}>{value.title}</li>)
            }else{
              suggestion.push(<li key={index}>{value.name}</li>)
            }
          }
        }
      }

      //https://material-ui.com/components/autocomplete/#google-maps-place


        return (
        <Router>
            <AppBar position="static">
            <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/artist/test">Artist</Link>
            </li>l
            <li>
              <Link to="/users">Users</Link>
            </li>
            <div>

            <InputBase
              placeholder="Search…"
              onChange={this.handleChangeSearch}
              onFocus={this.focus}
              onBlur={this.blur}
              inputProps={{ 'aria-label': 'search' }}
            />
            <div id="suggestion">
              {suggestion}
            </div>
            <SearchBar/>


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