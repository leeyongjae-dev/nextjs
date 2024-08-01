// components/CKEditor.js
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ editorData, setEditorData }) => {
  return (
    <CKEditor
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
