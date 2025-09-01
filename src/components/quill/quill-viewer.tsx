import './quill.css';

export function QuillViewer({ content }: { content: string }) {
  return (
    <div className='ql-container ql-snow !border-none'>
      <div
        className='ql-editor'
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
}
