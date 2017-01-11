//Imports
import React from 'react';
import {Panel} from 'react-bootstrap';
import ToolTip from 'react-portal-tooltip'


import {
  ImageSideButton,
  Block,
  addNewBlock,
  createEditorState,
  Editor,
  Link,
  findLinkEntities

} from 'medium-draft';

import {polyfill} from 'es6-promise';
import 'isomorphic-fetch';

import ImageButton from './assets/imageButton';
import BreakButton from './assets/lineBreak';
import VideoButton from './assets/videoButton';



//Class Code Begins..
export default class MyEditApp extends React.Component {
  constructor(props) {
    super(props);
    //var editorState = Draft.EditorState.createEmpty();
    this.state = {editorState: createEditorState(),
    isTooltipActive: false}; //didn't used Editor.createEmpty() ..
    this.sideButtons = [{
      title: 'Image',
      component: ImageButton
    },
    {
      title: 'Break',
      component: BreakButton
    },
    {
      title: 'video',
      component: VideoButton
    }
    
  ]; //array of sideButton created

   //for changing the state of the editor...
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };

  }
    showTooltip() {
        this.setState({isTooltipActive: true})
    }
    hideTooltip() {
        this.setState({isTooltipActive: false})
    }

  /*this.state = {
    editorState: this._getPlaceholder()
  }*/
  // Using refs to call focus on editor 
  componentDidMount() {
    this.refs.editor.focus();
  }

  //Packing items together in Render ...
  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Panel>
          <div>
              <div>
                    <p id="text" onMouseEnter={this.showTooltip.bind(this)} onMouseLeave={this.hideTooltip.bind(this)}>Tip</p>
                    <ToolTip active={this.state.isTooltipActive} position="top" arrow="center" parent="#text">
                        <div>
                            <p>To start, type in below</p>
                            <img src="image.png"/>
                        </div>
                    </ToolTip>
                </div>

                <Editor
                  ref="editor"
                  editorState={editorState}
                  onChange={this.onChange}
                  sideButtons={this.sideButtons}                  
                />
            </div>
        </Panel>
      </div>
    );
  }
}
