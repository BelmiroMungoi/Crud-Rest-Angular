import { Endereco } from './endereco';

export class Usuario {

	id!: number;
	fullName!: string;
	userName!: string;
	passWord!: string;
	enderecos!: Array<Endereco>;
}
