var ChampionImage = React.createClass({
  getClassName: function () {
    return this.props.isSelected ? 'champion-selected' : ''
  },
  onClick: function () {
    this.props.updateSelection()
  },
  render: function () {
    return (
      <img
        onClick={ this.onClick }
        className={ this.getClassName() }
        src={ "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/" + this.props.championName + ".png" }
        alt={ this.props.championName }/>
    )
  }
})

var ChampionsGrid = React.createClass({
  getInitialState: function () {
    return {
      champions: []
      , selectedChampion: ''
    }
  },
  componentDidMount: function () {
    $.get('/champions-by-name', function (result) {
      let championList = JSON.parse(result).slice(0, 10)

      this.setState({champions: championList})
    }.bind(this))
  },
  updateSelection: function (champion) {
    this.setState({selectedChampion: champion})
    return this.state
  },
  render: function () {
    let selectedChampion = this.state.selectedChampion
    let updateSelection = this.updateSelection

    return (
      <ul>
        {this.state.champions.map(function (champion) {
          return <ChampionImage
            key={ champion }
            isSelected={ champion === selectedChampion }
            updateSelection={ updateSelection.bind(null, champion) }
            championName={ champion }/>
        })}
      </ul>
    )
  }
})

window.ChampionsGrid = ChampionsGrid