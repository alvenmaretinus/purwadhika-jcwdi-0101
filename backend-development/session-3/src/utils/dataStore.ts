import fs from 'fs';
import path from 'path';

const models = ['expenses'];

type Model = 'expenses';

export const getNextId = (model: Model) => {
  const data = getData<Record<string, any>[]>(model);

  return (data?.length ?? 1) + 1;
};

export function getData<T>(model: Model): T | null {
  if (!models.includes(model)) {
    return null;
  }

  const filePath = path.join(__dirname, `../dataStore/${model}.json`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (err) {
    console.error('Failed to read or parse expenses.json:', err);
    return null;
  }
}

export function updateData<T>(model: Model, data: T) {
  if (!models.includes(model)) {
    return;
  }

  const filePathDist = path.join(__dirname, `../dataStore/${model}.json`);
  const filePath = path.join(__dirname, `../../src/dataStore/${model}.json`);
  try {
    fs.writeFileSync(filePathDist, JSON.stringify(data, null, 2), 'utf-8');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write to', filePath, err);
  }
}
