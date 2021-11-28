// eslint-disable-next-line import/prefer-default-export
export function getListGrade() {
  return [
    {
      id: 1, title: 'grade 1', detail: '1', order: 1,
    },
    {
      id: 2, title: 'grade 2', detail: '2', order: 2,
    },
    {
      id: 3, title: 'grade 3', detail: '3', order: 3,
    },
    {
      id: 4, title: 'grade 4', detail: '4', order: 4,
    },
  ];
}

export function createGradeMockApi({ title, detail, order }) {
  return {
    id: Math.floor(Math.random() * 10000),
    title,
    detail,
    order,
  };
}

export function reorderGradeMockApi(changeGrades) {
  console.log(changeGrades);
}
