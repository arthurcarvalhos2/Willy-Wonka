export type UserLoginType = {
    email: string;
    senha: string;
}

export type UserSignUpType = {
    nome: string;
    email: string;
    senha: string;
    foto?: string;
    confirmarSenha: string;
}

export interface IUser {
    id: string;
    nome: string;
    email: string;
    senha: string;
    foto?: string;

}