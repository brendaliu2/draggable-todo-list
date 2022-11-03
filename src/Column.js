import styled from 'styled-components';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

export default function Column({ col, tasks }) {
  return (
    <Container>
      <Title>{col.title}</Title>
      <Droppable droppableId={col.id}>
        {provided => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => <Task key={task.id} task={task} index={index}/>)}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}