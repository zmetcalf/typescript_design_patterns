interface Bird {
  speak(): string;
}

class Duck implements Bird {
  speak(): string {
    return 'quack';
  }
}

class Goose implements Bird {
  speak(): string {
    return 'honk';
  }
}

function BirdFactory(type: string) {
  const BirdMap: Record<string, new () => Bird> = {
    DUCK: Duck,
    GOOSE: Goose,
  }

  if (!BirdMap.hasOwnProperty(type.toUpperCase())) {
    throw new Error('Invalid Bird');
  }

  return new BirdMap[type.toUpperCase()]();
}

(() => {
  console.log(BirdFactory('goose').speak());
  console.log(BirdFactory('dUcK').speak());
  try {
    console.log(BirdFactory('dog').speak());
  } catch (e) {
    console.error(e);
  }
})();