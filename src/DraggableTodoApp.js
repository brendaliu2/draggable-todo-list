import { useState } from 'react';
import initialData from './dummyData';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import NewTodoForm from './NewTodoForm';

const Container = styled.div`
  display: flex;
`;

export default function DraggableTodoApp() {
  const [data, setData] = useState(initialData);
  const taskIds = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // function startDrag() {
  //   document.body.style.color = 'orange';
  //   document.body.style.transition = 'background-color 0.2s ease';
  // }

  function endDrop(result) {
    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';
    const { destination, source, draggableId } = result;
    console.log('destination', destination);
    console.log('source', source);
    console.log('draggableID', draggableId);

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
      console.log('new data', newData);
      //API call to update reorder
      setData(newData);
    } else {



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
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        }
      };

      //API call to update reorder
      setData(newData);
    }
  }

  // function updateDrag(update) {
  //   const { destination } = update;

  //   const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0;

  //   document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  // }

  function create(newTodo) {
    const tasks = [...data.tasks];
    const latestId = tasks.at(-1).id;
    const newId = taskIds[taskIds.indexOf(latestId) + 1];

    tasks.push({
      id: newId,
      content: newTodo.content,
    })

    const colTasks = [...data.columns['column-1'].taskIds];
    colTasks.push(newId);

    const newData = {
      ...data,
      tasks: tasks,
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          taskIds: colTasks,
        }
      }
    }

    setData(newData);
  }


  return (
    <>
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
          const tasks = col.taskIds.map(taskId => {
            const task = data.tasks.filter(task => task.id === taskId);
            return task[0];
          });

          return <Column key={col.id} col={col} tasks={tasks} />;
        })}
      </Container>
      {/* </main> */}
    </DragDropContext>
    <NewTodoForm handleSave={create} />
    </>
  );
}