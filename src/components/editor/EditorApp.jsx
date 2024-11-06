import { useState } from "react";
import "./Editor.css";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";

const EditorApp = () => {
  const styleMap = {
    RED: {
      color: "red",
    },
  };
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleBeforeInput = (chars, editorState) => {
    const contentState = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const blockText = block.getText();

    const removeStyles = (editorState, styles) => {
      let content = editorState.getCurrentContent();
      styles.forEach((style) => {
        content = Modifier.removeInlineStyle(
          content,
          editorState.getSelection(),
          style
        );
      });
      return EditorState.push(editorState, content, "change-inline-style");
    };

    ///// for heading type text
    if (blockText.startsWith("# ")) {
      // Apply header style and remove '#'
      const newContentState = Modifier.removeRange(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        "forward"
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleBlockType(newEditorState, "header-one"));
      return "handled";
    }
    /////////for bold type text
    if (blockText.startsWith("* ")) {
      let newEditorState = removeStyles(editorState, ["RED", "UNDERLINE"]);
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 2,
        }),
        ""
      );
      newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));
      return "handled";
    }
    ////////for red colored text
    if (blockText.startsWith("** ")) {
      let newEditorState = removeStyles(editorState, ["BOLD", "UNDERLINE"]);
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 3,
        }),
        ""
      );
      newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "RED"));
      return "handled";
    }

    ////////for underlined text
    if (blockText.startsWith("*** ")) {
      const newContentState = Modifier.replaceText(
        contentState,
        selection.merge({
          anchorOffset: 0,
          focusOffset: 4,
        }),
        ""
      );
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "remove-range"
      );
      setEditorState(RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE"));
      return "handled";
    }
    return "not-handled";
  };

  return (
    <div className="editor-container">
      <div className="btn-container">
        <button className="btn-save">Save</button>
      </div>
      <div className="utils">
        <div className="editor-space">
          <p className="indication">Start Typing below...</p>
          <Editor
            editorState={editorState}
            onChange={setEditorState}
            handleBeforeInput={(chars) => handleBeforeInput(chars, editorState)}
            customStyleMap={styleMap}
          />
        </div>
      </div>
    </div>
  );
};

export default EditorApp;
