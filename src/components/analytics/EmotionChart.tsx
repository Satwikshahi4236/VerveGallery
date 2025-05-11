import React, { useMemo } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  BarElement,
  ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import useAppStore from '../../store';
import type { Emotion } from '../../types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface EmotionChartProps {
  chartType?: 'line' | 'bar';
  title?: string;
  showLegend?: boolean;
}

const EmotionChart: React.FC<EmotionChartProps> = ({ 
  chartType = 'line',
  title = 'Emotion Trends',
  showLegend = true
}) => {
  const { emotionData, currentEmployee } = useAppStore();
  
  // Group data by timestamp
  const chartData = useMemo(() => {
    if (emotionData.length === 0) {
      return {
        labels: [],
        datasets: []
      };
    }
    
    // Sort data by timestamp
    const sortedData = [...emotionData].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    // Create labels from timestamps
    const labels = sortedData.map(data => 
      new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    
    // Get unique emotions
    const emotions = Array.from(new Set(sortedData.flatMap(data => 
      data.intensities.map(i => i.emotion)
    ))) as Emotion[];
    
    // Create datasets for each emotion
    const datasets = emotions.map(emotion => {
      const data = sortedData.map(entry => {
        const intensity = entry.intensities.find(i => i.emotion === emotion);
        return intensity ? intensity.score : 0;
      });
      
      // Set color based on emotion
      const getEmotionColor = (emotion: Emotion) => {
        switch (emotion) {
          case 'happy': return 'rgba(16, 185, 129, 0.8)'; // Green
          case 'sad': return 'rgba(59, 130, 246, 0.8)'; // Blue
          case 'angry': return 'rgba(239, 68, 68, 0.8)'; // Red
          case 'neutral': return 'rgba(107, 114, 128, 0.8)'; // Gray
          case 'stressed': return 'rgba(236, 72, 153, 0.8)'; // Pink
          case 'surprised': return 'rgba(245, 158, 11, 0.8)'; // Yellow
          case 'fearful': return 'rgba(139, 92, 246, 0.8)'; // Purple
          case 'disgusted': return 'rgba(5, 150, 105, 0.8)'; // Teal
          default: return 'rgba(107, 114, 128, 0.8)'; // Gray
        }
      };
      
      return {
        label: emotion.charAt(0).toUpperCase() + emotion.slice(1),
        data,
        borderColor: getEmotionColor(emotion),
        backgroundColor: getEmotionColor(emotion).replace('0.8', '0.2'),
        tension: 0.3,
        fill: chartType === 'line' ? false : true,
      };
    });
    
    return {
      labels,
      datasets
    };
  }, [emotionData, chartType]);
  
  const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          boxWidth: 8,
        },
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 16,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Intensity',
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        radius: 2,
        hoverRadius: 5,
      },
    },
  };
  
  const ChartComponent = chartType === 'line' ? Line : Bar;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="h-60">
        {emotionData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>{currentEmployee ? 'No emotion data available yet.' : 'Select an employee to view emotion trends.'}</p>
          </div>
        ) : (
          <ChartComponent options={options} data={chartData} />
        )}
      </div>
    </div>
  );
};

export default EmotionChart;