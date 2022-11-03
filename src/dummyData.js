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
      title: 'to do',
      taskIds: ['A','B','C','D'],
    },
  },
  columnOrder: ['column-1'],
};

export default initialData;