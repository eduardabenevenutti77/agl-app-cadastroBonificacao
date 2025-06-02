import { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { chartsCalculo } from "../../api/regra"; 

export default function ChartsOTE() {
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Valores em R$'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: (val) => `R$ ${val.toFixed(2)}`
                }
            },
            title: {
                text: 'Remuneração Fixa, Variável e OTE',
                align: 'center',
                style: {
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#8A8686'
                }
            },
            colors: ['#4CAF50', '#FF9800', '#2196F3']
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await chartsCalculo(); // função que retorna os dados: { fixa, variavel, ote }
                const { fixa, variavel, ote } = response.result || {};

                if (fixa !== undefined && variavel !== undefined && ote !== undefined) {
                    setChartData({
                        ...chartData,
                        series: [
                            {
                                name: 'Remuneração Fixa',
                                data: [fixa]
                            },
                            {
                                name: 'Bônus Variável',
                                data: [variavel]
                            },
                            {
                                name: 'OTE Total',
                                data: [ote]
                            }
                        ],
                        options: {
                            ...chartData.options,
                            xaxis: {
                                ...chartData.options.xaxis,
                                categories: ['Usuário X'] // pode trocar por um nome dinâmico
                            }
                        }
                    });
                } else {
                    console.error("Dados incompletos:", response);
                    alert("Erro ao carregar OTE.");
                }
            } catch (e) {
                console.error("Erro ao buscar OTE:", e.message);
                alert("Erro ao carregar gráfico.");
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ width: '600px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ApexCharts
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={350}
            />
        </div>
    );
}
