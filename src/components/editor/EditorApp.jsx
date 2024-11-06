import { useState } from "react";
import "./Editor.css";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";

const EditorApp = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleBeforeInput = (chars, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const blockText = block.getText();

    ///// for heading type text
    if (blockText.startsWith("# ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        ""
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleBlockType(newEditorState, "header-one"));
      return "handled";
    }
  };

  return (
    <div className="editor-container">
      <div className="btn-container">
        <button className="btn-save">Save</button>
      </div>
      <div className="utils">
        <div className="editor-space">
          <p>Start Typing below...</p>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleBeforeInput={(chars) => handleBeforeInput(chars, editorState)}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorApp;
