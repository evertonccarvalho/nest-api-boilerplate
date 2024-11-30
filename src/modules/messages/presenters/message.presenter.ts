export interface User {
  id: string;
  name: string;
}

export type MessagePresenterProps = {
  id: string;
  text: string;
  read: boolean;
  from: User; // Alterado para aceitar um objeto do tipo User
  to: User; // Alterado para aceitar um objeto do tipo User
  createdAt?: Date;
  updatedAt?: Date;
};

export class MessagePresenter {
  id: string;
  text: string;
  read: boolean;
  from: User;
  to: User;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: MessagePresenterProps) {
    this.id = props.id;
    this.text = props.text;
    this.read = props.read;
    this.from = props.from; // Objeto User é esperado aqui
    this.to = props.to; // Objeto User é esperado aqui
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
