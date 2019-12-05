import React, { Component } from 'react';
import { AppBar, InputBase, IconButton, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class Completion extends Component{
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
      fetch("https://wasabi.i3s.unice.fr/search/fulltext/"+this.props.search)
        .then(response => response.json())
        .then(data => this.setState({ data: data.data }))
        console.log(this.state.data)
    }

    render(){
      const { search } = this.props
      return( <a>search {search}</a>)
    }

  }

export default Completion
