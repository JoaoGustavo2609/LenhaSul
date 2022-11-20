import './index.scss'
import { useEffect, useState } from 'react';
// import Storage from 'local-storage';
// import { buscarProdutoPorId } from '../../api/produtoAPI';
import CarrinhoItem from '../../../components/carrinhoItem1';
import { useNavigate } from 'react-router-dom';



export default function Carrinho() {

    const [itens, setItens] = useState([]);
    const navigate = useNavigate();

    function irPedido() {
        navigate('/pedido');
    }




    function qtdItens() {
        return itens.length;
    }

    function calcularValorTotal() {
        let total = 0;
        for (let item of itens) {
            total = total + item.produto.info.preco * item.qtd;
        }
        return total;
    }


    function removerItem(id) {
        let carrinho = Storage('carrinho');
        carrinho = carrinho.filter(item => item.id != id);

        Storage('carrinho', carrinho);
        carregarCarrinho();
    }


    async function carregarCarrinho() {
        let carrinho = Storage('carrinho');
        if (carrinho) {

            let temp = [];

            for (let produto of carrinho) {
                // let p = await buscarProdutoPorId(produto.id);

                temp.push({
                    // produto: p,
                    qtd: produto.qtd
                })
            }

            setItens(temp);
        }

    }

    useEffect(() => {
        carregarCarrinho();
    }, [])


    return (
        <main className='main-carrinho'>

            <header className='header-carrinho'>
                <div className='div-row-header-logo'>
                    <div className='div-header-logo'>
                        <img className='imagem-logo-header' src="/assets/images/logohome1.png" />
                    </div>


                    <div className='div-header-botoes'>
                        <a className='a-header-botoes'>Home</a>
                        <a className='a-header-botoes'>Menu</a>
                    </div>
                </div>
            </header>

            <section className='section-carrinho'>

                <div className='card'>

                    {itens.map(item =>
                        <CarrinhoItem
                            item={item}
                            removerItem={removerItem}
                            carregarCarrinho={carregarCarrinho} />
                    )}
                </div>


                <div className='informacoes'>
                    <p className='p-1'> Subtotal </p>
                    <p className='p-2'> ({qtdItens()} itens) </p>
                    <p className='p-3'> R$ {calcularValorTotal()} </p>
                    <button onClick={irPedido}> Fechar Pedido </button>
                </div>

            </section>

            <div>
                <div className='div-button-finalizar'>
                    <button className='button-finalizar'>Finalizar compra</button>
                </div>
            </div>

        </main>


        // <main className='main-carrinho'>


        //         <div className='div-input-header'>
        //             <input className='input-pesquisar' type="text" placeholder='Digite o que procura' />
        //         </div>
        //     </header>


        //     <section className='section-carrinho'>
        //         <div className='div-row-info'>
        //             <div className='div-produto'>
        //                 Produto
        //             </div>
        //             <div className='div-preco'>
        //                 Preço Unitário
        //             </div>
        //             <div className='div-qtd'>
        //                 Quantidade
        //             </div>
        //             <div className='div-excluir'>
        //                 Excluir
        //             </div>
        //         </div>

        //         <div className='div-informacoes'>
        //             <div className='div-img-info'>
        //                 <div className='div-img'>
        //               {/* <img src={buscarimagem(item.imagem)} alt='' height='auto' width="auto" /> */}
        //                 </div>
        //                 <div className='div-info'>
        //                     <p className='p-info'>Aqui vai ficar o nome dela</p>
        //                     <p className='p-info'>Aqui a descrição dela</p>
        //                 </div>
        //             </div>

        //             <div className='div-preco-info'>
        //                 <p>Preço</p>
        //             </div>

        //             <div className='div-row-qtd'>
        //                 <label>Qtd.</label>
        //                 <select>
        //                     <option>01</option>
        //                     <option>02</option>
        //                     <option>03</option>
        //                     <option>04</option>
        //                     <option>05</option>
        //                 </select>
        //             </div>

        //             <div className='div-img-excluir'>
        //                 {/* <img src="" alt="" /> */}
        //             </div>
        //         </div>


        //         <div className='div-total'>
        //             <h1>Total: Preço</h1>
        //         </div>

        //         <div className='div-botoes'>
        //             <div>
        //                 <button className='button-1'>
        //                     Continuar Comprando
        //                 </button>
        //             </div>
        //             <div>
        //                 <button className='button-2'>
        //                     Finalizar Compra
        //                 </button>
        //             </div>
        //         </div>

        //     </section>



        /* <section className='section-carrinho'>
            <div className='div-primeira-fileira'>
                <div className='div-p-produto'>
                    <p className='p-produto'>Produto</p>
                </div>

                <div className='div-espacamento-info'>
                    <div className='div-p-preco-unitario'>
                        <p className='p-preco-unitario'>Preço Unitário</p>
                    </div>

                    <div className='div-quantidade'>
                        <p className='p-quantidade'>Quantidade</p>
                    </div>

                    <div className='div-excluir'>
                        <p className='p-excluir'>Excluir</p>
                    </div>
                </div>
            </div>


            <div className='div-produtos'>
                <p>AQUI VAI FICAR OS PRODUTOS</p>
            </div>

            <div className="div-segunda-fileira">
                <div className='div-total-itens'>
                    <p className='p-total-itens'>Total de itens:</p>
                </div>
                <div className='div-p-calcular'>
                    <p className='p-calcular'>Calcular</p>
                </div>
                <div className='div-p-total'>
                    <p className='div-p-total'>Total:</p>
                </div>
            </div>

            <div className='div-terceira-fileira'>
                <div className='div-button-continuar'>
                    <button className='button-comprar'>Continuar comprando</button>
                </div>
                
            </div>

        </section> */
        // </main >

    );
}




