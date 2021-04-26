import { ComponentInstance } from '@stencil/router/dist/types/stencil.core';
import { Socket } from 'socket.io-client';


export const Receive = (socket: Socket) => (on: string): MethodDecorator => {
  return (proto: ComponentInstance, methodName: string | symbol) => {
    const { connectedCallback } = proto;

    proto.connectedCallback = function() {
      const method = this[methodName as string] as () => any;
      socket.on(on, method.bind(this));
      return connectedCallback && connectedCallback.call(this);
    }
  }
}
