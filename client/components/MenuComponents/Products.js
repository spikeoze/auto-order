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
  useMantineTheme,
  Grid,
  Badge,
  Image,
  Card,
  Loader,
  Button,
} from "@mantine/core";

import useSWR from "swr";
import axios from "axios";
const fetcher = (url) => axios.get(url).then((res) => res.data);

function Products() {
  const { data, error } = useSWR(
    "http://localhost:8080/adminpanel/products",
    fetcher,
    { refreshInterval: 1000 }
  );
  
  if (!data)
    return (
      <div
      style={{
        display: "flex",
        position: "relative",
        top: "18rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader size="xl" />
    </div>
    );
  return (
    <>
      <Grid>
        {data.map((product) => {
          const {
            cuid,
            name,
            price,
            category,
            image_data,
            image_name,
            image_type,
          } = product;

          return (
            <Grid.Col md={6} lg={3} key={cuid}>
              <Card shadow="xl" p="lg" radius="md" withBorder>
                <Card.Section style={{ marginBottom: 15, cursor: "pointer" }}>
                  <Image
                    src={`data:${image_type};base64,${image_data}`}
                    height={280}
                    width="200"
                    fit="cover"
                    layout="responsive"
                    alt={image_name}
                  />
                </Card.Section>

                <Group position="apart" style={{ marginBottom: 5 }}>
                  <Text transform="capitalize">{name}</Text>
                  <Text transform="capitalize" color="blue">
                    {category.name}
                  </Text>

                  <Badge
                    color="teal"
                    variant="light"
                    style={{
                      fontSize: 12,
                      fontWeight: "bolder",
                      color: "#064420",
                    }}
                  >
                    ${price}
                  </Badge>
                </Group>

                {/* <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        With Fjord Tours you can explore more of the magical fjord
        landscapes with tours and activities on and around the fjords of
        Norway
      </Text> */}

                <Button
                  variant="light"
                  style={{
                    marginTop: 10,
                    backgroundColor: "#dbf1c9",
                    color: "#064420",
                  }}
                  fullWidth
                >
                  Add
                </Button>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </>
  );
}

export default Products;
