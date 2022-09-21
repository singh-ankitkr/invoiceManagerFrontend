export const TableHeader = ({ headers }: { headers: string[] }) => {
  console.log("headers");
  return (
    <tr>
      {headers.map((header) => (
        <th key={header}>{header}</th>
      ))}
    </tr>
  );
};
