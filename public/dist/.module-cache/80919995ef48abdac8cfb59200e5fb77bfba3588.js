var AddElement = React.createClass({displayName: "AddElement",
  createDiv: function() {
    this.props.handleExit();

    setTimeout(function(){
      var id = this.makeId();
      var layer_id = prompt("Give this div a layer ID", "div-" + id);

      if (layer_id != null) {
        slugged_layer_id = this.generateSlug(layer_id)
        htmlEditor.replaceRange("<div id='"+slugged_layer_id+"' class=placeholder></div>\n", {line: Infinity});
        gssEditor.replaceRange("#"+slugged_layer_id+"[size] == #"+slugged_layer_id+"[intrinsic-size];\n", {line: Infinity});
        cssEditor.replaceRange("\n#"+slugged_layer_id+"{\n  width: 80px;\n  height: 80px;\n  background: rgba(80,227,194,0.3);\n}\n", {line: Infinity});
      }

    }.bind(this),30);
  },

  cancelPopover: function() {
    this.props.handleExit();
  },

  makeId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },

  generateSlug: function(value) {
    // 1) convert to lowercase
    // 2) remove dashes and pluses
    // 3) replace spaces with dashes
    // 4) remove everything but alphanumeric characters and dashes
    return value.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-element': true,
      'is-active': this.props.visiblility,
    });

    var modalClasses = cx({
      'modal': true,
      'is-active': this.props.visiblility,
    });

    return (
      React.createElement("div", null, 
        React.createElement("div", {className: classes}, 
          React.createElement("a", {href: "#", onClick: this.createDiv}, "Div"), 
          React.createElement("a", {href: "#"}, "Image"), 
          React.createElement("a", {href: "#"}, "Text")
        ), 

        React.createElement("div", {className: modalClasses, onClick: this.cancelPopover})
      )
    );
  }
});

