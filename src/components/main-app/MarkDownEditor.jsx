import Title from "../title/Title";
import EditorApp from "../editor/EditorApp";
const MarkDownEditor = () => {
  return (
    <div className="markdown">
      <Title title={"Simple Markdown Editor"} />
      <EditorApp />
    </div>
  );
};

export default MarkDownEditor;
