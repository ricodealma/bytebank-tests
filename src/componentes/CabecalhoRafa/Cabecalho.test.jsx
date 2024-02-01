import { render, screen } from '@testing-library/react';
import CabecalhoRafa from './index';

const mockProps = {
  titulo: 'Título do Cabecalho',
  texto: 'Texto do Cabecalho',
  id: 'cabecalho-id'
};

test('Deve renderizar corretamente as props do Cabecalho', () => {
  render(<CabecalhoRafa titulo={mockProps.titulo} texto={mockProps.texto} id={mockProps.id} />);

  // Verifica se o título foi renderizado corretamente
  const tituloCabecalho = screen.getByText(mockProps.titulo);
  expect(tituloCabecalho).toBeInTheDocument();

  // Verifica se o texto foi renderizado corretamente
  const textoCabecalho = screen.getByText('Texto do Cabecalho');
  expect(textoCabecalho).toBeInTheDocument();

  const container = screen.getByRole('container');
  expect(container).toHaveAttribute('id',mockProps.id)

});
