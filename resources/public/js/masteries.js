var MasteryCell = React.createClass({
  getInitialState: function () {
    return {
      points: 0
    }
  },
  onClick: function () {
    let updatedPoint = this.state.points + 1
    let maxPoints = this.props.maxPoints
    this.setState({points: maxPoints >= updatedPoint ? updatedPoint : 0})
  },
  spriteUrl: function (id) {
    return `http://ddragon.leagueoflegends.com/cdn/6.9.1/img/mastery/${id}.png`
  },
  render: function () {
    return (
      <div className="mastery-cell" onClick={this.onClick}>
        <div style={{backgroundImage: `url(${this.spriteUrl(this.props.id)})`}} className="mastery-icon">
          <span style={{display: "inline-block", height: "68px", width: "4px"}} />
          <span className="mastery-rank unselectable">{this.state.points}/{this.props.maxPoints}</span>
        </div>
      </div>
    )
  }
})

var MasteryRow = React.createClass({
  render: function () {
    let filteredCells =
      this.props.cells.filter(cell => {
        return cell.name.length
      })
    return (
      <div className="mastery-row">
        {filteredCells.map(cell => <MasteryCell key={cell.name} {...cell} />)}
      </div>
    )
  }
})

var MasteryTree = React.createClass({
  getInitialState: function () {
    return { points: 0
           , backgroundUrl: `images/${this.props.img}`
           }
  },
  render: function () {
    let tree = this.props.tree
    return (
      <div className="mastery-tree" style={{background: `url(${this.state.backgroundUrl})`}}>
        {this.props.rows.map(function (row, idx) {
          return <MasteryRow key={`${tree}-${idx}`} cells={row} />
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