var AddElement = React.createClass({displayName: "AddElement",
  render: function() {
    return (
      React.createElement("div", {className: "add-element"}, 
        React.createElement("a", {href: "#"}, "Div"), 
        React.createElement("a", {href: "#"}, "Image"), 
        React.createElement("a", {href: "#"}, "Text")
      )
    );
  }
});

