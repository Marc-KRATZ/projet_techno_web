import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import parse from 'autosuggest-highlight/parse';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


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
          filterOptions = {x=>x}
          options={completion}
          renderInput={params => (
              <TextField
                {...params}
                label="Find an artist or song"
                variant="outlined"
                fullWidth
                onChange={e=>{this.handleChange(e)}}
              />
            )}
            renderOption={option=> {
      
              return (
                <Grid container alignItems="center">
                  {option.title != null ?
                    <a href={"/Artist/Song/"+option.title}><Grid item xs>{option.title}</Grid></a>
                    :
                    <a href={"/Artist/"+option.name}><Grid item xs>{option.name}</Grid></a>
                  }
                </Grid>
              );
            }}
      />
    )      
  }
 
  
}

export default SearchBar;