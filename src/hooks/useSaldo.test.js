import { act, renderHook } from "@testing-library/react"
import { buscaSaldo } from "../services/saldo";
import useSaldo from "./useSaldo";

jest.mock('../services/saldo')

const mockSaldo = { valor: 1500 }

describe('hooks/useListaTransacoes.js', () => {
    test('Given that there is money in the account When the user requests the Balance Then the system should return the Balance And should provide a function to update the transaction list ',
        async () => {
            //Arrange
            buscaSaldo.mockImplementation(() => mockSaldo.valor);
            const { result } = renderHook(() => useSaldo());


            //Act
            expect(result.current[0]).toBe(0)
            await act(async () => {
                result.current[1]();
            })
            //Assert
            expect(result.current[0]).toBe(mockSaldo.valor)
        })
})