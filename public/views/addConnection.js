var AddConnection = React.createClass({
  getInitialState: function() {
    return {
      gap: "0",
      isHorizontal: true
    };
  },

  addConnections: function(e) {
    e.preventDefault();

    var selected = this.props.selectedElements;
    var direction = $('.add-connection input[name=direction]:checked').val();
    var gap = $('.add-connection input#bind-gap').val();
    var container = $('.add-connection input#bind-container').val();

    selected = selected.toString();
    newSelected = selected.replace(/,/g,")-(");

    if (container == "") {
      gssString = "@"+direction+" ("+newSelected+") gap("+gap+");";
    } else {
      gssString = "@"+direction+" |("+newSelected+")| in("+container+") gap("+gap+");";
    }
    gssEditor.replaceRange(gssString+"\n", {line: Infinity});
  },

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
          <form onSubmit={this.addConnections}>
          <div className="add-constraint__element">
            <label>
              Direction
            </label>
            <label className="add-constraint__element__label"><input type="radio" name="direction" defaultChecked={this.state.isHorizontal} value="h"/>Horizontal</label>
            <label className="add-constraint__element__label"><input type="radio" name="direction" defaultChecked={this.state.isHorizontal} value="v"/>Vertical</label>
          </div>

          <div className="add-constraint__element">
            <label>
              Gap
            </label>
            <input type="text" defaultValue={this.state.gap} id="bind-gap" />
          </div>

          <div className="add-constraint__element">
            <label>
              Outer gap
            </label>
            <input type="text" id="bind-outergap" />
          </div>

          <div className="add-constraint__element">
            <label>
              Contained in
            </label>
            <input type="text" id="bind-container" />
          </div>

          <hr/>

          <div className="add-constraint__element">
            <button type="submit">Add connection</button>
          </div>
        </form>
        </div>

        <div onClick={this.cancelPopover} className={modalClasses}></div>
      </div>
    );
  }
});

