import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Song extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {

    }

    render(){
        return (<div>Song</div>)
    }
}

export default withRouter(Song)
