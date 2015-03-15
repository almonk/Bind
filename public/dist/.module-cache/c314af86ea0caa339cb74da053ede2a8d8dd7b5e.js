var ExampleApplication = React.createClass({displayName: "ExampleApplication",
  componentDidMount: function() {
    window.addEventListener('willImportFile', this.handleImport);
  },

  componentWillUnmount: function() {
    window.removeEventListener('willImportFile', this.handleImport);
  },

  handleImport: function() {
    console.log('Open dialog');
    // MacGap.Dialog.openDialog({files: true, callback: function(file){
    //   console.log(file);
    // }});
  },

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