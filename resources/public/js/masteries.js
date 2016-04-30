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
        <div style={{backgroundImage: `url(${this.spriteUrl(this.props.id)})`}} className="mastery_icon">
          <span style={{display: "inline-block", height: "68px", width: "4px"}} />
          <span className="mastery_rank unselectable">{this.state.points}/{this.props.maxPoints}</span>
        </div>
      </div>
    )
  }
})

var MasteryRow = React.createClass({
  render: function () {
    return (
      <div className="mastery-row">
        <MasteryCell name="Fury" id="6111" maxPoints="5"/>
      </div>
    )
  }
})

var MasteryTree = React.createClass({
  getInitialState: function () {
    return {
      points: 0
    }
  },
  render: function () {
    return (
      <div>
        <div className="mastery-tree" style={{background: 'url(' + this.props.backgroundUrl + ')'}}>
          <MasteryRow />
          <div className="mastery-tree-title">{this.props.name}: {this.state.points}</div>
        </div>
      </div>
    )
  }
})

const MasteryPage = React.createClass({
 render: function () {
   return (
     <div className="mastery-page-outer">
       <div className="mastery-page-flex">
         <MasteryTree name="Ferocity"
                      backgroundUrl="images/mastery-tree-1.jpg"/>
         <MasteryTree name="Cunning"
                      backgroundUrl="images/mastery-tree-2.jpg"/>
         <MasteryTree name="Resolve"
                      backgroundUrl="images/mastery-tree-3.jpg"/>
       </div>
     </div>
   )
 }
})

ReactDOM.render( <MasteryPage />
               , document.getElementById('mastery-test')
               )