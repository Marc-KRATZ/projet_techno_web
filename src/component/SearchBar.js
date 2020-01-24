import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { withStyles } from '@material-ui/styles';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink
  } from "react-router-dom";

  import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';
import PropTypes from 'prop-types';


import * as AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import * as AutosuggestHighlightParse from 'autosuggest-highlight/parse';


import Song from './Song';
import Artist from './Artist';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
    position: 'absolute',
    overflow: 'auto',
    maxHeight: 300,
  },
});



function ListItemLink(props) {
  const { icon, primary, to, picture } = props;
  const avatar = []
  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  if(picture !== ""){
    avatar.push(<Avatar src={picture}/>)
  } else {
    avatar.push(<Avatar><MusicNoteIcon/></Avatar>)
  }

  return (
    <li>
      <ListItem button >
        <ListItemAvatar>
          {avatar}
        </ListItemAvatar>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};



class SearchBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      focus: false
    }
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    if(event.target.value.length !== 0 ){
      (async () => {
        const response = await fetch('https://wasabi.i3s.unice.fr/search/fulltext/'+event.target.value);
        //await sleep(1e3); // For demo purposes.
        const data = await response.json();
        this.setState({
          suggestions: data
        });
      })();
    } else {
      this.setState({
        suggestions: []
      });
    }

  };

  ListItemLink = (to,primary,picture) => {
    //const { icon, primary, to, picture } = props;
    const avatar = []
    /*const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );*/
  
    if(picture !== ""){
      avatar.push(<Avatar src={picture}/>)
    } else {
      avatar.push(<Avatar><MusicNoteIcon/></Avatar>)
    }
  
    const coucou = "coucou"
    return (
      <li data-letter={primary} onClick={(e) => this.handleClick(e)}>
        <ListItem button >
          <ListItemAvatar>
            {avatar}
          </ListItemAvatar>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

  renderOption = () => {

    const suggestion = []
    if(this.state.suggestions.length!=="0"){
        console.log(this.state.suggestions.length)
      for (const [index, value] of this.state.suggestions.entries()) {
        if(value.title!=null){
          suggestion.push(this.ListItemLink("/Song/",value.title,value.picture))
        }else{
          suggestion.push(this.ListItemLink("/Artist/hello",value.name,value.picture))
        }
      }
    }

    return suggestion
  }

  focus = () => (
    this.setState({
      focus: true
    })
  )

  handleClick = (e) => (
    console.log(e.target.dataset)
  )

  render(){
    const { value, suggestions, focus } = this.state;
    const { classes } = this.props

    const liste = []
    
    if((suggestions.length !== 0) && focus){
      liste.push(
        <List className={classes.root} aria-label="secondary folders">
          {this.renderOption()}
        </List>
      )
    }else {
      liste.push(<div></div>)
    }
    console.log(suggestions)
    return (
      <Grid item xs={2}>
        <TextField
          placeholder="Search…"
          fullWidth
          value={value}
          onChange={this.handleChange}
          inputProps={{ 'aria-label': 'search'}}
          onFocus={this.focus}
          onBlur={this.blur}
        />
        {liste}
      </Grid>
    );

  }

}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
