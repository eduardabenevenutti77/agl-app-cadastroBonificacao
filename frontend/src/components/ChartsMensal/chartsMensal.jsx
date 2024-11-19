import './styleChartsMensal.css';
import React, { useEffect, useState } from 'react';
import ApexChart from 'react-apexcharts';
import { findMonthFunc } from '../../api/regra';

export default function ChartsMensal() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Etapas do Funil',
        data: []
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        toolbar: { show: false },
        background: 'transparent',
      },
      title: {
        text: 'ANÁLISE DE VENDAS ANUAIS POR FUNCIONÁRIOS',
        align: 'center',
        style: {
          fontSize: '14px',
          fontWeight: '500',
          color: '#8A8686', 
        }
      },
      colors: ['#5A9DB9'],
      // colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '14px',
          colors: ['#fff']
        }
      },
      grid: {
        show: true,
        borderColor: '#ddd',
        strokeDashArray: 5, 
      },
      stroke: {
        curve: 'smooth',
        width: 3, 
      },
      tooltip: {
        enabled: true,
        style: {
          fontSize: '12px',
          backgroundColor: '#333', 
          color: '#fff', 
        }
      }
    }
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findMonthFunc();
        console.log('Dados recebidos:', data);
    
        if (Array.isArray(data.findMonthFunc)) {
          const funnelData = data.findMonthFunc.map(item => {
            const yValue = item.totalGrupos && !isNaN(item.totalGrupos) ? item.totalGrupos : 0; 
            return {
              x: item.nome || 'Desconhecido',
              y: yValue
            };
          });
    
          setChartData(prev => ({
            ...prev,
            series: [
              {
                name: 'Etapas do Funil',
                data: funnelData
              }
            ]
          }));
          setIsDataLoaded(true); 
        } else {
          console.error('Dados no formato inesperado:', data);
          alert('Não foi possível carregar os dados do gráfico.');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do funil:', error.message);
        alert('Erro ao carregar dados.');
      }
    };    

    fetchData();
  }, []); 

  if (!isDataLoaded) {
    return <div>Carregando gráfico...</div>; 
  }

  return (
    <div
    style={{width: '950px', padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '25px' }}
    >
      <ApexChart
        options={chartData.options}
        series={chartData.series}
        type="area"
        width={920} 
        height={350}
      />
    </div>
  );
}