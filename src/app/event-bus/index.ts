import { TCallback } from "./typings";

export class EventBus {
  private readonly listeners: Record<string, Array<Function>> = {};

  on<T>(event: string, callback: TCallback<T>) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off<T>(event: string, callback: TCallback<T>) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit<T>(event: string, ...args: T[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
