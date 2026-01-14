import React from 'react';
import Card from '../components/Card';

const Recommendations: React.FC = () => {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Análise Jurídica da Tarifa Aplicada</h1>
                <p className="text-lg text-slate-600 mt-1">Análise aprofundada da ilegalidade da tarifa de água e esgoto praticada, suas causas, consequências diretas e as soluções judiciais cabíveis.</p>
            </header>

            <Card>
                <article className="p-4 sm:p-6">
                    <style>{`
                        .legal-analysis h2 {
                            font-size: 1.5rem;
                            line-height: 2rem;
                            font-weight: 700;
                            color: #1e293b;
                            margin-top: 2.5rem;
                            margin-bottom: 1.5rem;
                            padding-bottom: 0.75rem;
                            border-bottom: 1px solid #e2e8f0;
                        }
                        .legal-analysis h2:first-of-type {
                            margin-top: 0;
                            border-top: none;
                        }
                        .legal-analysis h3 {
                            font-size: 1.125rem;
                            line-height: 1.75rem;
                            font-weight: 600;
                            color: #334155;
                            margin-top: 2rem;
                            margin-bottom: 0.75rem;
                        }
                        .legal-analysis p, .legal-analysis ul {
                            text-align: justify;
                            margin-bottom: 1rem;
                            line-height: 1.75;
                            color: #475569;
                        }
                        .legal-analysis ul {
                            list-style-position: outside;
                            padding-left: 1.5rem;
                        }
                        .legal-analysis li {
                            padding-left: 0.5rem;
                            margin-bottom: 0.5rem;
                        }
                        .legal-analysis strong {
                            font-weight: 600;
                            color: #1e293b;
                        }
                    `}</style>
                    <div className="legal-analysis">
                        <h2>1. O Fundamento Legal: Princípios Constitucionais e o Regime Regulatório</h2>
                        <p>A cobrança de tarifas por serviços públicos concedidos não é um ato de livre comércio, mas uma prerrogativa estatal delegada, estritamente vinculada a um regime de direito público. A exigência de uma tarifa justa e módica emana diretamente de princípios constitucionais e se materializa na legislação infraconstitucional.</p>

                        <h3>Princípios Constitucionais Basilares</h3>
                        <p>A modicidade tarifária é um corolário do princípio da defesa do consumidor (Art. 5º, XXXII, e Art. 175, Parágrafo único, II, da Constituição Federal) e do princípio da eficiência na administração pública (Art. 37, CF), que se estende às concessionárias por força do contrato de concessão. O Estado, ao delegar o serviço, não delega o poder de onerar o cidadão de forma desproporcional. A tarifa, nesse contexto, deve ser vista como um instrumento de política pública, e não como um preço livremente estipulado.</p>

                        <h3>Lei Federal nº 11.445/2007 (Art. 30)</h3>
                        <p>Esta lei materializa os princípios constitucionais ao definir que a tarifa deve ser a contraprestação pelos "custos mínimos necessários" a uma operação eficiente. A norma introduz o conceito de custo de eficiência (ou OPEX regulatório) como o teto para o repasse de despesas ao consumidor. Custos decorrentes de má gestão, despesas operacionais excessivas ou investimentos não prudentes (gold plating) são, por lei, de responsabilidade exclusiva do acionista da concessionária, não do usuário do serviço. A legislação busca, assim, simular os efeitos da concorrência em um monopólio natural, incentivando a concessionária a buscar ganhos de produtividade.</p>

                        <h3>Lei Federal nº 14.026/2020 (Novo Marco do Saneamento)</h3>
                        <p>Ao instituir as Normas de Referência da ANA, o legislador visou criar um benchmark nacional de eficiência. A intenção é clara: impedir que a ausência de concorrência direta no setor de saneamento se traduza em estagnação e custos elevados. A concessionária não pode mais justificar suas tarifas apenas com base em seus próprios custos históricos; ela deve demonstrar que sua performance é compatível com a de um operador eficiente. Essa abordagem, conhecida como yardstick competition ou "competição por comparação", é uma ferramenta regulatória moderna para induzir a eficiência.</p>

                        <h3>Lei Estadual (GO) nº 14.939/2004 (Art. 15)</h3>
                        <p>Este dispositivo é a chave de validade do ato de cobrança no âmbito estadual. A exigência de parecer técnico prévio e favorável da AGR não é mera formalidade. É o ato que confere legalidade e exequibilidade à tarifa. Sem ele, a cobrança é juridicamente inexistente, um ato nulo que não pode gerar efeitos. A ausência deste ato administrativo vicia a cobrança em sua origem, tornando-a juridicamente inexigível.</p>

                        <h2>2. A Violação: Dupla Ilegalidade e Teses de Mérito</h2>
                        <p>A conduta da concessionária configura uma dupla e flagrante ilegalidade, que contamina tanto a forma quanto o mérito da cobrança, abrindo duas frentes de argumentação distintas.</p>

                        <h3>Tese Principal - Violação Formal e Material Comprovada:</h3>
                        <p><strong>Vício de Forma:</strong> A ausência do ato de homologação da AGR, exigido pela Lei Estadual, é um vício insanável e documentalmente comprovado. No direito administrativo, a forma é garantia do administrado. Ao cobrar uma tarifa não homologada, a concessionária pratica um ato nulo de pleno direito, que não pode ser convalidado.</p>
                        <p><strong>Vício de Mérito (Ineficiência Operacional):</strong> A consequência direta da falta de controle é o repasse de custos de ineficiência operacional ao consumidor. A análise pericial contábil, que distingue o "custo real" do "custo regulatório", é a prova material desta violação. A tarifa cobrada não remunera apenas o serviço, mas também a má gestão, violando o princípio da modicidade tarifária e o Art. 30 da Lei nº 11.445/2007.</p>

                        <h3>Tese Subsidiária - [INFERÊNCIA] Violação por Inclusão de Encargos Tributários:</h3>
                        <p><strong>Fundamentação:</strong> Além da ineficiência operacional geral, há uma forte inferência de que a tarifa cobrada inclui indevidamente tributos como PIS e COFINS. Tais contribuições incidem sobre o faturamento da concessionária, sendo uma obrigação tributária da empresa, e não um "custo operacional" passível de repasse direto ao consumidor. A tarifa regulatória visa cobrir despesas com a operação (pessoal, manutenção, insumos) e remunerar o capital investido, não os impostos sobre a receita da pessoa jurídica.</p>
                        <p><strong>Analogia com a "Tese do Século" (Tema 69/STF):</strong> O raciocínio jurídico é análogo ao da exclusão do ICMS da base de cálculo do PIS/COFINS. O Supremo Tribunal Federal entendeu que o ICMS não compõe o faturamento da empresa, sendo mero trânsito de caixa para o Estado. De forma similar, o valor referente a PIS/COFINS, que é um custo tributário da concessionária, não pode compor o "custo do serviço" que forma a base da tarifa paga pelo consumidor. Repassar esse encargo significa, na prática, fazer o consumidor pagar o imposto devido pela concessionária, desvirtuando a natureza da tarifa.</p>
                        <p><strong>Posicionamento Estratégico:</strong> Esta tese será arguida como uma linha de investigação na ação judicial. Será requerido que a concessionária apresente suas planilhas detalhadas de composição de custos, sob pena de inversão do ônus da prova (Art. 6º, VIII, CDC), para que se verifique se o repasse de PIS/COFINS ocorreu. A confirmação desta prática constituirá um fundamento autônomo e adicional para a restituição dos valores.</p>

                        <h2>3. A Consequência: Restituição Integral e o Princípio da Boa-Fé Objetiva</h2>
                        <p>A cobrança indevida acarreta o dever de restituição, fundamentado não apenas no enriquecimento sem causa, mas também na quebra da boa-fé objetiva que deve nortear as relações contratuais.</p>

                        <h3>Enriquecimento Sem Causa e Violação da Boa-Fé</h3>
                        <p>A cobrança de valores sabidamente (ou que deveriam ser sabidos) superiores ao devido viola o dever de lealdade e transparência, anexo ao princípio da boa-fé objetiva (Art. 422, Código Civil). A conduta da concessionária pode ser enquadrada na figura do venire contra factum proprium (proibição do comportamento contraditório): ela não pode se beneficiar de sua própria omissão (não submeter a tarifa à AGR) para, em seguida, exigir do consumidor o pagamento de uma tarifa inflada. A restituição, portanto, tem um caráter não apenas reparatório, mas também pedagógico e sancionatório, para desestimular a má-fé contratual.</p>

                        <h3>Prazo Decenal (Tema Repetitivo 932 do STJ)</h3>
                        <p>A definição do prazo de 10 anos pelo STJ é um pilar de segurança para a pretensão. A Corte Superior entendeu que a relação jurídica entre o usuário e a concessionária tem natureza contratual (e não de simples fato ou de natureza tributária), aplicando-se a regra geral de prescrição do Art. 205 do Código Civil. Essa definição afasta qualquer tese de prazos menores (trienais ou quinquenais) e garante o direito de reaver os valores pagos indevidamente em toda a última década.</p>

                        <h2>4. A Solução: Estratégia Jurídica Integrada</h2>
                        <p>A robustez do caso permite a adoção de uma estratégia jurídica em múltiplas frentes, visando resultados rápidos e a recuperação integral do dano.</p>

                        <h3>Ação Judicial com Pedido Liminar</h3>
                        <p>A tutela de urgência (Art. 300, CPC) é a medida mais eficaz para estancar o prejuízo. Além dos argumentos de fumus boni iuris e periculum in mora, deve-se destacar o conceito de periculum in mora inverso: o dano para a concessionária em caso de uma decisão liminar equivocada é meramente financeiro e facilmente reversível, enquanto o dano para o consumidor, que continua pagando faturas excessivas, impacta seu fluxo de caixa e sua competitividade de forma muito mais grave e dificilmente reversível.</p>

                        <h3>Ação Retroativa de Repetição de Indébito</h3>
                        <p>A ação principal buscará a condenação da concessionária à devolução dos valores, com base na prova pericial pré-constituída e na investigação sobre os encargos tributários. A clareza dos cálculos e a solidez da fundamentação jurídica abrem a possibilidade, inclusive, de um julgamento antecipado do mérito (Art. 355, I, CPC), por não haver necessidade de produção de outras provas, ou mesmo de uma tutela de evidência (Art. 311, IV, CPC), caso a concessionária não apresente prova documental capaz de gerar dúvida razoável.</p>

                    </div>
                </article>
            </Card>
        </div>
    );
};

export default Recommendations;
