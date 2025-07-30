import diagnostico from "../../../assets/image-removebg-preview 1.svg";
import vigilancia from "../../../assets/aplicacoes-de-vigilancia.svg";
import veiculares from "../../../assets/aplicacoes-veiculares.svg";
import reconhecimento from "../../../assets/reconhecimento-ativos-eletricos.svg";
import robos from "../../../assets/robos-autonomos.svg";
import researcherImage from "../../../assets/user.jpg";

import PdfAreaMedica from "./PDFs/area_medica.pdf";
import PdfVigilancia from "./PDFs/vigilancia.pdf";
import PdfVeiculares from "./PDFs/aplicacoes_veiculares.pdf";
import PdfAtivosEletricos from "./PDFs/ativos_eletricos.pdf";
import PdfRobos from "./PDFs/robos_autonomos.pdf";

export const areas = [
  {
    id: 1,
    name: "Auxílio ao diagnóstico médico",
    image: diagnostico,
    route: "/auxilio-ao-diagnostico-medico",
    researchers: [
      { name: "Mabiu", image: researcherImage },
      { name: "Ana Lidia", image: researcherImage },
    ],
    pdf: PdfAreaMedica,
  },
  {
    id: 2,
    name: "Aplicações de Vigilância",
    image: vigilancia,
    route: "/aplicacoes-de-vigilancia",
    researchers: [
      { name: "Ana Lidia", image: researcherImage },
      { name: "Hector", image: researcherImage },
      { name: "Mabiu", image: researcherImage },
      { name: "Ana Lidia", image: researcherImage },
      { name: "Hector", image: researcherImage },
      { name: "Mabiu", image: researcherImage },
    ],
    pdf: PdfVigilancia,
  },
  {
    id: 3,
    name: "Aplicações Veiculares",
    image: veiculares,
    route: "/aplicacoes-veiculares",
    researchers: [
      { name: "Debora", image: researcherImage },
      { name: "Ana Lidia", image: researcherImage },
    ],
    pdf: PdfVeiculares,
  },
  {
    id: 4,
    name: "Reconhecimento de Ativos Elétricos",
    image: reconhecimento,
    route: "/reconhecimento-de-ativos-eletricos",
    researchers: [
      { name: "Hector", image: researcherImage },
      { name: "Debora", image: researcherImage },
    ],
    pdf: PdfAtivosEletricos,
  },
  {
    id: 5,
    name: "Robôs Autônomos e Sistemas cddd",
    image: robos,
    route: "/robos-autonomos-e-sistemas-embarcados",
    researchers: [
      { name: "Moisés", image: researcherImage },
      { name: "Hector", image: researcherImage },
    ],
    pdf: PdfRobos,
  },
];
