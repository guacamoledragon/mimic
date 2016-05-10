var MasteryCell = React.createClass({
  getInitialState: function () {
    return { points: 0 }
  },
  onClick: function () {
    let updatedPoint = this.state.points + 1
    let maxPoints = this.props.maxPoints
    let points = maxPoints >= updatedPoint ? updatedPoint : 0

    let description = ''
    if(0 < points) {
      description = this.props.description[points - 1]
    }

    let cellState = {points, description}
    this.setState(cellState)
    this.props.updateCellPoints(cellState)
  },
  onRightClick: function (event) {
    // TODO: Update this one too!!!
    event.preventDefault()

    let updatedPoint = this.state.points - 1
    let points = updatedPoint >= 0 ? updatedPoint : this.props.maxPoints
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
      <div className={`mastery-cell ${cellClass}`} onClick={this.onClick} onContextMenu={this.onRightClick}>
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
    return { cellPoints: {}, cellDescriptions: {} }
  },
  updatePoints: function (key, cell) {
    let cellPoints = _.assign(this.state.cellPoints, {[key]: cell.points})
    let cellDescriptions = _.assign(this.state.cellDescriptions, {[key]: cell.description})
    let rowSummary = {cellPoints, cellDescriptions}
    this.setState(rowSummary)

    let sumPoints = _.values(cellPoints).reduce((c,p) => c + p)
    let descriptions = _
      .chain(cellDescriptions)
      .filter(d => !_.isEmpty(d))
      .map()
      .value()

    // Notify parent that you got points!
    this.props.updateRowPoints({points: sumPoints, descriptions})
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
           , rowDescriptions: {}
           }
  },
  updatePoints: function (key, row) {
    let rowPoints = _.assign(this.state.rowPoints, {[key]: row.points})
    let rowDescriptions = _.assign(this.state.rowDescriptions, {[key]: row.descriptions})

    let points = _.values(rowPoints).reduce((c,p) => c + p)
    let descriptions = _.flatMap(rowDescriptions)

    this.setState({rowPoints, rowDescriptions, points: points})
    this.props.updateTree({points, descriptions})
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
      this.setState({trees})
    })
  },
  updateTree: function (treeName, summary) {
    let treeIdx = -1
    let tree = _
      .chain(this.state.trees)
      .filter((tree, i) => {
        if(tree.name === treeName) {
          treeIdx = i
          return true
        }

        return false
      })
      .first()
      .value()

    let treeSummary = _.assign({}, summary, tree)
    let trees = _.assign([], this.state.trees)
    trees[treeIdx] = treeSummary

    this.props.updatePage(trees)
    this.setState({trees})
  },
  render: function () {
    window.trees = this.state.trees
    return (
      <div className="mastery-page-outer">
        <div className="mastery-page-flex">
          {this.state.trees.map(tree => {
            return <MasteryTree updateTree={this.updateTree.bind(null, tree.name)} key={tree.name} tree={tree.name} {...tree} />
          })}
        </div>
      </div>
    )
  }
})

window.MasteryPage = MasteryPage
