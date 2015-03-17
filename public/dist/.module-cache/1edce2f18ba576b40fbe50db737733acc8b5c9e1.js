var AddConstraint = React.createClass({displayName: "AddConstraint",
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "add-constraint is-active"}, 
          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox"}), 
              "Width"
            ), 
            React.createElement("input", {type: "text"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox"}), 
              "Height"
            ), 
            React.createElement("input", {type: "text"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("button", null, "Add constraints")
          )
        )
      )
    );
  }
});

