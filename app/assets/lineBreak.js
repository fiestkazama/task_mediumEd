import React, { PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import {
  Block,
  addNewBlock

} from 'medium-draft';

import 'babel-polyfill';
import {polyfill} from 'es6-promise';
import 'isomorphic-fetch';

export default class BreakButton extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.setEditorState(addNewBlock(
      this.props.getEditorState(),
      Block.BREAK
    ));
  }

  render() {
    return (
      <button 
        className="md-sb-button" 
        onClick={this.onClick} 
        type="button"
        title = "Add a line break">
        <i className="fa fa-minus" />
      </button>
    );
  }
}

BreakButton.propTypes = {
  setEditorState: PropTypes.func,
  getEditorState: PropTypes.func,
  close: PropTypes.func,
};
