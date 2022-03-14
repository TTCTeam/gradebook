import { saveAs } from 'file-saver';
import { parse, unparse } from 'papaparse';

export async function writeCSV(filename, data, fields) {
  return new Promise(() => {
    const srcFields = fields.map((field) => field.from);
    const desFields = fields.map((field) => field.to);
    const headers = unparse({ fields: desFields, data: [] }, { header: !!fields });
    const csvData = unparse({ fields: srcFields, data }, { header: !fields });
    const blob = new Blob([headers + csvData], { type: 'application/csv; charset=UTF-8' });
    saveAs(blob, filename);
  });
}

export async function readCSV(file, fields) {
  return new Promise((resolve) => {
    const srcFields = fields.map((field) => field.from);
    const desFields = fields.map((field) => field.to);
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const jsonData = results.data.map((result) => {
          if (fields) {
            const data = {};
            srcFields.forEach((srcField, index) => { data[desFields[index]] = result[srcField]; });
            // srcFields.forEach((srcField) =>
            // Object.assign(data, { [desFields]: result[srcField] }));
            return data;
          }
          return result;
        });
        resolve(jsonData);
      },
    });
  });
}
