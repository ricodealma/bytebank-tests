import { render, screen } from "@testing-library/react"
import Formulario from "."
import userEvent from "@testing-library/user-event";

test('Deve chamar um evento de onSubmit ao clicar em realizar transação', () => {
    const realizarTransacao = jest.fn();
    render(<Formulario realizarTransacao={realizarTransacao}/>);
    const botao = screen.getByRole('button');
    userEvent.click(botao);
    expect(realizarTransacao).toHaveBeenCalledTimes(1);

})