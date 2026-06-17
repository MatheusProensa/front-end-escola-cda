import EditarPagina from "./EditarPagina";
import GaleriaEditor from "./GaleriaEditor";
import { SEG_INFANTIL_DEFAULT, SEG_FUNDAMENTAL_DEFAULT, SEG_BERCARIO_DEFAULT } from "../../lib/galeria";

export default function EditarSegmentos() {
  return (
    <EditarPagina
      pagina="segmentos"
      active="segmentos"
      icone="layer-group"
      titulo="Segmentos"
      subtitulo="Educação Infantil, Fundamental e Contraturno"
      verNoSite="/segmentos"
      extra={
        <>
          <GaleriaEditor pagina="segmentos" secao="galeria_bercario" titulo="Galeria — Berçário" defaults={SEG_BERCARIO_DEFAULT} hint="Fotos do carrossel do Berçário." />
          <GaleriaEditor pagina="segmentos" secao="galeria_infantil" titulo="Galeria — Educação Infantil" defaults={SEG_INFANTIL_DEFAULT} hint="Fotos do carrossel da Educação Infantil." />
          <GaleriaEditor pagina="segmentos" secao="galeria_fundamental" titulo="Galeria — Ensino Fundamental" defaults={SEG_FUNDAMENTAL_DEFAULT} hint="Fotos do carrossel do Ensino Fundamental." />
        </>
      }
    />
  );
}
