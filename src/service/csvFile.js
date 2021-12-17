import { saveAs } from 'file-saver';
import { parse, unparse } from 'papaparse';

export async function writeCSV(filename, data, fields) {
  return new Promise(() => {
    const headers = unparse({ fields, data: [] });
    const csvData = unparse(data, { header: !fields });
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
          if (fields) {
            const values = Object.values(result);
            const data = {};
            values.forEach((value, index) => Object.assign(data, { [fields[index]]: value }));
            return data;
          }
          return result;
        });
        resolve(jsonData);
      },
    });
  });
}
