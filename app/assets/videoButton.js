import React , { PropTypes } from 'react';
import {Button} from 'react-bootstrap';

import insertDataBlock from './insertDataBlock';

import {
  ImageSideButton,
  Block,
  addNewBlock

} from 'medium-draft';

export default class VideoButton extends React.Component {

  static propTypes: {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);


  }

  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Enter a URL");
    if (!src) {
      return;
    }

    const data = {src: src, type: "video", display: "small"};

    this.props.onChange(insertDataBlock(
      this.props.setEditorState(addNewBlock(
        this.props.getEditorState(),
        Block.IMAGE, {
          data
        }
    ))
    ))
  }

  

  render() {
    return (
      <Button
        className={this.props.className} 
        type="button" onClick={this.onClick} 
        title={this.props.title}
      >
        <i className="fa fa-plus" />
        <input
          type="file"
          ref={(c) => { this.input = c; }}
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
    </Button>
    );
  }
}

VideoButton.propTypes = {
  setEditorState: PropTypes.func,
  getEditorState: PropTypes.func,
  close: PropTypes.func,
};