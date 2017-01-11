import React, { PropTypes } from 'react';
import {Button} from 'react-bootstrap';

import {
  ImageSideButton,
  Block,
  addNewBlock

} from 'medium-draft';

import 'babel-polyfill';
import {polyfill} from 'es6-promise';
import 'isomorphic-fetch';

export default class ImageButton extends ImageSideButton  {

  //If doesn't work.. place it outside class..
  static propTypes: {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func,
    close: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onClick() {
    this.input.value = null;
    this.input.click();
  }

  onChange(e) {
    // e.preventDefault();
    const file = e.target.files[0];
    if (file.type.indexOf('image/') === 0) {
      
      const src = URL.createObjectURL(file);
      this.props.setEditorState(addNewBlock(
        this.props.getEditorState(),
        Block.IMAGE, {
          src,
        }
      ));
    }
    this.props.close();
  }

  render() {
    return (
      <Button
        type="button"
        onClick={this.onClick}
        title="Add an Image"
      >
        <i className="fa fa-image" />
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
