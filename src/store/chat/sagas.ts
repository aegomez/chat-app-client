import { eventChannel, EventChannel, SagaIterator } from 'redux-saga';
import { cancel, put, take, takeEvery } from 'redux-saga/effects';
import { call, fork } from 'typed-redux-saga';

import {
  socketConnect,
  socketDisconnect,
  // actions to be emitted by client
  getConversation,
  updateConversation,
  createMessage,
  updateMessage,
  // actions to be received from server
  conversationFetched,
  conversationUpdated,
  messageCreated,
  messageUpdated,
  userConnected,
  // EventChannel types
  ChannelActions
} from './actions';
import { createSocketConnection } from '../../utils';

import {
  Conversation,
  ConversationArgs,
  NewMessageRes,
  UpdateMessageArgs,
  NewConnection
} from '@api/chat';

// Create an event channel from a socket
// Subscribe to server events
function createSocketChannel(
  socket: SocketIOClient.Socket
): EventChannel<ChannelActions> {
  // Pass a subscriber function to eventChannel
  // Use `emit` to put actions into the channel
  return eventChannel(emit => {
    // Conversation events
    socket.on('conversationFetched', (conversation: Conversation) => {
      emit(conversationFetched(conversation));
    });
    socket.on('conversationUpdated', (payload: ConversationArgs) => {
      emit(conversationUpdated(payload));
    });

    // Message events
    socket.on('messageCreated', (payload: NewMessageRes) => {
      emit(messageCreated(payload));
      // If message its not own:
      // dispatch a `received` notification
      if (!payload.itsOwn && payload.message.status === 'sent') {
        emit(
          updateMessage({
            conversationId: payload.conversationId,
            messageId: payload.message._id,
            targetId: payload.message.author,
            newStatus: 'received'
          })
        );
      }
    });
    socket.on('messageUpdated', (payload: UpdateMessageArgs) => {
      emit(messageUpdated(payload));
    });

    // User events
    socket.on('userConnected', (payload: NewConnection) => {
      emit(userConnected(payload));
    });

    socket.on('error', () => {
      console.error('Cant communicate with server. Retrying...');
    });

    // Must return an unsubscribe function
    return () => socket.off('disconnect');
  });
}

function* readSocketSaga(socket: SocketIOClient.Socket): SagaIterator<void> {
  const socketChannel = yield* call(createSocketChannel, socket);
  while (true) {
    try {
      const action = yield take(socketChannel);
      yield put(action);
    } catch (err) {
      console.error('socketchannel error: ', err);
    }
  }
}

function* writeSocketSaga(socket: SocketIOClient.Socket): SagaIterator<void> {
  const ClientActions = [
    getConversation,
    updateConversation,
    createMessage,
    updateMessage
  ];
  yield takeEvery(ClientActions, function*(action) {
    try {
      // Call socket.emit with action type
      // as the event and payload as args
      yield* call([socket, socket.emit], action.type, action.payload);
    } catch (err) {
      console.error('socket.emit error: ', err.message);
    }
  });
}

export function* watchChatSagas(): SagaIterator<void> {
  while (true) {
    yield take(socketConnect);
    const socket = yield* call(createSocketConnection);

    const readTask = yield* fork(readSocketSaga, socket);
    const writeTask = yield* fork(writeSocketSaga, socket);

    yield take(socketDisconnect);
    yield cancel([readTask, writeTask]);
  }
}
