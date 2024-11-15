interface DuckType {
  output(): string;
}

class Generator {
  strategy: DuckType;

  constructor(strategy: DuckType) {
    this.strategy = strategy
  };

  execute(): void {
    console.log(this.strategy.output());
  }
}

class Strategy1 implements DuckType {
  output(): string {
    return 'Strategy1';
  }
}

class Strategy2 implements DuckType {
  output(): string {
    return 'Strategy2';
  }
}

(() => {
  new Generator(new Strategy1()).execute();
  new Generator(new Strategy2()).execute();
})();