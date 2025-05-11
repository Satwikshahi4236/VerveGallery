import { create } from 'zustand';
import type { 
  Employee, 
  EmotionData, 
  TeamMood, 
  StressAlert, 
  TaskRecommendation,
  HistoricalMood
} from '../types';

interface AppState {
  // Employees
  employees: Employee[];
  currentEmployee: Employee | null;
  setCurrentEmployee: (employee: Employee | null) => void;
  
  // Emotion data
  emotionData: EmotionData[];
  addEmotionData: (data: EmotionData) => void;
  
  // Team moods
  teamMoods: TeamMood[];
  updateTeamMood: (teamMood: TeamMood) => void;
  
  // Stress alerts
  stressAlerts: StressAlert[];
  addStressAlert: (alert: StressAlert) => void;
  acknowledgeAlert: (alertId: string) => void;
  
  // Task recommendations
  taskRecommendations: TaskRecommendation[];
  
  // Historical mood data
  historicalMoods: HistoricalMood[];
  
  // UI state
  isCameraActive: boolean;
  toggleCamera: () => void;
  isAudioActive: boolean;
  toggleAudio: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Sample data
const sampleEmployees: Employee[] = [
  { id: '1', name: 'Alex Johnson', department: 'Engineering', position: 'Senior Developer' },
  { id: '2', name: 'Sam Rodriguez', department: 'Design', position: 'UX Designer' },
  { id: '3', name: 'Taylor Chen', department: 'Marketing', position: 'Marketing Specialist' },
  { id: '4', name: 'Jordan Smith', department: 'Engineering', position: 'Software Engineer' },
  { id: '5', name: 'Casey Wilson', department: 'Product', position: 'Product Manager' },
];

const sampleTaskRecommendations: TaskRecommendation[] = [
  { 
    id: '1', 
    title: 'Take a short break', 
    description: 'Step away from your desk for 5-10 minutes to refresh your mind.', 
    forEmotion: 'stressed', 
    priority: 'high' 
  },
  { 
    id: '2', 
    title: 'Creative brainstorming', 
    description: 'Channel positive energy into a brainstorming session for new ideas.', 
    forEmotion: 'happy', 
    priority: 'medium' 
  },
  { 
    id: '3', 
    title: 'Documentation tasks', 
    description: 'Focus on straightforward documentation tasks that require attention to detail.', 
    forEmotion: 'neutral', 
    priority: 'medium' 
  },
  { 
    id: '4', 
    title: 'Physical activity', 
    description: 'Take a walk or do some light stretching to release tension.', 
    forEmotion: 'angry', 
    priority: 'high' 
  },
  { 
    id: '5', 
    title: 'Team check-in', 
    description: 'Schedule a short chat with team members for social connection.', 
    forEmotion: 'sad', 
    priority: 'high' 
  },
];

// Create the store
const useAppStore = create<AppState>((set) => ({
  // Employees
  employees: sampleEmployees,
  currentEmployee: null,
  setCurrentEmployee: (employee) => set({ currentEmployee: employee }),
  
  // Emotion data
  emotionData: [],
  addEmotionData: (data) => set((state) => ({ 
    emotionData: [...state.emotionData, data],
    // Check for stress and potentially create an alert
    stressAlerts: data.primaryEmotion === 'stressed' && Math.random() > 0.7
      ? [...state.stressAlerts, {
          id: `alert-${Date.now()}`,
          employeeId: state.currentEmployee?.id || '',
          employeeName: state.currentEmployee?.name || 'Unknown',
          level: Math.random() > 0.5 ? 'high' : 'moderate',
          duration: '30 minutes',
          timestamp: new Date(),
          isAcknowledged: false,
        }]
      : state.stressAlerts
  })),
  
  // Team moods
  teamMoods: [],
  updateTeamMood: (teamMood) => set((state) => ({
    teamMoods: [
      ...state.teamMoods.filter(tm => tm.teamId !== teamMood.teamId),
      teamMood
    ]
  })),
  
  // Stress alerts
  stressAlerts: [],
  addStressAlert: (alert) => set((state) => ({ 
    stressAlerts: [...state.stressAlerts, alert] 
  })),
  acknowledgeAlert: (alertId) => set((state) => ({
    stressAlerts: state.stressAlerts.map(alert => 
      alert.id === alertId ? { ...alert, isAcknowledged: true } : alert
    )
  })),
  
  // Task recommendations
  taskRecommendations: sampleTaskRecommendations,
  
  // Historical mood data
  historicalMoods: [],
  
  // UI state
  isCameraActive: false,
  toggleCamera: () => set((state) => ({ isCameraActive: !state.isCameraActive })),
  isAudioActive: false,
  toggleAudio: () => set((state) => ({ isAudioActive: !state.isAudioActive })),
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

export default useAppStore;