import React from "react";
import {
  Group,
  AppShell,
  Navbar,
  Header,
  Text,
  ActionIcon,
  MediaQuery,
  Burger,
} from "@mantine/core";

import Products from "../components/MenuComponents/Products";

function menu() {
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        header={
          <Header height={60} className="navAndHead">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  style={{ margin: "0 1rem" }}
                />
              </MediaQuery>
              <Group sx={{ height: "100%" }} px={20} position="apart">
                <Group>
                  <ActionIcon variant="filled" color="blue">
                    <h1>M</h1>
                  </ActionIcon>
                  <Text size="xl" weight={500} transform="capitalize">
                    Menu
                  </Text>
                </Group>
              </Group>
            </div>
          </Header>
        }
        navbar={
          <Navbar
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ lg: 210, sm: 180 }}
            p="xs"
            className="navAndHead"
          ></Navbar>
        }
        // aside={
        //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 120, lg: 180 }}>
        //       <Sidebar />
        //     </Aside>
        //   </MediaQuery>
        // }
      >
        {/* Menu product component */}
        <Products />
      </AppShell>
    </>
  );
}

export default menu;
