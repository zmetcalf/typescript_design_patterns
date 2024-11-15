abstract class Command {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract execute(): void;
  abstract reverse(): void;
}

class CompositeCommand extends Command {
  commands: Command[] = [];

  constructor() {
    super(CompositeCommand.name);
  }

  addCommand(command: Command): CompositeCommand {
    this.commands.push(command);
    return this;
  }

  execute(): void {
    this.commands.forEach(c => c.execute());
  }

  reverse(): void {
    this.commands.reverse().forEach(c => c.reverse());
  }
}

class CopyCommand extends Command {
  constructor() {
    super(CopyCommand.name);
  }

  execute(): void {
    console.log(this.name)
  }

  reverse(): void {
    console.log(this.name.split('').reverse().join(''));
  }
}

class PasteCommand extends Command {
  constructor() {
    super(PasteCommand.name);
  }

  execute(): void {
    console.log(this.name)
  }

  reverse(): void {
    console.log(this.name.split('').reverse().join(''));
  }
}

(() => {
  const cc = new CompositeCommand()
    .addCommand(new CopyCommand())
    .addCommand(new PasteCommand());

  cc.execute();
  cc.reverse();
})();