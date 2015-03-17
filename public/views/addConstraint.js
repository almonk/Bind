var AddConstraint = React.createClass({
  addConstraints: function(e) {
    e.preventDefault();
    var sList = "";
    var selected = this.props.selectedElement;

    $('.add-constraint input[type=text]').each(function () {
        var element = $(this).attr('id');
        
        if (element === 'bind-width' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[width] == "+$('#bind-width').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-height' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[height] == "+$('#bind-height').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-top' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[top] == "+$('#bind-top').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-bottom' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[bottom] == "+$('#bind-bottom').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-left' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[left] == "+$('#bind-left').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-right' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[right] == "+$('#bind-right').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-center-x' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[center-x] == "+$('#bind-center-x').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-center-y' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[center-y] == "+$('#bind-center-y').val()+";\n", {line: Infinity});
        };
    });

    this.cancelPopover();
  },

  cancelPopover: function() {
    $('.add-constraint input[type=checkbox]').attr({
      'checked': false,
    });

    $('.add-constraint input[type=text]').val('');

    var ev = new CustomEvent('showAddConstraint'); 
    ev.initEvent('showAddConstraint');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-constraint': true,
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
              Width
            </label>
            <input type="text" id="bind-width" autofocus/>
          </div>

          <div className="add-constraint__element">
            <label>
              Height
            </label>
            <input type="text" id="bind-height"/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <label>
              Top
            </label>
            <input type="text" id="bind-top"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Bottom
            </label>
            <input type="text" id="bind-bottom"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Left
            </label>
            <input type="text" id="bind-left"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Right
            </label>
            <input type="text" id="bind-right"/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <label>
              Center X
            </label>
            <input type="text" id="bind-center-x"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Center Y
            </label>
            <input type="text" id="bind-center-y"/>
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

