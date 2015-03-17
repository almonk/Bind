var selectedEls = [];

var Editor = React.createClass({displayName: "Editor",
  componentDidMount: function() {
    document.querySelector('#bindCanvas').contentWindow.document.onclick = function(event){this.handleEditorClick(event)}.bind(this);
    window.addEventListener('willImportFile', this.handleImport);
    window.addEventListener('willSaveFile', this.handleSave);
    window.addEventListener('toggleSidebar', this.toggleSidebar);
    window.addEventListener('toggleProperties', this.toggleProperties);
    window.addEventListener('willPlaceImage', this.willPlaceImage);
    window.addEventListener('showAddElement', this.showAddElement);
    window.addEventListener('showAddConstraint', this.showAddConstraint);
  },

  componentWillUnmount: function() {
    window.removeEventListener('willImportFile', this.handleImport);
    window.removeEventListener('willSaveFile', this.handleSave);
    window.removeEventListener('toggleSidebar', this.toggleSidebar);
    window.removeEventListener('toggleProperties', this.toggleProperties);
    window.removeEventListener('willPlaceImage', this.willPlaceImage);
    window.removeEventListener('showAddElement', this.showAddElement);
    window.removeEventListener('showAddConstraint', this.showAddConstraint);
  },

  componentDidUpdate: function(prevProps, prevState) {
    setTimeout(function(){
      document.querySelector('#bindCanvas').contentWindow.document.onclick = function(event){this.handleEditorClick(event)}.bind(this);
    }.bind(this), 500)
  },

  toggleSidebar: function() {
    document.querySelector('.sidebar').classList.toggle('is-hidden');
  },

  showAddElement: function() {
    this.setState({
      addElementVisiblility: !this.state.addElementVisiblility
    });
  },

  showAddConstraint: function() {
    this.setState({
      addConstraintVisiblility: !this.state.addConstraintVisiblility
    });
  },

  toggleProperties: function() {
    document.querySelector('.properties-panel').classList.toggle('is-hidden');
  },

  handleImport: function() {
    MacGap.Dialog.openDialog({files: true, callback: function(file){
      console.log(file);
      var content = MacGap.File.read(file[0], 'json');
      htmlEditor.setValue(atob(content.bind.html));
      cssEditor.setValue(atob(content.bind.css));
      gssEditor.setValue(atob(content.bind.gss));
    }});
  },

  handleSave: function() {
    var exportSource = '{"bind": { "css":"'+btoa(this.state.cssToRender)+'","gss":"'+btoa(this.state.gssToRender)+'","html":"'+btoa(this.state.htmlToRender)+'"}}';
    MacGap.Dialog.saveDialog({title: 'Save document', prompt: 'Save', filename: 'Untitled.bind', allowedTypes: ['bind'], callback: function(result) {
      MacGap.File.write(result.filePath, exportSource, 'string');
    }})
  },

  willPlaceImage: function() {
    MacGap.Dialog.openDialog({files: true, callback: function(file){
      console.log(file);
      htmlEditor.replaceRange("<img src='file://"+encodeURI(file[0])+"'/>\n", {line: Infinity});
    }});
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
      addElementVisiblility: false,
      addConstraintVisiblility: false,
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
    return exportSource;
  },

  handleEditorClick: function(event) {
    if (!event.shiftKey) {
      //Shift key not held
      selectedEls = [];

      console.log(event.target.offsetX);

      var divs = document.querySelector('#bindCanvas').contentWindow.document.body.querySelectorAll('*');

      [].forEach.call(divs, function(div) {
        div.classList.remove('bind-element--is-selected');
      });

      if (event.target.id != '' && !event.shiftKey) {
        // An element with an ID is selected
        event.target.classList.add('bind-element--is-selected');

        this.setState({
          selectedElement: event.target.id,
          selectedElWidth: event.target.offsetWidth,
          selectedElHeight: event.target.offsetHeight,
          selectedElX: event.target.offsetLeft,
          selectedElY: event.target.offsetTop,
        });
      } else {
        // Set to none
        this.setState({
          selectedElement: null,
          selectedElWidth: null,
          selectedElHeight: null,
          selectedElX: null,
          selectedElY: null,
        });
      }
    } else {
      //Shift key held
      selectedEls.push("#" + event.target.id)
      console.log(selectedEls);

      event.target.classList.add('bind-element--is-selected');
    };
  },

  render: function() {
    return (
      React.createElement("div", {className: "EXTENDER"}, 
        React.createElement(AddElement, {handleExit: this.showAddElement, visiblility: this.state.addElementVisiblility}), 
        React.createElement(AddConstraint, {visiblility: this.state.addConstraintVisiblility, selectedElement: this.state.selectedElement}), 
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

