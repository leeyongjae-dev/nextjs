// components/CKEditor.js
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CKEditorComponent = ({ id, editorData, setEditorData }) => {
  return (
    <CKEditor
      id={id}
      editor={ClassicEditor}
      data={editorData}
      onChange={(event, editor) => {
        const data = editor.getData();
        setEditorData(data);
      }}
    />
  );
};

export default CKEditorComponent;
