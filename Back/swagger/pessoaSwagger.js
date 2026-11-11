const id = [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID da pessoa' }];
const body = (exemplo) => ({
  required: true,
  content: { 'application/json': { schema: {
    type: 'object',
    properties: { pes_nome: { type: 'string', example: exemplo } },
    required: ['pes_nome']
  } } }
});

module.exports = {
  paths: {
    '/pessoas': {
      get: { tags: ['Pessoas'], summary: 'Lista todas as pessoas',
        responses: { 200: { description: 'Lista retornada' }, 500: { description: 'Erro interno' } } },
      post: { tags: ['Pessoas'], summary: 'Cadastra uma pessoa', requestBody: body('Maria Silva'),
        responses: { 201: { description: 'Pessoa cadastrada' }, 500: { description: 'Erro interno' } } }
    },
    '/pessoas/{id}': {
      get: { tags: ['Pessoas'], summary: 'Busca pessoa pelo ID', parameters: id,
        responses: { 200: { description: 'Encontrada' }, 404: { description: 'Não encontrada' } } },
      put: { tags: ['Pessoas'], summary: 'Altera uma pessoa', parameters: id, requestBody: body('João Souza'),
        responses: { 200: { description: 'Alterada' }, 404: { description: 'Não encontrada' } } },
      delete: { tags: ['Pessoas'], summary: 'Exclui uma pessoa', parameters: id,
        responses: { 200: { description: 'Excluída' }, 500: { description: 'Erro interno' } } }
    }
  }
};