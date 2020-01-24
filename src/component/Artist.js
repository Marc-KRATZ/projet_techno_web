import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";



class Artist extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render(){
      //const { name } = useParams();
        return (<div>Artist</div>)
    }
}

export default Artist
