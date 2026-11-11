import './Botao.css';

function Botao({ texto, onClick, tipo = 'button', variante = 'padrao' }) {
  return (
    <button type={tipo} className={`botao botao-${variante}`} onClick={onClick}>
      {texto}
    </button>
  );
}

export default Botao;