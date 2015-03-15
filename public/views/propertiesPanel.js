var PropertiesPanel = React.createClass({
  addIntrinsicSize: function() {
    gssEditor.replaceRange("#" + this.props.selectedElement + "[size] == #" + this.props.selectedElement + "[intrinsic-size];\n", {line: Infinity});
  },

  render: function() {
    return (
      <div className="COL properties-panel">
        <div className="properties-panel__element-name">#{this.props.selectedElement}</div>

        <div className="properties-panel__form-element">
          <input type="text" ref="xPos" value={this.props.left}/>
          <label>X</label>
        </div>

        <div className="properties-panel__form-element">
          <input type="text" ref="yPos" value={this.props.top}/>
          <label>X</label>
        </div>

        <div className="properties-panel__form-element">
          <input type="text" ref="width" value={this.props.width}/>
          <label>Width</label>
        </div>

        <div className="properties-panel__form-element">
          <input type="text" ref="height" value={this.props.height}/>
          <label>Height</label>
        </div>

        <div className="properties-panel__divider-name">Constraints</div>

        <button onClick={this.addIntrinsicSize}>Add intrinsic size</button>

        <button onClick={this.addConstraint}>Add constraint</button>
      </div>
    );
  }
});

