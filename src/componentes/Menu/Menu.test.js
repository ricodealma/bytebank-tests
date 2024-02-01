import Menu from './index'
import {render, screen} from '@testing-library/react'

test('Deve renderizar um link para a página inicial', () => {
    render(<Menu/>);
    const linkPaginaInicial = screen.getByText('Inicial');
    expect(linkPaginaInicial).toBeInTheDocument();
});

test('Deve renderizar uma lista de links', () => {
    render(<Menu/>);
    const listaDeLinks = screen.getAllByRole('link');
    expect(listaDeLinks).toHaveLength(4);
});

test('Não deve renderizar um link para a página Extrato', () => {
    render(<Menu/>);
    const linkExtrato = screen.queryByText('Extrato');
    expect(linkExtrato).not.toBeInTheDocument();
});

test('Deve renderizar uma lista de links com a classe link', () => {
    render(<Menu/>);
    const links = screen.getAllByRole('link');
    links.forEach((link)=> {expect(link).toHaveClass('links');
    expect(link).toMatchSnapshot();
    });
    
})