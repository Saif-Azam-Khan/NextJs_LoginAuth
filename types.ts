export interface ISignInUser  extends ILogInUser{
  email: string;
}

export interface ILogInUser{
  username: string;
  password: string;
}
export interface ILinks {
  linkTo: string;
  text: string;
}
export interface IFormButton{
  clickHandler:  (event: React.MouseEvent<HTMLButtonElement>) => void ;
  disabled:Boolean ;
  text_1: string;
  text_2:string
}
