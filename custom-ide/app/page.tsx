
"use client"; 
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import NoteMaker from './components/NoteMaker';
import ListMaker from './components/ListMaker';
import ReadmePreview from './components/ReadmePreview';
import { StructureItem, FolderItem, FileItem } from './types';

const initialStructure: FolderItem[] = [
  {
    type: 'folder',
    name: 'src',
    children: [
      { type: 'file', name: 'index.ed' },
      { type: 'file', name: 'app.note' },
    ],
  },
];

export default function Home() {
  const [structure, setStructure] = useState<StructureItem[]>(initialStructure);
  const [selectedItem, setSelectedItem] = useState<StructureItem | null>(null);
  const [fileContent, setFileContent] = useState('');

  const createFolder = (name: string) => {
    const newFolder: FolderItem = { type: 'folder', name, children: [] };
    setStructure([...structure, newFolder]);
  };

  const createFile = (name: string) => {
    const newFile: FileItem = { type: 'file', name };
    setStructure([...structure, newFile]);
  };

  const selectItem = (item: StructureItem) => {
    setSelectedItem(item);
    setFileContent(''); // Load the file content as needed
  };

  const renderFileContent = (item: StructureItem) => {
    if (item.type === 'file') {
      if (item.name.endsWith('.ed')) {
        return <Editor content={fileContent} onChange={setFileContent} />;
      } else if (item.name.endsWith('.note')) {
        return <NoteMaker />;
      } else if (item.name.endsWith('.lt')) {
        return <ListMaker />;
      } else if (item.name.endsWith('.readme')) {
        return <ReadmePreview content={fileContent} />;
      }
    }
    return null;
  };

  return (
    <div className="flex">
      <Sidebar 
        structure={structure} 
        onCreateFile={createFile} 
        onCreateFolder={createFolder} 
        onSelectItem={selectItem} 
      />
      <div className="flex-1 p-4">
        {selectedItem ? (
          <div>
            <h1>{selectedItem.name}</h1>
            {renderFileContent(selectedItem)}
          </div>
        ) : (
          <div>Select a file or folder</div>
        )}
      </div>
    </div>
  );
}
