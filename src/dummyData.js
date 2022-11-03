const initialData = {
  tasks: {
    'A': {id: 'A', content: 'apply to jobs'},
    'B': {id: 'B', content: 'network'},
    'C': {id: 'C', content: 'go running'},
    'D': {id: 'D', content: 'watch kung fu panda again'},
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['A','B','C','D'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

export default initialData;