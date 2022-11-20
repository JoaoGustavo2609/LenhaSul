import './index.scss';

import {API_URL} from '../../api/config';

import {useNavigate} from 'react-router-dom';
import {useState} from 'react'

export default function CarrinhoItem({item : {produto: { info, categorias,imagens}, qtd}}) {

    // const [subtotal, setSubtotal] = useState('-');
    const [qtdProduto, setQtdProduto] = useState(qtd)


    function exibirImagem() {
        if (imagens.length > 0) {
            return API_URL + '/' + imagens[0];
        }
        else {
            return '/nomeimagem'
        }
    }   
    
    function calcularSubtotal() {
        const subtotal = qtd * info.preco;
        return subtotal;
    }

   function alterarQuantidade (novaQtd){
        setQtdProduto(novaQtd);
         let carrinho = Storage('carrinho');
        let itemStorage = carrinho.find(item => item.id == info.id);
        itemStorage.qtd = novaQtd;

        Storage('carrinho', carrinho);
        
 }

} 


// import 'index.scss';

// import {API_URL} from '../../api/config';

// import {useNavigate} from 'react-router-dom';
// import {useState} from 'react'

// export default function CarrinhoItem({item : {produto: { info, categorias,imagens}, qtd}}) {

//     // const [subtotal, setSubtotal] = useState('-');
//     const [qtdProduto, setQtdProduto] = useState(qtd)


//     function exibirImagem() {
//         if (imagens.length > 0) {
//             return API_URL + '/' + imagens[0];
//         }
//         else {
//             return '/nomeimagem'
//         }
//     }   
    
//     function calcularSubtotal() {
//         const subtotal = qtd * info.preco;
//         return subtotal;
//     }

//     alterarQuantidade (novaQtd);{
//         setQtdProduto(novaQtd)
//          let carrinho = Storage('carrinho')
//         let itemStorage = carrinho.find(item => item.id == info.id);
//         itemStorage.qtd = novaQtd;

//         Storage('carrinho', carrinho);
        
//  }

// }