var PropertiesPanel = React.createClass({displayName: "PropertiesPanel",
  addIntrinsicSize: function() {
    gssEditor.replaceRange("#" + this.props.selectedElement + "[size] == #" + this.props.selectedElement + "[intrinsic-size];\n", {line: Infinity});
  },

  render: function() {
    return (
      React.createElement("div", {className: "COL properties-panel"}, 
        React.createElement("div", {className: "properties-panel__element-name"}, "#", this.props.selectedElement), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {type: "text", ref: "xPos", value: this.props.left}), 
          React.createElement("label", null, "X")
        ), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {type: "text", ref: "yPos", value: this.props.top}), 
          React.createElement("label", null, "X")
        ), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {type: "text", ref: "width", value: this.props.width}), 
          React.createElement("label", null, "Width")
        ), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {type: "text", ref: "height", value: this.props.height}), 
          React.createElement("label", null, "Height")
        ), 

        React.createElement("div", {className: "properties-panel__divider-name"}, "Constraints"), 

        React.createElement("button", {onClick: this.addIntrinsicSize}, "Add intrinsic size"), 

        React.createElement("button", {onClick: this.addConstraint}, "Add constraint")
      )
    );
  }
});

