import './index.scss';
import RodapeMenu from '../../../components/rodape-menu';
import { buscarimagem, ListarPizzaSalgada } from '../../../api/usuarioAPI';
import { useNavigate } from 'react-router-dom';
// import {toast} from 'react-toastify';
import { useState, useEffect} from 'react';
// import Storage from 'local-storage';

export default function Index() {

    const [produto, setProduto] = useState([]);


    const navigate = useNavigate();

    async function CarregarProdutos() {
        const resp = await ListarPizzaSalgada();
        setProduto(resp);

    }

    useEffect(() => {
        CarregarProdutos();
    }, [])

    function AbrirDetalhes(id) {
        navigate('/produto/' + id + '/detalhe')
    }

    function LoginUsuario() {
        navigate('/loginUsuario');
    }

    function Carrinho() {
        navigate('/carrinho');

    }

    // function AdicionarAoCarrinho() {
    //     let carrinho = [];
    //     if (Storage('carrinho')) {
    //         carrinho = Storage('carrinho');
    //     }    
    //     if(carrinho.find(item => item.id === id)) {
    //         carrinho.push({
    //             id: id,
    //             qtd: 1
    //         })
    //         Storage('carrinho', carrinho);

    //     }
    //     toast.dark('Produto adicionado ao carrinho');
    // }

    return (

        <main className='main-pagina-detalhes-pizza'>

            <header className='header-menu-usuario'>
                <div className='div-cabecalho'>

                    <div className='div-cabecalho-opcoes'>
                        <a href='/' className='a-header-menu-usuario'>Home</a>
                    </div>

                    <div className='div-img-cabecalho-logo'>
                        <img className='imagem-logo-menu-usuario' alt='' src="/assets/images/logohome1.png" />
                    </div>
                </div>


                <div className='div-cabecalho-direita'>

                    <div className='numero-cabecalho'>
                        <p className='p-cima-numero'>Entre em contato conosco</p>
                        <p className='p-baixo-numero'>(99)-999 999 999</p>
                    </div>


                    <div className='div-row-icons'>
                        <div className='div-icons-header' onClick={LoginUsuario}>
                            <img className='imagem-header-icon1' alt='' src='/assets/images/usuario.png' />
                        </div>
                        <div className='div-icons-header' onClick={Carrinho}>
                            <img className='imagem-header-icon2' alt='' src='/assets/images/carrinho.png' />
                        </div>
                    </div>
                </div>
            </header>
            <div className='produtos'>
                    {produto.map(item =>
                        <div onClick={() => AbrirDetalhes(item.id)}>
                            <img src={buscarimagem(item.imagem)} alt='' height='auto' width="auto" />
                            <h3>{item.produto}</h3>
                            <h4>por: R${item.preco.replace(".", ",")}</h4>
                        </div>
                    )}
                </div>

                {/* <button onClick={AdicionarAoCarrinho}>Adicionar ao carrinho</button> */}

            <section className='rodape-detalhes'>
              <RodapeMenu/>
            </section>

        </main>
    )
}