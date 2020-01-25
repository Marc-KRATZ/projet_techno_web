import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Song from './Song';
import Home from './Home';
import { Avatar } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';


class Artist extends Component{
    constructor(props){
        super(props)
        this.state = {
          data: [],
          load: false
        }
    }

    componentDidMount(prevProps) {
      //if(prevProps.value !== this.props.value) {
      fetch('https://wasabi.i3s.unice.fr/api/v1/artist/name/'+this.props.match.params.name)
        .then(response => response.json())
        .then(data => this.setState({data:data,load:true}))
     //}
    }

    componentDidUpdate(prevProps, prevState, snapshot){
      if (prevProps.location.pathname!==this.props.location.pathname){
        fetch('https://wasabi.i3s.unice.fr/api/v1/artist/name/'+this.props.match.params.name)
        .then(response => response.json())
        .then(data => this.setState({data:data,load:true}))
      }
    }

    render(){
      const {load, data,name} = this.state
      const info = []
      const picture = []
      const resume = []
      if(load && data !==null){
        console.log(data)
        if (data.picture.big){
          picture.push(<Avatar  alt="complex" src={data.picture.big} style={{margin: 'auto',
          display: 'block',
          width: "100%",
          height: "100%"}}/>)
        }
        if (data.dbp_abstract){
          resume.push(data.dbp_abstract)
        }
      }
      //<Avatar src={data.picture.big}/> 
      return (
        <div>
        <Paper elevation={0} square style={{ padding: "3%",
          margin: 'auto',
          }}>
        <Grid container spacing={3}>
          <Grid item>
            <ButtonBase>
              {picture}
            </ButtonBase>
          </Grid>

          <Grid item xs={12} sm container>
            <Grid item xs>
              <Typography variant="h4" gutterBottom>
                {data !== null ? data.name : ""}
              </Typography>
            </Grid>

            
          </Grid>

          <Grid item xs={12}><Divider variante="middle" /></Grid>
          <Grid item xs={12}>
            <Typography variant="h5" style={{textAlign: 'center'}} gutterBottom>
              Résumé
            </Typography>
            <Typography variant="body1" style={{textAlign: 'justify'}} gutterBottom>{resume}</Typography>
            
          </Grid>


        </Grid>
        </Paper>

        </div>
    
      )
    }
}

export default withRouter(Artist)
