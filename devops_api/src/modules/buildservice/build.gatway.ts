import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class BuildGatway {
  @WebSocketServer()
  server: Server;

  // socket连接钩子
  async handleConnection(client: Socket): Promise<string> {
    console.log('client', client);
    return '连接成功';
  }
}
