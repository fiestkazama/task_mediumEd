import React from 'react';
import ReactDOM from 'react-dom';
import MyEditApp from './editorCode';
import { Grid, Alert } from 'react-bootstrap';

class App extends React.Component {
  render() {
    return (
      <Grid>
        <h1 className="text-muted"><center>TextEditor</center></h1>
        <Alert>
          <ul>Things you can do:</ul>
          <li>Drag and Drop text and html files</li>
          <li>ToolTip on selection</li>
          <li>Auto spellCheck</li>
          <li>side-button</li>
          <li>Link-addition using ToolTip</li>
        </Alert>
        <p> </p>
        <MyEditApp/>
        <p> </p>
      </Grid>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById( 'app' ));
