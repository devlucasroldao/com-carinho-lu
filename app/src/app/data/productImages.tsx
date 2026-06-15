// Local product image imports — used instead of Unsplash URLs when available.
// Components should do: productImages[product.id] ?? product.image
import brisaDeVerao from "../../imports/Brisa_de_Ver_o.jpg";
import jardimSecreto from "../../imports/Jardim_Secreto.jpg";
import noiteEstrelada from "../../imports/Noite_Estrelada.jpg";
import gotasDeOrvalho from "../../imports/Gotas_de_Orvalho.jpg";
import caricia from "../../imports/Car_cia.jpg";
import suspiroDeRosas from "../../imports/Suspiro_de_Rosas.jpg";
import fioDeluz from "../../imports/Fio_de_Luz.jpg";
import marDeEncantos from "../../imports/Mar_de_Encantos.jpg";
import kitAmorEmFlor from "../../imports/Amor_em_flor.jpg";
import kitPausaParaMim from "../../imports/Pausa_para_Mim.jpg";

export const productImages: Record<string, string> = {
  "brisa-de-verao": brisaDeVerao,
  "jardim-secreto": jardimSecreto,
  "noite-estrelada": noiteEstrelada,
  "gotas-de-orvalho": gotasDeOrvalho,
  "caricia": caricia,
  "suspiro-de-rosas": suspiroDeRosas,
  "fio-de-luz": fioDeluz,
  "mar-de-encantos": marDeEncantos,
  "kit-amor-em-flor": kitAmorEmFlor,
  "kit-pausa-para-mim": kitPausaParaMim,
};
