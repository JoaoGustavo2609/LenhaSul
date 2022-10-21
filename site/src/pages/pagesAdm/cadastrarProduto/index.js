import './index.scss';
import { MenuAzul2 } from '../../../components/menuazul';

import { useNavigate } from 'react-router-dom';
import storage from 'local-storage'

import LoadingBar from 'react-top-loading-bar'

import { toast, ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 


import { CadastrarProduto } from '../../../api/postAPI'
import { ListarCategorias } from '../../../api/categoriaAPI';
import { inserirImagem } from '../../../api/enviarImagemAPI'
import { useState, useEffect, useRef } from 'react';


export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!storage('usuario-logado')) {
      navigate('/loginAdm');
    }
  }, [])

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [img, setImg] = useState();

  const [idCategoria, setIdCategoria] = useState();
  const [categorias, setCategorias] = useState([]);

  const UserLogado = storage('usuario-logado').Nome;
  const [id, SetId] = useState(0);

  const [catSelecionadas, setCatSelecionadas] = useState([]);
  const ref = useRef();


  function AdicionarCategoria() {
    if (!catSelecionadas.find(item => item == idCategoria)) {
      const categorias = [...catSelecionadas, idCategoria];
      setCatSelecionadas(categorias);
    }
  }

  function BuscarCategoria(id) {
    const cate = categorias.find(item => item.id == id);
    return cate.categoria;
  }



  async function carregarCategorias() {
    const r = await ListarCategorias();
    setCategorias(r);
  }

  function buscarNomeCategoria(id) {
    const cat = categorias.find(item => item.id == id);
    return cat.categoria;
}

function removerCategoria(id) {
    const x = catSelecionadas.filter(item => item != id);
    setCatSelecionadas(x);
}



  async function onClick() {

    
    try {
      if (!img) throw new Error("Escolha a imagem para cadastrar")

      const usuario = storage('usuario-logado').id;
      

      if (id === 0) {

        const NovoPost = await CadastrarProduto(nome, preco, ingredientes)
        const r = await inserirImagem(NovoPost.id, img)
        toast.dark("A pizza foi cadastrada ")

        
      }
     
    
        

    }


    
    catch (err) {
      if (err.response)
        toast.dark(err.response.data.Erro)
      else {
        toast.dark(err.message)
      }
    }
  }

  function escolherimg() {
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
          <MenuAzul2/>
        </div>

        <div className='div-agrupamais'>

          <div className="Lado-Esquerdo-Informações">

            <div className="Div-H1">
              <h1 className='inf-post'>informações do Post</h1>
              
            </div>


            


            <div className="Div-Span-Input">
              <div className="Span">
                Novo item:
              </div>

              <div>
              <h2> Importar Foto </h2>
                            <input type='file' id='imgpizza' onChange={e => setImg(e.target.files[0])} />
              </div>

              <input className='Preco-Nome' data-ls-module="charCounter" maxlength="50" type='text' placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div className="Div-Span-Input-2">
              <div className="Span-2">
                Preço:
              </div>

              <input className='Preco-Nome' data-ls-module="charCounter" maxlength="10" type='text' placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
            </div>

            <div className="Div-Span-Input-3">
              <div className="Span-3">
                Descrição:
              </div>

              <textarea className='Desc' data-ls-module="charCounter" maxlength="100" type='submit' placeholder="Descrição" value={ingredientes} onChange={e => setIngredientes(e.target.value)} />
            </div>

            <p className="Span-4">
              Categoria:
            </p>

            <div className="Div-Botoes-Categoria">


            <select value={idCategoria} onChange={e => setIdCategoria(e.target.value)} >
                                <option selected disabled hidden>Selecione</option>
                                <option >Doce</option>
                                <option >Salgada</option>
                                <option >Bebida</option>

                                {categorias.map(item =>
                                    <option value={item.id}> {item.categoria} </option>
                                )}
                            </select>

              
            </div>

            <div>
                        <label></label>
                        <div className='cat-conteiner'>
                            {catSelecionadas.map(id =>
                                <div className='cat-selecionada' onClick={() => removerCategoria(id)}>
                                    {buscarNomeCategoria(id)}
                                </div>
                            )}
                        </div>
            </div>
        
            <button className="Button-Publicar" onClick={onClick}>Salvar</button> 
        
          </div>
          
         


          <div className="Lado-Direito-Informações">

            <h1 className="H1-lado-Direito">
              Pré-Visualização
            </h1>
            <div className="Div-Pré-Visualização">

            <div className="imgn">
                            {!img &&
                                <img className='img-post' src='./images/a.png' alt='' />
                            }
                            
                        </div>


              <div className="info1">
                <h1> {UserLogado} </h1>
              </div>
              <div className="imgn">
                {!img &&
                  <img className='img-post' src='./images/a.png' alt='' />
                }
                {img &&
                  <img className='img-post' src={mostrarImagem()} alt='' />
                }
              </div>

              <div className="Div-nome-vizualiçao">
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
                    <p> Preço </p>
                  }
                  {preco &&
                    <p> R${preco} </p>
                  }
                  {!idCategoria &&
                    <p> Categoria </p>
                  }
                  {idCategoria &&
                    <p> {idCategoria} </p>
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