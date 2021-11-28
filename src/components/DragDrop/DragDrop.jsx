import React from 'react';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import GradeItem from '../GradeItem/GradeItem';
import './DragDrop.css';

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  marginBottom: '10px',
  borderRadius: '4px',
  height: '180px',
  width: '100%',
  backgroundColor: 'white',
  border: '2px solid lightgrey',
  ...draggableStyle,
});

export default function DragDrop({ items, updateItems }) {
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const newItems = [...items];
    const item = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, ...item);

    updateItems(newItems);
  };

  const onEdit = (id, title, detail) => {
    const newItems = [...items];
    const item = newItems.find((i) => i.id === id);
    item.title = title;
    item.detail = detail;
    updateItems(newItems);
  };

  const onDelete = (id) => {
    const newItems = [...items];
    const item = newItems.find((i) => i.id === id);
    newItems.splice(newItems.indexOf(item), 1);
    updateItems(newItems);
  };

  return (
    <div className="DragDrop">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provide) => (
            <div
              className="todo"
              /* eslint-disable react/jsx-props-no-spreading */
              {...provide.droppableProps}
              ref={provide.innerRef}
            >
              {items.map((item) => (
                <Draggable key={item.id} draggableId={item.id} index={items.indexOf(item)}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <GradeItem item={item} onEdit={onEdit} onDelete={onDelete} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provide.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
