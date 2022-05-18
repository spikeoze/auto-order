import React from "react";
import style from "../../../styles/Products.module.css";
import FormData from "form-data";
import {
  Grid,
  Container,
  Group,
  InputWrapper,
  Input,
  NumberInput,
  Table,
  Select,
  Button,
  Loader,
  Affix,
  Transition,
  Tooltip,
  Image,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { BiTrashAlt, BiPencil, BiCog } from "react-icons/bi";
import { useWindowScroll } from "@mantine/hooks";
import useSWR from "swr";
import axios from "axios";
import currency from "currency.js";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function Products({ categories }) {
  const [scroll, scrollTo] = useWindowScroll();

  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [CUID, setCUID] = React.useState("");
  // const [Checked, setChecked] = React.useState([]);
  const [Editing, setEditing] = React.useState(false);
  const [opened, setOpened] = React.useState(false);
  const [formOpened, setFormOpened] = React.useState(false);
  const [modalImgData, setModalImgData] = React.useState(null);
  const { data, error } = useSWR(
    "http://localhost:8080/adminpanel/products",
    fetcher,
    { refreshInterval: 200 }
  );

  const postProduct = async (name, price, category, image) => {
    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("image", image);

    console.log(data);
    axios.post("http://localhost:8080/adminpanel/products", data, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    setName("");
    setCategory("");
    setPrice(0);
    setImage("");
    // scrollTo({ y: 1000 });
    setFormOpened(false);
  };

  const deleteProduct = async (cuid) => {
    axios.delete(`http://localhost:8080/adminpanel/products/${cuid}`);
  };

  const editHandler = (cuid, name, category, price) => {
    setCUID(cuid);
    setName(name);
    setPrice(price.value);
    setCategory(category);
    setEditing(true);
    setFormOpened(true);
    // scrollTo({ y: 0 });
  };

  // const cancelEdit = () => {
  //   setEditing(false);
  //   setName("");
  //   setCategory("");
  //   setPrice(0);
  //   setFormOpened(false);
  // };

  const editProduct = async (cuid, name, price, category, image) => {
    const data = new FormData();

    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("image", image);

    axios.put(`http://localhost:8080/adminpanel/products/${cuid}`, data, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    setEditing(false);
    setName("");
    setCategory("");
    setPrice(0);
    setFormOpened(false);
  };

  const handleModal = (type, data, name) => {
    const imgData = {
      type,
      data,
      name,
    };
    setOpened(true);
    setModalImgData(imgData);
  };
  // const getCuid = (cuid) => {
  //   setChecked((prevcheck)=> [...prevcheck, cuid]);
  // }

  if (!data)
    return (
      <Loader
        size="xl"
        style={{ position: "absolute", top: "18rem", left: "45rem" }}
      />
    );

  const categoryList = categories.map((category) => category.name);

  const rows = data.map((product) => (
    <tr key={product.cuid}>
      <td>
        <Tooltip
          withArrow
          transition="fade"
          transitionDuration={200}
          label="Click to delete product"
        >
          <ActionIcon color="red" variant="light">
            <BiTrashAlt
              className="trash"
              onClick={() => deleteProduct(product.cuid)}
            />
          </ActionIcon>
        </Tooltip>
      </td>
      <td>{product.name}</td>
      <td>{currency(product.price, { precision: 2 }).format()}</td>
      <td>{product.category.name}</td>
      <td>
        <Tooltip
          withArrow
          transition="fade"
          transitionDuration={200}
          label="Click to view image"
        >
          <Image
            fit="cover"
            width={100}
            height={80}
            radius="md"
            style={{ cursor: "pointer" }}
            src={`data:${product.image_type};base64,${product.image_data}`}
            alt={product.image_name}
            onClick={() =>
              handleModal(
                product.image_type,
                product.image_data,
                product.image_name
              )
            }
          />
        </Tooltip>
      </td>
      <td>
        <Tooltip
          withArrow
          transition="fade"
          transitionDuration={200}
          label="Click to edit product"
        >
          <ActionIcon color="blue" variant="light">
            <BiPencil
              className="edit"
              onClick={() => {
                editHandler(
                  product.cuid,
                  product.name,
                  product.category.name,
                  currency(product.price)
                );
              }}
            />
          </ActionIcon>
        </Tooltip>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        transition="pop"
        opened={opened}
        onClose={() => {
          setOpened(false);
          setTimeout(() => {
            setModalImgData(null);
          }, 200);
        }}
      >
        <Image
          fit="contain"
          radius="md"
          src={
            modalImgData
              ? `data:${modalImgData.type};base64,${modalImgData.data}`
              : ""
          }
          alt={modalImgData ? modalImgData.name : "image"}
        />
      </Modal>
      <Grid className={style.product}>
        <Grid.Col span={12}>
          <Container size="lg">
            <div className={style.modalBtn}>
              <Button onClick={() => setFormOpened(true)}>
                Create Product
              </Button>
            </div>
            <Modal
              transition="pop"
              size={700}
              opened={formOpened}
              onClose={() => {
                setFormOpened(false);
                setTimeout(() => {
                  setEditing(false);
                  setName("");
                  setCategory("");
                  setPrice(0);
                }, 200);
              }}
            >
              <form method="post" onSubmit={(e) => e.preventDefault()}>
                {Editing ? <h2>Edit Product</h2> : <h2>Add Product</h2>}
                <Group spacing="xl">
                  <InputWrapper required label="Name" className={style.inputs}>
                    <Input
                      required
                      placeholder="Product Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </InputWrapper>

                  <NumberInput
                    required
                    decimalSeparator=","
                    label="Product Price"
                    defaultValue={0.0}
                    precision={2}
                    step={0.5}
                    className={style.inputs}
                    value={price}
                    onChange={(price) => setPrice(price)}
                  />

                  <Select
                    required
                    label="Categories"
                    placeholder="Pick one"
                    searchable
                    nothingFound="No options"
                    data={categoryList}
                    className={style.inputs}
                    value={category}
                    onChange={(category) => setCategory(category)}
                  />
                  <InputWrapper label="Image" className={style.inputs}>
                    <Input
                      type="file"
                      name="image"
                      onChange={(image) => setImage(image)}
                    />
                  </InputWrapper>
                </Group>
                {Editing ? (
                  <Button
                    variant="light"
                    className={style.btn}
                    onClick={() =>
                      editProduct(
                        CUID,
                        name,
                        price,
                        category,
                        image.target.files[0]
                      )
                    }
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="outline"
                    className={style.btn}
                    onClick={() => {
                      postProduct(name, price, category, image.target.files[0]);
                    }}
                  >
                    Add
                  </Button>
                )}
              </form>
            </Modal>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          <Container size="lg" className={style.productSections}>
            <Table
              horizontalSpacing="sm"
              verticalSpacing="sm"
              fontSize="md"
              highlightOnHover
            >
              <thead>
                <tr>
                  <th>
                    <BiCog className="trash" />
                  </th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>
                    <BiCog className="edit" />
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Affix position={{ bottom: 20, right: 20 }}>
              <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                  <Button
                    variant="gradient"
                    style={transitionStyles}
                    onClick={() => scrollTo({ y: 0 })}
                  >
                    &#128070;
                  </Button>
                )}
              </Transition>
            </Affix>
          </Container>
        </Grid.Col>
      </Grid>
    </>
  );
}

export default Products;