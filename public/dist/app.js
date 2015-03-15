var ExampleApplication = React.createClass({displayName: "ExampleApplication",
  updateEditorState: function(editorState) {
    this.setState({
      editorSource: editorState.editorSource
    });
  },

  render: function() {
    return (
      React.createElement("div", {className: "EXTENDER"}, 
        React.createElement("div", {className: "ROWS"}, 
          React.createElement("div", {className: "ROW-FLEX"}, 
            React.createElement(Editor, {changedEditorSource: this.updateEditorState})
          )
        )
      )
    );
  }
});

React.render(React.createElement(ExampleApplication, null),document.getElementById('app'));