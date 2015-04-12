var AddMultipleConstraint = React.createClass({displayName: "AddMultipleConstraint",
  addConstraints: function(e) {
    e.preventDefault();
    var selected = this.props.selectedElements;

    $('.add-constraint.is-multiple input[type=text]').each(function () {
        var inputElement = $(this).attr('id');
        
        if (inputElement === 'bind-width' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[width] "+$('#bind-width-operator-multiple').val()+" "+$('#bind-width-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-height' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[height] "+$('#bind-height-operator-multiple').val()+" "+$('#bind-height-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-top' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[top] "+$('#bind-top-operator-multiple').val()+" "+$('#bind-top-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-bottom' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[bottom] "+$('#bind-bottom-operator-multiple').val()+" "+$('#bind-bottom-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-left' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[left] "+$('#bind-left-operator-multiple').val()+" "+$('#bind-left-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-right' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[right] "+$('#bind-right-operator-multiple').val()+" "+$('#bind-right-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-center-x' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[center-x] "+$('#bind-center-x-operator-multiple').val()+" "+$('#bind-center-x-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-center-y' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[center-y] "+$('#bind-center-y-operator-multiple').val()+" "+$('#bind-center-y-multiple').val()+";\n", {line: Infinity});
          });
        };
    });

    this.cancelPopover();
  },

  cancelPopover: function() {
    $('.add-constraint input[type=checkbox]').attr({
      'checked': false,
    });

    $('.add-constraint input[type=text]').val('');
    $('.add-constraint select').prop('selectedIndex',0);
    var ev = new CustomEvent('showAddMultipleConstraint'); 
    ev.initEvent('showAddMultipleConstraint');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-constraint is-multiple': true,
      'is-active': this.props.visiblility,
    });

    var modalClasses = cx({
      'modal': true,
      'is-active': this.props.visiblility,
    });
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: classes}, 
          React.createElement("form", {onSubmit: this.addConstraints}, 
          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Width"
            ), 
            React.createElement("select", {id: "bind-width-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-width-multiple"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Height"
            ), 
            React.createElement("select", {id: "bind-height-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-height-multiple"})
          ), 

          React.createElement("hr", null), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Top"
            ), 
            React.createElement("select", {id: "bind-top-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-top-multiple"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Bottom"
            ), 
            React.createElement("select", {id: "bind-bottom-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-bottom-multiple"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Left"
            ), 
            React.createElement("select", {id: "bind-left-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-left-multiple"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Right"
            ), 
            React.createElement("select", {id: "bind-right-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-right-multiple"})
          ), 

          React.createElement("hr", null), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Center X"
            ), 
            React.createElement("select", {id: "bind-center-x-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-center-x-multiple"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Center Y"
            ), 
            React.createElement("select", {id: "bind-center-y-operator-multiple"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-center-y-multiple"})
          ), 

          React.createElement("hr", null), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("button", {type: "submit"}, "Add constraints")
          )
        )
        ), 

        React.createElement("div", {onClick: this.cancelPopover, className: modalClasses})
      )
    );
  }
});

