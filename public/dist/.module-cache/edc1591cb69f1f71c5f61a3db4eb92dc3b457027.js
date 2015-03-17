var AddElement = React.createClass({displayName: "AddElement",
  createDiv: function() {
    var id = this.makeId();
    htmlEditor.replaceRange("<div id='div-"+id+"' class=placeholder></div>\n", {line: Infinity});
    gssEditor.replaceRange("#div-"+id+"[size] == #div-"+id+"[intrinsic-size];\n", {line: Infinity});
    cssEditor.replaceRange("\n#div-"+id+"{\n  width: 80px;\n  height: 80px;\n  background: rgba(80,227,194,0.3);\n}\n", {line: Infinity});
    this.props.handleExit();
  },

  makeId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-element': true,
      'is-active': this.props.visiblility
    });

    var modalClasses = cx({
      'modal': true,
      'is-active': this.props.visiblility
    });
    return (
      React.createElement("div", null, 
        React.createElement("div", {className: classes}, 
          React.createElement("a", {href: "#", onClick: this.createDiv}, "Div"), 
          React.createElement("a", {href: "#"}, "Image"), 
          React.createElement("a", {href: "#"}, "Text")
        ), 
        React.createElement("div", {className: modalClasses})
      )
    );
  }
});

