var MasteryCell = React.createClass({
  render: function () {
    return null
  }
})

var MasteryRow = React.createClass({
  render: function () {
    return (
      <MasteryCell />
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
        <MasteryRow />
        <div style={{background: 'url(' + this.props.backgroundUrl + ')'}} className="mastery-tree-title">{this.props.name}: {this.state.points}</div>
      </div>
    )
  }
})


ReactDOM.render( <MasteryTree name="Ferocity"
                              backgroundUrl="images/mastery-tree-1.jpg"/>
               , document.getElementById('mastery-test')
               )