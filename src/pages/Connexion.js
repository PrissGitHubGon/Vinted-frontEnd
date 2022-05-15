import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Connexion({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);
      if (response.data.token) {
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="Allform">
      <div>
        <form onSubmit={handleLogin} className="form">
          <h1>Connexion</h1>

          <span>Email</span>
          <input
            value={email}
            placeholder="email"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <span>Password</span>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input className="Register" type="submit" value="Se connecter" />
        </form>
      </div>
    </div>
  );
}

export default Connexion;
