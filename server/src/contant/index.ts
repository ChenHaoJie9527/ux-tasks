export enum socketFCName {
  AddTodo = "addTodo",
  Connection = "cnnection",
  ViewComments = "viewComments",
  UpdateComment = "updateComment",
  DeleteTodo = "deleteTodo",
  Disconnect = "disconnect",
}

export interface updateCommentCBProps {
  user: any;
  todoID: any;
  comment: any;
}
