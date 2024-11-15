class IterableCls {
  arr: number[];

  constructor(arr: number[]) {
    this.arr = arr;
  }

  *[Symbol.iterator]() {
    for (const item of this.arr.reverse()) {
      yield item;
    }
  }
}

const merged = (arr1: IterableCls, arr2: IterableCls): number[] => {
  return [...arr1, ...arr2];
}

(() => {
  for (const itr of new IterableCls([1, 2, 3, 4])) {
    console.log(itr);
  }

  console.log(merged(new IterableCls([5, 4, 3]), new IterableCls([2, 1])))
})();