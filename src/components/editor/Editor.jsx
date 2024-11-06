import "./Editor.css";
import { Editor, EditorState, RichUtils } from "draft-js";

const Editor = () => {
  return (
    <div className="editor-container">
      <div className="btn-container">
        <button className="btn-save">Save</button>
      </div>
      <div className="editor-space"></div>
    </div>
  );
};

export default Editor;
