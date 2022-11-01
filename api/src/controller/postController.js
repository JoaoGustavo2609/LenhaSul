import { Router } from "express";
import {Post, inserirImagem, listarPosts, listarHisto, listarHisto2, listarHisto3} from "../repository/postRepository.js"
import multer from 'multer'

const server = Router();
const upload = multer({dest: 'storage/imgproduto'})


server.post('/post/criar', async (req,resp) => {
    try {
        const publi = req.body;
        console.log(publi);
        
        if(!publi.nome.trim())throw new Error("Nome é OBRIGATÓRIO!")
        if(!publi.preco) throw new Error("Preço é OBRIGATÓRIO!")
        if(!publi.ingredientes.trim()) throw new Error("Descrição é OBRIGATÓRIO!")
        if(!publi.nomeCat) throw new Error("Categoria é OBRIGATÓRIO!")

        const resposta = await Post(publi);
        resp.status(200).send(
            resposta
        )
    } catch (err) {
        resp.status(400).send({
            Erro:err.message
        })
    }
})

server.put('/post/:id/imagem', upload.single('imgproduto'), async (req, resp) => {
    try {
        if(!req.file) throw new Error('Não foi possível alterar/inserir a imagem') 
        const {id} = req.params;
        const imagem = req.file.path

        const resposta = await inserirImagem(imagem, id);

        resp.status(204).send();

        if (resposta != 1) throw new Error('Não foi possível alterar/inserir a imagem') 

        
        
        
    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})



server.get('/api/listarProduto' , async (req,resp) =>{
    try {
        const resposta = await listarPosts();
        resp.send(resposta)    
    } 
    catch (err) {
        resp.status(400).send({
            Erro: err.message
        })        
    }
})




server.get('/api/HistoricoPedido' , async (req,resp) =>{
        try {
            const resposta = await listarHisto();
            resp.send(resposta)
            
        }
        catch (err) {
            resp.status(400).send({
                Erro: err.message
            })
            
}
})

server.get('/api/HistoricoEndereco', async (req,resp) =>{
    try {
            const resposta = await listarHisto2();
            resp.send(resposta)    
    } 
    catch (err) {
        resp.status(400).send({
            Erro: err.message
        })
        
    }
})

server.get('/api/HistoricoProduto', async (req, resp) => {
        try {
                const resposta = listarHisto3();
                resp.send(resposta)    
        }
         catch (err) {
            resp.status(400).send({
                Erro : err.message
            })
        }
})

export default server;