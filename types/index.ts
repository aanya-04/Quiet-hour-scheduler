// types/index.ts
export interface CreateSessionData {
  user_id: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  duration_minutes: number;
}
