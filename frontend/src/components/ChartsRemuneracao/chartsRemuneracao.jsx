import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { findUser } from "../../api/user";

export default function ChartsRemunerecao() {
    const [users, setUsers] = useState([]);
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: {
                type: 'bar',
                height: 240,
                backgroundColor: '#f6f6f6',
                fontFamily: 'Jost',
                toolbar: {
                    show: false // Esconde a barra de ferramentas do gráfico
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 8, 
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false, // Habilitar ou desabilitar conforme permissão
                formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`, // Formatação para valores monetários
                style: {
                    fontSize: '20px', // Tamanho da fonte do valor
                    colors: ['#fff'], // Cor do texto
                    fontFamily: 'Jost'
                }
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '12px', // Tamanho da fonte das categorias
                        colors: '#666',
                        fontFamily: 'Jost'
                    }
                }
            },
            grid: {
                borderColor: '#e7e7e7', // Cor das linhas de grade
                strokeDashArray: 4, // Estilo das linhas da grade
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`, // Formatação da tooltip
                }
            },

            colors: ['#5A9DB9'], // Cor personalizada das barras
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findUser();
                const roleUser = data.filter(user => user.permissao === 'user');
                const formattedUsers = roleUser.map(user => ({
                    ...user,
                    remuneracaoFixa: parseFloat(user.remuneracaoFixa), // Garantindo que seja número
                }));

                // Verificar se o usuário é admin
                const isAdmin = data.some(user => user.role === 'admin');

                const seriesData = formattedUsers.map(user => user.remuneracaoFixa);
                const categories = formattedUsers.map(user => user.email);

                setChartData({
                    series: [{
                        data: seriesData
                    }],
                    options: {
                        ...chartData.options,
                        xaxis: {
                            ...chartData.options.xaxis,
                            categories: categories
                        },
                        dataLabels: {
                            enabled: isAdmin // Mostrar valores apenas para admin
                            
                        }
                    }
                });
            } catch (error) {
                alert("Não foi possível carregar os usuários.");
            }
        };

        fetchData();
    }, []); // O array vazio garante que o useEffect seja executado apenas uma vez, na montagem do componente

    return (
        <div style={{ padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px' }}>
            <ApexCharts
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width={980}
                height={300} // Ajustado para dar mais espaço ao gráfico
            />
        </div>
    );
}