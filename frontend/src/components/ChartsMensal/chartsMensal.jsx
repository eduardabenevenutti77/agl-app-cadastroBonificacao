import './styleChartsMensal.css'
import ApexChart from 'react-apexcharts'

export default function ChartsMensal() {
  const options = {
    chart: {
      type: 'area',
      stacked: true,
      toolbar: {
        show: true
      }
    },
    colors: ['#01638C', '#90C1D6'],
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime'
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy'
      }
    }
  }

  const series = [
    {
      name: 'Series 1',
      data: [
        [new Date('2018-01-01').getTime(), 34],
        [new Date('2018-01-02').getTime(), 43],
        [new Date('2018-01-03').getTime(), 31],
        [new Date('2018-01-04').getTime(), 43],
        [new Date('2018-01-05').getTime(), 33],
        [new Date('2018-01-06').getTime(), 52],
        [new Date('2018-01-07').getTime(), 45],
        [new Date('2018-01-08').getTime(), 50],
        [new Date('2018-01-09').getTime(), 39],
        [new Date('2018-01-10').getTime(), 36]
      ]
    },
    {
      name: 'Series 2',
      data: [
        [new Date('2018-01-01').getTime(), 22],
        [new Date('2018-01-02').getTime(), 19],
        [new Date('2018-01-03').getTime(), 25],
        [new Date('2018-01-04').getTime(), 23],
        [new Date('2018-01-05').getTime(), 24],
        [new Date('2018-01-06').getTime(), 25],
        [new Date('2018-01-07').getTime(), 24],
        [new Date('2018-01-08').getTime(), 23],
        [new Date('2018-01-09').getTime(), 23],
        [new Date('2018-01-10').getTime(), 24]
      ]
    },
    {
      name: 'Series 3',
      data: [
        [new Date('2018-01-01').getTime(), 11],
        [new Date('2018-01-02').getTime(), 13],
        [new Date('2018-01-03').getTime(), 15],
        [new Date('2018-01-04').getTime(), 20],
        [new Date('2018-01-05').getTime(), 23],
        [new Date('2018-01-06').getTime(), 20],
        [new Date('2018-01-07').getTime(), 17],
        [new Date('2018-01-08').getTime(), 14],
        [new Date('2018-01-09').getTime(), 18],
        [new Date('2018-01-10').getTime(), 18]
      ]
    }
  ]

  return (
    <div id="displayChartsMensal">
      <ApexChart
        options={options}
        series={series}
        type="area"
        width={640}
        height={480}
      />
    </div>
  )
}
