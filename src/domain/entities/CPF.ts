export class CPF {
    cpf: string

    constructor(cpf: string) {
        if (!this.validate(cpf)) throw new Error('Invalid CPF')
        this.cpf = cpf
    }

    validate(cpf: string) {
        let ammount: number
        let left: number
        ammount = 0
        if (cpf == '00000000000') return false;

        for (let i = 1; i <= 9; i++) ammount = ammount + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        left = (ammount * 10) % 11;

        if ((left == 10) || (left == 11)) left = 0
        if (left != parseInt(cpf.substring(9, 10))) return false;

        ammount = 0
        for (let i = 1; i <= 10; i++) ammount = ammount + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        left = (ammount * 10) % 11;

        if ((left == 10) || (left == 11)) left = 0
        if (left != parseInt(cpf.substring(10, 11))) return false;
        return true;
    }
}