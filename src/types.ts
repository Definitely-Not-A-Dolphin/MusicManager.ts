export class Command {
  name: string;
  description: string;
  execute: () => void;

  constructor(data: Command) {
    this.name = data.name;
    this.description = data.description;
    this.execute = data.execute;
  }
}
