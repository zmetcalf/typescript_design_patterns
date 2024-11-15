// Use RxJs for more robust solution

interface Observer {
  update(): void;
}

class Observable {
  observers: Observer[] = []

  add(observer: Observer) {
    this.observers.push(observer);
  }

  remove(observer: Observer) {
    this.observers

    const index = this.observers.indexOf(observer);

    if (index > -1) { 
      this.observers.splice(index, 1); 
    }
  }

  notify(): void {
    this.observers.forEach(o => o.update());
  }
}

class Broadcast {
  observable: Observable = new Observable();

  constructor(observables: Observer[]) {
    observables.forEach(o => this.observable.add(o));
  }

  execute() {
    this.observable.notify();
  }
}

class Observable1 implements Observer {
  update(): void {
    console.log('Updated', Observable1.name);
  }
}

class Observable2 implements Observer {
  update(): void {
    console.log('Updated', Observable2.name);
  }
}

(() => {
  new Broadcast([new Observable1(), new Observable2()]).execute();
})();