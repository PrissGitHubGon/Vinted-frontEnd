import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Inscription({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      //je viens reset le message d'erreur à chaque tentative
      setErrorMessage("");
      //une requête au serveur pour créer un nouveau user
      // axios.post("url", body)

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );

      if (response.data) {
        console.log("J'ai bien réussi à créer un compte");
        setUser(response.data.token);
        //Rediriger l'utilisateur vers la page principale
        navigate("/");
      }
    } catch (error) {
      //   console.log(error.message);
      console.log(error.response.status);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte !");
      }
    }
  };

  return (
    <div className="Allform">
      <div>
        <form onSubmit={handleSignup} className="form">
          <h1>Inscription</h1>

          <span>Name</span>
          <input
            placeholder="Enter your username"
            value={username}
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
          <span>Email</span>
          <input
            value={email}
            type="email"
            placeholder="email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <span>Password</span>
          <input
            value={password}
            type="password"
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="checkbox_container">
            <div>
              <input
                className="checkbox"
                value={newsletter}
                type="checkbox"
                placeholder="password"
                onChange={(event) => setNewsletter(event.target.checked)}
              />
              <span>S'inscrire à notre lewsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <input className="Register" type="submit" value="S'inscrire" />
        </form>
        <p style={{ color: "red" }}>{errorMessage}</p>
      </div>
    </div>
  );
}

export default Inscription;
