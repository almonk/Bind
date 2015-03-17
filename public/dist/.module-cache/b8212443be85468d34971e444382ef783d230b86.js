var AddConstraint = React.createClass({displayName: "AddConstraint",
  addConstraints: function() {
    var sList = "";
    $('.add-constraint input[type=checkbox]').each(function () {
        var element = $(this).attr('id');
        var selected = this.props.selectedElement
        if (element == 'bind-width' && this.checked) {
          gssEditor.replaceRange("\n#"+selected+"[width] == "+$('#bind-width-value').val()+"\n", {line: Infinity});
        };
    }.bind(this));
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
            React.createElement("input", {type: "text", id: "bind-width-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-height"}), 
              "Height"
            ), 
            React.createElement("input", {type: "text", id: "bind-height-value"})
          ), 


          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-top"}), 
              "Top"
            ), 
            React.createElement("input", {type: "text", id: "bind-top-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-bottom"}), 
              "Bottom"
            ), 
            React.createElement("input", {type: "text", id: "bind-bottom-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-left"}), 
              "Left"
            ), 
            React.createElement("input", {type: "text", id: "bind-left-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              React.createElement("input", {type: "checkbox", id: "bind-right"}), 
              "Right"
            ), 
            React.createElement("input", {type: "text", id: "bind-right-value"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("button", {onClick: this.addConstraints}, "Add constraints")
          )
        )
      )
    );
  }
});

