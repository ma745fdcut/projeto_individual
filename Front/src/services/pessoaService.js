import { requisicao } from './api';

export const listarPessoas = () => requisicao('/pessoas');
export const inserirPessoa = (pes_nome) =>
  requisicao('/pessoas', { method: 'POST', body: JSON.stringify({ pes_nome }) });
export const atualizarPessoa = (id, pes_nome) =>
  requisicao(`/pessoas/${id}`, { method: 'PUT', body: JSON.stringify({ pes_nome }) });
export const excluirPessoa = (id) =>
  requisicao(`/pessoas/${id}`, { method: 'DELETE' });