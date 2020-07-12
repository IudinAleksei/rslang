/* eslint-disable import/prefer-default-export */
import { ELEMENTS_CLASSES } from '../../../common/constants';

const createTableRow = (word) => {
  const row = document.createElement('div');
  row.classList.add(ELEMENTS_CLASSES.dictionaryTableRow);

  row.innerText = word;

  return row;
};

export const createDictTable = (dictionary, wordArray) => {
  const tableContainer = document.createElement('div');
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');

  tableContainer.classList.add(ELEMENTS_CLASSES.dictionaryTableContainer);
  table.classList.add(ELEMENTS_CLASSES.dictionaryTable);

  wordArray.forEach((word) => {
    const row = createTableRow(word);
    tbody.append(row);
  });

  table.append(tbody);
  tableContainer.append(table);
  dictionary.append(tableContainer);
};
