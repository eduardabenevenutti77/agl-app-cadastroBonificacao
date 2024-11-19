import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";
import { findUser } from "../../api/user";
import './style-remuneracao.css'

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
                    show: false 
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 8, 
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false, 
                formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`, 
                style: {
                    fontSize: '20px', 
                    colors: ['#fff'], 
                    fontFamily: 'Jost'
                }
            },
            xaxis: {
                categories: [],
                labels: {
                    style: {
                        fontSize: '12px', 
                        colors: '#666',
                        fontFamily: 'Jost'
                    }
                }
            },
            grid: {
                borderColor: '#e7e7e7', 
                strokeDashArray: 4, 
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`, 
                }
            },
            title: {
                text: 'ANÁLISE DE REMUNERAÇÕES FIXAS POR FUNCIONÁRIOS', 
                align: 'center',
                style: {
                    fontSize: '14px',
                    // textTransform: 'uppercase',
                    fontWeight: '500',
                    color: '#8A8686'
                }
            },
            colors: ['#5A9DB9'], 
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findUser();
                const roleUser = data.filter(user => user.permissao === 'user');
                const formattedUsers = roleUser.map(user => ({
                    ...user,
                    remuneracaoFixa: parseFloat(user.remuneracaoFixa), 
                }));

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
                            enabled: isAdmin 
                        }
                    }
                });
            } catch (error) {
                alert("Não foi possível carregar os usuários.");
            }
        };
        fetchData();
    }, []); 

    return (
        <div style={{width: '950px', padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <ApexCharts
                options={chartData.options}
                series={chartData.series}
                type="bar"
                width={900}
                height={300} 
            />
        </div>
    );
}