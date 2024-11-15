class DB {
  log(message: string) {
    console.log(message);
  }
}

export const DbSingleton = new DB();