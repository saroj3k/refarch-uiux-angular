export class Issue {
  title: string;
  assignee: string;
  priority: {
    value: number;
    text: string;
  };
  status: string;
  description: string;
  dateCreated: string;
  dateLastUpdated: string;
  closed: boolean;
  dateClosed: string;
  project: string;
  id: number;
}
