var MasteryCell = React.createClass({
  getInitialState: function () {
    return {
      points: 0
    }
  },
  onClick: function () {
    let updatedPoint = this.state.points + 1
    let maxPoints = this.props.maxPoints
    this.setState({points: maxPoints >= updatedPoint ? updatedPoint : maxPoints})
  },
  render: function () {
    return (
      <div className="mastery-cell" onClick={this.onClick}>
        <div className="mastery_icon zam-sprite-masteries zam-sprite-masteries-6111">
          <span style={{display: "inline-block", height: "50px", width: "50px"}} />
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
        <MasteryCell name="Fury" maxPoints="5"/>
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
     <div style={{overflow: "hidden", display: "flex", flexDirection: "row", height: "100%"}}>
       <MasteryTree name="Ferocity"
                    backgroundUrl="images/mastery-tree-1.jpg"/>
       <MasteryTree name="Cunning"
                    backgroundUrl="images/mastery-tree-2.jpg"/>
       <MasteryTree name="Resolve"
                    backgroundUrl="images/mastery-tree-3.jpg"/>
     </div>
   )
 }
})

ReactDOM.render( <MasteryPage />
               , document.getElementById('mastery-test')
               )