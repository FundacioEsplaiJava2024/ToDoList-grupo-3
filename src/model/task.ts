export interface Task {
    id: string;
    name: string;
    completed: boolean;
  }

export interface apiTask {
  id: string;
  name: string;
  state: string;
}