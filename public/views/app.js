var ExampleApplication = React.createClass({
  updateEditorState: function(editorState) {
    this.setState({
      editorSource: editorState.editorSource
    });
  },

  render: function() {
    return (
      <div className="EXTENDER" >
        <div className="ROWS">
          <div className="ROW-FLEX">
            <Editor changedEditorSource={this.updateEditorState}/>
          </div>
        </div>
      </div>
    );
  }
});

React.render(<ExampleApplication />,document.getElementById('app'));