import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'cpf', async: false })
export class cpfValidator implements ValidatorConstraintInterface {
  validate(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    const digito1 = (soma * 10) % 11;
    if (digito1 !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    const digito2 = (soma * 10) % 11;
    if (digito2 !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  defaultMessage() {
    return 'Cpf inválido!';
  }
}
