// https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators
function loggedMethod(headMessage = "LOG:") {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
      const methodName = String(context.name);

      function replacementMethod(this: any, ...args: any[]) {
          console.log(`${headMessage} Entering method '${methodName}'.`)
          const result = originalMethod.call(this, ...args);
          console.log(`${headMessage} Exiting method '${methodName}'.`)
          return result;
      }

      return replacementMethod;
  }
}

function changeParametersToEvil(param = 'EVIL') {
  return function(originalMethod: any, context: ClassMethodDecoratorContext) {
    return function(this: any, ...args: any[]) {
      return originalMethod.call(this, ...Array(args.length).fill(param))
    }
  }
}

class Demo {
  @loggedMethod()
  logTheNoOp() {}

  @loggedMethod('EVIL LOG:')
  @changeParametersToEvil()
  @loggedMethod()
  sayNoEvil(first: string, middle: string, last: string) {
    console.log(first, middle, last)
  }
}

(() => {
  new Demo().logTheNoOp();
  new Demo().sayNoEvil('GOOD', 'GOOD', 'GOOD'); // EVIL EVIL EVIL
})();
