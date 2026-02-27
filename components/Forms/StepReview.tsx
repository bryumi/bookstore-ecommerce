import { maskCardNumber } from "@/utils/mask";
import SectionTitle from "../SectionTitle";
import { UserData } from "@/types/mock.interface";

const StepReview = ({ data }: { data: UserData }) => (
  <>
    <SectionTitle>Revisão do Cadastro</SectionTitle>
    <div className="space-y-3 font-body text-sm">
      <div className="bg-cream border border-charcoal/8 p-4 space-y-1.5">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
          Dados Pessoais
        </p>
        {(
          [
            ["Nome", data.nome],
            ["E-mail", data.email],
            ["CPF", data.cpf],
            ["Telefone", data.telefone],
            ["Nascimento", data.dataNascimento],
            ["Gênero", data.genero],
          ] as [string, string][]
        ).map(([k, v]) => (
          <p key={k} className="flex gap-2">
            <span className="text-charcoal/35 w-24 shrink-0 font-sans text-xs">
              {k}:
            </span>
            <span className="text-charcoal">{v}</span>
          </p>
        ))}
      </div>
      <div className="bg-cream border border-charcoal/8 p-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
          Endereços ({data.enderecos.length})
        </p>
        {data.enderecos.map((a, i) => (
          <p key={a.id} className="text-charcoal/55 mb-1">
            <span className="text-charcoal/25 mr-2">{i + 1}.</span>
            {a.apelido || "Sem apelido"} — {a.rua}, {a.numero}, {a.cidade}/
            {a.estado}
            {a.isCobranca && (
              <span className="ml-1.5 font-sans text-[10px] uppercase tracking-wider text-burgundy">
                cobrança
              </span>
            )}
            {a.isEntrega && (
              <span className="ml-1.5 font-sans text-[10px] uppercase tracking-wider text-sage">
                entrega
              </span>
            )}
          </p>
        ))}
      </div>
      <div className="bg-cream border border-charcoal/8 p-4">
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-3">
          Cartões ({data.cartoes.length})
        </p>
        {data.cartoes.map((c, i) => (
          <p key={c.id} className="text-charcoal/55 mb-1">
            <span className="text-charcoal/25 mr-2">{i + 1}.</span>
            {c.apelido || "Sem apelido"} — {maskCardNumber(c.numero)}
            {c.isPreferencial && (
              <span className="ml-1.5 font-sans text-[10px] uppercase tracking-wider text-gold">
                preferencial
              </span>
            )}
          </p>
        ))}
      </div>
    </div>
  </>
);

export default StepReview;
