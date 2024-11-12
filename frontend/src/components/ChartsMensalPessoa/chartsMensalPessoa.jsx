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
        horizontal: false, 
        columnWidth: '55%', 
        endingShape: 'rounded', 
      },
    },
    dataLabels: {
      enabled: true, 
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
      ], 
    },
    yaxis: {
      title: {
        text: 'Quantidade', 
      },
    },
    fill: {
      opacity: 1, 
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} unidades`, 
      },
    },
    colors: ['#01638C', '#90C1D6'], 
  };

  const series = [
    {
      name: 'Produto A',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 90, 85, 95], 
    },
    {
      name: 'Produto B',
      data: [23, 30, 34, 20, 25, 30, 40, 50, 60, 70, 80, 90], 
    },
    {
      name: 'Produto C',
      data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160], 
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