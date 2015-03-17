var AddElement = React.createClass({displayName: "AddElement",
  createDiv: function() {
    htmlEditor.replaceRange("<div id='' class=placeholder></div>\n", {line: Infinity});
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-element': true,
      'is-active': this.props.visiblility
    });
    return (
      React.createElement("div", {className: classes}, 
        React.createElement("a", {href: "#", onClick: this.createDiv}, "Div"), 
        React.createElement("a", {href: "#"}, "Image"), 
        React.createElement("a", {href: "#"}, "Text")
      )
    );
  }
});

