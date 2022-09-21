export const TableRow = ({ row, id }: { row: string[]; id: string }) => {
  return (
    <tr>
      {row.map((item, index) => (
        <td key={`${id}-${index}`}>{item}</td>
      ))}
    </tr>
  );
};
