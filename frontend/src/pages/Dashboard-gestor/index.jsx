import "./style-dash-gestor.css";
import download from '../../assets/svg/cloud.svg';
import refresh from '../../assets/svg/refresh.svg';
import { findProdutosVendidos, findVendasAnual, findVendasMensal } from "../../api/regra";
import { useEffect, useState } from "react";
import ChartsAnual from "../../components/ChartsAnual/charts";
import ChartsMensal from "../../components/ChartsMensal/chartsMensal";
import html2pdf from "html2pdf.js";
import ChartsMensalPessoa from "../../components/ChartsMensalPessoa/chartsMensalPessoa";
import { toast } from "react-toastify";

export default function DashboardGestor() {
    const [vendasAnual, setVendasAnual] = useState(null);
    const [vendasProduto, setVendasProduto] = useState(null);
    const [vendasMensal, setVendasMensal] = useState(null);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    useEffect(() => {
        const fetchVendasAnual = async () => {
            try {
                const data = await findVendasAnual();
                if (data && data.vendasAnual) {
                    setVendasAnual(data.vendasAnual);
                } else {
                    setVendasAnual("Dados não disponíveis");
                }
            } catch (error) {
                setVendasAnual("Erro ao carregar dados");
            }
        };

        const fetchProduto = async () => {
            try {
                const data = await findProdutosVendidos();
                if (data && data.produtosVendidos !== undefined) {
                    setVendasProduto(data.produtosVendidos);
                } else {
                    setVendasProduto('Dados não estão disponíveis');
                }
            } catch (error) {
                setVendasProduto("Erro ao carregar dados");
            }
        };

        const fetchMensal = async () => {
            try {
                const data = await findVendasMensal();
                if (data && data.vendasMensal !== undefined) {
                    setVendasMensal(data.vendasMensal);
                } else {
                    setVendasMensal('Dados não estão disponíveis');
                }
            } catch (error) {
                setVendasMensal("Erro ao carregar dados");
            }
        };

        fetchVendasAnual();
        fetchProduto();
        fetchMensal();
    }, []);

    const jump = (event) => {
        event.stopPropagation();
        const card = event.currentTarget.closest('#backgroundNumerico1');
        if (card) {
            card.classList.add('jump');
            setTimeout(() => {
                card.classList.remove('jump');
            }, 500);
        }
    };

    const jump2 = (event) => {
        event.stopPropagation();
        const card = event.currentTarget.closest('#backgroundNumerico2');
        if (card) {
            card.classList.add('jump');
            setTimeout(() => {
                card.classList.remove('jump');
            }, 500);
        }
    };

    const jump3 = (event) => {
        event.stopPropagation();
        const card = event.currentTarget.closest('#backgroundNumerico3');
        if (card) {
            card.classList.add('jump');
            setTimeout(() => {
                card.classList.remove('jump');
            }, 500);
        }
    };

    const handleDownload = () => {
        const element = document.getElementById('container'); // Seção da página que você quer exportar
        const options = {
            margin: 0,
            filename: 'relatorio.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'A4', orientation: 'ladscape' }
        };

        html2pdf().set(options).from(element).save();
    };

    return (
        <>
            <div id="container">
                <div id="display">
                    <div id="displayButton">
                        <button id="download" onClick={handleDownload}>Download dos gráficos <img src={download} alt="Download Icon" /></button>
                    </div>
                </div>
                <div id="displayGraficoNumerico">
                    <div id="backgroundNumerico1">
                        <img src={refresh} alt="Refresh Icon" onClick={jump} />
                        <p className="titleGrafico">Valor total de vendas - {year}</p>
                        <p className="campoGrafico">
                            {vendasAnual !== null ? vendasAnual : "Carregando..."}
                        </p>
                    </div>
                    <div id="backgroundNumerico2">
                        <img src={refresh} alt="Refresh Icon" onClick={jump2}/>
                        <p className="titleGrafico">Valor total de vendas - {month}/{year}</p>
                        <p className="campoGrafico">
                            {vendasMensal !== null ? vendasMensal : "Carregando..."}
                        </p>
                    </div>
                    <div id="backgroundNumerico3">
                        <img src={refresh} alt="Refresh Icon" onClick={jump3}/>
                        <p className="titleGrafico">Quantidades de produtos vendidos - {year}</p>
                        <p className="campoGrafico">
                            {vendasProduto !== null ? vendasProduto : "Carregando..."}
                        </p>
                    </div>
                </div>
                <div id='displayCharts'>
                    <ChartsMensal /> {/* Gráfico mensal ocupa toda a largura */}
                    <div id="displaySubCharts">
                        {/* <ChartsMensalPessoa /> Gráfico da esquerda */}
                        {/* <ChartsMensal /> Gráfico da direita */}
                    </div>
                </div>

            </div>
        </>
    );
}