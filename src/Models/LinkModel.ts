export class LinkModel {
  public id: string = "";
  public title: string = "";
  public description: string = "";
  public createDate: Date = new Date();
  public folderId: string = "";
}

export class UpdateLinkModel {
  public id: string = "";
  public title: string = "";
  public description: string = "";
  public folderId: string = "";
}