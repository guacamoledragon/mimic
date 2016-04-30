var ChampionImage = React.createClass({
  render: function() {
    return (
      <img src={"http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/" + this.props.championName + ".png"} alt={this.props.championName}/>
    )
  }
})

var ChampionsGrid = React.createClass({
  getInitialState: function () {
    return { champions: [] }
  },
  componentDidMount: function () {
   $.get('/champions-by-name', function (result) {
     this.setState({champions: JSON.parse(result)})
   }.bind(this))
  },
  render: function () {
    return (
      <ul>
        {this.state.champions.map(function (champion) {
          return <ChampionImage key={champion} championName={champion} />
        })}
      </ul>
    )
  }
})

window.ChampionsGrid = ChampionsGrid