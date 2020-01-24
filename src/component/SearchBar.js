import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MusicNoteIcon from '@material-ui/icons/MusicNote';


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
      <ListItem button component={renderLink}>
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


  renderOption = () => {

    const suggestion = []
    if(this.state.suggestions.length!=="0"){
        console.log(this.state.suggestions.length)
      for (const [index, value] of this.state.suggestions.entries()) {
        if(value.title!=null){
          suggestion.push(<ListItemLink to="/Song/" primary={value.title} picture={value.picture} />)
        }else{
          suggestion.push(<ListItemLink to="/Artist/hello" primary={value.name} picture={value.picture} />)
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

  blur = () => (
    this.setState({
      focus: false
    })
  )

  render(){
    const { value, suggestions, focus } = this.state;

    return (
      <div>
        <TextField
          placeholder="Search…"
          value={value}
          onChange={this.handleChange}
          inputProps={{ 'aria-label': 'search'}}
          onFocus={this.focus}
        />
        <List aria-label="secondary folders">
          {focus ? this.renderOption():""}
        </List>
      </div>
    );

  }

}

export default SearchBar;
