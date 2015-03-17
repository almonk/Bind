var AddElement = React.createClass({displayName: "AddElement",
  render: function() {
    return (
      React.createElement("div", {className: "add-element"}, 
        React.createElement("a", {href: "#"}, "Div"), 
        React.createElement("a", {href: "#"}, "Span"), 
        React.createElement("a", {href: "#"}, "Img")
      )
    );
  }
});

