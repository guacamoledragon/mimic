const ChampionImage = React.createClass({
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
  getInitialState: function () {
    return { champion: {} }
  },
  componentWillReceiveProps: function (props) {
    if(this.state.champion.id !== props.champion)
      $.get(`api/champion/${props.champion}`, champion => this.setState({champion}))
  },
  stats: function () {
    const humanStats = { hp: 'HP'
                       , mp: 'MP'
                       , hpregen: 'HP Regen'
                       , hpregenperlevel: 'HP Regen per Level'
                       , mpregen: 'MP Regen'
                       , mpregenperlevel: 'MP Regen per Level'
                       , mpperlevel: 'MP per Level'
                       , movespeed: 'Move Speed'
                       , attackspeedoffset: 'Attack Speed Offset'
                       , attackrange: 'Attack Range'
                       , attackdamageperlevel: 'Attack Damage per Level'
                       , attackspeedperlevel: 'Attack Speed per Level'
                       , crit: 'Crit'
                       , hpperlevel: 'HP per Level'
                       , spellblockperlevel: 'Magic Resist per Level'
                       , armorperlevel: 'Armor per Level'
                       , armor: 'Armor'
                       , spellblock: 'Magic Resist'
                       , attackdamage: 'Attack Damage'
                       , critperlevel: 'Crit per Level'
                       }
    let champion = this.state.champion
    return _.mapKeys(champion.stats, (value, key) => humanStats[key])
  },
  blurb: function () {
    return {__html: this.state.champion.blurb}
  },
  render: function () {
    let champion = this.state.champion
    let championDescription = <div className="col-md-4"></div>

    if(!_.isEmpty(champion)) {
      let championStats =
        _.transform(this.stats(), (result, value, stat) => {
        result.push(
          <tr key={stat}>
            <td className="row-header">{stat}</td>
            <td>{value}</td>
          </tr>
        )
      }, [])

      let masterySummary = (
        <div>
          <h2>Cunning</h2>
          <h2>Ferocity</h2>
          <h2>Resolve</h2>
        </div>
      )
      if(!_.isEmpty(this.props.masteryPage)) {
        masterySummary =
          _.map(this.props.masteryPage, (tree => {
            return (
              <div key={tree.name}>
                <h2>{tree.name}</h2>
                <ul>
                  {_.map(tree.descriptions, (desc => <li key={desc}>{desc}</li>))}
                </ul>
              </div>
            )
          }))
      }

      championDescription = (
        <div id="champion-stats">
          <div className="col-md-4">
            <img className="img-responsive"
                 src={`http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.key}_0.jpg`}
                 alt={champion.name} />
            <blockquote dangerouslySetInnerHTML={this.blurb()} />
          </div>
          <div className="col-md-8">
            <div>
              <ul className="nav nav-tabs navbar-right">
                <li className="active"><a href="#stats" data-toggle="tab">Stats Summary</a></li>
                <li className=""><a href="#mastery" data-toggle="tab">Mastery Summary</a></li>
              </ul>
              <div className="clearfix"></div>
              <div className="tab-content">
                <div className="tab-pane" id="stats">
                  <table className="table">
                    <tbody>
                    {championStats}
                    </tbody>
                  </table>
                </div>
                <div className="tab-pane active" id="mastery">
                  {masterySummary}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return championDescription
  }
})

const ChampionsGrid = React.createClass({
  getInitialState: function () {
    return {champions: []}
  },
  componentDidMount: function () {
    $.get('api/champions-by-name', champions => this.setState({champions}))
  },
  filterChampions: function (query) {
    this.setState({
      filteredChampions: this.state.champions.filter(champion => champion.name.toLowerCase().indexOf(query.toLowerCase()) != -1)
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
                key={ champion.id }
                isSelected={ champion.id === selectedChampion }
                updateSelection={ setSelectedChampion.bind(null, champion.id) }
                championName={ champion.key }/>
            })}
          </div>
        </div>
      </div>
    )
  }
})

window.ChampionsGrid = ChampionsGrid
window.ChampionStats = ChampionStats