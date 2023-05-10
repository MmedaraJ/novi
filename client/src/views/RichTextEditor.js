import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

const StyledEditor = styled.div`
  .rdw-editor-main {
    min-height: 150px;
    border: 1px solid #ccc;
    padding: 1rem;
  }
`;

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <StyledEditor>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'link',
            'embedded',
            'emoji',
            //'image',
            'remove',
            'history',
          ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
          },
          blockType: {
            inDropdown: true,
          },
          fontSize: {
            options: [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
          },
          list: {
            inDropdown: false,
            options: ['unordered', 'ordered'],
          },
          textAlign: {
            inDropdown: true,
            options: ['left', 'center', 'right', 'justify'],
          },
          link: {
            inDropdown: false,
          },
          image: {
            uploadCallback: () => {}, // Implement image upload callback function
            alt: { present: true, mandatory: false },
          },
        }}
      />
    </StyledEditor>
  );
};

export default RichTextEditor;
