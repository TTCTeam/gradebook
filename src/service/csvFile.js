import { saveAs } from 'file-saver';
import { parse, unparse } from 'papaparse';

export async function writeCSV(filename, data, fields) {
  return new Promise(() => {
    const headers = unparse({ fields, data: [] });
    const csvData = unparse(data, { header: false });
    const blob = new Blob([headers + csvData], { type: 'application/csv; charset=UTF-8' });
    saveAs(blob, filename);
  });
}

export async function readCSV(file, fields) {
  return new Promise((resolve) => {
    parse(file, {
      header: true,
      complete: (results) => {
        const jsonData = results.data.map((result) => {
          const values = Object.values(result);
          return {
            [fields[0]]: values[0],
            [fields[1]]: values[1],
          };
        });
        resolve(jsonData);
      },
    });
  });
}
