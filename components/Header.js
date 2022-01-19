import React from "react";
import { Link, Box, Flex, Text, Button, Stack, Avatar } from "@chakra-ui/react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import Logo from "./Logo";
import Autocomplete from "react-autocomplete";

// const customRender = (selected) => {
//   return (
//     <Flex flexDir="row" alignItems="center">
//       <Avatar mr={2} size="sm" name={selected.label} />
//       <Text>{selected.label}</Text>
//     </Flex>
//   );
// };

const NavBar = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const countries = [
    { value: "ghana", label: "Ghana" },
    { value: "nigeria", label: "Nigeria" },
    { value: "kenya", label: "Kenya" },
    { value: "southAfrica", label: "South Africa" },
    { value: "unitedStates", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "germany", label: "Germany" },
  ];

  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState([]);

  const handleCreateItem = (item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer zIndex={100} position="relative" {...props}>
      <Logo
        align="center"
        w="100px"
        color={["black", "black", "primary.500", "primary.500"]}
      />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
      <Box zIndex={100} position="relative">
        <CUIAutoComplete
          listStyleProps={{ zIndex: 10, position: "relative" }}
          placeholder="Type a Country"
          items={pickerItems}
          selectedItems={selectedItems}
          onSelectedItemsChange={(changes) =>
            handleSelectedItemsChange(changes.selectedItems)
          }
        />
        <Autocomplete
          value={"hi"}
          inputProps={{ id: "states-autocomplete" }}
          wrapperStyle={{ position: "relative", display: "inline-block" }}
          items={{}}
          getItemValue={(item) => item.name}
          shouldItemRender={{}}
          sortItems={{}}
          onChange={(event, value) => {}}
          onSelect={(value) => {}}
          renderMenu={(children) => <div className="menu">{children}</div>}
          renderItem={(item, isHighlighted) => (
            <div
              className={`item ${isHighlighted ? "item-highlighted" : ""}`}
              key={item.abbr}
            >
              {item.name}
            </div>
          )}
        />
      </Box>
    </NavBarContainer>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="black"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="black"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <MenuIcon />}
    </Box>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      ></Stack>
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return <Box>{children}</Box>;
};

export default NavBar;
