interface Tasker {
  execute(): string;
}

class Job {
  start(task: Tasker) {
    console.log(task.execute());
  }
}

class OurTask implements Tasker {
  execute(): string {
    return `${OurTask.name} ran`;
  }
}

class NoOneKnowsWhatThisDoes {
  run(): string[] {
    return `${NoOneKnowsWhatThisDoes.name} ran`.split('');
  }
}

class Adapter implements Tasker {
  cls: NoOneKnowsWhatThisDoes;

  constructor(cls: NoOneKnowsWhatThisDoes) {
    this.cls = cls;
  }

  execute(): string {
    return this.cls.run().join('');
  }
}

(() => {
  const job = new Job();
  job.start(new OurTask());
  job.start(new Adapter(new NoOneKnowsWhatThisDoes()));
})();