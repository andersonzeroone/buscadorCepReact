
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles.css';

import api from './srvices/api';

function App() {
  const [input, setInput] = useState('');
  const [dataCEP, setDataCEP] = useState({});

  async function handleSearch() {
    if (!input) {
      alert('Preencha o CEP');
      return;
    }

    try {
      const response = await api.get(`/${input}/json`);
      setDataCEP(response.data);
      setInput('');

    } catch (e) {
      alert(`Erro ao buscar o cep:${input}`)
      setInput('');
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="container-input">
        <input
          type='text'
          placeholder='Buscador'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className='buttonSearch' onClick={handleSearch}>
          <FiSearch size={25} color='#fff' />
        </button>
      </div>

      {Object.keys(dataCEP).length > 0 && (
        <main className="main">
          <h2>CEP: {dataCEP.cep}</h2>
          <span>
            Rua:{dataCEP.logradouro}
          </span>
          <span>
            Bairro:{dataCEP.bairro}
          </span>
          <span>
            Estado:{dataCEP.uf}
          </span>
          <span>
            Cidade:{dataCEP.localidade}
          </span>
        </main>
      )}


    </div>
  );
}

export default App;
