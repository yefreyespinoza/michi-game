//node dependencies
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//components
import * as Styles from "./styleBit";
import { AuthContext } from "../../context/auth/AuthContext";
import * as Interfaces from "../../components/interfaces";
import Table from "./Table";
import config from "../../config/config";
import { toast } from "react-toastify";

const NewTable = ({
  click,
  change,
  tableName,
  clickCancel,
}: {
  click: React.FormEventHandler<HTMLFormElement>;
  change: React.ChangeEventHandler<HTMLInputElement>;
  tableName: string;
  clickCancel: () => void;
}) => {
  return (
    <Styles.ContainerTable>
      <form onSubmit={click}>
        <Styles.FormGroup>
          <label htmlFor="table">crear nuevo tablero de juego</label>
          <div>
            <input
              placeholder="nombre de la tabla"
              required
              onChange={change}
              value={tableName}
              type="text"
            />
          </div>
          <button onClick={clickCancel}>cancelar</button>
          <button type="submit">crear tablero</button>
        </Styles.FormGroup>
      </form>
    </Styles.ContainerTable>
  );
};

//this component is for the lobby
const Lobby = () => {
  const navigate = useNavigate();
  const [tables, setTables] = useState<Interfaces.GetTables>({
    tables: null,
    loading: false,
    error: false,
  });

  const { user } = useContext(AuthContext);
  const [newTable, setNewTable] = useState(false);
  const [tableName, setTableName] = useState("");
  const handleNewTable = async () => {
    setNewTable(true);
  };
  const handleDeleteTable = async (id: string, i: any) => {
    tables.tables && delete tables.tables[i];
    tables.tables && setTables((prev) => ({ ...prev, tables: tables.tables }));
    await axios
      .delete(`${config.API}/api/table/${id}`)
      .then((res) => res.data)
      .catch((err) => err);
  };
  //create new table
  const handleCreateTable = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios
      .post(`${config.API}/api/tables/`, {
        tableName,
        userId: user.id,
      })
      .then((res) => {
        navigate("/table/" + res.data._id);
        toast.success("table created succefull");
      })
      .catch((err) => {
        toast("error creating table");
      });
  };
  //change event
  const handleChangeTableName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTableName(e.currentTarget.value);
  };

  //get tables
  useEffect(() => {
    const getTables = async (userId: string) => {
      const res = await axios.get(`${config.API}/api/tables/${userId}`);
      setTables((prev) => ({ ...prev, tables: res.data.reverse() }));
    };
    getTables(user.id);
  }, [user.id]);
  return (
    <Styles.Container>
      {!newTable ? (
        <Styles.ContainerButtons>
          <Styles.Button onClick={handleNewTable}>
            crear tablero de juego
          </Styles.Button>
        </Styles.ContainerButtons>
      ) : (
        <NewTable
          click={handleCreateTable}
          change={handleChangeTableName}
          tableName={tableName}
          clickCancel={() => {
            setNewTable(false);
            setTableName("");
          }}
        />
      )}
      {tables.tables &&
        tables.tables.map((item, i: any) => {
          return (
            <Table
              tableId={item._id}
              click={() => handleDeleteTable(item._id, i)}
              firstUserId={item.users[0]}
              secondUserId={item.users[1]}
              key={i}
            />
          );
        })}
    </Styles.Container>
  );
};

export default Lobby;
