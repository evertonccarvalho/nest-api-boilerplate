export type MessagePresenterProps = {
  id: string;
  text: string;
  read: boolean;
  from: string;
  to: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class MessagePresenter {
  id: string;
  text: string;
  read: boolean;
  from: string;
  to: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: MessagePresenterProps) {
    console.log(props);
    this.id = props.id;
    this.text = props.text;
    this.read = props.read;
    this.from = props.from;
    this.to = props.to;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
