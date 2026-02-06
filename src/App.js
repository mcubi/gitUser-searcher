import "./App.css";

import { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setUser(null);

    try {
      const res = await fetch(`https://api.github.com/users/${username}`);

      if (!res.ok) {
        throw new Error("Usuario no encontrado");
      }

      const data = await res.json();

      setUser({
        login: data.login,
        avatar: data.avatar_url,
        url: data.html_url,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Buscador de usuarios GitHub</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario de GitHub"
          required
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error">{error}</p>}

      {user && (
        <div className="user">
          <h2>{user.login}</h2>
          <img src={user.avatar} alt="avatar" width="150" />
          <p>
            <a href={user.url} target="_blank" rel="noreferrer">
              Ver perfil
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
