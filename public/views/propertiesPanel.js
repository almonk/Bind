var PropertiesPanel = React.createClass({
  addIntrinsicSize: function() {
    gssEditor.replaceRange("#" + this.props.selectedElement + "[size] == #" + this.props.selectedElement + "[intrinsic-size];\n", {line: Infinity});
  },

  addIntrinsicSizeAll: function() {
    this.props.multipleSelectedElements.forEach(function(element) {
      gssEditor.replaceRange(element + "[size] == " + element + "[intrinsic-size];\n", {line: Infinity});
    });
  },

  addConstraint: function() {
    var ev = new CustomEvent('showAddConstraint'); 
    ev.initEvent('showAddConstraint');
    window.dispatchEvent(ev);
  },

  addConnection: function() {
    var ev = new CustomEvent('showAddConnection'); 
    ev.initEvent('showAddConnection');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var buttonClasses = cx({
      'properties-panel__button': true,
      'is-hidden': !this.props.selectedElement,
    });

    var colClasses = cx({
      'COL properties-panel': true,
      'is-hidden': this.props.multipleSelectedElements,
    });

    var colTwoClasses = cx({
      'COL properties-panel': true,
      'is-hidden': !this.props.multipleSelectedElements,
    });

    return (
      <div className="properties-parent">
        <div className={colClasses}>
          <div className="properties-panel__element-name">#{this.props.selectedElement}</div>

          <div className="properties-panel__form-element">
            <input disabled type="text" ref="xPos" value={this.props.left}/>
            <label>X</label>
          </div>

          <div className="properties-panel__form-element">
            <input disabled type="text" ref="yPos" value={this.props.top}/>
            <label>X</label>
          </div>

          <div className="properties-panel__form-element">
            <input disabled type="text" ref="width" value={this.props.width}/>
            <label>Width</label>
          </div>

          <div className="properties-panel__form-element">
            <input disabled type="text" ref="height" value={this.props.height}/>
            <label>Height</label>
          </div>

          <div className="properties-panel__divider-name">Constraints</div>

          <a href="#" className={buttonClasses} onClick={this.addIntrinsicSize}>Add intrinsic size</a>

          <a href="#" className={buttonClasses} onClick={this.addConstraint}>Add constraint</a>
        </div>

        <div className={colTwoClasses}>
          <div className="properties-panel__element-name">{this.props.multipleSelectedElements.length} selected</div>
          <a href="#" className="properties-panel__button" onClick={this.addIntrinsicSizeAll}>Add intrinsic size to all</a>
          <a href="#" className="properties-panel__button" onClick={this.addConnection}>Add uniform connection</a>
          <a href="#" className="properties-panel__button" onClick={this.addConnection}>Add complex connection</a>
        </div>
      </div>
    );
  }
});

