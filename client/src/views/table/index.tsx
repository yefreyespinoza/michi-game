//node modules depencies
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
//components
import Oponents from "./Oponents";
import TableNow from "./Table";
import config from "../../config/config";
import { AuthContext } from "../../context/auth/AuthContext";
import { NotificationsContext } from "../../context/notifications/NotificationsContext";
import * as Interfaces from "./../../components/interfaces";
import { LoadingContainer } from "../../components/components";

const Table = () => {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const { socketTable, usersOnline } = useContext(NotificationsContext);
  const [table, setTable] = useState<Interfaces.GetTable>({
    table: null,
    loading: true,
    error: false,
  });
  const [users, setUsers] = useState<any[]>([]);
  //get tables
  useEffect(() => {
    let id = params.id;
    socketTable.emit("get-table", id);
    socketTable.on("table", (dt: any) => {
      dt
        ? setTable((prev) => ({ ...prev, table: dt, loading: false }))
        : setTable((prev) => ({ ...prev, loading: false, error: true }));
    });
    socketTable.on("update-table", (dt: any) => {
      dt
        ? setTable((prev) => ({ ...prev, table: dt, loading: false }))
        : setTable((prev) => ({ ...prev, loading: false, error: true }));
    });
    socketTable.off("get-table");
  }, [socketTable, params]);

  //users

  //get sala
  useEffect(() => {
    const getUsers = async (userId1: string, userId2: string) => {
      let user1 = await axios.get(`${config.API}/api/user/${userId1}`);
      let user2 =
        table.table &&
        table.table.users[1] &&
        (await axios.get(`${config.API}/api/user/${userId2}`));
      setUsers((u) => [...u, user1.data, user2 && user2.data]);
    };
    table.table && getUsers(table.table.users[0], table.table.users[1]);
    return () => {
      setUsers([]);
    };
  }, [table]);
  return (
    <>
      {/* table  */}
      {table.loading && <LoadingContainer element={<CircularProgress />} />}
      {table.error && <h1>create a new table</h1>}
      {table.table && (
        <TableNow
          name={table.table.name}
          to={`/game/${table.table._id}`}
          oponents={[user.username, users[1] ? users[1].username : ""]}
          game_link={`${window.location.protocol}//${window.location.host}/game/${table.table._id}`}
        />
      )}

      {table.table && (
        <Oponents
          tableName={table.table.name}
          tableId={table.table._id}
          users={usersOnline}
        ></Oponents>
      )}
    </>
  );
};

export default Table;
