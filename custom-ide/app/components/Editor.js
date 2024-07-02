const Editor = ({ content, onChange }) => {
    return (
      <textarea 
        value={content} 
        onChange={(e) => onChange(e.target.value)} 
        className="w-full h-full border"
      />
    );
  };
  
  export default Editor;
  