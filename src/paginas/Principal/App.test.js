import { render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";

describe('Componente <App/>', () => {

    test('Deve permitir adicionar uma transação no Extrato', () => {
        render(<App />, { wrapper: BrowserRouter })
        //Arrange

        const select = screen.getByRole('combobox');
        const campoValor = screen.getByPlaceholderText('Digite um valor');
        const botao = screen.getByRole('button');
        let novaTransacao = null
        let itemExtrato = null

        //Act

        userEvent.selectOptions(select, ['Depósito']);
        userEvent.type(campoValor, '100');
        userEvent.click(botao);
        novaTransacao = screen.getByTestId('lista-transacoes');
        itemExtrato = screen.getByRole('listitem');

        //Assert

        expect(novaTransacao).toContainElement(itemExtrato);
    });

    test('Deve navegar até a página correspondente ao link clicado', async () => {
        render(<AppRoutes />, { wrapper: BrowserRouter })

        const linkPaginaCartoes = screen.getByText('Cartões');
        expect(linkPaginaCartoes).toBeInTheDocument();

        userEvent.click(linkPaginaCartoes);

        const tituloPaginaCartoes = await screen.findByText('Meus cartões');
        expect(tituloPaginaCartoes).toBeInTheDocument();

    })
});
