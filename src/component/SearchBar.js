import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ListItem from '@material-ui/core/ListItem';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


class SearchBar extends React.Component {

  constructor(props){
    super(props)
    this.state = {
        search : "",
        completion: [],
        focus: false,
    }
  }

sleep(delay = 0) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

  async handleChange (event) {
    console.log(event.target.value)
    //(async () => {
      const response = await fetch("https://wasabi.i3s.unice.fr/search/fulltext/"+event.target.value)
      await this.sleep(1e3);
      const responses = await response.json();
      responses.map((response,index) => (console.log(index+" "+response)))
      console.log(responses)
      this.setState({completion: responses})

    //})();


  }

  render(){
    const {completion} = this.state;
    return (
      <Autocomplete
          id="search-artists-songs"
          style={{ width: 400 }}
          getOptionLabel={option => (option.title != null ? option.title : option.name)}
          filterOptions = {x=>x}
          options={completion}
          autoComplete
          includeInputInList
          freeSolo
          disableOpenOnFocus
          renderInput={params => (
              <TextField
                {...params}
                select
                label="Select"
                fullWidth
                onChange={e=>{this.handleChange(e)}}
              />
            )}
            renderOption={option=> {

              return (<Link to="/Artist/Song/">
                  {option.title != null ?
                    //<Grid container alignItems="center">
                      <Grid item>{option.title}</Grid>
                      //</Grid>
                    :
                    //<Grid container alignItems="center">
                    <Grid item>{option.name}</Grid>
                    //</Grid>

                  }
                  </Link>
              );
            }}
      />
    )
  }


}

export default SearchBar;
