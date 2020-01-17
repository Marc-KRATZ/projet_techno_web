import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core'

export default function SearchBar(){

handleChange = event => {
    console.log(event.taget.value)
}

return (
    <Autocomplete
        id="search-artists-songs"
        style={{ width: 400 }}
        renderInput={params => (
            <TextField
              {...params}
              label="Add a location"
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
          )}
    />
    )
}