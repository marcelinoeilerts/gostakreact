import React, { useEffect, useState } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
      console.log(response);
    })
  }, [])
  

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: "https://github.com/marcelinoeilerts/desafio02",
      techs: ["Node", "Java"]
      });
   
      const repository = response.data;
   
      setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
    // TODO
    
    await api.delete(`repositories/${id}`);

    const filteredItems = repositories.filter(repo => repo.id !== id)
    setRepositories([...filteredItems])
    //console.log(filteredItems)
  }

  return (
    <div>
      <ul data-testid="repository-list">

              
        
              {repositories.map(repo => 
              
              <li key={repo.id}>{repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
              </li>
              
          )}
          
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
