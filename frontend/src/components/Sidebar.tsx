import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { PresentationChartBarIcon, InboxIcon } from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const SidebarWithBurgerMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value: React.SetStateAction<boolean>) => {
    setOpen(open === value ? false : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  return (
    <div id="sidebar" className="h-full">
      <div className="m-2.5">
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" onClick={openDrawer} />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" onClick={openDrawer} />
        )}
      </div>

      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        placeholder={null}
        className=" h-[70vh] border-gray-400 border-l-0 overflow-auto"
      >
        <Card
          color="white"
          shadow={false}
          className="h-[100vh] w-full"
          placeholder={"Card"}
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray" placeholder={undefined}>
              Sidebar
            </Typography>
          </div>
          
          <List placeholder={undefined}>
            <Accordion
              open={open === true}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === true ? "rotate-180" : ""
                  }`}
                />
              }
              placeholder={"Search"}
            >
              <ListItem
                className="p-0"
                selected={open === true}
                placeholder={undefined}
              >
                <AccordionHeader
                  onClick={() => handleOpen(true)}
                  className="border-b-0 p-3"
                  placeholder={undefined}
                >
                  <ListItemPrefix placeholder={undefined}>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    placeholder={undefined}
                    color="blue-gray"
                    className="mr-auto font-normal"
                  >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              {open && (
                <AccordionBody className="py-1">
                  <List placeholder={undefined} className="p-0">
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Analytics
                    </ListItem>
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Reporting
                    </ListItem>
                    <ListItem placeholder={undefined}>
                      <ListItemPrefix placeholder={undefined}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Projects
                    </ListItem>
                  </List>
                </AccordionBody>
              )}
            </Accordion>

            <hr className="my-2 border-blue-gray-50" />
            <ListItem placeholder={undefined}>
              <ListItemPrefix placeholder={undefined}>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix placeholder={undefined}>
                <Chip
                  value=""
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </div>
  );
};
export default SidebarWithBurgerMenu;
