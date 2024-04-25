export type GroupRegistrationType = {
    nome: string;
    quantidade: string;
    foto?: string;
    idUsuario: string;
}

export interface IGrupo {
    id: number;
    nome: string;
    quantidade: string;
    foto?: string;
    idUsuario: string; 
}