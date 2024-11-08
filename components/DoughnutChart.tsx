"use client"
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'

export const DoughnutChart = ({accounts}: DoughnutChartProps) => {

    const data = {
        datasets: [
            {
                label: "Banks",
                data: [1250, 2500, 3500],
                backgroundColor: ["#FFFFFF", "#000000", "#000000"],
            }
        ],
        labels: ['Banks1 ', "bank 2", 'Bank 3']
    }

    return (
        <Doughnut data={data}
                  options={{
                      cutout: '60%',
                      plugins: {
                          legend: {
                              display: false
                          }
                      }
                  }}/>
    )
}