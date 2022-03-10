import * as styles from "./style_Props";
import { PaletteComponent } from "../../components/interfaces";
const ColorPalet = (p: PaletteComponent) => {
  return (
    <styles.Piece onClick={p.click} id={p.id} bgColor={p.color} xy="60px" />
  );
};
export default ColorPalet;
