export class EventModel {
  constructor(
    public id: number,
    public title: string,
    public desc: string,
    public begin: string,
    public owner: number,
    public end: string,
    public spontaneous: boolean,
    public location: number[],
    public radius: number
  ) {  }
}