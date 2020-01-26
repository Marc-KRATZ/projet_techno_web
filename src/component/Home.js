import React, { Component } from 'react';
import Chart from "react-google-charts";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            pieOptions : {
                title: "",
                pieHole: 0.6,
                slices: [
                  {
                    color: "#2BB673"
                  },
                  {
                    color: "#d91e48"
                  },
                  {
                    color: "#007fad"
                  },
                  {
                    color: "#e9a227"
                  }
                ],
                legend: {
                  position: "bottom",
                  alignment: "center",
                  textStyle: {
                    color: "233238",
                    fontSize: 14
                  }
                },
                tooltip: {
                  showColorCode: true
                },
                fontName: "Roboto"
              },
            lang:[],
            song:0,
            album:0,
            artist:0,
            load: false
        }
    }
  
    componentDidMount() {
        fetch('https://wasabi.i3s.unice.fr/api/v1/_stats/song/count')
        .then(response => response.json())
        .then(data => this.setState({song:data[0].value,load:true}))

        fetch('https://wasabi.i3s.unice.fr/api/v1/_stats/album/count')
        .then(response => response.json())
        .then(data => this.setState({album:data[0].value,load:true}))

        fetch('https://wasabi.i3s.unice.fr/api/v1/_stats/artist/count')
        .then(response => response.json())
        .then(data => this.setState({artist:data[0].value,load:true}))

        fetch('https://wasabi.i3s.unice.fr/api/v1/song/lyrics/language/popularity')
        .then(response => response.json())
        .then(data => {
            const lang=[]
            const l1= []
            const l2= []
            lang.push([
                'Element',
                'Number',
                {
                  sourceColumn: 0,
                  role: 'annotation',
                  type: 'string',
                  calc: 'stringify',
                },
              ])
            //l2.push("Test")
            for (let [key, value] of Object.entries(data)) {
                lang.push([value._id,value.sum,null])
                //l2.push(value.sum)
            }
            //lang.push(l1)
            //lang.push(l2)
            console.log(lang)
            this.setState({lang:lang})
        })
    }

    render(){
        const{pieOptions, artist, song, album, lang} = this.state

        return (<div>
            <Paper elevation={0} square style={{ padding: "3%",
          margin: 'auto',
          }}alignItems="center" direction="column" justify="center">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                

            <Chart
          chartType="PieChart"
          data={[["Age", "Weight"], ["Songs", song], ["Albums", album],["Artists", artist]]}
          options={pieOptions}
          graph_id="PieChartd"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
        
        </Grid>
        <Grid item xs={12}>
        
        <Chart
            chartType="Bar"
            width={'100%'}
            height={'1000px'}
            data={lang}
            options={{
                title: 'Density of Precious Metals, in g/cm^3',
                bar: { groupWidth: '80%' },
                legend: { position: 'none' },
            }}
            graph_id="BarChart"
            
            
            
            
            legend_toggle
        />
        
        </Grid>
        
        

        </Grid>
        </Paper>
        
        </div>)
    }
}

export default Home