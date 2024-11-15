interface House {
  garageSpots?: number;
  windows?: number;
  doors?: number;
}

class HouseBuilder {
  house: House;

  constructor() {
    this.house = {};
  }

  garageSpots(garageSpots: number): HouseBuilder {
    if (garageSpots > 10) {
      throw new Error('We do not build castles');
    }

    this.house.garageSpots = garageSpots;

    return this;
  }

  windows(windows: number): HouseBuilder {
    if (windows < 10) {
      throw new Error('We do not build caves');
    }

    this.house.windows = windows;

    return this;
  }

  doors(doors: number): HouseBuilder {
    if(doors < 1) {
      throw new Error('Let us not be silly')
    }

    this.house.doors = doors;

    return this;
  }
}

(() => {
  const house = new HouseBuilder()
    .doors(2)
    .garageSpots(2)
    .windows(12)
    .house;

  console.log(house)

  try {
    new HouseBuilder().doors(0);
  } catch (e: any) {
    console.error(e.message);
  }

  try {
    new HouseBuilder().windows(0);
  } catch (e: any) {
    console.error(e.message);
  }

  try {
    new HouseBuilder().garageSpots(50);
  } catch (e: any) {
    console.error(e.message);
  }
})();