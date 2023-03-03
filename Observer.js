class Observer {
  #events;

  constructor() {
    this.#events = [];
  }

  subscribe(event, cb) {
    if (typeof event === 'string' || event instanceof String) {
      if (!this.#events[event]) {
        this.#events[event] = [cb];
      } else {
        this.#events[event].push(cb);
      }
      return true;
    }
    return false;
  }

  unSubscribe(event, cb) {
    if (typeof event === 'string' || event instanceof String) {
      if (!this.#events[event]) {
        return false;
      }
      this.#events[event].filter((subscription) => !(cb === subscription));
      return true;
    }
    return false;
  }

  notify(event, ...args) {
    if (typeof event === 'string' || event instanceof String) {
      if (this.#events[event]) {
        this.#events[event].forEach((element) => {
          element(...args);
        });
      }
    }
  }
}

export default new Observer();
