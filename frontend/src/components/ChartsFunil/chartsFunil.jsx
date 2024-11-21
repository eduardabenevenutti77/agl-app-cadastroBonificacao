import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { chartFunil } from "../../api/regra";

export default function ChartsFunil() {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'polarArea',
                width: 380
            },
            labels: [],
            dataLabels: {
                enabled: false
            },
            yaxis: {
                show: false
            },
            legend: {
                position: 'top',
            },
            title: {
                text: 'ANÁLISE DE VENDAS POR ÁREAS',
                align: 'center',
                style: {
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '10px',
                    color: '#8A8686'
                }
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (val) => `${val} Vendas Realizadas`
                }
            },
            colors: [
                '#ADD8E6',
                '#B0D6D6',
                '#A2B9BC',
                '#4682B4',
                '#88B6B0',
                '#5F8C96',
                '#E6F0F1'
            ]
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await chartFunil();

                const funilData = data.result;
                console.log("Dados recebidos:", funilData);

                if (funilData && Array.isArray(funilData)) {
                    const seriesData = funilData.map(item => item.totalGrupos || 0);
                    const categories = funilData.map(item => item.nome || "Desconhecido");

                    setChartData({
                        series: seriesData,
                        options: {
                            ...chartData.options,
                            labels: categories
                        }
                    });
                } else {
                    console.error("Formato inesperado de dados:", funilData);
                    alert("Não foi possível carregar os dados.");
                }
            } catch (e) {
                console.error("Erro ao buscar dados do funil:", e.message);
                alert("Erro ao carregar dados do gráfico.");
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '500px', height: '260px', padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px', gap: '15px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ApexCharts
                options={chartData.options}
                series={chartData.series}
                type="polarArea"
                width={500}
                height={300}
            />
        </div>
    );
}