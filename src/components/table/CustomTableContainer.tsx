import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import styles from "./CustomTableContainer.module.css";

type rowDataType = {
  id: string;
  rowData: string[];
};

type tableDataType = {
  headers: string[];
  rows: rowDataType[];
};

export const CustomTableContainer = ({
  tableData,
}: {
  tableData: tableDataType;
}) => {
  console.log(tableData);
  return (
    <div>
      <table className={styles["custom-table"]} data-test="invoices-table">
        <thead>
          <TableHeader headers={tableData.headers} />
        </thead>
        <tbody>
          {tableData.rows.map((row) => (
            <TableRow key={row.id} row={row.rowData} id={row.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
