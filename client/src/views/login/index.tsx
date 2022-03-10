import { FormEvent, useState, useContext, useEffect } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import axios from "axios";
import config from "../../config/config";

//context
import { AuthContext } from "../../context/auth/AuthContext";
import { toast } from "react-toastify";
const Login = () => {
  const { user, updateUser } = useContext(AuthContext);
  let navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  useEffect(() => {
    user && navigate("/home");
  });

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    setForm({ ...form, [name]: value });
  };

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      alert("ingresa los valores");
    } else {
      try {
        const User = {
          username: form.username,
          password: form.password,
        };
        const Sign = async () => {
          await axios
            .post(`${config.API}/api/user/validate`, User)
            .then((res) => {
              let user = res.data;
              if (user) {
                updateUser(user.id, user.username);
                localStorage.setItem("user", JSON.stringify(user));
                user && navigate("/home");
              }
            })
            .catch((err) => {
              toast.warn("username or password is incorrect");
            });
        };
        Sign();
      } catch (err) {
        return err;
      }
    }
  };

  return (
    <>
      {user ? (
        <></>
      ) : (
        <div className="template-container">
          <form className="form" action="form" onSubmit={login}>
            <h1 className="title-1">juega michi con tus amigos ahora</h1>
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                ingresa tu nombre de usuario
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="nombre de usuario"
                onChange={handleChange}
                name="username"
                value={form.username}
              />
              <p className="form-text text-muted">
                comparte tu nombre de usuario con tus amigos
              </p>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                ingresa tu contraseña
              </label>
              <input
                className="form-control"
                type="text"
                name="password"
                value={form.password}
                placeholder="contraseña"
                onChange={handleChange}
              />
            </div>
            <button className="btn" type="submit">
              iniciar secion
            </button>
            <div className="form-group">
              <p style={{ textAlign: "center" }}>
                si aun no tienes una cuenta registrate
                <Link to="/register"> aqui</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
