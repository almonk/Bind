var AddMultipleConstraint = React.createClass({
  addConstraints: function(e) {
    e.preventDefault();
    var selected = this.props.selectedElements;

    $('.add-constraint.is-multiple input[type=text]').each(function () {
        var inputElement = $(this).attr('id');
        
        if (inputElement === 'bind-width-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[width] "+$('#bind-width-operator-multiple').val()+" "+$('#bind-width-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-height-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[height] "+$('#bind-height-operator-multiple').val()+" "+$('#bind-height-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-top-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[top] "+$('#bind-top-operator-multiple').val()+" "+$('#bind-top-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-bottom-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[bottom] "+$('#bind-bottom-operator-multiple').val()+" "+$('#bind-bottom-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-left-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[left] "+$('#bind-left-operator-multiple').val()+" "+$('#bind-left-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-right-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[right] "+$('#bind-right-operator-multiple').val()+" "+$('#bind-right-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-center-x-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[center-x] "+$('#bind-center-x-operator-multiple').val()+" "+$('#bind-center-x-multiple').val()+";\n", {line: Infinity});
          });
        };

        if (inputElement === 'bind-center-y-multiple' && $(this).val() != '') {
          selected.forEach(function(element) {
            console.log(element);
            gssEditor.replaceRange(element + "[center-y] "+$('#bind-center-y-operator-multiple').val()+" "+$('#bind-center-y-multiple').val()+";\n", {line: Infinity});
          });
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
    var ev = new CustomEvent('showAddMultipleConstraint'); 
    ev.initEvent('showAddMultipleConstraint');
    window.dispatchEvent(ev);
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'add-constraint is-multiple': true,
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
            <select id="bind-width-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-width-multiple"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Height
            </label>
            <select id="bind-height-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-height-multiple"/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <label>
              Top
            </label>
            <select id="bind-top-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-top-multiple"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Bottom
            </label>
            <select id="bind-bottom-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-bottom-multiple"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Left
            </label>
            <select id="bind-left-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-left-multiple"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Right
            </label>
            <select id="bind-right-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-right-multiple"/>
          </div>

          <hr/>

          <div className="add-constraint__element">
            <label>
              Center X
            </label>
            <select id="bind-center-x-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-center-x-multiple"/>
          </div>

          <div className="add-constraint__element">
            <label>
              Center Y
            </label>
            <select id="bind-center-y-operator-multiple">
              <option value="==">&#61;&#61;</option>
              <option value=">=">&gt;&#61;</option>
              <option value="=<">&#61;&lt;</option>
              <option value="<">&lt;</option>
              <option value=">">&gt;</option>
            </select>
            <input type="text" id="bind-center-y-multiple"/>
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

