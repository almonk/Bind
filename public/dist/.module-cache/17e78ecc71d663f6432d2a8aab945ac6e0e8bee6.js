var PropertiesPanel = React.createClass({displayName: "PropertiesPanel",
  addIntrinsicSize: function() {
    gssEditor.replaceRange("#" + this.props.selectedElement + "[size] == #" + this.props.selectedElement + "[intrinsic-size];\n", {line: Infinity});
  },

  addConstraint: function() {
    var ev = new CustomEvent('showAddConstraint'); 
    ev.initEvent('showAddConstraint');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var buttonClasses = cx({
      'properties-panel__button': true,
      'is-hidden': !this.props.selectedElement,
    });

    var colClasses = cx({
      'COL properties-panel': true,
      'is-hidden': this.props.multipleSelectedElements,
    });

    return (
      React.createElement("div", {className: colClasses}, 
        React.createElement("div", {className: "properties-panel__element-name"}, "#", this.props.selectedElement), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {disabled: true, type: "text", ref: "xPos", value: this.props.left}), 
          React.createElement("label", null, "X")
        ), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {disabled: true, type: "text", ref: "yPos", value: this.props.top}), 
          React.createElement("label", null, "X")
        ), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {disabled: true, type: "text", ref: "width", value: this.props.width}), 
          React.createElement("label", null, "Width")
        ), 

        React.createElement("div", {className: "properties-panel__form-element"}, 
          React.createElement("input", {disabled: true, type: "text", ref: "height", value: this.props.height}), 
          React.createElement("label", null, "Height")
        ), 

        React.createElement("div", {className: "properties-panel__divider-name"}, "Constraints"), 

        React.createElement("a", {href: "#", className: buttonClasses, onClick: this.addIntrinsicSize}, "Add intrinsic size"), 

        React.createElement("a", {href: "#", className: buttonClasses, onClick: this.addConstraint}, "Add constraint")
      )
    );
  }
});

