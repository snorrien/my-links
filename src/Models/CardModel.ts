export class CardModel {
  public id: string = "";
  public title: string = "";
  public description: string = "";
  public createDate: Date = new Date();
}

export class UpdateCardModel {
  public id: string = "";
  public title: string = "";
  public description: string = "";
}