import './styleChartsMensal.css';
import ApexChart from 'react-apexcharts';

export default function ChartsMensalPessoa() {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false, // Gráfico de barras verticais
        columnWidth: '55%', // Largura da coluna
        endingShape: 'rounded', // Formato das extremidades das barras
      },
    },
    dataLabels: {
      enabled: true, // Habilita rótulos nos dados
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro',
      ], // Categorias no eixo X
    },
    yaxis: {
      title: {
        text: 'Quantidade', // Título do eixo Y
      },
    },
    fill: {
      opacity: 1, // Opacidade de preenchimento
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} unidades`, // Formatação do tooltip
      },
    },
    colors: ['#01638C', '#90C1D6'], // Cores das barras
  };

  const series = [
    {
      name: 'Produto A',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 90, 85, 95], // Dados para a série
    },
    {
      name: 'Produto B',
      data: [23, 30, 34, 20, 25, 30, 40, 50, 60, 70, 80, 90], // Dados para a série
    },
    {
      name: 'Produto C',
      data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160], // Dados para a série
    },
  ];

  return (
    <div id="displayChartsMensal">
      <ApexChart
        options={options}
        series={series}
        type="bar"
        width={640}
        height={480}
      />
    </div>
  );
}