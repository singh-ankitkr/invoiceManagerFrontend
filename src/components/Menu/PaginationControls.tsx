import { Button } from "@mui/material";

type handleIncDecType = () => void;

export const PaginationControls = ({
  handleDecrement,
  handleIncrement,
  previousDisabled,
  nextDisabled,
}: {
  handleDecrement: handleIncDecType;
  handleIncrement: handleIncDecType;
  previousDisabled: boolean;
  nextDisabled: boolean;
}) => {
  return (
    <div>
      <Button
        onClick={handleDecrement}
        disabled={previousDisabled}
      >{`< previous `}</Button>
      <Button
        onClick={handleIncrement}
        disabled={nextDisabled}
      >{` next >`}</Button>
    </div>
  );
};
