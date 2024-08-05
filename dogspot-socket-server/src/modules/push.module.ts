import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { socketAuthMiddleware } from '../core/middlewares/socketAuth.middleware';

let ioPush: SocketIOServer | undefined;
const users: { [key: number]: Socket } = {}; // 사용자별 소켓 저장

export const setupPush = (server: HttpServer): void => {
  console.log('소켓 시작');
  
  ioPush = new SocketIOServer(server, {
    path: '/push',
    pingInterval: 25000, // 기본값 25000ms (25초)
    pingTimeout: 60000, // 기본값 60000ms (60초)
    cors: {
      origin: '*', // 클라이언트 출처 설정
      methods: ['GET', 'POST'], // 허용할 메서드 설정
      allowedHeaders: ['Content-Type'], // 허용할 헤더 설정
    }
  });
  
  ioPush.use(socketAuthMiddleware);

  ioPush.on('connection', (socket: Socket) => {
    socket.on('disconnect', () => {
      console.log('user disconnected from push');
    });

    // 사용자 ID를 받아서 저장
    socket.on('register', (userId: number) => {
      users[userId] = socket;
      console.log(`User ${userId} registered for push notifications`);
      console.log(users);
    });

    socket.on('new_post', (post: any) => {
      
      const userId = post.userId; // 게시글의 작성자의 userId를 전달받음
      const userSocket = users[post.userId];
      if (userSocket) {
        userSocket.emit('new_post', post); // 특정 사용자에게 메시지 전송
        console.log(`Sent new post to user ${userId}`);
      } else {
        console.log(`User ${userId} is not connected`);
      }
    });
  });
};

export const getPushIoInstance = (): SocketIOServer => {
  if (!ioPush) {
    throw new Error('Socket.io for push is not initialized');
  }
  return ioPush;
};

// 특정 사용자에게 메시지 보내기
export const sendPushToUser = (userId: number, message: any): void => {
  console.log(userId);
  //부하 테스트를 위해서 1번의 요청으로 소켓 10번 요청
  for (let i = 0; i < 10; i++){
    const userSocket = users[i];
    if (userSocket) {
      userSocket.emit('new_post', message);
    }
  }
  // const userSocket = users[userId];
  // if (userSocket) {
  //   userSocket.emit('new_post', message);
  // }
};