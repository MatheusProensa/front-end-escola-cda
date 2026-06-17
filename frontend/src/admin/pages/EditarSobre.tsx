import EditarPagina from "./EditarPagina";

export default function EditarSobre() {
  return (
    <EditarPagina
      pagina="sobre"
      active="sobre"
      icone="book-open"
      titulo="Sobre a Escola"
      subtitulo="História, valores e linha do tempo"
      verNoSite="/sobre"
    />
  );
}
