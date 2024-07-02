import { useState } from 'react';

const ListMaker = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    setList([...list, newItem]);
    setNewItem('');
  };

  return (
    <div>
      <input 
        value={newItem} 
        onChange={(e) => setNewItem(e.target.value)} 
        placeholder="New list item" 
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListMaker;
