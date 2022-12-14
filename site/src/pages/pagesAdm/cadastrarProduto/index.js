import './index.scss';
import { MenuAzul2 } from '../../../components/menuazul';

import { useNavigate } from 'react-router-dom';
import storage from 'local-storage'

import LoadingBar from 'react-top-loading-bar'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import { CadastrarProduto, ListarCategorias, ListarCategoriasNome } from '../../../api/postAPI'
import { inserirImagem } from '../../../api/enviarImagemAPI'
import { useState, useEffect, useRef } from 'react';


import { set } from 'local-storage';



export default function Index() {
  const navigate = useNavigate();


  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [img, setImg] = useState();
  const [categoria, setCategoria] = useState([])
  const [idCategoria, setIdCategoria] = useState()
  const [nomeCategoria, setNomeCategoria] = useState()




  async function CategoriaNome() {
    try {
      const resposta = await ListarCategoriasNome(idCategoria)
      setNomeCategoria(resposta)
    } catch (err) {

    }
  }


  const [nomeCat, setNomecat] = useState('');


  const [id, SetId] = useState(0);


  const ref = useRef();


  async function CarregarCategorias() {
    try {
      const chamada = await ListarCategorias()
      setCategoria(chamada)
    }

    catch (err) {

    }
  }

  useEffect(() => {
    CarregarCategorias()
    CategoriaNome()
  }, [])


  async function onClick() {

    try {
      if (!img) throw new Error("Escolha a imagem para cadastrar")

      //const usuario = storage('usuario-logado').id;

        const NovoPost = await CadastrarProduto(idCategoria, nome, preco, ingredientes)
        console.log(NovoPost);
        const r = await inserirImagem(NovoPost.id, img)
        toast.dark("A pizza foi cadastrada ")
    }
    catch (err) {
      if (err.response){
        console.log(err);
        toast.dark(err.response.data.Erro)
      }
      else {
        toast.dark(err.message)
      }
    }
  }

  function escolherImagem() {
    document.getElementById('imgpizza').click();
  }

  function mostrarImagem() {
    if (typeof (img) == 'object') {
      return URL.createObjectURL(img);
    }
    else {
      return inserirImagem(img)
    }
  }



  return (

    <main className='megadiv'>
      <ToastContainer />
      <LoadingBar color='#0000' ref={ref} />

      <div className="Div-Agrupadora-todos">
        <div>
          <MenuAzul2 />
        </div>

        <div className='div-agrupamais'>

          <div className="Lado-Esquerdo-Informa????es">

            <div className="Div-H1">
              <h1 className='inf-post'>Informa????es do Post</h1>

            </div>


            <div>

              <h2 className='h2-impo'> Importar Foto: </h2>

              <div className='div-inse' onClick={escolherImagem}>
                <img className='inserir' src='/assets/images/botaoa.png' alt='' />
                <input className='input-imagem' placeholder="" type='file' id='imgpizza' onChange={e => setImg(e.target.files[0])} />
              </div>
            </div>

            <div className="Div-Span-Input">
              <div className="Span">
                Novo item:
              </div>
              <input className='Preco-Nome' data-ls-module="charCounter" maxlength="50" type='text' placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="Div-Span-Input-2">
              <div className="Span-2">
                Pre??o:
              </div>

              <input className='Preco-Nome' data-ls-module="charCounter" maxlength="10" type='text' placeholder="Pre??o" value={preco} onChange={e => setPreco(e.target.value)} />
            </div>

            <div className="Div-Span-Input-3">
              <div className="Span-3">
                Descri????o:
              </div>

              <textarea className='Desc' data-ls-module="charCounter" maxlength="100" type='submit' placeholder="Descri????o" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />
            </div>

            <p className="Span-4">
              Categoria:
            </p>

            <div className="Div-Botoes-Categoria">


              <select value={idCategoria} onChange={e => setIdCategoria(e.target.value)}>
                <option selected disabled hidden> Categorias </option>

                {categoria.map(item =>
                  <option value={item.id}>

                    {item.nome}

                  </option>
                )}
              </select>

            </div>

            <div>
              <label></label>

            </div>

            <button className="Button-Publicar" onClick={onClick}>Salvar</button>

          </div>




          <div className="Lado-Direito-Informa????es">

            <h1 className="H1-lado-Direito">
              Pr??-Visualiza????o
            </h1>
            <div className="Div-Pr??-Visualiza????o">

              <div className="imgn">
                {!img &&
                  <img className='img-post' src='./images/a.png' alt='' />
                }

              </div>


              <div className="info1">

              </div>
              <div className="imgn">
                {!img &&
                  <img className='img-post' src='./images/a.png' alt='' />
                }
                {img &&
                  <img className='img-post' src={mostrarImagem()} alt='' />
                }
              </div>

              <div className="Div-nome-vizuali??ao">
                {!nome &&

                  <h1>Nome </h1>
                }
                {nome &&
                  <h1> {nome} </h1>
                }
              </div>
              <div className="div-ingredientes-vizu">
                <div className="esq-1">
                  {!ingredientes &&
                    <p> Ingredientes </p>
                  }
                  {nome &&
                    <p> {ingredientes} </p>
                  }
                  {!preco &&
                    <p> Pre??o </p>
                  }
                  {preco &&
                    <p> R${preco} </p>
                  }
                  {!idCategoria &&
                    <p> Categoria </p>
                  }
                  {idCategoria == 1 &&
                    <p>Salgada</p>

                  }
                  {idCategoria == 2 &&
                    <p>Doce</p>
                  }
                  {idCategoria == 3 &&
                    <p>Bebida</p>
                  }



                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

    </main>

  )
}