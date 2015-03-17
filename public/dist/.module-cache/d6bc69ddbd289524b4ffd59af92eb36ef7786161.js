var AddElement = React.createClass({displayName: "AddElement",
  render: function() {
    return (
      React.createElement("div", {className: "add-element"}, 
        "Test"
      )
    );
  }
});

