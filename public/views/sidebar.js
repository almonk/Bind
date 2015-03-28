var gssEditor;
var htmlEditor;
var cssEditor;

var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      activeTab: 1
    };
  },
  
  componentDidMount: function() {
    gssEditor = CodeMirror.fromTextArea(document.getElementById("sidebarGssEditor"), {
      mode: 'text/css',
      lineNumbers: true,
      autofocus: true,
      theme: 'tomorrow-night-eighties'
    });

    htmlEditor = CodeMirror.fromTextArea(document.getElementById("sidebarHtmlEditor"), {
      mode: 'text/html',
      lineNumbers: true,
      autofocus: true,
      theme: 'tomorrow-night-eighties',
      profile: 'xhtml'
    });

    emmetCodeMirror(htmlEditor);

    cssEditor = CodeMirror.fromTextArea(document.getElementById("sidebarCssEditor"), {
      mode: 'text/css',
      lineNumbers: true,
      autofocus: true,
      theme: 'tomorrow-night-eighties',
      indentUnit: 2,
      indentWithTabs: true,
      smartIndent: true,
      tabSize: 2
    });

    emmetCodeMirror(cssEditor);

    var debounceHtmlUpdate = _.debounce(function(){
      this.props.onHtmlChanged({html: htmlEditor.getValue()});
    }.bind(this), 900);

    var debounceCssUpdate = _.debounce(function(){
      this.props.onCssChanged({css: cssEditor.getValue()});
    }.bind(this), 900);

    var debounceGsslUpdate = _.debounce(function(){
      this.props.onGssChanged({gss: gssEditor.getValue()});
    }.bind(this), 900);

    htmlEditor.on("change", debounceHtmlUpdate);
    cssEditor.on("change", debounceCssUpdate);
    gssEditor.on("change", debounceGsslUpdate);

    this.addDiv();

    window.addEventListener('switchToCss', this.showCssTab);
    window.addEventListener('switchToGss', this.showGssTab);
    window.addEventListener('switchToHtml', this.showHtmlTab);
  },

  componentWillUnmount: function() {
    window.removeEventListener('switchToCss', this.showCssTab);
    window.removeEventListener('switchToGss', this.showGssTab);
    window.removeEventListener('switchToHtml', this.showHtmlTab);
  },

  showGssTab: function() {
    this.setState({
      activeTab: 1
    });
  },

  showHtmlTab: function() {
    this.setState({
      activeTab: 2
    });
  },

  showCssTab: function() {
    this.setState({
      activeTab: 3
    });
  },

  componentWillUpdate: function(nextProps, nextState) {
    if(nextState.activeTab == 1) {
      setTimeout(function(){gssEditor.refresh(); gssEditor.focus();}, 5);
    }

    if(nextState.activeTab == 2) {
      setTimeout(function(){htmlEditor.refresh(); htmlEditor.focus();}, 5);
    }

    if(nextState.activeTab == 3) {
      setTimeout(function(){cssEditor.refresh(); cssEditor.focus();}, 5);
    }
  },

  addDiv: function() {
    htmlEditor.replaceRange("<div id=box1></div>\n", {line: Infinity});
    cssEditor.replaceRange("#box1{\n  background-color: blue;\n  height: 80px;\n  width: 80px;\n}\n", {line: Infinity});

    this.props.onHtmlChanged({html: htmlEditor.getValue()});
    this.props.onCssChanged({css: cssEditor.getValue()});
    this.props.onGssChanged({gss: gssEditor.getValue()});
  },

  render: function() {
    var firstTab = React.addons.classSet({
      'sidebar__tab': true,
      'is-active': this.state.activeTab == 1,
    });

    var secondTab = React.addons.classSet({
      'sidebar__tab': true,
      'is-active': this.state.activeTab == 2,
    });

    var thirdTab = React.addons.classSet({
      'sidebar__tab': true,
      'is-active': this.state.activeTab == 3,
    });

    var firstTabHeader = React.addons.classSet({
      'sidebar__tab-header': true,
      'is-active': this.state.activeTab == 1,
    });

    var secondTabHeader = React.addons.classSet({
      'sidebar__tab-header': true,
      'is-active': this.state.activeTab == 2,
    });

    var thirdTabHeader = React.addons.classSet({
      'sidebar__tab-header': true,
      'is-active': this.state.activeTab == 3,
    });

    return (
      <div className="COL sidebar">
        <a href="#" className={firstTabHeader} onClick={this.showGssTab}>GSS</a>
        <a href="#" className={secondTabHeader} onClick={this.showHtmlTab}>HTML</a>
        <a href="#" className={thirdTabHeader} onClick={this.showCssTab}>CSS</a>

        <div className={firstTab}>
          <textarea id="sidebarGssEditor" className="sidebar__editor"></textarea>
        </div>
        <div className={secondTab}>
          <textarea id="sidebarHtmlEditor" className="sidebar__editor"></textarea>
        </div>
        <div className={thirdTab}>
          <textarea id="sidebarCssEditor" className="sidebar__editor"></textarea>
        </div>
      </div>
    );
  }
});

