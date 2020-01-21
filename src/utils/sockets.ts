import io from 'socket.io-client';

export function createSocketConnection(): Promise<SocketIOClient.Socket> {
  const socket = io('/api/conversations');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
}
