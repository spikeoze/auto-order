import style from "../styles/Sidebar.module.css";
import {
  Group,
  Button,
  Navbar,
  ActionIcon,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useGlobalContext } from "./context";
function Sidebar() {
  const { openProductsList, openCategoryList } = useGlobalContext();
  return (
    <>
      <Group className={style.btn} onClick={openProductsList}>
        <ActionIcon color="blue" variant="outline">
          P
        </ActionIcon>
        <Text color="black" weight={500} align="left">
          Products
        </Text>
      </Group>

      <Group className={style.btn} onClick={openCategoryList}>
        <ActionIcon color="blue" variant="outline">
          C
        </ActionIcon>
        <Text color="black" weight={500} align="left">
          Category
        </Text>
      </Group>
    </>
  );
}

export default Sidebar;
