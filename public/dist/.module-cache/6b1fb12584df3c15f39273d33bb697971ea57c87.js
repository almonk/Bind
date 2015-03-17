var AddConstraint = React.createClass({displayName: "AddConstraint",
  addConstraints: function() {
    var sList = "";
    $('.add-constraint input[type=checkbox]').each(function () {
        sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
    });
    console.log (sList);
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: "add-constraint is-active"}, 
          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-width"}), 
              "Width"
            ), 
            React.createElement("input", {type: "text", value: "bind-width-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-height"}), 
              "Height"
            ), 
            React.createElement("input", {type: "text", value: "bind-height-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("button", {onClick: this.addConstraints}, "Add constraints")
          )
        )
      )
    );
  }
});

