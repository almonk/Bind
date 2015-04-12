var AddMultipleConstraint = React.createClass({displayName: "AddMultipleConstraint",
  addConstraints: function(e) {
    e.preventDefault();
    var selected = this.props.selectedElements;

    $('.add-constraint input[type=text]').each(function () {
        var element = $(this).attr('id');
        
        if (element === 'bind-width' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[width] "+$('#bind-width-operator').val()+" "+$('#bind-width').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-height' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[height] "+$('#bind-height-operator').val()+" "+$('#bind-height').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-top' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[top] "+$('#bind-top-operator').val()+" "+$('#bind-top').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-bottom' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[bottom] "+$('#bind-bottom-operator').val()+" "+$('#bind-bottom').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-left' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[left] "+$('#bind-left-operator').val()+" "+$('#bind-left').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-right' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[right] "+$('#bind-right-operator').val()+" "+$('#bind-right').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-center-x' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[center-x] "+$('#bind-center-x-operator').val()+" "+$('#bind-center-x').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-center-y' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[center-y] "+$('#bind-center-y-operator').val()+" "+$('#bind-center-y').val()+";\n", {line: Infinity});
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
            React.createElement("select", {id: "bind-width-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-width", autofocus: true})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Height"
            ), 
            React.createElement("select", {id: "bind-height-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-height"})
          ), 

          React.createElement("hr", null), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Top"
            ), 
            React.createElement("select", {id: "bind-top-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-top"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Bottom"
            ), 
            React.createElement("select", {id: "bind-bottom-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-bottom"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Left"
            ), 
            React.createElement("select", {id: "bind-left-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-left"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Right"
            ), 
            React.createElement("select", {id: "bind-right-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-right"})
          ), 

          React.createElement("hr", null), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Center X"
            ), 
            React.createElement("select", {id: "bind-center-x-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-center-x"})
          ), 

          React.createElement("div", {className: "add-constraint__element"}, 
            React.createElement("label", null, 
              "Center Y"
            ), 
            React.createElement("select", {id: "bind-center-y-operator"}, 
              React.createElement("option", {value: "=="}, "=="), 
              React.createElement("option", {value: ">="}, ">="), 
              React.createElement("option", {value: "=<"}, "=<"), 
              React.createElement("option", {value: "<"}, "<"), 
              React.createElement("option", {value: ">"}, ">")
            ), 
            React.createElement("input", {type: "text", id: "bind-center-y"})
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

