// Imports ....
import Immutable from "immutable";

import {genKey, EditorState, ContentBlock, Modifier, BlockMapBuilder} from "draft-js";

const {
  List,
  Map
} = Immutable;

// Function to insert a block...Takes an editorState and data....
function insertDataBlock(editorState, data) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();

  const afterRemoval = Modifier.removeRange(
    contentState,
    selectionState,
    "backward"
  );

  const targetSelection = afterRemoval.getSelectionAfter();// select target
  const afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);// split into block
  const insertionTarget = afterSplit.getSelectionAfter();//insert into block...
  const asAtomicBlock = Modifier.setBlockType(
    afterSplit,
    insertionTarget,
    "atomic"
  );
  
  const block = new ContentBlock({
    key: genKey(),
    type: "atomic",
    text: "",
    characterList: List(),
    data: new Map(data)
  });


  const fragmentArray = [
    block,
    new ContentBlock({
      key: genKey(),
      type: "unstyled",
      text: "",
      characterList: List()
    })
  ];

  const fragment = BlockMapBuilder.createFromArray(fragmentArray);

  const withAtomicBlock = Modifier.replaceWithFragment(
    asAtomicBlock,
    insertionTarget,
    fragment
  );
  
  // New content creation ...
  const newContent = withAtomicBlock.merge({
    selectionBefore: selectionState,
    selectionAfter: withAtomicBlock.getSelectionAfter().set("hasFocus", true)
  });

  // Pushing the resulting content into editor...As a change in state..
  return EditorState.push(editorState, newContent, "insert-fragment");
}

export default insertDataBlock;
