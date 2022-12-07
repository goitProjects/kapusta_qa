import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useMediaQuery } from 'react-responsive';
import s from './Diagram.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const Diagram = ({ keysDiagram, valuesDiagram, category }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const isTabletMin = useMediaQuery({ query: '(min-width: 768px)' });
  const isTabletMax = useMediaQuery({ query: '(max-width: 1280px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });

  const dataVertical = {
    labels: keysDiagram,
    datasets: [
      {
        label: category,
        data: valuesDiagram,
        backgroundColor: '#FF751D',
        barThickness: 38,
        borderRadius: 10,
      },
    ],
  };
  const dataHorizontal = {
    labels: keysDiagram,
    datasets: [
      {
        label: category,
        data: valuesDiagram,
        backgroundColor: '#FF751D',
        barThickness: 15,
        borderRadius: 10,
      },
    ],
  };
  const optionsVertical = {
    indexAxis: 'x',
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          color: 'transparent',
          borderColor: '#F5F6FB',
          tickColor: 'transparent',
        },
        ticks: {
          padding: 5,
          color: '#52555f',
          font: {
            weight: 400,
            size: 12,
            letterSpacing: '0.02em',
            lineHeight: 1.17,
          },
        },
      },
      y: {
        grid: {
          color: '#F5F6FB',
          borderColor: '#F5F6FB',
        },
        ticks: {
          padding: 5,
          color: '#52555f',
          font: {
            weight: 400,
            size: 10,
            letterSpacing: '0.02em',
            lineHeight: 1.17,
          },
          count: 9,
        },
      },
    },
  };

  const optionsHorizontal = {
    maintainAspectRatio: false,
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: {
        grid: {
          color: 'transparent',
          borderColor: 'transparent',
          tickColor: 'transparent',
        },
        ticks: {
          padding: 5,
          color: '#52555f',
          font: {
            weight: 400,
            size: 8,
            letterSpacing: '0.02em',
            lineHeight: 1.2,
          },
        },
      },
      y: {
        grid: {
          color: 'transparent',
          borderColor: 'transparent',
          tickColor: 'transparent',
        },
        ticks: {
          color: '#52555f',
          padding: 5,
          font: {
            weight: 400,
            size: 10,
            letterSpacing: '0.02em',
            lineHeight: 1.2,
          },
          count: 9,
        },
      },
    },
  };

  return (
    <div className={s.diagram}>
      {!isMobile && (
        <Bar
          options={optionsVertical}
          data={dataVertical}
          width={isTabletMin && isTabletMax ? 604 : isDesktop ? 758 : 'none'}
          height={385}
        />
      )}
      {isMobile && (
        <Bar options={optionsHorizontal} data={dataHorizontal} width={280} />
      )}
    </div>
  );
};

export default Diagram;
