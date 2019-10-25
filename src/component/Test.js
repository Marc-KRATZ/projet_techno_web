import React, { Component } from 'react';

class Test extends Component{
    constructor(props){
        super(props)
    }
  
    componentDidMount() {
        fetch('http://localhost:8080/api/restaurants')
          .then(response => response.json())
          .then(data => this.setState({ data: data.data, isLoading: false }));
    }

    render(){
        return (<div>lol</div>)
    }
}

export default Test