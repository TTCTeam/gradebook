// eslint-disable-next-line import/prefer-default-export
export function getListAssignment() {
  return [
    {
      id: 1,
      name: 'grade 1',
      point: '1',
      order: 1,
    },
    {
      id: 2,
      name: 'grade 2',
      point: '2',
      order: 2,
    },
    {
      id: 3,
      name: 'grade 3',
      point: '3',
      order: 3,
    },
    {
      id: 4,
      name: 'grade 4',
      point: '4',
      order: 4,
    },
  ];
}

export function createAssignmentMockApi({ name, point, order }) {
  return {
    id: Math.floor(Math.random() * 10000),
    name,
    point,
    order,
  };
}

export function reorderAssignmentMockApi(changeAssignments) {
  console.log(changeAssignments);
}
