//node_modules
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

//components
import michiGame from "./game";
import AlertContent from "./AlertContent";
import ColorPalet from "./ColorPalet";
import Piece from "./Piece";
import * as Interfaces from "./../../components/interfaces";
import { NotificationsContext } from "../../context/notifications/NotificationsContext";
import Loading from "../../components/loading";
import { AuthContext } from "../../context/auth/AuthContext";

//styles components

import * as styles from "./style_Props";
import GamePlayers from "../../components/GamePlayers";

//create game
const game = new michiGame();

const MichiGameRender = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { socketTable } = useContext(NotificationsContext);
  const { user } = useContext(AuthContext);
  const [table, setTable] = useState<Interfaces.GetTable>({
    table: null,
    loading: true,
    error: false,
  });
  const [itemSelect, setItemSelect] = useState<Interfaces.IPalette | undefined>(
    undefined
  );
  useEffect(() => {
    socketTable.emit("get-table", params.id);
    socketTable.on("table", (dt: Interfaces.Table) => {
      if (dt && dt._id === params.id) {
        setTable((prev) => ({ ...prev, table: dt, loading: false }));
      } else {
        setTable((prev) => ({
          ...prev,
          table: null,
          loading: false,
          error: true,
        }));
      }
    });
    socketTable.on("movement", (dt: Interfaces.Table) => {
      if (dt && dt._id === params.id) {
        setTable((prev) => ({ ...prev, table: dt }));
      }
    });
    socketTable.on("piece-movement", (dt: Interfaces.Table) => {
      if (dt && dt._id === params.id) {
        setTable((prev) => ({ ...prev, table: dt }));
      }
    });
    socketTable.on("clear-table", (dt: Interfaces.Table) => {
      if (dt && dt._id === params.id) {
        setTable((prev) => ({ ...prev, table: dt }));
      }
    });
    socketTable.off("get-table");
    return () => {
      setTable({ table: null, loading: true, error: false });
    };
  }, [socketTable, params]);

  const handleColorPalet = (id: number) => {
    let effectItems = table.table && game.selectPalet(table.table, id, user.id);
    effectItems &&
      effectItems.length >= 1 &&
      setTable((prev) => ({
        ...prev,
        ...{
          ...prev.table?.game.palette.map((select) => {
            return effectItems?.map((item) => {
              if (select.id === item.id) {
                select.users = item.users;
              }
              return item;
            });
          }),
        },
      }));
    let select = effectItems?.find((item) => item.users === "select");

    setItemSelect(select);
  };

  const handleColorPieces = (id: number, piece: Interfaces.IPieces) => {
    let veri =
      table.table && game.isInserted(table.table.game.palette, user.id);
    if (!veri && table.table?.turn === user.id) {
      let save =
        table.table &&
        piece.piece === null &&
        game.saveMovement(
          itemSelect,
          socketTable,
          piece.id,
          user.id,
          table.table._id,
          table.table.users.find((item) => item !== user.id)
        );
      save && setItemSelect(undefined);
    }
    //select piece
    if (veri && table.table?.turn === user.id) {
      let select =
        table.table && game.selectPiceandMovement(table.table, id, user.id);
      let pieces =
        select &&
        table.table &&
        game.illuminatePiece(table.table, select, user.id);
      setTable((prev) => ({
        ...prev,
        ...{ ...prev.table?.game.pieces, pieces },
      }));
      let findPieceSelect = table.table?.game.pieces.find(
        (item) => item.piece === "select"
      );
      //pass find piece select to save in database
      //save piece
      table.table &&
        findPieceSelect &&
        game.savePieceAndMovement(
          table.table,
          findPieceSelect,
          id,
          socketTable,
          table.table?._id,
          user.id,
          table.table.users.find((item) => item !== user.id)
        );
    }
  };
  return (
    <>
      {table.loading && <Loading />}
      {table.error && !table.table && <h1>create a new table content</h1>}
      {table.table && (
        <>
          {table.table.users.includes(user.id) &&
            table.table.users.length <= 1 && (
              <>
                <AlertContent
                  handleClick={() => {
                    navigate("/table/" + table.table?._id);
                  }}
                  btnContent="invitar"
                  title="esperando oponente"
                />
              </>
            )}
          {!table.table.users.includes(user.id) &&
            table.table.users.length <= 1 && (
              <>
                <AlertContent
                  handleClick={() => {
                    setTable({ ...table, loading: true });
                    socketTable.emit("accept-invitation", {
                      userId: user.id,
                      tableId: table.table?._id,
                      senderId: table.table?.users[0],
                    });
                    socketTable.emit("get-table", params.id);
                  }}
                  btnContent="aceptar invitacion"
                  title="accept invitation"
                />
              </>
            )}
          {!table.table.users.includes(user.id) &&
            table.table.users.length === 2 && (
              <>
                <AlertContent
                  handleClick={() => {
                    navigate("/home");
                  }}
                  btnContent="crear nueva tabla"
                  title="alredy two players"
                />
              </>
            )}
          {/*render game*/}
          {table.table.users.includes(user.id) &&
            table.table.users.length === 2 && (
              <>
                <styles.ColorsContainer>
                  {table.table.game.palette.map((item, i) => {
                    return (
                      <ColorPalet
                        key={i}
                        click={(e) => handleColorPalet(item.id)}
                        color={game.colorPaletSwitch(
                          typeof item.users === "string"
                            ? item.users
                            : item.users.includes(user.id)
                        )}
                      />
                    );
                  })}
                </styles.ColorsContainer>
                <GamePlayers
                  user1={table.table.users[0]}
                  user2={table.table.users[1]}
                  turn={table.table.turn}
                  tableName={table.table.name}
                />
                <styles.ContainerDiv>
                  {table.table.game.pieces.map((piece, i) => {
                    return (
                      <Piece
                        key={i}
                        click={() => {
                          handleColorPieces(piece.id, piece);
                        }}
                        color={game.colorPieceSwitch(
                          piece.piece,
                          user.id,
                          table.table?.users.find(
                            (item: string) => item !== user.id
                          )
                        )}
                      />
                    );
                  })}
                  <div>
                    <button
                      onClick={() => {
                        game.clearTable(
                          socketTable,
                          table.table?._id,
                          table.table?.users.find((u) => u !== user.id),
                          user.id
                        );
                      }}
                    >
                      limpiar tabla
                    </button>
                  </div>
                </styles.ContainerDiv>
              </>
            )}
        </>
      )}
    </>
  );
};

export default MichiGameRender;
