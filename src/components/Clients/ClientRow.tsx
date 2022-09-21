type clientRowDetails = {
  id: string;
  name: string;
  company: string;
  totalBilled: string | number;
  invoicesCount: string | number;
  actions: string | unknown;
};

export const ClientRow = ({ rowDetails }: { rowDetails: clientRowDetails }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "30% 25% 20% 15% 10%",
        width: "100%",
        borderTop: "solid gray",
      }}
      data-test={`client-row-${rowDetails.id}`}
    >
      <div data-test="client-name">{rowDetails.name}</div>
      <div data-test="client-companyName">{rowDetails.company}</div>
      <div data-test="client-totalBilled">{rowDetails.totalBilled}</div>
      <div data-test="client-invoicesCount">{rowDetails.invoicesCount}</div>
      <div data-test="client-actions">{rowDetails.actions}</div>
    </div>
  );
};
