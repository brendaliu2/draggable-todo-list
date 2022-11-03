import { useState } from 'react';
import initialData from './dummyData';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
`;

export default function DraggableTodoApp() {
  const [data, setData] = useState(initialData);

  // function startDrag() {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'background-color 0.2s ease';
  // }

  function endDrop(result) {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startCol = data.columns[source.droppableId];
    const endCol = data.columns[destination.droppableId];

    if (startCol === endCol) {
      const newTaskIds = Array.from(startCol.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newCol = {
        ...startCol,
        taskIds: newTaskIds
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newCol.id]: newCol,
        }
      };
      //API call to update reorder
      setData(newData);
    }

    //moving to diff col
    const startTaskIds = Array.from(startCol.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startCol,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(endCol.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...endCol,
      taskIds: finishTaskIds,
    }

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      }
    }

    setData(newData);

  }

  // function updateDrag(update) {
  //   const { destination } = update;

  //   const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0;

  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // }


  return (
    <DragDropContext
      // onDragStart={startDrag}
      onDragEnd={endDrop}
    // onDragUpdate={updateDrag}
    >
      {/* <main>
        <header>
          <h1>Job Board</h1>
          <p>Keep track of your job search journey!</p>
        </header>

        <section>
          <h2>Jobs</h2>
        </section> */}

      <Container>
        {data.columnOrder.map(columnId => {
          const col = data.columns[columnId];
          const tasks = col.taskIds.map(taskId => data.tasks[taskId]);

          return <Column key={col.id} col={col} tasks={tasks} />;
        })}
      </Container>
      {/* </main> */}
    </DragDropContext>
  );
}