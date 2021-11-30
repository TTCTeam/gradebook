import React from 'react';
import { useParams } from 'react-router-dom';
import { Droppable, DragDropContext, Draggable } from 'react-beautiful-dnd';
import AssignmentItem from '../AssignmentItem/AssignmentItem';
import './DragDrop.css';
import { deleteAssignment, reorderAssignment, updateAssignment } from '../../api/assignmentAPI';
import { sortByField } from '../../utils/common';

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
  const { id } = useParams();

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const newItems = [...items];
    if (destination.index > source.index) {
      const changeItems = newItems.slice(source.index, destination.index + 1);
      changeItems.forEach((item, index) => { changeItems[index].order = item.order - 1; });
      changeItems[0].order = changeItems[changeItems.length - 1].order + 1;
      // replace
      reorderAssignment(id, changeItems);
    } else {
      const changeItems = newItems.slice(destination.index, source.index + 1);
      changeItems.forEach((item, index) => { changeItems[index].order = item.order + 1; });
      changeItems[changeItems.length - 1].order = changeItems[0].order - 1;
      // replace
      reorderAssignment(id, changeItems);
    }
    console.log(newItems);
    updateItems(newItems);
  };

  const onEdit = async (assignmentId, name, point) => {
    const newItems = [...items];
    const item = newItems.find((i) => i.id === assignmentId);
    item.name = name;
    item.point = point;
    const res = await updateAssignment(id, assignmentId, item);
    if (res.status === 200) {
      updateItems(newItems);
    } else {
      alert('Edit failed!');
    }
  };

  const onDelete = async (assignmentId) => {
    const newItems = [...items];
    const item = newItems.find((i) => i.id === assignmentId);
    newItems.splice(newItems.indexOf(item), 1);
    const res = await deleteAssignment(id, assignmentId);
    if (res.status === 200) {
      updateItems(newItems);
    } else {
      alert('Delete failed!');
    }
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
              {sortByField(items, 'order').map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <AssignmentItem item={item} onEdit={onEdit} onDelete={onDelete} />
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
