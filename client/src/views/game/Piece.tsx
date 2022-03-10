import * as styles from "./style_Props";
import { PieceComponent } from "../../components/interfaces";

const Piece = (p: PieceComponent) => {
  return (
    <>
      <styles.ItemDiv>
        <styles.Piece
          border={p.selected}
          id={p.number?.toString()}
          onClick={p.click}
          bgColor={p.color}
        ></styles.Piece>
      </styles.ItemDiv>
    </>
  );
};
export default Piece;
