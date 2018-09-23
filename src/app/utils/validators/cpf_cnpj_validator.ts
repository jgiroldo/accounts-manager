import { AbstractControl } from '@angular/forms';
import { ValidationResult } from './validation-result';

export class CpfCnpjValidator {
  static validateCNPJorCPF(control: AbstractControl): any {
    let identificationDocument = control.value;
    if (identificationDocument) {
      identificationDocument = identificationDocument.replace(/[^\d]+/g, '');
      if (identificationDocument.length <= 11) {
        return CpfCnpjValidator.validateCPF(control);
      } else {
        return CpfCnpjValidator.validateCNPJ(control);
      }
    } else {
      return { 'invalidCPF': true };
    }
  }

  static validateCNPJ(control: AbstractControl): ValidationResult {
    let cnpj = control.value;
    if (cnpj) {
      cnpj = cnpj.replace(/[^\d]+/g, '');
      if (cnpj == '') return { 'invalidCNPJ': true };
      if (cnpj.length != 14) return { 'invalidCNPJ': true };

      // Elimina CNPJs invalidos conhecidos
      if (cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999') return { 'invalidCNPJ': true };

      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros: any = cnpj.substring(0, tamanho);
      let digitos: any = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(0)) return { 'invalidCNPJ': true };
      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != digitos.charAt(1)) return { 'invalidCNPJ': true };
      return null;
    } else {
      return { 'invalidCNPJ': true };
    }

  }

  static validateCPF(control: AbstractControl): ValidationResult {
    let strCPF = control.value;
    var Soma;
    var Resto;
    Soma = 0;
    if (!strCPF) return null;
    strCPF = strCPF.replace(/[\D]/g, '');
    if (strCPF == '00000000000' ||
      strCPF == '11111111111' ||
      strCPF == '22222222222' ||
      strCPF == '33333333333' ||
      strCPF == '44444444444' ||
      strCPF == '55555555555' ||
      strCPF == '66666666666' ||
      strCPF == '77777777777' ||
      strCPF == '88888888888' ||
      strCPF == '99999999999') return { 'invalidCPF': true };
    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return { 'invalidCPF': true };
    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return { 'invalidCPF': true };
    return null;
  }
};
