import styled from "styled-components";
import config from "../../config/config";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let pass = form.password !== form.confirmPassword;
    pass && alert("la contraseña no coincide");
    let camps = !form.password || !form.confirmPassword || !form.username;
    if (camps) {
      alert("ingresa los valores");
    }
    if (!camps && !pass) {
      try {
        let user = {
          username: form.username,
          password: form.password,
        };
        const register = async () => {
          await axios
            .post(`${config.API}/api/user`, user)
            .then((res) => {
              let id = res.data._id;
              let username = res.data.username;
              if (id && username) {
                localStorage.setItem("user", JSON.stringify({ id, username }));
                updateUser(id, username);
              }
              id && username ? navigate("/home") : alert("server error");
            })
            .catch((err) => {
              toast.warn("el nombre de usuario ya existe");
              return err;
            });
        };
        register();
      } catch (err) {
        return err;
      }
    }
  };
  return (
    <div className="template-container">
      <Form onSubmit={handleSubmit}>
        <h3 style={{ textAlign: "center" }}>
          {" "}
          registrate y juega michi con tus amigo ahora{" "}
        </h3>
        <div className="form-group">
          <label className="form-label" htmlFor="username">
            ingresa un nuevo nombre de usuario
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="nombre de usuario"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">ingresa una contraseña</label>
          <input
            type="text"
            name="password"
            className="form-control"
            value={form.password}
            placeholder="contraseña"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">confirma tu contraseña</label>
          <input
            type="text"
            name="confirmPassword"
            placeholder="confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button className="btn">register</button>
        <div className="form-group">
          <p style={{ textAlign: "center" }}>
            si ya tienes una cuenta inicia secion
            <Link to="/"> aqui</Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;

const Form = styled.form`
  border: 1px solid #000;
  margin-top: 5px;
  padding: 2px;
  border-radius: 5px;
`;
