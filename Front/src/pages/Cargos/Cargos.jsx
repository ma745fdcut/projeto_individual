import { useEffect, useState } from 'react';
import Botao from '../../components/Botao/Botao';
import {
  listarCargos, inserirCargo, atualizarCargo, excluirCargo
} from '../../services/cargoService';
import '../Pessoas/Pessoas.css';

function Cargos() {
  const [cargos, setCargos] = useState([]);
  const [nome, setNome] = useState('');
  const [editandoId, setEditandoId] = useState(null);
  const [erro, setErro] = useState('');

  async function carregar() {
    try {
      setCargos(await listarCargos());
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
        await atualizarCargo(editandoId, nome);
      } else {
        await inserirCargo(nome);
      }
      cancelar();
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  function editar(cargo) {
    setEditandoId(cargo.car_id);
    setNome(cargo.car_nome);
  }

  function cancelar() {
    setEditandoId(null);
    setNome('');
  }

  async function remover(id) {
    if (!window.confirm('Excluir este cargo?')) return;
    try {
      await excluirCargo(id);
      carregar();
    } catch (e) {
      setErro(e.message);
    }
  }

  return (
    <section className="pagina">
      <h2>Cargos</h2>

      <form className="formulario" onSubmit={salvar}>
        <input
          type="text"
          placeholder="Nome do cargo"
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
          {cargos.length === 0 && (
            <tr><td colSpan="3">Nenhum cargo cadastrado.</td></tr>
          )}
          {cargos.map((c) => (
            <tr key={c.car_id}>
              <td>{c.car_id}</td>
              <td>{c.car_nome}</td>
              <td className="acoes">
                <Botao texto="Editar" onClick={() => editar(c)} />
                <Botao texto="Excluir" variante="perigo" onClick={() => remover(c.car_id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Cargos;
