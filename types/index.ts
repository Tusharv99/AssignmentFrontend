export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

export interface UserStats {
  name: string;
  streak: number;
  totalLearningTime: number;
  coursesCompleted: number;
}