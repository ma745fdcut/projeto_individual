import { useEffect, useState } from 'react';
import Botao from '../../components/Botao/Botao';
import {
  listarPessoas, inserirPessoa, atualizarPessoa, excluirPessoa
} from '../../services/pessoaService';
import './Pessoas.css';

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);
  const [nome, setNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      setPessoas(await listarPessoas());
    } catch (e) {
      setErro(e.message);
    }
  }

  useEffect(() => { carregar(); }, []);

  async function salvar(evento) {
    evento.preventDefault();
    if (!nome.trim()) return;
    try {
      setErro('');
      if (editandoId) {
        await atualizarPessoa(editandoId, nome);
      } else {
        await inserirPessoa(nome);
      }
      cancelar();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  function editar(pessoa) {
    setEditandoId(pessoa.pes_id);
    setNome(pessoa.pes_nome);
  }

  function cancelar() {
    setEditandoId(null);
    setNome('');
  }

  async function remover(id) {
    if (!window.confirm('Excluir esta pessoa?')) return;
    try {
      await excluirPessoa(id);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <section className="pagina">
      <h2>Pessoas</h2>

      <form className="formulario" onSubmit={salvar}>
        <input
          type="text"
          placeholder="Nome da pessoa"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Botao tipo="submit" texto={editandoId ? 'Salvar' : 'Cadastrar'} variante="sucesso" />
        {editandoId && <Botao texto="Cancelar" variante="secundario" onClick={cancelar} />}
      </form>

      {erro && <p className="erro">{erro}</p>}

      <table className="tabela">
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {pessoas.length === 0 && (
            <tr><td colSpan="3">Nenhuma pessoa cadastrada.</td></tr>
          )}
          {pessoas.map((p) => (
            <tr key={p.pes_id}>
              <td>{p.pes_id}</td>
              <td>{p.pes_nome}</td>
              <td className="acoes">
                <Botao texto="Editar" onClick={() => editar(p)} />
                <Botao texto="Excluir" variante="perigo" onClick={() => remover(p.pes_id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Pessoas;