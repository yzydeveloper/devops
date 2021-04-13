import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class BuildGatway {
  @WebSocketServer()
  server: Server;

  // socket连接钩子

  afterInit(server: any): any {
    console.log('init');
  }

  handleConnection(client: Socket): any {
    console.log(`connected---${client}`);
  }

  handleDisconnect(client: Socket): any {
    console.log(`disconnect---${client}`);
  }
}
