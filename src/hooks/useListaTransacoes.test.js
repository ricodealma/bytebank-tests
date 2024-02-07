import { act, renderHook } from "@testing-library/react"
import { buscaTransacoes } from "../services/transacoes"
import useListaTransacoes from "./useListaTransacoes"

jest.mock('../services/transacoes')

const mockTransacao = [{
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
},];

describe('hooks/useListaTransacoes.js', () => {
    test('Given that there are transactions in the system When the user requests the transaction list Then the system should return the list of transactions And should provide a function to update the transaction list ',
        async () => {

            //Arrange

            buscaTransacoes.mockImplementation(() => mockTransacao)
            let { result } = renderHook(() => useListaTransacoes())

            //Act
            expect(result.current[0]).toEqual([])
            await act(async () => {
                result.current[1]();
            })

            //Assert


            expect(result.current[0]).toEqual(mockTransacao)

        })
})