import { useState } from 'react';
import initialData from './dummyData';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';

export default function JobBoard() {
  const [data, setData] = useState(initialData);

  function endDrop () {
    console.log('end')
  }


  return (
    <DragDropContext
      onDragEnd={endDrop}
    >
      {/* <main>
        <header>
          <h1>Job Board</h1>
          <p>Keep track of your job search journey!</p>
        </header>

        <section>
          <h2>Jobs</h2>
        </section> */}

        <section>
          {data.columnOrder.map(columnId => {
            const col = data.columns[columnId];
            const tasks = col.taskIds.map(taskId => data.tasks[taskId]);

            return <Column key={col.id} col={col} tasks={tasks} />;
          })}
        </section>
      {/* </main> */}
    </DragDropContext>
  );
}