const URL = 'http://localhost:3000';

export async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(`${URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes
  });
  const dados = await resposta.json();
  if (!resposta.ok) throw new Error(dados.erro || dados.mensagem || 'Erro na requisição');
  return dados;
}