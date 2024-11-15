class Task {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getTime(): number {
    return 0;
  }
}

class LongTask extends Task {
  constructor() {
    super(LongTask.name);
  }

  getTime(): number {
    return 30;
  }
}

class ShortTask extends Task {
  constructor() {
    super(ShortTask.name);
  }

  getTime(): number {
    return 1;
  }
}

class ParentTask extends Task {
  tasks: Task[] = [] 

  constructor() {
    super(ParentTask.name);
  }

  addTask(task: Task) {
    this.tasks.push(task);
    return this;
  }

  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);

    if (index > -1) { 
      this.tasks.splice(index, 1); 
    }
    return this;
  }

  getTime(): number {
    return this.tasks.reduce((pv, cv) => {
      return pv + cv.getTime();
    }, 0)
  }
}

(() => {
  const parent = new ParentTask();
  const addRemoveClass = new ShortTask();
  const firstVal: number = parent
    .addTask(addRemoveClass)
    .addTask(new ShortTask())
    .addTask(new LongTask())
    .getTime();

  console.log(firstVal);

  console.log(parent.removeTask(addRemoveClass).getTime());
})();