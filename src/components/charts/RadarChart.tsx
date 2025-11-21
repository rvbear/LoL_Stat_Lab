// src/components/charts/RadarChart.tsx
import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { Champion } from '../../types/champion';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface RadarChartProps {
  championA?: Champion | null;
  championB?: Champion | null;
}

// NOTE: Chart.js options require color strings (hex, rgba).
// We use RGBA values derived from the Hextech theme as a compromise,
// since Tailwind classes cannot be passed to the library.
const chartOptions: ChartOptions<'radar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      min: 0,
      max: 10,
      beginAtZero: true,

      angleLines: {
        color: 'rgba(200, 170, 110, 0.2)', // hextech-gold-400 with opacity
      },
      grid: {
        color: 'rgba(200, 170, 110, 0.2)',
      },
      pointLabels: {
        font: {
          size: 12,
          family: "'Beaufort for LOL', sans-serif",
          weight: 'bold',
        },
        color: '#F0E6D2', // hextech-gold-100
        padding: 20,
      },
      ticks: {
        // display: false,
        color: '#785A28', // hextech-gold-500
        backdropColor: 'rgba(1, 10, 19, 0.75)', // hextech-black with opacity
        stepSize: 2,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#F0E6D2', // hextech-gold-100
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(1, 10, 19, 0.9)', // hextech-black
      borderColor: '#C8AA6E', // hextech-gold-400
      borderWidth: 1,
      titleColor: '#F0E6D2',
      bodyColor: '#F0E6D2',
    },
  },
};

const RadarChart: React.FC<RadarChartProps> = ({ championA, championB }) => {
  const data = useMemo((): ChartData<'radar'> => {
    const datasets = [];

    if (championA) {
      datasets.push({
        label: championA.name,
        data: [
          championA.info.attack,
          championA.info.defense,
          championA.info.magic,
          championA.info.difficulty,
        ],
        backgroundColor: 'rgba(10, 200, 185, 0.4)', // hextech-teal
        borderColor: 'rgba(10, 200, 185, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(10, 200, 185, 1)',
      });
    }

    if (championB) {
      datasets.push({
        label: championB.name,
        data: [
          championB.info.attack,
          championB.info.defense,
          championB.info.magic,
          championB.info.difficulty,
        ],
        backgroundColor: 'rgba(232, 64, 87, 0.4)', // hextech-red
        borderColor: 'rgba(232, 64, 87, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(232, 64, 87, 1)',
      });
    }

    return {
      labels: ['Attack', 'Defense', 'Magic', 'Difficulty'],
      datasets,
    };
  }, [championA, championB]);

  return (
    <div className="relative h-80 w-full rounded-lg border border-hextech-gold-500 bg-hextech-blue-900/50 p-4">
      <Radar options={chartOptions} data={data} />
    </div>
  );
};

export default RadarChart;
