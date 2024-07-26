export interface Task {
    id: string;
    name: string;
    description: string;
    completed: boolean;
  }

export interface apiTask {
  id: string;
  name: string;
  description: string;
  state: string;
}