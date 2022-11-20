import './index.scss'
import MenuAmareloQr from '../../../components/menuqrpix'

import { useNavigate } from 'react-router-dom';
import storage from 'local-storage'

import LoadingBar from 'react-top-loading-bar'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import { CadastrarCartao } from '../../../api/postAPI'
import { useState, useEffect, useRef } from 'react';

export default function Index() {

    const[numero, setNumero] = useState('');
    const[nome, setNome] = useState('');
    const[vencimento, setVencimento] = useState('');
    const[cvv, setCvv] = useState('');
    const[apelido, setApelido] = useState('');
    const[cpf, setCpf] = useState('');

    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();
    const ref = useRef();

    useEffect(() => {
        if (!storage('usuario-logado')) {
          navigate('/loginUsuario');
        }
      }, [])
  
      async function onClick(){
              
          setCarregando(true);
  
          try {
              const r = await CadastrarCartao(numero, nome, vencimento, cvv, apelido, cpf );
              
              storage('usuario-logado', r)    
              toast.dark('Cartão cadastrado com sucesso ✔️')
  
              setTimeout(() => {
                  navigate('/')
              }, 3000)
          } 
          catch (err) {
          if (err.message.status === 400) { 
              toast.dark(err.response.data.Erro)
          }
          }
        }


        async function salvarPedido() {

            try {
                let produtos = Storage('carrinho');
                let id = Storage('cliente-logado').id;
    
                let pedido =
                {
                    tipoPagamento: 'Cartão',
                    cartao: {
                        nome: nome,
                        numero: numero,
                        vencimento: vencimento,
                        codSeguranca: cvv,
                    },
                    produtos: produtos
                }
    
                const r = await salvarPedido(id, pedido);
                toast.dark('Pedido foi inserido com sucesso');
                Storage('carrinho', []);
                navigate('/');
    
            }
            catch (err) {
                toast.error(err.response.data.erro);
            }
    
        }
  
  



    return (
        <main className='main-dadosCartao'>
            
            <MenuAmareloQr />
            <ToastContainer />
            <LoadingBar color='#0000' ref={ref} />

            <section className='section'>

                <div className='voltar-titulo'>
                    <a href='/informarPagamento' className='voltar'>
                        <img className='seta' src='/assets/images/seta.png' />
                        voltar
                    </a>
                </div>

                <h1 className='titulo-dados'> Insira dados do cartão </h1>

                <div className='inputs-dados'>

                    <div className='numero-cartao'>
                        <p className='nomes-inputs'>Número do cartão:</p>
                        <input  className='inputs-grandes' type="text" maxlength="16" value={numero} onChange={e => setNumero(e.target.value)}></input>
                    </div>

                    <div className='nome-cartao'>
                        <p className='nomes-inputs'>Nome impresso no cartão:</p>
                        <input className='inputs-grandes' type="text" maxlength="20" value={nome} onChange={e => setNome(e.target.value)}></input>
                    </div>


                    <div className='pequenos'>
                        <div className='validade-cartao'>
                            <p className='nomes-inputs'>Validade:</p>
                            <input className='inputs-pequenos' type="text" maxlength="04" value={vencimento} onChange={e => setVencimento(e.target.value)}></input>
                        </div>

                        <div className='cvv-cartao'>
                            <p className='nomes-inputs'>CVV:</p>
                            <input className='inputs-pequenos' type="text" maxlength="03" value={cvv} onChange={e => setCvv(e.target.value)}></input>
                        </div>

                    </div>

                    <div className='apelido-cartao'>
                        <p className='nomes-inputs'>Apelido do cartão:</p>
                        <input className='inputs-grandes' type="text" maxlength="20"value={apelido} onChange={e => setApelido(e.target.value)}></input>
                    </div>

                    <div className='cpf-cartao'>
                        <p className='nomes-inputs'>CPF/CNPJ:</p>
                        <input className='inputs-grandes' type="text" maxlength="14"value={cpf} onChange={e => setCpf(e.target.value)}></input>
                    </div>
                </div>

                <div className='div-botao'>
                    <button className='finalizar' disabled={carregando} onClick={onClick + salvarPedido}>Finalizar Compra</button>
                </div>
            </section>

            <section className='cartao-section'>
                <div className='cartao'>
                    <img className='logo-cartao' src='/assets/images/logocartao.png' />

                    <div className='zeros'>
                    {!numero &&
                    <p> 0000 0000 0000 0000 </p>
                  }
                  {numero &&
                    <p> {numero} </p>
                  }
                        
                    </div>
                    <div className='nomes-abaixo'>
                    {!nome &&
                    <p className='nome-impresso'> Nome impresso no cartão </p>
                  }
                  {nome &&
                    <p className='nome-impresso'> {nome} </p>
                  }
                        {!vencimento &&
                    <p> MM/AA </p>
                  }
                  {vencimento &&
                    <p> {vencimento} </p>
                  }
                        
                    </div>

                </div>

            </section>

        </main>
    )
}