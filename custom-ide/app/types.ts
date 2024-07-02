export type FileItem = {
    type: 'file';
    name: string;
  };
  
  export type FolderItem = {
    type: 'folder';
    name: string;
    children: Array<FolderItem | FileItem>;
  };
  
  export type StructureItem = FolderItem | FileItem;
  