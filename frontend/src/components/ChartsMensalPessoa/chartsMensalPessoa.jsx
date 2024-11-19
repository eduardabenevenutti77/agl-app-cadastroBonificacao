import { useEffect, useState } from 'react';
import './styleChartsMensal.css';
import ApexChart from 'react-apexcharts';
import { findMonthTime } from '../../api/regra';

export default function ChartsMensalPessoa() {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        backgroundColor: '#f6f6f6',
        fontFamily: 'Jost',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: false,
        }
      },
      dataLabels: {
        enabled: false,
        // formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`,
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
        // y: {
        //   formatter: (val) => `R$ ${val.toLocaleString('pt-BR')}`,
        // }
      },
      title: {
        text: 'ANÁLISE DE VENDAS ANUAIS POR TIME',
        align: 'center',
        style: {
          fontSize: '14px',
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
        const data = await findMonthTime();

        if (data && data.findMonth && Array.isArray(data.findMonth)) {
          const seriesData = data.findMonth.map(item => item.totalGrupos || 0);
          const categories = data.findMonth.map(item => item.nome || "Desconhecido");

          setChartData({
            series: [{ name: "Total Grupos", data: seriesData }],
            options: {
              ...chartData.options,
              xaxis: {
                ...chartData.options.xaxis,
                categories,
              }
            }
          });
        } else {
          console.error("Formato inesperado de dados:", data);
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
    <div style={{ width: '950px', padding: '20px', backgroundColor: '#f6f6f6', borderRadius: '10px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '25px'}}>
      <ApexChart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        width={820}
        height={300}
        style={{ marginLeft: '35px'}}
      />
    </div>
  );
}