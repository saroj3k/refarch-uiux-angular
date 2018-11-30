export class Issue {
  constructor(
    public title?: string,
    public assignee?: string,
    public priority?: string,
    public status?: string,
    public description?: string,
    public dateCreated?: string,
    public dateLastUpdated?: string,
    public project?: string,
    public id?: string
  ) {}
}
