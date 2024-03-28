import { Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import useNoticias from "../hooks/useNoticias";
import Noticia from "./Noticia";
const ListadoNoticias = () => {
  const { handleChangePagina, noticias, totalNoticias, pagina } = useNoticias();
  const totalPaginas = Math.ceil(totalNoticias / 20);
  return (
    <>
      <Typography variant="h3" component="h2" marginY={5} textAlign="center">
        Últimas Noticias
      </Typography>
      <Grid container spacing={2}>
        {noticias.map((noticia) => (
          <Noticia key={noticia.url} noticia={noticia} />
        ))}
      </Grid>
      <Stack
        sx={{ marginY: 5 }}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
      >
        <Pagination
          onChange={handleChangePagina}
          count={totalPaginas}
          color="primary"
          page={pagina}
        />
      </Stack>
    </>
  );
};

export default ListadoNoticias;
