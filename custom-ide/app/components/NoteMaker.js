import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialNotes = [
  { id: '1', content: 'Note 1', status: 'todo' },
  { id: '2', content: 'Note 2', status: 'in-progress' },
];

const NoteMaker = () => {
  const [notes, setNotes] = useState(initialNotes);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newNotes = Array.from(notes);
    const [movedNote] = newNotes.splice(result.source.index, 1);
    newNotes.splice(result.destination.index, 0, movedNote);

    setNotes(newNotes);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="notes">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {notes.map((note, index) => (
              <Draggable key={note.id} draggableId={note.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="p-2 m-2 border"
                  >
                    {note.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NoteMaker;
