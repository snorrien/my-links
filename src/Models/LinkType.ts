import { Timestamp } from "firebase/firestore";

export class UpdateLinkModel {
  public id: string = "";
  public title: string = "";
  public description: string = "";
  public folderId: string = "";
}

export type LinkType = {
  id: string,
  title: string,
  description: string,
  createDate: number,
  folderId: string
}