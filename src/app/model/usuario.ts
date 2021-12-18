import { Endereco } from './endereco';
import { Profissao } from './profissao';

export class Usuario {

	id!: number;
	fullName!: string;
	userName!: string;
	passWord!: string;
	enderecos!: Array<Endereco>;
	dataNascimento!: string;
	profissao: Profissao = new Profissao();
	salario!: DoubleRange;
}
