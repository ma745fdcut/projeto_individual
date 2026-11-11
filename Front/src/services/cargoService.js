import { requisicao } from './api';

export const listarCargos = () => requisicao('/cargos');

export const inserirCargo = (car_nome) =>
  requisicao('/cargos', { method: 'POST', body: JSON.stringify({ car_nome }) });

export const atualizarCargo = (id, car_nome) =>
  requisicao(`/cargos/${id}`, { method: 'PUT', body: JSON.stringify({ car_nome }) });

export const excluirCargo = (id) =>
  requisicao(`/cargos/${id}`, { method: 'DELETE' });