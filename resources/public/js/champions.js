var ChampionImage = React.createClass({
  render: function() {
    return (
      <img src={"http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/" + this.props.championName + ".png"} alt={this.props.championName}/>
    )
  }
})


window.ChampionImage = ChampionImage