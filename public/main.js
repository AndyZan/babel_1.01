"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

document.addEventListener('DOMContentLoaded', function () {

  var TextEdit = function TextEdit(props) {
    return React.createElement(
      "div",
      { className: "aphorism_textEdit" },
      React.createElement("textarea", { defaultValue: props.aphorism.text, className: "aphorism_textarea", id: "edit_aphorism" })
    );
  };

  var Text = function Text(props) {
    return React.createElement(
      "div",
      { onClick: props.onClick, className: "aphorism_text" },
      props.aphorism.text + ' ',
      React.createElement(
        "em",
        null,
        props.aphorism.author || ' '
      )
    );
  };

  var Container = function (_React$Component) {
    _inherits(Container, _React$Component);

    function Container(props) {
      _classCallCheck(this, Container);

      var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

      _this.loadMore = _this.loadMore.bind(_this);
      _this.loadGrid = _this.loadGrid.bind(_this);
      _this.addAphorism = _this.addAphorism.bind(_this);
      _this.setEditMode = _this.setEditMode.bind(_this);
      _this.updateAphorism = _this.updateAphorism.bind(_this);
      _this.state = {
        editMode: false,
        aphorism: {
          text: 'Если ты споткнулся и упал, это еще не значит, что ты идешь не туда.'
        }
      };
      return _this;
    }

    _createClass(Container, [{
      key: "setEditMode",
      value: function setEditMode() {

        console.log('ready');
        this.setState({ editMode: true });
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.loadMore();
      }
    }, {
      key: "loadMore",
      value: function loadMore() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/random-aphorism', false);
        xhr.send();

        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          var aphorism = JSON.parse(xhr.responseText);
          this.setState({ aphorism: aphorism });
        }
      }
    }, {
      key: "loadGrid",
      value: function loadGrid() {
        var xhr = new XMLHttpRequest();
        console.log('ready for loading grid');
        xhr.open('GET', '/load-grid', false);
        xhr.send();
        console.log(xhr.responseText);
        React.createElement(
          "table",
          { className: "aphorism_grid", id: "root" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "td",
              null,
              "Id"
            ),
            React.createElement(
              "td",
              null,
              "Aphorism"
            ),
            React.createElement(
              "td",
              null,
              "Author"
            )
          ),
          React.createElement("tbody", null)
        );
      }
    }, {
      key: "addAphorism",
      value: function addAphorism() {
        var value = document.getElementById('aphorismInput').value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/add-aphorism', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("text=" + encodeURIComponent(value));

        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          this.setState({ aphorism: { text: value } });
        };
      }
    }, {
      key: "updateAphorism",
      value: function updateAphorism() {
        var value = document.getElementById('edit_aphorism').value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/edit-aphorism', false);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        console.log(this.state);
        xhr.send("id=" + this.state.aphorism._id + '&text=' + encodeURIComponent(value));

        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          this.setState({ aphorism: { id: value } });
        };

        console.log(aphorismInput);
      }
    }, {
      key: "insertAphorism",
      value: function insertAphorism() {
        console.log('add');
      }
    }, {
      key: "deleteAphorism",
      value: function deleteAphorism() {
        var value = document.getElementById('edit_aphorism').value;
        var xhr = new XMLHttpRequest('Content-Type', 'application/x-www-form-urlencoded');
        console.log(this.state);
        xhr.send("id=" + this.state.aphorism._id + encodeURIComponent(value));

        if (xhr.status != 200) {
          alert(xhr.status + ': ' + xhr.statusText);
        } else {
          this.setState({ aphorism: { id: value } });
        }

        console.log('del');
      }
    }, {
      key: "render",
      value: function render() {
        {/* window.onload = function(){ document.getElementById("aphorism_loading").style.display = "none" } */}
        var view = this.state.editMode ? React.createElement(TextEdit, { aphorism: this.state.aphorism }) : React.createElement(Text, { aphorism: this.state.aphorism, onClick: this.setEditMode });
        return React.createElement(
          "div",
          { className: "aphorism_container" },
          this.state.editMode && React.createElement(
            "h1",
            { className: "title_edit_mode" },
            "edit mode"
          ),
          view,
          !this.state.editMode && React.createElement(
            "button",
            { onClick: this.loadMore, className: "aphorism_button" },
            "More"
          ),
          !this.state.editMode && React.createElement(
            "button",
            { onClick: this.loadGrid, className: "aphorism_button" },
            "Grid"
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { onClick: this.insertAphorism, className: "add_area_button" },
              "+"
            ),
            React.createElement(
              "button",
              { onClick: this.deleteAphorism, className: "del_area_button" },
              "-"
            ),
            React.createElement(
              "button",
              { onClick: this.updateAphorism, className: "edit_area_button" },
              "Save"
            )
          ),
          React.createElement(
            "div",
            null,
            React.createElement("input", { className: "aphorism_input", id: "aphorismInput", type: "text" }),
            React.createElement(
              "button",
              { onClick: this.addAphorism, className: "aphorism_button" },
              "Add"
            )
          )
        );
      }
    }]);

    return Container;
  }(React.Component);

  ReactDOM.render(React.createElement(Container, null), document.getElementById('root'));
}, false);