export type UserPresenterProps = {
  id: string;
  email: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserPresenter {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: UserPresenterProps) {
    this.id = props.id;
    this.email = props.email;
    this.name = props.name;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
