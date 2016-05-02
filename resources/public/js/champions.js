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
    return {champions: []}
  },
  componentDidMount: function () {
    $.get('api/champions-by-name', champions => {
      let championList = champions.slice(0, 10)

      this.setState({champions})
    })
  },
  render: function () {
    let selectedChampion = this.props.selectedChampion
    let setSelectedChampion = this.props.setSelectedChampion

    return (
      <ul>
        {this.state.champions.map(function (champion) {
          return <ChampionImage
            key={ champion }
            isSelected={ champion === selectedChampion }
            updateSelection={ setSelectedChampion.bind(null, champion) }
            championName={ champion }/>
        })}
      </ul>
    )
  }
})

window.MimicApp = React.createClass({
  getInitialState: function () {
    return {
      selectedChampion: ''
    }
  },
  setSelectedChampion: function (selectedChampion) {
    this.setState({ selectedChampion })
  },
  render: function () {


    return (
      <div>
        <ChampionsGrid setSelectedChampion={ this.setSelectedChampion } selectedChampion={ this.state.selectedChampion }/>
      </div>
    )
  }
})