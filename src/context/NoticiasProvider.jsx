import axios from "axios";
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext();

// eslint-disable-next-line react/prop-types
const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("general");
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalNoticias, setTotalNoticias] = useState(0);
  const handleChangePagina = (e, valor) => {
    setPagina(valor);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // O "auto" para un desplazamiento instantáneo
    });
  };
  //consulta a la api
  useEffect(() => {
    //al estar en vite tenes que poner VITE_ antes de la variable de entorno siempre
    const API_KEY = import.meta.env.VITE_API_KEY;
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&category=${categoria}&apiKey=${API_KEY}`;
      const { data } = await axios(url);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
      setPagina(1);
    };
    consultarAPI();
  }, [categoria]);

  useEffect(() => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=us&page=${pagina}&category=${categoria}&apiKey=${API_KEY}`;
      const { data } = await axios(url);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
    };
    consultarAPI();
  }, [pagina]);

  const hanldeChangeCategoria = (e) => {
    setCategoria(e.target.value);
  };
  return (
    <NoticiasContext.Provider
      value={{
        pagina,
        handleChangePagina,
        totalNoticias,
        noticias,
        categoria,
        hanldeChangeCategoria,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};
export { NoticiasProvider };
export default NoticiasContext;
