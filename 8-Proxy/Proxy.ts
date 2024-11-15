abstract class Service {
  val?: number;
  abstract add(x: number): number;
  abstract subtract(x: number): number;
}

class OurService extends Service {
  val: number;

  constructor(val: number) {
    super();
    this.val = val;
  }

  add(x: number): number {
    this.val += x;
    return this.val;
  }

  subtract(x: number): number {
    return this.val -= x;
  }
}

class ProxyService extends Service {
  svc: Service;
  accessible: boolean;

  constructor(svc: Service, accessible: boolean) {
    super();
    this.svc = svc;
    this.accessible = accessible;
  }

  add(x: number): number {
    this.permissionCheck();

    return this.svc.add(x);
  }

  subtract(x: number): number {
    this.permissionCheck();

    return this.svc.subtract(x); 
  }

  permissionCheck(): void {
    if (!this.accessible) {
      throw new Error('Not accessible');
    }
  }
}

class VirtualProxy {
  creationValue: number;
  srv?: Service;

  constructor(creationValue: number) {
    this.creationValue = creationValue;
  }

  getService(): Service {
    if (!this.srv) {
      // Example would be creation of class would be expensive.
      this.srv = new OurService(this.creationValue);
    }

    return this.srv;
  }

  add(x: number): number {
    return this.getService().add(x);
  }

  subtract(x: number): number {
    return this.getService().subtract(x); 
  }
}

(() => {
  const baseService = new OurService(1);
  const proxy = new ProxyService(baseService, true);
  proxy.add(10);
  proxy.subtract(20);
  console.log(proxy.svc.val);

  proxy.accessible = false;
  try {
    proxy.add(10);
  } catch (e) {
    console.error(e)
  }

  const vp = new VirtualProxy(10);
  console.log('Should be undefined', vp.srv);
  vp.add(1);
  console.log(vp.srv?.val);
})();