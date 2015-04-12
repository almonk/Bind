var AddConstraint = React.createClass({
  addConstraints: function(e) {
    e.preventDefault();
    var selected = this.props.selectedElement;

    $('.add-constraint input[type=text]').each(function () {
        var element = $(this).attr('id');
        
        if (element === 'bind-width' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[width] "+$('#bind-width-operator').val()+" "+$('#bind-width').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-height' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[height] "+$('#bind-height-operator').val()+" "+$('#bind-height').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-top' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[top] "+$('#bind-top-operator').val()+" "+$('#bind-top').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-bottom' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[bottom] "+$('#bind-bottom-operator').val()+" "+$('#bind-bottom').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-left' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[left] "+$('#bind-left-operator').val()+" "+$('#bind-left').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-right' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[right] "+$('#bind-right-operator').val()+" "+$('#bind-right').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-center-x' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[center-x] "+$('#bind-center-x-operator').val()+" "+$('#bind-center-x').val()+";\n", {line: Infinity});
        };

        if (element === 'bind-center-y' && $(this).val() != '') {
          gssEditor.replaceRange("#"+selected+"[center-y] "+$('#bind-center-y-operator').val()+" "+$('#bind-center-y').val()+";\n", {line: Infinity});
        };
    });

    this.cancelPopover();
  },

  cancelPopover: function() {
    $('.add-constraint input[type=checkbox]').attr({
      'checked': false,
    });

    $('.add-constraint input[type=text]').val('');
    $('.add-constraint select').prop('selectedIndex',0);
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
            <select id="bind-width-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-width" autofocus/>
          </div>

          <div className="add-constraint__element">
            <label>
              Height
            </label>
            <select id="bind-height-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-height"/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <label>
              Top
            </label>
            <select id="bind-top-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-top"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Bottom
            </label>
            <select id="bind-bottom-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-bottom"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Left
            </label>
            <select id="bind-left-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-left"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Right
            </label>
            <select id="bind-right-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-right"/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <label>
              Center X
            </label>
            <select id="bind-center-x-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-center-x"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Center Y
            </label>
            <select id="bind-center-y-operator">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
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

