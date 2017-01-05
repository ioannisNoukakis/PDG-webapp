export class POIModel {
  constructor(
    public id: number,
    public event: number,
    public title: string,
    public desc: string,
    public location:number[]
  ) {  }
}