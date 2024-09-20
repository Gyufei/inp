// EventEmitter.ts
class EventEmitter {
  private subscribers: { [eventName: string]: ((...args: any[]) => void)[] } = {};

  public emit(eventName: string, ...args: any[]) {
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].forEach((subscriber) => subscriber(...args));
    }
  }

  public on(eventName: string, callback: (arg: string) => void) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
  }

  public off(eventName: string, callback: (arg: string) => void) {
    if (!this.subscribers[eventName]) return;
    this.subscribers[eventName] = this.subscribers[eventName].filter((subscriber) => subscriber !== callback);
  }
}

const eventEmitterOverall = new EventEmitter();

export { EventEmitter, eventEmitterOverall };
