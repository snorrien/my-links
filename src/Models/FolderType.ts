export type FolderType = {
  id: string,
  title: string,
  linksCount: number
}

export class UpdateFolderModel {
  public id: string = "";
  public title: string = "";
}