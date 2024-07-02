
import React, { useState } from 'react';

/**
 * @typedef {Object} FileItem
 * @property {'file'} type
 * @property {string} name
 */

/**
 * @typedef {Object} FolderItem
 * @property {'folder'} type
 * @property {string} name
 * @property {(FolderItem | FileItem)[]} children
 */

/**
 * @typedef {FolderItem | FileItem} StructureItem
 */

/**
 * @typedef {Object} SidebarProps
 * @property {StructureItem[]} structure
 * @property {(name: string) => void} onCreateFile
 * @property {(name: string) => void} onCreateFolder
 * @property {(item: StructureItem) => void} onSelectItem
 */

/**
 * @param {SidebarProps} props
 */
const Sidebar = ({ structure, onCreateFile, onCreateFolder, onSelectItem }) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [newFileName, setNewFileName] = useState('');

  /**
   * @param {StructureItem[]} items
   */
  const renderStructure = (items) => {
    return items.map((item) => (
      <div key={item.name} className="pl-4">
        <div onClick={() => onSelectItem(item)}>
          {item.type === 'folder' ? '📁' : '📄'} {item.name}
        </div>
        {item.type === 'folder' && renderStructure(item.children)}
      </div>
    ));
  };

  return (
    <div className="w-64 bg-gray-200 p-4">
      <div>
        <input 
          value={newFolderName} 
          onChange={(e) => setNewFolderName(e.target.value)} 
          placeholder="New folder name" 
        />
        <button onClick={() => onCreateFolder(newFolderName)}>Create Folder</button>
      </div>
      <div>
        <input 
          value={newFileName} 
          onChange={(e) => setNewFileName(e.target.value)} 
          placeholder="New file name" 
        />
        <button onClick={() => onCreateFile(newFileName)}>Create File</button>
      </div>
      <div>{renderStructure(structure)}</div>
    </div>
  );
};

export default Sidebar;
