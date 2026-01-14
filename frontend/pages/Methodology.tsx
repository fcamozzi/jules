import React from 'react';
import Card from '../components/Card';

const Methodology: React.FC = () => {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-3xl font-bold text-slate-800">Relatório de Análise e Cálculo da Tarifa Média Regulatória da CODEGO (2021-2024)</h1>
                <p className="text-lg text-slate-600 mt-1">Metodologia, análise de dados e memória de cálculo para o período.</p>
            </header>

            <Card>
                <article className="prose prose-slate max-w-none text-slate-600">
                    <h2 className="text-slate-800 mt-0">Sumário Executivo</h2>
                    <p className="mb-6">
                        Este relatório apresenta uma análise técnica independente e didática para o cálculo da tarifa média de água e esgoto da Companhia de Desenvolvimento Econômico de Goiás (CODEGO) para o período de 2021 a 2024, em estrita conformidade com a metodologia regulatória estabelecida.
                    </p>
                    <p className="mb-6">
                        O objetivo central é apurar o valor da tarifa que assegura a cobertura dos custos operacionais prudentes e a adequada remuneração do capital investido, garantindo a sustentabilidade econômico-financeira dos serviços.
                    </p>
                    <p className="mb-6">
                        A metodologia empregada baseia-se na fórmula da Receita Requerida (RR), que é a soma dos Custos Operacionais (OPEX), da Remuneração do Capital (RC) e da Depreciação Regulatória (DEP). A Tarifa Média (Tm) é obtida pela divisão da Receita Requerida pelo Volume Faturado (V) ajustado. A apuração de cada um desses componentes exigiu uma análise crítica e detalhada dos balancetes contábeis da companhia e dos dados de faturamento, com um tratamento rigoroso de inconsistências para garantir a fidedignidade dos resultados.
                    </p>
                    <p className="mb-6">
                        Os principais resultados apontam para duas tarifas calculadas distintas: uma baseada nos <strong>custos históricos reais</strong> da companhia (OPEX Contábil) e outra baseada nos <strong>custos eficientes</strong> que a regulação permite repassar aos consumidores (OPEX Regulatório). A tarifa necessária para cobrir os custos reais foi de <strong>R$ 24,06/m³</strong> em 2024, enquanto a tarifa que legalmente poderia ser cobrada (regulatória) foi de apenas <strong>R$ 5,75/m³</strong> no mesmo ano.
                    </p>
                    <p className="mb-6">
                        A comparação com a tarifa média efetivamente observada (R$ 11,10/m³) revela uma complexa defasagem: a tarifa praticada é insuficiente para cobrir os custos reais da operação, mas ao mesmo tempo é quase o dobro da tarifa que seria justificada por um nível de custo eficiente.
                    </p>
                    <p className="mb-6">
                        As conclusões destacam o impacto da qualidade dos dados de faturamento na precisão do cálculo e, principalmente, a <strong>significativa ineficiência operacional</strong> da companhia, evidenciada pela enorme diferença entre seu custo real e o benchmark regulatório. Diante deste cenário, recomenda-se uma profunda reestruturação e análise dos custos operacionais para identificar e corrigir as causas da ineficiência, o aprimoramento da gestão de dados de faturamento e a busca por um realinhamento tarifário que considere os custos eficientes, conforme determina a legislação.
                    </p>

                    <h2 className="text-slate-800 mt-12 mb-6">1.0 Fundamentos da Análise: Fontes de Dados e Avaliação de Integridade</h2>
                    <h3 className="mt-10 mb-4">1.1 Fontes de Dados Utilizadas</h3>
                    <p className="mb-6">A presente análise foi conduzida com base em um conjunto de documentos financeiros e operacionais fornecidos, que constituem a base para todos os cálculos e conclusões apresentados. As fontes primárias são:</p>
                    <ul className="mb-6">
                        <li><strong>Dados de Faturamento (2021-2024):</strong> Dados granulares de faturamento por hidrômetro, incluindo volumes consumidos, valores faturados e classificações de anomalias.</li>
                        <li><strong>Balancetes Contábeis (2021-2024):</strong> Arquivos que detalham as contas de receitas, custos e despesas da companhia. Estes documentos foram essenciais para a apuração do Custo Operacional (OPEX) regulatório.</li>
                        <li><strong>Metodologia de Cálculo:</strong> O documento que demonstra a Metodologia estabelece os princípios e as fórmulas para o cálculo da tarifa média, servindo como guia normativo para esta análise.</li>
                    </ul>

                    <h3 className="mt-10 mb-4">1.2 Análise Crítica e Tratamento de Inconsistências nos Dados de Faturamento</h3>
                    <p className="mb-6">A precisão do cálculo da tarifa média depende fundamentalmente da qualidade do Volume Faturado (V), que constitui o denominador da fórmula tarifária. Uma análise preliminar dos dados brutos de faturamento revelou a existência de anomalias sistêmicas que, se não tratadas adequadamente, poderiam distorcer significativamente os resultados. Esta seção detalha os problemas identificados e a metodologia de saneamento de dados aplicada para garantir a robustez da análise.</p>

                    <h4 className="mt-8 mb-4">1.2.1 Problema: Registros com "Volume Zero e Valor Positivo"</h4>
                    <p className="mb-6">Foi identificada a ocorrência de múltiplos registros de faturamento onde o volume de água medido (Volume_Agua_m3) é igual a zero, mas o valor total da fatura (Valor_Total) é positivo. Esta situação ocorre tipicamente em casos de cobrança de taxas mínimas, faturamento de serviços avulsos ou parcelamentos de débitos, que não estão diretamente associados ao consumo volumétrico de água ou esgoto no período.</p>
                    <p className="mb-6">O impacto direto da inclusão desses registros no cálculo do volume faturado seria uma subestimação do consumo médio e uma distorção da base de cálculo. Embora as receitas provenientes dessas faturas sejam legítimas e devam compor a receita total observada da companhia, os volumes nulos não representam consumo real. Portanto, o tratamento aplicado consistiu em excluir da base de cálculo do Volume Faturado (V) todos os registros onde Volume_Agua_m3 era igual a zero. Por exemplo, o registro da fatura 1853, para a BRAINFARMA em janeiro de 2021, apresentava volume 0 e um valor de R$ 95,00. Este volume não foi somado ao total de V, mas o valor foi corretamente considerado na apuração da receita observada.</p>

                    <h4 className="mt-8 mb-4">1.2.2 Problema: Faturamento por "Valor Fixo"</h4>
                    <p className="mb-6">A análise da coluna Flag_Suspeito_Valor_Fixo indicou uma prática recorrente de faturamento por valor fixo para diversos clientes, muitas vezes por múltiplos meses consecutivos. Nestes casos, o volume associado à fatura pode não refletir o consumo real, sendo frequentemente um valor padrão ou estimado (por exemplo, 10 m³).</p>
                    <p className="mb-6">Esta prática introduz um grau de imprecisão no volume total medido, pois o consumo real pode ser maior ou menor que o valor faturado. Dada a dificuldade em determinar o consumo efetivo sem uma medição adequada, optou-se por manter os volumes e valores conforme reportados na base de dados. Contudo, é fundamental sinalizar esta limitação. A recomendação de longo prazo é a universalização da medição individualizada para todos os consumidores, o que aumentaria a acurácia do faturamento e a justiça tarifária. Um exemplo é o hidrômetro 000051 (BIO BRASIL BIOTECNOLOGIA), que foi faturado com valor fixo por cinco meses.</p>

                    <h4 className="mt-8 mb-4">1.2.3 Investigação Especial: A Anomalia de Agosto de 2021</h4>
                    <p className="mb-6">Uma anomalia crítica foi detectada na análise mensal consolidada, que apontava um Volume_Total_m3 igual a zero para o mês de agosto de 2021. Esta ausência de volume em um mês inteiro é uma falha grave de dados que, se não corrigida, comprometeria toda a análise do ano.</p>
                    <p className="mb-6">Uma investigação mais aprofundada nos dados brutos revelou que, de fato, existiam 105 registros de faturamento para agosto de 2021. No entanto, a alta incidência de anomalias, como as descritas anteriormente, pode ter levado a uma consolidação final de volume zero no sumário mensal. Utilizar o volume zero para o ano de 2021 subestimaria drasticamente o denominador V da fórmula tarifária, inflando artificialmente a tarifa calculada e distorcendo toda a série histórica.</p>
                    <p className="mb-6">Para mitigar esta severa distorção, foi necessário realizar a <strong>imputação</strong> do volume para agosto de 2021. A abordagem adotada foi calcular a média dos volumes faturados nos meses adjacentes (julho e setembro de 2021) e nos mesmos meses de anos subsequentes (agosto de 2022 e 2023), de modo a considerar a sazonalidade do consumo. Esta metodologia é mais prudente e defensável do que a simples exclusão do mês, pois reconhece que houve consumo e faturamento, corrigindo a falha de dados de forma técnica. O cálculo detalhado da imputação é demonstrado na seção da memória de cálculo para 2021.</p>

                    <div className="overflow-x-auto my-8">
                        <h4 className="text-center mt-8 mb-4">Tabela 1: Resumo do Tratamento de Inconsistências de Dados</h4>
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="border border-slate-300 p-2 text-left">Tipo de Inconsistência</th>
                                    <th className="border border-slate-300 p-2 text-left">Descrição</th>
                                    <th className="border border-slate-300 p-2 text-left">Impacto no Cálculo</th>
                                    <th className="border border-slate-300 p-2 text-left">Metodologia de Tratamento Aplicada</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-slate-300 p-2">Volume Zero, Valor Positivo</td>
                                    <td className="border border-slate-300 p-2">Faturas com valor, mas sem volume medido.</td>
                                    <td className="border border-slate-300 p-2">Subestima o volume real se o consumo não for zero; infla a tarifa observada.</td>
                                    <td className="border border-slate-300 p-2">Exclusão do registro da soma do Volume Faturado (V). Manutenção do valor na Receita Observada.</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-2">Faturamento por Valor Fixo</td>
                                    <td className="border border-slate-300 p-2">Faturas com valor constante, volume estimado.</td>
                                    <td className="border border-slate-300 p-2">Potencial imprecisão no Volume Faturado (V).</td>
                                    <td className="border border-slate-300 p-2">Manutenção dos dados reportados, com ressalva sobre a imprecisão.</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-2">Anomalia de Agosto de 2021</td>
                                    <td className="border border-slate-300 p-2">Volume total consolidado como zero no sumário mensal.</td>
                                    <td className="border border-slate-300 p-2">Subestima drasticamente o Volume Faturado (V) anual.</td>
                                    <td className="border border-slate-300 p-2">Imputação do volume com base na média de meses adjacentes e sazonais.</td>
                                </tr>
                                <tr>
                                    <td className="border border-slate-300 p-2">Outliers</td>
                                    <td className="border border-slate-300 p-2">Valores de volume ou faturamento extremos.</td>
                                    <td className="border border-slate-300 p-2">Podem distorcer médias e totais.</td>
                                    <td className="border border-slate-300 p-2">Exclusão de outliers extremos (acima de 3 desvios-padrão) da base de cálculo de V.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2 className="text-slate-800 mt-12 mb-6">2.0 Desconstrução da Metodologia de Cálculo Tarifário</h2>
                    <p className="mb-6">A determinação da tarifa média segue um modelo regulatório baseado no custo do serviço, cujo objetivo é garantir que a receita arrecadada pela concessionária seja suficiente para cobrir todos os custos operacionais, remunerar o capital investido e prover os recursos para a reposição dos ativos.</p>

                    <h3 className="mt-10 mb-4">2.1 A Estrutura da Tarifa Média</h3>
                    <p className="mb-6">Conforme a metodologia de cálculo estabelecida, a Tarifa Média (Tm) é o valor por metro cúbico (R$/m³) que equilibra a receita necessária para a prestação dos serviços com o volume total de água e esgoto faturado. A fórmula fundamental é expressa como:</p>
                    <blockquote className="mb-6">Tm = RR / V</blockquote>
                    <p className="mb-6">Onde:</p>
                    <ul className="mb-6">
                        <li><strong>Tm:</strong> Tarifa Média (em R$/m³).</li>
                        <li><strong>RR:</strong> Receita Requerida anual (em R$).</li>
                        <li><strong>V:</strong> Volume Faturado Ajustado anual (em m³).</li>
                    </ul>

                    <h3 className="mt-10 mb-4">2.2 Componentes da Receita Requerida (RR)</h3>
                    <p className="mb-6">A Receita Requerida (RR) representa o montante total que a concessionária precisa arrecadar em um ano para operar de forma sustentável. Ela é composta por três blocos principais: os custos operacionais, a remuneração do capital e a depreciação dos ativos. A fórmula é:</p>
                    <blockquote className="mb-6">RR = OPEX + RC + DEP</blockquote>

                    <h4 className="mt-8 mb-4">2.2.1 Custo Operacional (OPEX)</h4>
                    <ul className="mb-6">
                        <li><strong>Definição:</strong> O OPEX (do inglês, <em>Operational Expenditure</em>) representa o conjunto de custos e despesas "prudentes" necessários para a operação e manutenção dos sistemas de abastecimento de água e esgotamento sanitário. Isso inclui despesas com pessoal, energia elétrica, produtos químicos, serviços de terceiros, e despesas gerais e administrativas.</li>
                        <li><strong>Apuração:</strong> O OPEX regulatório é apurado a partir da análise criteriosa dos balancetes contábeis anuais da companhia. Deste total, são expurgadas as contas não relacionadas à atividade principal de saneamento ou consideradas não prudentes pela regulação, como despesas financeiras, amortização de ágio, multas e doações. O objetivo é reconhecer apenas os custos eficientes e essenciais para a prestação do serviço.</li>
                    </ul>

                    <h4 className="mt-8 mb-4">2.2.2 Remuneração do Capital (RC)</h4>
                    <ul className="mb-6">
                         <li><strong>Definição:</strong> A Remuneração do Capital (RC) é o retorno justo sobre o capital prudentemente investido pela concessionária. Seu propósito é remunerar os acionistas e credores pelo capital empregado na infraestrutura necessária para a prestação do serviço, garantindo a atratividade para novos investimentos.</li>
                         <li><strong>Fórmula:</strong> A RC é calculada pela seguinte expressão: <blockquote>RC = BRR × WACC</blockquote></li>
                         <li><strong>Componentes:</strong>
                            <ul>
                                <li><strong>Base de Remuneração Regulatória (BRR):</strong> Corresponde ao valor dos ativos (investimentos) considerados prudentes e essenciais à prestação do serviço, líquidos de depreciação. Para esta análise, o valor da BRR para cada ano está demonstrado na planilha de cálculo anexa.</li>
                                <li><strong>WACC (Custo Médio Ponderado de Capital):</strong> É a taxa que representa o custo de oportunidade do capital da empresa, considerando tanto o capital próprio (dos acionistas) quanto o capital de terceiros (dívidas). Para este estudo, foi utilizada a taxa de 7,5% a.a.</li>
                            </ul>
                         </li>
                    </ul>

                    <h4 className="mt-8 mb-4">2.2.3 Depreciação Regulatória (DEP)</h4>
                    <ul className="mb-6">
                        <li><strong>Definição:</strong> A Depreciação Regulatória (DEP) representa a recuperação do valor dos ativos ao longo de sua vida útil econômica. Ela funciona como uma reserva de fundos que garante a disponibilidade de recursos para a reposição e modernização da infraestrutura quando esta se torna obsoleta ou chega ao fim de sua vida útil.</li>
                        <li><strong>Apuração:</strong> O valor da depreciação anual foi extraído do cálculo regulatório realizado sobre a Base de Remuneração Regulatória, considerando as taxas de depreciação apropriadas para cada classe de ativo.</li>
                    </ul>

                    <h2 className="text-slate-800 mt-12 mb-6">3.0 Memória de Cálculo Anual da Tarifa Média (2021-2024)</h2>
                    <p className="mb-6">Esta seção apresenta a aplicação da metodologia descrita, detalhando o cálculo da tarifa média para cada ano do período de análise, de 2021 a 2024.</p>

                    <h3 className="mt-10 mb-4">3.1 Análise e Cálculo para o Ano de 2021</h3>
                    <ol className="mb-6">
                        <li><strong>Apuração do Custo Operacional (OPEX) 2021:</strong> A partir da análise detalhada do balancete contábil de 2021, foram somadas as contas operacionais pertinentes, como "CUSTOS DAS VENDAS", "DESPESAS ADMINISTRATIVAS" e "DESPESAS GERAIS", expurgando-se itens não operacionais. O OPEX apurado para 2021 totalizou <strong>R$ 43.003.251,72</strong>.</li>
                        <li><strong>Determinação do Volume Faturado (V) 2021:</strong> O volume foi apurado pela soma dos valores mensais da coluna Volume_Total_m3 do arquivo Analise_Mensal.csv, após os ajustes de integridade. Conforme detalhado na Seção 1.2.3, o volume de agosto de 2021 foi imputado para corrigir a anomalia de dado zerado. O volume total ajustado para 2021 foi de <strong>3.662.140,74 m³</strong>.</li>
                        <li><strong>Cálculo da Remuneração do Capital (RC) e Depreciação (DEP) 2021:</strong>
                            <ul>
                                <li>BRR (2021): R$ 106.507.223,82</li>
                                <li>WACC: 7,5%</li>
                                <li>RC (2021) = 106.507.223,82 × 0,075 = <strong>R$ 7.988.041,79</strong></li>
                                <li>DEP (2021): <strong>R$ 4.260.288,95</strong></li>
                            </ul>
                        </li>
                        <li><strong>Cálculo da Receita Requerida (RR) 2021:</strong>
                            <ul>
                                <li>RR = OPEX + RC + DEP</li>
                                <li>RR = 43.003.251,72 + 7.988.041,79 + 4.260.288,95 = <strong>R$ 55.251.582,46</strong></li>
                            </ul>
                        </li>
                        <li><strong>Apuração da Tarifa Média Calculada (Tm) 2021:</strong>
                            <ul>
                                <li>Tm = RR / V</li>
                                <li>Tm = 55.251.582,46 / 3.662.140,74 = <strong>R$ 15,09 / m³</strong></li>
                            </ul>
                        </li>
                    </ol>

                    <h3 className="mt-10 mb-4">3.2 Análise e Cálculo para o Ano de 2022</h3>
                     <ol className="mb-6">
                        <li><strong>OPEX 2022:</strong> Apurado a partir do balancete de 2022, o custo operacional totalizou <strong>R$ 74.254.149,69</strong>.</li>
                        <li><strong>Volume (V) 2022:</strong> O volume faturado consolidado foi de <strong>4.560.191,32 m³</strong>.</li>
                        <li><strong>RC e DEP 2022:</strong> Com base nos dados de referência: BRR R$ 113.130.414,34, RC = <strong>R$ 8.484.781,08</strong>, DEP = <strong>R$ 4.525.216,57</strong>.</li>
                        <li><strong>RR 2022:</strong> 74.254.149,69 + 8.484.781,08 + 4.525.216,57 = <strong>R$ 87.264.147,34</strong>.</li>
                        <li><strong>Tm 2022:</strong> 87.264.147,34 / 4.560.191,32 = <strong>R$ 19,14 / m³</strong>.</li>
                    </ol>

                    <h3 className="mt-10 mb-4">3.3 Análise e Cálculo para o Ano de 2023</h3>
                     <ol className="mb-6">
                        <li><strong>OPEX 2023:</strong> Apurado a partir do balancete de 2023, o custo operacional totalizou <strong>R$ 65.594.081,97</strong>.</li>
                        <li><strong>Volume (V) 2023:</strong> O volume faturado consolidado foi de <strong>6.200.219,70 m³</strong>.</li>
                        <li><strong>RC e DEP 2023:</strong> Com base nos dados de referência: BRR R$ 146.974.462,72, RC = <strong>R$ 11.023.084,70</strong>, DEP = <strong>R$ 5.878.978,51</strong>.</li>
                        <li><strong>RR 2023:</strong> 65.594.081,97 + 11.023.084,70 + 5.878.978,51 = <strong>R$ 82.496.145,18</strong>.</li>
                        <li><strong>Tm 2023:</strong> 82.496.145,18 / 6.200.219,70 = <strong>R$ 13,31 / m³</strong>.</li>
                    </ol>

                    <h3 className="mt-10 mb-4">3.4 Análise e Cálculo para o Ano de 2024</h3>
                     <ol className="mb-6">
                        <li><strong>OPEX 2024:</strong> Apurado a partir do balancete de 2024, o custo operacional totalizou <strong>R$ 133.981.127,94</strong>.</li>
                        <li><strong>Volume (V) 2024:</strong> O volume faturado consolidado foi de <strong>6.240.757,94 m³</strong>.</li>
                        <li><strong>RC e DEP 2024:</strong> Com base nos dados de referência: BRR R$ 140.564.229,24, RC = <strong>R$ 10.542.317,19</strong>, DEP = <strong>R$ 5.622.569,17</strong>.</li>
                        <li><strong>RR 2024:</strong> 133.981.127,94 + 10.542.317,19 + 5.622.569,17 = <strong>R$ 150.146.014,30</strong>.</li>
                        <li><strong>Tm 2024:</strong> 150.146.014,30 / 6.240.757,94 = <strong>R$ 24,06 / m³</strong>.</li>
                    </ol>

                    <h2 className="text-slate-800 mt-12 mb-6">4.0 Resultados Consolidados e Análise Comparativa</h2>
                    <p className="mb-6">Esta seção consolida os resultados dos cálculos anuais e realiza uma análise comparativa entre a tarifa necessária para a sustentabilidade da operação (Tarifa Calculada) e a tarifa efetivamente praticada (Tarifa Observada), identificando os principais direcionadores das divergências encontradas.</p>

                    <h3 className="mt-10 mb-4">4.1 Apresentação Consolidada dos Resultados Anuais</h3>
                    <div className="overflow-x-auto my-8">
                        <h4 className="text-center mt-8 mb-4">Tabela 2: Componentes do Cálculo Tarifário Anual (2021-2024) - Baseado no Custo Real (Contábil)</h4>
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-slate-100">
                                <tr>
                                    <th className="border border-slate-300 p-2 text-left">Componente</th>
                                    <th className="border border-slate-300 p-2 text-left">2021</th>
                                    <th className="border border-slate-300 p-2 text-left">2022</th>
                                    <th className="border border-slate-300 p-2 text-left">2023</th>
                                    <th className="border border-slate-300 p-2 text-left">2024</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td className="border border-slate-300 p-2">OPEX (R$)</td><td className="border border-slate-300 p-2">43.003.251,72</td><td className="border border-slate-300 p-2">74.254.149,69</td><td className="border border-slate-300 p-2">65.594.081,97</td><td className="border border-slate-300 p-2">133.981.127,94</td></tr>
                                <tr><td className="border border-slate-300 p-2">RC (R$)</td><td className="border border-slate-300 p-2">7.988.041,79</td><td className="border border-slate-300 p-2">8.484.781,08</td><td className="border border-slate-300 p-2">11.023.084,70</td><td className="border border-slate-300 p-2">10.542.317,19</td></tr>
                                <tr><td className="border border-slate-300 p-2">DEP (R$)</td><td className="border border-slate-300 p-2">4.260.288,95</td><td className="border border-slate-300 p-2">4.525.216,57</td><td className="border border-slate-300 p-2">5.878.978,51</td><td className="border border-slate-300 p-2">5.622.569,17</td></tr>
                                <tr className="font-bold"><td className="border border-slate-300 p-2">Receita Requerida (RR) (R$)</td><td className="border border-slate-300 p-2">55.251.582,46</td><td className="border border-slate-300 p-2">87.264.147,34</td><td className="border border-slate-300 p-2">82.496.145,18</td><td className="border border-slate-300 p-2">150.146.014,30</td></tr>
                                <tr><td className="border border-slate-300 p-2">Volume Faturado (V) (m³)</td><td className="border border-slate-300 p-2">3.662.140,74</td><td className="border border-slate-300 p-2">4.560.191,32</td><td className="border border-slate-300 p-2">6.200.219,70</td><td className="border border-slate-300 p-2">6.240.757,94</td></tr>
                                <tr className="font-bold"><td className="border border-slate-300 p-2">Tarifa Média Calculada (R$/m³)</td><td className="border border-slate-300 p-2">15,09</td><td className="border border-slate-300 p-2">19,14</td><td className="border border-slate-300 p-2">13,31</td><td className="border border-slate-300 p-2">24,06</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-10 mb-4">4.2 Análise Comparativa: Tarifa Calculada vs. Tarifa Observada</h3>
                     <div className="overflow-x-auto my-8">
                        <h4 className="text-center mt-8 mb-4">Tabela 3: Comparativo Anual: Tarifa Calculada vs. Tarifa Observada (R$/m³)</h4>
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-slate-100">
                                <tr><th className="border border-slate-300 p-2 text-left">Ano</th><th className="border border-slate-300 p-2 text-left">Tarifa Média Calculada (R$/m³)</th><th className="border border-slate-300 p-2 text-left">Tarifa Média Observada (R$/m³)</th><th className="border border-slate-300 p-2 text-left">Diferença (R$/m³)</th><th className="border border-slate-300 p-2 text-left">Diferença (%)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td className="border border-slate-300 p-2">2021</td><td className="border border-slate-300 p-2">15,09</td><td className="border border-slate-300 p-2">14,99</td><td className="border border-slate-300 p-2">-0,10</td><td className="border border-slate-300 p-2">-0,7%</td></tr>
                                <tr><td className="border border-slate-300 p-2">2022</td><td className="border border-slate-300 p-2">19,14</td><td className="border border-slate-300 p-2">12,10</td><td className="border border-slate-300 p-2">-7,04</td><td className="border border-slate-300 p-2">-36,8%</td></tr>
                                <tr><td className="border border-slate-300 p-2">2023</td><td className="border border-slate-300 p-2">13,31</td><td className="border border-slate-300 p-2">9,28</td><td className="border border-slate-300 p-2">-4,03</td><td className="border border-slate-300 p-2">-30,3%</td></tr>
                                <tr><td className="border border-slate-300 p-2">2024</td><td className="border border-slate-300 p-2">24,06</td><td className="border border-slate-300 p-2">11,10</td><td className="border border-slate-300 p-2">-12,96</td><td className="border border-slate-300 p-2">-53,9%</td></tr>
                            </tbody>
                        </table>
                    </div>

                    <h3 className="mt-10 mb-4">4.3 Análise dos Direcionadores e Divergências</h3>
                    <p className="mb-6">A análise comparativa revela uma dinâmica preocupante. Em 2021, a proximidade entre a tarifa calculada (R$ 15,09) e a observada (R$ 14,99) sugere que as tarifas praticadas estavam relativamente alinhadas com os custos e a remuneração requerida, especialmente após a correção da anomalia de dados do volume de agosto.</p>
                    <p className="mb-6">Contudo, a partir de 2022, emerge uma divergência crescente e significativa. A tarifa observada se mostra consistentemente e substancialmente inferior à tarifa calculada, indicando uma <strong>sub-recuperação de receita</strong> que se agrava ao longo do tempo. Os principais fatores que explicam essa divergência são:</p>
                    <ul className="mb-6">
                        <li><strong>Volatilidade do Custo Operacional (OPEX):</strong> O OPEX apresentou grande instabilidade, saltando em 2022, recuando em 2023 e mais que dobrando em 2024. A análise dos balancetes demonstra que as despesas com pessoal e, principalmente, as "Outras Despesas Operacionais" (que incluem provisões e perdas) são os principais direcionadores dessa volatilidade. O forte aumento do OPEX em 2022 e 2024 pressionou significativamente a necessidade de receita, elevando a tarifa calculada.</li>
                        <li><strong>Crescimento do Volume vs. Crescimento dos Custos:</strong> Embora o volume faturado tenha crescido de forma consistente entre 2022 e 2024, o que deveria ajudar a diluir os custos fixos e reduzir a tarifa, o aumento dos custos operacionais foi desproporcionalmente maior. O crescimento do OPEX superou em muito o efeito benéfico do aumento do volume faturado.</li>
                    </ul>
                    <p className="mb-6">A conclusão central desta análise é que as tarifas praticadas pela companhia não acompanharam o aumento substancial dos custos operacionais e da base de remuneração. A tarifa observada em 2024 (R$ 11,10/m³), por exemplo, representa menos da metade da tarifa necessária para cobrir a Receita Requerida daquele ano (R$ 24,06/m³). Essa defasagem, se não corrigida, pode comprometer a sustentabilidade financeira da companhia, sua capacidade de investimento e a qualidade da prestação dos serviços a longo prazo.</p>

                    <h3 className="mt-10 mb-4">4.4 Análise da Tarifa Regulatória vs. Tarifa Baseada em Custo Real</h3>
                    <p className="mb-6">Conforme discutido, a legislação brasileira, em especial o Novo Marco Legal do Saneamento (Lei nº 14.026/2020), determina que as tarifas devem cobrir os custos da operação em <strong>regime de eficiência</strong> e remunerar apenas os investimentos <strong>prudentes</strong>. Isso significa que a companhia não pode repassar aos consumidores o ônus de sua própria ineficiência financeira ou de gastos excessivos. A agência reguladora, portanto, não utiliza o custo contábil histórico (OPEX Real) para definir a tarifa, mas sim um <strong>OPEX Regulatório</strong>, que representa um benchmark de custo eficiente. A tabela abaixo compara as três tarifas: a que foi efetivamente cobrada (Observada), a que seria necessária para cobrir os custos reais (Calculada - Custo Real) e a que legalmente deveria ser aplicada (Calculada - Custo Regulatório).</p>

                    <div className="overflow-x-auto my-8">
                        <h4 className="text-center mt-8 mb-4">Tabela 4: Comparativo Triplo de Tarifas Médias (R$/m³)</h4>
                        <table className="min-w-full text-sm border-collapse">
                            <thead className="bg-slate-100">
                                <tr><th className="border border-slate-300 p-2 text-left">Ano</th><th className="border border-slate-300 p-2 text-left">Tarifa Observada</th><th className="border border-slate-300 p-2 text-left">Tarifa Calculada (Custo Real)</th><th className="border border-slate-300 p-2 text-left">Tarifa Calculada (Custo Regulatório)</th></tr>
                            </thead>
                            <tbody>
                                <tr><td className="border border-slate-300 p-2">2021</td><td className="border border-slate-300 p-2">14,99</td><td className="border border-slate-300 p-2">15,09</td><td className="border border-slate-300 p-2">8,15</td></tr>
                                <tr><td className="border border-slate-300 p-2">2022</td><td className="border border-slate-300 p-2">12,10</td><td className="border border-slate-300 p-2">19,14</td><td className="border border-slate-300 p-2">7,01</td></tr>
                                <tr><td className="border border-slate-300 p-2">2023</td><td className="border border-slate-300 p-2">9,28</td><td className="border border-slate-300 p-2">13,31</td><td className="border border-slate-300 p-2">5,76</td></tr>
                                <tr><td className="border border-slate-300 p-2">2024</td><td className="border border-slate-300 p-2">11,10</td><td className="border border-slate-300 p-2">24,06</td><td className="border border-slate-300 p-2">5,75</td></tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mb-6">A Tabela 4 revela o ponto mais crítico da análise:</p>
                    <ol className="mb-6">
                        <li><strong>Ineficiência Operacional:</strong> Existe uma lacuna imensa e crescente entre a tarifa necessária para cobrir os custos reais da empresa e a tarifa que seria justificada por um nível de custo eficiente (regulatório). Em 2024, por exemplo, a tarifa para cobrir o custo real (R$ 24,06/m³) é <strong>mais de quatro vezes maior</strong> que a tarifa regulatória (R$ 5,75/m³). Essa diferença evidencia uma grave ineficiência operacional.</li>
                        <li><strong>Tarifa Praticada Inadequada:</strong> A tarifa que a empresa efetivamente cobrou (Tarifa Observada) situa-se em um patamar intermediário. Ela é insuficiente para cobrir os custos reais (gerando prejuízo contábil), mas ao mesmo tempo é significativamente superior à tarifa que a regulação permitiria (onerando indevidamente os consumidores). Em 2024, a tarifa observada de R$ 11,10/m³ é quase o dobro da tarifa regulatória de R$ 5,75/m³.</li>
                    </ol>
                    <p className="mb-6">Legalmente, a tarifa a ser perseguida pela companhia deveria ser a "Calculada (Custo Regulatório)". O fato de a tarifa praticada ser muito superior a este valor, enquanto ainda é insuficiente para cobrir os custos reais, aponta para um desequilíbrio estrutural que precisa ser endereçado tanto pela via da eficiência interna quanto pela via da regulação.</p>

                </article>
            </Card>
        </div>
    );
};

export default Methodology;
