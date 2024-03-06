export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  user_id?: string;
  onClick?: () => void;
}
