var Editor = React.createClass({displayName: "Editor",
  componentDidMount: function() {
    document.querySelector('#bindCanvas').contentWindow.document.onclick = function(event){this.handleEditorClick(event)}.bind(this);
    window.addEventListener('willImportFile', this.handleImport);
  },

  componentDidUpdate: function(prevProps, prevState) {
    setTimeout(function(){
      document.querySelector('#bindCanvas').contentWindow.document.onclick = function(event){this.handleEditorClick(event)}.bind(this);
    }.bind(this), 500)
  },

  componentWillUnmount: function() {
    window.removeEventListener('willImportFile', this.handleImport);
  },

  handleImport: function() {
    console.log('Open dialog');
    // MacGap.Dialog.openDialog({files: true, callback: function(file){
    //   console.log(file);
    // }});
  },

  getInitialState: function() {
    return {
      selectedElement: null,
      selectedElWidth: null,
      selectedElHeight: null,
      selectedElX: null,
      selectedElY: null,
      htmlToRender: '',
      gssToRender: '',
      cssToRender: '',
      canvasState: '',
      endCruft: '</html>',
      headCruft: '<html><head><link rel="stylesheet" type="text/css" href="css/reset.css"/><link rel="stylesheet" type="text/css" href="css/bind-element.css"/></script><script src="dist/gss.min.js"></script><script type="text/javascript">window.engine = new GSS(document);</script><style type="text/css">.gss-not-ready body { opacity: 0; } .gss-ready body { opacity: 1; }</style></head>',
    };
  },

  renderGss: function(editor) {
    this.setState({
      gssToRender: editor.gss,
      canvasState: this.state.headCruft + this.state.htmlToRender + '<style type="text/gss">' + editor.gss + '</style>' + '<style type="text/css">' + this.state.cssToRender + '</style>'
    });
    this.exportSource();
  },

  renderHtml: function(editor) {
    this.setState({
      htmlToRender: editor.html,
      canvasState: this.state.headCruft + editor.html + '<style type="text/gss">' + this.state.gssToRender + '</style>' + '<style type="text/css">' + this.state.cssToRender + '</style>'
    });
    this.exportSource();
  },

  renderCss: function(editor) {
    this.setState({
      cssToRender: editor.css,
      canvasState: this.state.headCruft + this.state.htmlToRender + '<style type="text/gss">' + this.state.gssToRender + '</style>' + '<style type="text/css">' + editor.css + '</style>'
    });
    this.exportSource();
  },

  exportSource: function() {
    var exportSource = '{"bind": { "css":"'+btoa(this.state.cssToRender)+'","gss":"'+btoa(this.state.gssToRender)+'","html":"'+btoa(this.state.htmlToRender)+'"}}';
    this.props.changedEditorSource({editorSource: exportSource});
  },

  handleEditorClick: function(event) {
    console.log(event.target.offsetX);

    var divs = document.querySelector('#bindCanvas').contentWindow.document.body.querySelectorAll('*');

    [].forEach.call(divs, function(div) {
      div.classList.remove('bind-element--is-selected');
    });

    if (event.target.id != '') {
      event.target.classList.add('bind-element--is-selected');

      this.setState({
        selectedElement: event.target.id,
        selectedElWidth: event.target.offsetWidth,
        selectedElHeight: event.target.offsetHeight,
        selectedElX: event.target.offsetLeft,
        selectedElY: event.target.offsetTop,
      });
    } else {
      this.setState({
        selectedElement: null,
        selectedElWidth: null,
        selectedElHeight: null,
        selectedElX: null,
        selectedElY: null,
      });
    }
  },

  render: function() {
    return (
      React.createElement("div", {className: "EXTENDER"}, 
        React.createElement("div", {className: "COLS"}, 
          React.createElement(Sidebar, {onCssChanged: this.renderCss, onGssChanged: this.renderGss, onHtmlChanged: this.renderHtml}), 
          React.createElement("div", {id: "canvas", className: "COL-FLEX canvas"}, 
            React.createElement("iframe", {id: "bindCanvas", srcDoc: this.state.canvasState})
          ), 
          React.createElement(PropertiesPanel, {
            selectedElement: this.state.selectedElement, 
            left: this.state.selectedElX, 
            top: this.state.selectedElY, 
            height: this.state.selectedElHeight, 
            width: this.state.selectedElWidth})
        )
      )
    );
  }
});

