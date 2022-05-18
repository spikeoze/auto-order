import React from "react";
import style from "../../../styles/Category.module.css";
import {
  Grid,
  Container,
  InputWrapper,
  Input,
  Table,
  Button,
  Checkbox,
  Affix,
  Transition,
  Tooltip,
  Modal,
} from "@mantine/core";
import { BiTrashAlt, BiPencil, BiCog } from "react-icons/bi";
import { useWindowScroll } from "@mantine/hooks";
import { useCategoryContext } from "./categoryContext";

function Category({ categories }) {
  const {
    postCategory,
    editHandler,
    editCategory,
    deleteCategory,
    formOpened,
    setFormOpened,
    Editing,
    setEditing,
    CUID,
    setCategoryName,
    CategoryName,
  } = useCategoryContext();

  const [scroll, scrollTo] = useWindowScroll();

  const rows = categories.map((category) => (
    <tr key={category.cuid}>
      <td>
        <Tooltip
          withArrow
          transition="fade"
          transitionDuration={200}
          label="Click to delete category"
        >
          <BiTrashAlt
            className="trash"
            onClick={() => deleteCategory(category.cuid)}
          />
        </Tooltip>
      </td>
      <td>{category.name}</td>
      <td>
        <Tooltip
          withArrow
          transition="fade"
          transitionDuration={200}
          label="Click to edit category"
        >
          <BiPencil
            className="edit"
            onClick={() => editHandler(category.cuid, category.name)}
          />
        </Tooltip>
      </td>
    </tr>
  ));

  return (
    <>
      <Grid className={style.category}>
        <Grid.Col span={12}>
          <Container size="lg">
            <div className={style.modalBtn}>
              <Button onClick={() => setFormOpened(true)}>Add Category</Button>
            </div>
            <Modal
              transition="pop"
              opened={formOpened}
              onClose={() => {
                setTimeout(() => {
                  setEditing(false);
                  setCategoryName("");
                }, 200);
                setFormOpened(false);
              }}
            >
              <h2>Add Category</h2>
              <InputWrapper id="input-demo" required label="Name">
                <Input
                  required
                  placeholder="Category Name"
                  className={style.inputs}
                  value={CategoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </InputWrapper>

              {Editing ? (
                <Button
                  variant="light"
                  className={style.btn}
                  onClick={() => editCategory(CUID, CategoryName)}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className={style.btn}
                  onClick={() => postCategory(CategoryName)}
                >
                  Add
                </Button>
              )}
            </Modal>
          </Container>
        </Grid.Col>
        <Grid.Col span={12}>
          <Container size="lg" className={style.categorySections}>
            <Table verticalSpacing="md" horizontalSpacing="sm" fontSize="lg">
              <thead>
                <tr>
                  <th>
                    <BiCog className="trash" />
                  </th>
                  <th>Name</th>
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

export default Category;