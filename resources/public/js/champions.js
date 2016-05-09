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
        className={ `champion ${this.getClassName()}` }
        src={ "http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/" + this.props.championName + ".png" }
        alt={ this.props.championName }/>
    )
  }
})

const ChampionSearch = React.createClass({
  onChange: function () {
    let query = this.refs.search.value
    this.props.search(query)
  },
  componentWillMount: function () {
    this.onChange = _.debounce(this.onChange, 100)
  },
  render: function () {
    return (
      <div className="input-group stylish-input-group">
        <input type="text" className="form-control" placeholder="Search" ref="search" onChange={this.onChange}/>
        <span className="input-group-addon">
          <div>
            <span className="glyphicon glyphicon-search" />
          </div>
        </span>
      </div>
    )
  }
})

const ChampionStats = React.createClass({
  getDefaultProps: function () {
    return { champion: 'Aatrox'
           , blurb: `Aatrox is a legendary warrior, one of only five that remain of an ancient race known as the Darkin. He
              wields his massive blade with grace and poise, slicing through legions in a style that is hypnotic to
              behold. With each foe felled, Aatrox's ...`
           }
  },
  render: function () {
    return (
      <div>
        <div className="col-md-4">
          <img className="img-responsive"
               src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${this.props.champion}_0.jpg`}
               alt={this.props.champion} />
            <blockquote>
              {this.props.blurb}
            </blockquote>
        </div>
        <div className="col-md-8">
          <table className="table table">
            <tbody>
            <tr>
              <td className="row-header">attackrange</td>
              <td>125</td>
            </tr>
            <tr>
              <td className="row-header">mpperlevel</td>
              <td>40</td>
            </tr>
            <tr>
              <td className="row-header">mp</td>
              <td>322.2</td>
            </tr>
            <tr>
              <td className="row-header">attackdamage</td>
              <td>51</td>
            </tr>
            <tr>
              <td className="row-header">hp</td>
              <td>574.24</td>
            </tr>
            <tr>
              <td className="row-header">hpperlevel</td>
              <td>93</td>
            </tr>
            <tr>
              <td className="row-header">attackdamageperlevel</td>
              <td>2.8</td>
            </tr>
            <tr>
              <td className="row-header">armor</td>
              <td>26.88</td>
            </tr>
            <tr>
              <td className="row-header">mpregenperlevel</td>
              <td>0.8</td>
            </tr>
            <tr>
              <td className="row-header">hpregen</td>
              <td>8.26</td>
            </tr>
            <tr>
              <td className="row-header">critperlevel</td>
              <td>0</td>
            </tr>
            <tr>
              <td className="row-header">spellblockperlevel</td>
              <td>0</td>
            </tr>
            <tr>
              <td className="row-header">mpregen</td>
              <td>6</td>
            </tr>
            <tr>
              <td className="row-header">attackspeedperlevel</td>
              <td>2.2</td>
            </tr>
            <tr>
              <td className="row-header">spellblock</td>
              <td>30</td>
            </tr>
            <tr>
              <td className="row-header">movespeed</td>
              <td>335</td>
            </tr>
            <tr>
              <td className="row-header">attackspeedoffset</td>
              <td>-0.02</td>
            </tr>
            <tr>
              <td className="row-header">crit</td>
              <td>0</td>
            </tr>
            <tr>
              <td className="row-header">hpregenperlevel</td>
              <td>0.75</td>
            </tr>
            <tr>
              <td className="row-header">armorperlevel</td>
              <td>3.0</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
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
  filterChampions: function (query) {
    this.setState({
      filteredChampions: this.state.champions.filter(champion => champion.toLowerCase().indexOf(query.toLowerCase()) != -1)
    })
  },
  render: function () {
    let selectedChampion = this.props.selectedChampion
    let setSelectedChampion = this.props.setSelectedChampion

    let champions = this.state.filteredChampions ? this.state.filteredChampions : this.state.champions

    return (
      <div className="col-md-3 section">
        <div className="row">
          <div className="col-md-12">
            <ChampionSearch search={this.filterChampions} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 champion-grid">
            {champions.map(function (champion) {
              return <ChampionImage
                key={ champion }
                isSelected={ champion === selectedChampion }
                updateSelection={ setSelectedChampion.bind(null, champion) }
                championName={ champion }/>
            })}
          </div>
        </div>
      </div>
    )
  }
})

window.ChampionsGrid = ChampionsGrid
window.ChampionStats = ChampionStats