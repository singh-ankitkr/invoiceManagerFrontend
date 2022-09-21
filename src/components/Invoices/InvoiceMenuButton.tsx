import { CustomMenuBtn } from "../Menu/MenuButton";

export const InvoiceMenuButton = () => {
  const menuItems = [
    {
      menu: "Edit invoice",
      link: "/",
    },
    {
      menu: "Print invoice",
      link: "/",
    },
  ];
  return <CustomMenuBtn menuItems={menuItems} />;
};
