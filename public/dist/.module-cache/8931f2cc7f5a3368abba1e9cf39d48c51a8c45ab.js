var AddElement = React.createClass({displayName: "AddElement",
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-element': true,
      'is-active': this.props.addElementVisibility
    });
    return (
      React.createElement("div", {className: classes}, 
        React.createElement("a", {href: "#"}, "Div"), 
        React.createElement("a", {href: "#"}, "Image"), 
        React.createElement("a", {href: "#"}, "Text")
      )
    );
  }
});

