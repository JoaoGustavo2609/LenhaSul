import { API_URL } from './config';

import axios from 'axios'
const api = axios.create({
    baseURL: API_URL
})

export async function CadastrarProduto (categoria,nome, preco, ingredientes){
        const r = await api.post('/post/criar', {
                    categoria: categoria,
                    nome: nome,
                    preco:preco,
                    ingredientes:ingredientes
                    
        })
        console.log(r);
        return r.data;
}

export async function CarregarProdutos (){
    const resposta = await api.get('/api/listarProduto')
    return resposta.data
}

export async function ListarCategorias(){
    const resposta = await api.get('/api/ListarCategoria')
    return resposta.data
}

export async function CadastrarEndereco (rua, residencia, cep, bairro, complemento){
        const r = await api.post('/api/CadastrarEndereco', {
            rua: rua,
            residencia: residencia,
            cep: cep,
            bairro: bairro,
            complemento: complemento
        })

        return r.data;
}

export async function CadastrarCartao (numero, nome, vencimento, cvv, apelido, cpf){
    const r = await api.post('/api/CadastrarCartao', {
        numero: numero,
        nome: nome,
        vencimento: vencimento,
        cvv: cvv,
        apelido: apelido,
        cpf: cpf
        
    })

    return r.data;
}

export async function PizzasSalgadas(){
    const resposta = await api.get('/api/PizzasSalgadas');
    return resposta.data;
}

export async function PizzasDoces(){
    const resposta = await api.get('/api/PizzasDoces');
    return resposta.data;
}

export async function Bebidas(){
    const resposta = await api.get('/api/Bebidas');
    return resposta.data;
}

export function buscarimagem(imagem){
    return `${api.getUri()}/${imagem}`
}

export async function ListarCategoriasNome (id){
    const resposta = await api.get('/api/nomeCategoria/' +id)
    return resposta
}
        
export async function ListarPerfil (id){
    const resposta = await api.get('/api/ListarPerfil/' + id)
    return resposta.data;   
}