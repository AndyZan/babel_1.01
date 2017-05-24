document.addEventListener('DOMContentLoaded', function() {

  const TextEdit = (props) =>
    <div className="aphorism_textEdit" >
      <textarea defaultValue={props.aphorism.text} className="aphorism_textarea" id="edit_aphorism"></textarea>
    </div>

  const Text = (props) =>
    <div onClick={props.onClick} className="aphorism_text">
      {props.aphorism.text + ' '}
      <em>
        {props.aphorism.author || ' '}
        {/*props.aphorism._id + ' '*/}
      </em>
    </div>

  class Container extends React.Component {
    constructor(props) {
        super(props)
        this.loadMore = this.loadMore.bind(this)
        this.loadGrid = this.loadGrid.bind(this);
        this.addAphorism = this.addAphorism.bind(this)
        this.setEditMode = this.setEditMode.bind(this)
        this.updateAphorism = this.updateAphorism.bind(this)
        this.state = {
            editMode: false,
            aphorism: {
                text: 'Если ты споткнулся и упал, это еще не значит, что ты идешь не туда.'
            }
        }
    }

    setEditMode() {

      console.log('ready')
      this.setState({editMode: true})

    }

    componentDidMount() {
      this.loadMore();
    }

    loadMore() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/random-aphorism', false);
      xhr.send();

      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        const aphorism = JSON.parse(xhr.responseText);
        this.setState({aphorism: aphorism})
      }
    }

    loadGrid() {
        const xhr = new XMLHttpRequest();
        console.log('ready for loading grid');
        xhr.open('GET', '/load-grid', false);
        xhr.send();
        console.log(xhr.responseText);

        var response = xhr.responseText;

        function loadGrid(response) {
            var table = document.getElementById('aphorismInput').getElementsByTagName('tbody')[0];

            response.forEach(function(stringData, index, array){
                var row = table.insertRow(index);
                var elements = stringData.split(' ');
                for (var i = 0; i < elements.length; ++i) {
                    var cell = row.insertCell(i);
                    cell.innerHTML = elements[i];
                }
            });
        }

        <table className="aphorism_grid">
            <thead>
                <td>Id</td>
                <td>Aphorism</td>
                <td>Author</td>
            </thead>
            <tbody></tbody>
        </table>
    }

    addAphorism() {
      const value = document.getElementById('aphorismInput').value
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/add-aphorism', false);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send("text=" + encodeURIComponent(value));

      if (xhr.status != 200) {
        alert(xhr.status + ': ' + xhr.statusText);
      } else {
        this.setState({aphorism: {text: value}});
      };
    }

    updateAphorism() {
      const value = document.getElementById('edit_aphorism').value
      const xhr = new XMLHttpRequest()
      xhr.open('POST', '/edit-aphorism', false)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      console.log(this.state)
        xhr.send("id=" + this.state.aphorism._id +'&text='+encodeURIComponent(value));

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        } else {
            this.setState({aphorism: {id: value}});
        };

      console.log(aphorismInput)

    }

    insertAphorism() {
      console.log('add')
    }

    deleteAphorism() {
      const value = document.getElementById('edit_aphorism').value
      const xhr = new XMLHttpRequest('Content-Type', 'application/x-www-form-urlencoded')
      console.log(this.state)
        xhr.send("id=" + this.state.aphorism._id + encodeURIComponent(value))

        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText)
        } else {
          this.setState({aphorism: {id: value}})
        }

      console.log('del')
    }

    render() {
        {/* window.onload = function(){ document.getElementById("aphorism_loading").style.display = "none" } */}
        const view = this.state.editMode ? <TextEdit aphorism={this.state.aphorism}/> : <Text aphorism={this.state.aphorism} onClick={this.setEditMode}/>
      return <div className="aphorism_container">
        {this.state.editMode && <h1 className="title_edit_mode">edit mode</h1>}
        {view}
        {!this.state.editMode && <button onClick={this.loadMore} className="aphorism_button">More</button>}
        {!this.state.editMode && <button onClick={this.loadGrid} className="aphorism_button">Grid</button>}
        <div>
          <button onClick={this.insertAphorism} className="add_area_button">+</button>
          <button onClick={this.deleteAphorism} className="del_area_button">-</button>
          <button onClick={this.updateAphorism} className="edit_area_button">Save</button>
        </div>
        <div>
          <input className="aphorism_input" id="aphorismInput" type="text"/>
          <button onClick={this.addAphorism} className="aphorism_button">Add</button>
        </div>
      </div>
    }
  }

  ReactDOM.render(
      <Container/>,
      document.getElementById('root')
  );
}, false);
