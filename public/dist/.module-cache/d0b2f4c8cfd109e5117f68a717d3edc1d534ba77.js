var AddConstraint = React.createClass({displayName: "AddConstraint",
  addConstraints: function() {
    var sList = "";
    var selected = this.props.selectedElement;
    console.log(selected);    

    $('.add-constraint input[type=text]').each(function () {
        var element = $(this).attr('id');
        
        if (element === 'bind-width' && $(this).val() != null) {
          gssEditor.replaceRange("#"+selected+"[width] == "+$('#bind-width').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-height' && $(this).val() != null) {
          gssEditor.replaceRange("#"+selected+"[height] == "+$('#bind-height').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-top' && $(this).val() != null) {
          gssEditor.replaceRange("#"+selected+"[top] == "+$('#bind-top').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-bottom' && $(this).val() != null) {
          gssEditor.replaceRange("#"+selected+"[bottom] == "+$('#bind-bottom').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-left' && $(this).val() != null) {
          gssEditor.replaceRange("#"+selected+"[left] == "+$('#bind-left').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-right' && $(this).val() != null) {
          gssEditor.replaceRange("#"+selected+"[right] == "+$('#bind-right').val()+";\n", {line: Infinity});
        };
    });
  },

  cancelPopover: function() {
    $('.add-constraint input[type=checkbox]').attr({
      'checked': false,
    });

    $('.add-constraint input[type=text]').val('');

    var ev = new CustomEvent('showAddConstraint'); 
    ev.initEvent('showAddConstraint');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-constraint': true,
      'is-active': this.props.visiblility,
    });

    var modalClasses = cx({
      'modal': true,
      'is-active': this.props.visiblility,
    });
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: classes}, 
          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Width"
            ), 
            React.createElement("input", {type: "text", id: "bind-width"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Height"
            ), 
            React.createElement("input", {type: "text", id: "bind-height"})
          ), 


          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Top"
            ), 
            React.createElement("input", {type: "text", id: "bind-top"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Bottom"
            ), 
            React.createElement("input", {type: "text", id: "bind-bottom"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Left"
            ), 
            React.createElement("input", {type: "text", id: "bind-left"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Right"
            ), 
            React.createElement("input", {type: "text", id: "bind-right"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("button", {onClick: this.addConstraints}, "Add constraints")
          )
        ), 

        React.createElement("div", {className: modalClasses, onClick: this.cancelPopover})
      )
    );
  }
});

