var ExampleApplication = React.createClass({displayName: "ExampleApplication",
  render: function() {
    return (
      React.createElement("h1", null, "Test")
    );
  }
});

React.render(React.createElement(ExampleApplication, null),document.getElementById('app'));
