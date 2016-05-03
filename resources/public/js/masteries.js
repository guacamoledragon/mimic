var MasteryCell = React.createClass({
  getInitialState: function () {
    return { points: 0 }
  },
  onClick: function () {
    let updatedPoint = this.state.points + 1
    let maxPoints = this.props.maxPoints
    let points = maxPoints >= updatedPoint ? updatedPoint : 0
    this.setState({points})

    // Notify Parent that you got points!
    this.props.updateCellPoints(points)
  },
  spriteUrl: function (id) {
    return `http://ddragon.leagueoflegends.com/cdn/6.9.1/img/mastery/${id}.png`
  },
  render: function () {
    let cellClass = this.state.points ? "" : "mastery-none"
    return (
      <div className={`mastery-cell ${cellClass}`} onClick={this.onClick}>
        <div style={{backgroundImage: `url(${this.spriteUrl(this.props.id)})`}} className="mastery-icon">
          <span style={{display: "inline-block", height: "68px", width: "4px"}} />
          {this.props.maxPoints == 1 ? <span/> : <span className="mastery-rank unselectable">{this.state.points}/{this.props.maxPoints}</span>}
        </div>
      </div>
    )
  }
})

var MasteryRow = React.createClass({
  getInitialState: function () {
    return { cellPoints: {} }
  },
  updatePoints: function (key, points) {
    let cellPoints = _.assign(this.state.cellPoints, {[key]: points})
    this.setState({cellPoints})
    let sumPoints = _.values(cellPoints).reduce((c,p) => c + p)

    // Notify parent that you got points!
    this.props.updateRowPoints(sumPoints)
  },
  render: function () {
    let filteredCells =
      this.props.cells.filter(cell => {
        return cell.name.length
      })
    return (
      <div className="mastery-row">
        {filteredCells.map(cell => <MasteryCell updateCellPoints={this.updatePoints.bind(null, cell.name)}
                                                key={cell.name} {...cell} />)}
      </div>
    )
  }
})

var MasteryTree = React.createClass({
  getInitialState: function () {
    return { points: 0
           , backgroundUrl: `images/${this.props.img}`
           , rowPoints: {}
           }
  },
  updatePoints: function (key, points) {
    let rowPoints = _.assign(this.state.rowPoints, {[key]: points})
    let totalPoints = _.values(rowPoints).reduce((c,p) => c + p)

    this.setState({rowPoints, points: totalPoints})
  },
  render: function () {
    let tree = this.props.tree
    return (
      <div className="mastery-tree" style={{background: `url(${this.state.backgroundUrl})`}}>
        {this.props.rows.map((row, idx) => {
          let key = `${tree}-${idx}`
          return <MasteryRow updateRowPoints={this.updatePoints.bind(null, key)} key={key} cells={row} />
        })}
        <div className="mastery-tree-title">{this.props.name}: {this.state.points}</div>
      </div>
    )
  }
})

const MasteryPage = React.createClass({
  getInitialState: function () {
    return {trees: []}
  },
  componentDidMount: function () {
    $.get('api/mastery-tree', serverTrees => {
      let trees =
        Object.keys(serverTrees).map(tree => {
          return { name: tree
                 , img: `${tree.toLowerCase()}.jpg`
                 , rows: serverTrees[tree]
                 }
        })

      console.log(trees)
      this.setState({trees})
    })
  },
  render: function () {
    return (
      <div className="mastery-page-outer">
        <div className="mastery-page-flex">
          {this.state.trees.map(function (tree) {
            return <MasteryTree key={tree.name} tree={tree.name} {...tree} />
          })}
        </div>
      </div>
    )
  }
})

ReactDOM.render( <MasteryPage />
               , document.getElementById('mastery-test')
               )