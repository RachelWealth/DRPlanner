"use client";
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
import Link from "next/link";
import Image from "next/image";

const SidebarWithBurgerMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleOpen = (value: React.SetStateAction<boolean>) => {
    setOpen(open === value ? false : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  if (typeof window !== "undefined") {
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
        className="h-[70vh] border-gray-400 border-l-0 overflow-auto" 
        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Card
          color="white"
          shadow={false}
          className="h-[100vh] w-full"
          placeholder={"Card"}
          onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <Image
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray" placeholder={undefined} 
            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Sidebar
            </Typography>
          </div>
          
          <List placeholder={undefined}
          onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <hr className="my-2 border-blue-gray-50" />
            <Link href={"/"}>
            <ListItem placeholder={undefined} 
             onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ListItemPrefix placeholder={undefined} 
               onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              HomePage
              <ListItemSuffix placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <Chip
                  value=""
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            </Link>
            

            <Accordion
              open={open === true}
              icon={<ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === true ? "rotate-180" : ""}`} />}
              placeholder={"Search"} 
               onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}            >
              <ListItem
                className="p-0"
                selected={open === true}
                placeholder={undefined}
                onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              >
                <AccordionHeader
                  onClick={() => handleOpen(true)}
                  className="border-b-0 p-3"
                  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                  <ListItemPrefix placeholder={undefined}
                   onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography
                    placeholder={undefined}
                    color="blue-gray"
                    className="mr-auto font-normal" onPointerLeaveCapture={undefined} 
                    onPointerEnterCapture={undefined}                  >
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              {open && (
                <AccordionBody className="py-1">
                  <List placeholder={undefined} className="p-0"  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <Link href={"/report/page"}>
                    <ListItem placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <ListItemPrefix placeholder={undefined}  onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Analytics
                    </ListItem>
                    </Link>
                    

                    <ListItem placeholder={undefined} 
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <ListItemPrefix placeholder={undefined} 
                       onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Reporting
                    </ListItem>
                    <ListItem placeholder={undefined} 
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                      <ListItemPrefix placeholder={undefined} 
                       onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      Projects
                    </ListItem>
                  </List>
                </AccordionBody>
              )}
            </Accordion>

            <hr className="my-2 border-blue-gray-50" />
            <ListItem placeholder={undefined}
             onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <ListItemPrefix placeholder={undefined} 
               onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix placeholder={undefined} 
               onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
};}
export default SidebarWithBurgerMenu;
