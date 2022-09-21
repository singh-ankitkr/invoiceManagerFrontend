import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

type menuItemType = {
  menu: string;
  link: string;
};

export const CustomMenuBtn = ({
  menuItems = [{ menu: "Default Menu", link: "/" }],
}: {
  menuItems: menuItemType[];
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const createMenu = () => {
    return menuItems.map((menuItem) => (
      <MenuItem key={menuItem.menu}>
        <Link href={`${menuItem.link}`}>{`${menuItem.menu}`}</Link>
      </MenuItem>
    ));
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon color="secondary" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {createMenu()}
      </Menu>
    </div>
  );
};
