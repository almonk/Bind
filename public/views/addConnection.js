var AddConnection = React.createClass({
  cancelPopover: function() {
    var ev = new CustomEvent('showAddConnection'); 
    ev.initEvent('showAddConnection');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-connection': true,
      'is-active': this.props.visiblility,
    });

    var modalClasses = cx({
      'modal': true,
      'is-active': this.props.visiblility,
    });
    return (
      <div>
        <div className={classes}>
          <form onSubmit={this.addConstraints}>
          <div className="add-constraint__element">
            <label>
              Direction
            </label>
            <input type="radio" name="direction" value="h"/>Horizontal
            <input type="radio" name="direction" value="v"/>Vertical
          </div>

          <div className="add-constraint__element">
            <label>
              Gap
            </label>
            <input type="text" id="bind-width" autofocus/>
          </div>

          <div className="add-constraint__element">
            <label>
              Outer gap
            </label>
            <input type="text" id="bind-width" autofocus/>
          </div>

          <div className="add-constraint__element">
            <label>
              Contained in
            </label>
            <input type="text" id="bind-width" autofocus/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <button type="submit">Add constraints</button>
          </div>
        </form>
        </div>

        <div onClick={this.cancelPopover} className={modalClasses}></div>
      </div>
    );
  }
});

