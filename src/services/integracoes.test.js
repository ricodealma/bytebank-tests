import { buscaTransacoes, salvaTransacao } from "./transacoes"
import api from "./api";
import { atualizaSaldo, buscaSaldo } from "./saldo";

jest.mock('./api');

const mockTransacao = [{
    id: 1,
    transacao: 'Depósito',
    valor: '100',
    data: '22/11/2022',
    mes: 'Novembro',
},];

const mockSaldo = { valor: 1500 };
const mockRequisicaoGet = (retorno) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: retorno })
        }, 200);
    })
}

const mockRequisicaoGetErro = () => {
    return new Promise((reject) => {
        setTimeout(() => {
            reject()
        }, 200);
    })
}

const mockRequisicaoPost = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ status: 200 })
        }, 200);
    })
}

const mockRequisicaoPostErro = () => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject();
        }, 200);
    });
};

describe('API requisitions', () => {
    it('should return a transaction list', async () => {
        api.get.mockImplementation(() => mockRequisicaoGet(mockTransacao));
        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual(mockTransacao);
        expect(api.get).toHaveBeenCalledWith('/transacoes');
    })

    it('should return a empty list when requisition fails', async () => {
        api.get.mockImplementation(() => mockRequisicaoGetErro());
        const transacoes = await buscaTransacoes();
        expect(transacoes).toEqual([]);
        expect(api.get).toHaveBeenCalledWith('/transacoes');
    })

    it('should return clients balance', async () => {
        api.get.mockImplementation(() => mockRequisicaoGet(mockSaldo));
        const saldo = await buscaSaldo();
        expect(saldo).toEqual(mockSaldo.valor);
        expect(api.get).toHaveBeenCalledWith('/saldo');
    })

    it('should return 1000 balance when requisition fails', async () => {
        api.get.mockImplementation(() => mockRequisicaoGetErro());
        const saldo = await buscaSaldo();
        expect(saldo).toEqual(1000);
        expect(api.get).toHaveBeenCalledWith('/saldo');
    })

    it('should return 200 when POST requisition succeed', async () => {
        api.post.mockImplementation(() => mockRequisicaoPost())
        const postTransacao = await salvaTransacao(mockTransacao[0]);
        expect(postTransacao).toBe(200)
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0])
    });

    it('should return error when POST requisition fails', async () => {
        api.post.mockImplementation(() => mockRequisicaoPostErro());
        const status = await salvaTransacao(mockTransacao[0]);
        expect(status).toBe('Erro na requisição');
        expect(api.post).toHaveBeenCalledWith('/transacoes', mockTransacao[0]);
    });

    it('should return 200 when PUT requisition succeed', async () => {
        api.put.mockImplementation(() => mockRequisicaoPost())
        const status = await atualizaSaldo(mockSaldo.valor);
        expect(status).toBe(200)
        expect(api.put).toHaveBeenCalledWith('/saldo', mockSaldo)
    });

    it('should return error when PUT requisition fails', async () => {
        api.put.mockImplementation(() => mockRequisicaoPostErro());
        const status = await atualizaSaldo(mockSaldo.valor);
        expect(status).toBe('Erro na requisição');
        expect(api.put).toHaveBeenCalledWith('/saldo', mockSaldo);
    });
})