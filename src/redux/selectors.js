import { ASC, DESC } from "../constants";

export const getFilteredRecords = (store) => {
  let records = [...store.data.records];
  const keyArr = ["id", "firstName", "lastName", "email", "phone"];
  const searchString = store.data.searchString;
  return searchString === ""
    ? records
    : records.filter((record) => {
        for (let key in record) {
          if (
            keyArr.includes(key) &&
            record[key]
              .toString()
              .toLowerCase()
              .includes(searchString.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
};

export const getCurrentRecords = (store) => {
  const records = getFilteredRecords(store);
  const currentPage = store.pagination.currentPage;
  const recordsPerPage = store.pagination.recordsPerPage;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  return records.slice(indexOfFirstRecord, indexOfLastRecord);
};

function customSort(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

export const getOrderedRecords = (store) => {
  const records = getCurrentRecords(store);
  const order = store.columnSort.order;
  const column = store.columnSort.column;

  if (order === ASC) {
    return records.sort((a, b) => {
      return customSort(a[column], b[column]);
    });
  } else if (order === DESC) {
    return records.sort((a, b) => {
      return customSort(b[column], a[column]);
    });
  }
  return records;
};
