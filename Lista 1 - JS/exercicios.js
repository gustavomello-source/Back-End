// 1. Escreva uma função que calcule e retorne o fatorial de um número
function factorial(n) {
    if (n === 0) {
        return 1;
    }
    else if (n < 0) {
        return null;
    }
    return n * factorial(n - 1);
}

// let number = 5;
// let factorialResult = factorial(number);
// console.log(factorialResult);

// ----------------------------------------------------------------------------------------------

// 2. Escreva uma função que retorne uma String contendo uma sequência de
// N mensagens do texto informado pelo usuário. O valor de N e a mensagem são
// informados por parâmetro.
function repeatMessage(n, message) {
    let finalMessage = '';
    for (let i = 0; i < n; i++) {
        finalMessage += message;
    }
    return finalMessage;
}

// let n = 5;
// let message = 'teste';
// let messageSequence = repeatMessage(n, message)
// console.log(messageSequence)

// ----------------------------------------------------------------------------------------------

// 3. Escreva uma função que receba 2 valores e uma operação básica: adição, subtração,
// multiplicação e divisão e retorne o resultado da operação.
// Observação: Faça a validação para prevenir a divisão por 0 e também para garantir que
// a operação informada é válida. Retorne nulo para os casos de erro

function calculator(a, b, operation){
    let result;
    switch(operation){
        case 'adição':
            result = a + b;
        return result;

        case 'subtração':
            result = a - b;
        return result;
        
        case 'multiplicação':
            result = a * b;
        return result;
        
        case 'divisão':
            if(b === 0){
                return null;
            }
            else{
                result = a/b;
            }
            return result;

        default:
            return null;
    }
}

// let a = 5;
// let b = 6;
// let operation = 'adição';
// result = calculator(a, b, operation);
// console.log(result)

// ----------------------------------------------------------------------------------------------

// 4. Escreva uma função que retorne um vetor contendo o resultado da tabuada de um
// número recebido por parâmetro. Cada resultado na respectiva posição do índice.

function multiplicationTable(n){
    let multiplicationTable = [];

    for(let i = 1; i <= 10; i++){
        multiplicationTable.push(n * i);
    }

    return multiplicationTable;
}

// let n = 5;
// let result = multiplicationTable(n);
// console.log(result);

// ----------------------------------------------------------------------------------------------

// 5. Escreva uma função que retorne um número fornecido pelo usuário, porém
// invertido. Por exemplo, o usuário fornece o número 875 e a função retorna o número
// 578. O argumento da função e o retorno deve ser um valor inteiro

function reverseNumber(n){
    let reversedNumber = parseInt(n.toString().split('').reverse().join(''));
    return reversedNumber;
}

// let n = 875;
// let result = reverseNumber(n);
// console.log(result);

// ----------------------------------------------------------------------------------------------

// 6. Escreva uma função que permita contar o número de vogais contidas em uma string
// fornecida por parâmetro. Por exemplo, o usuário informa a string “Brocolis”, e a função
// retorna o número 3 (há 3 vogais nessa palavra)

function countVowels(word){
    let count = 0;
    let vowels = ['a', 'e', 'i', 'o', 'u'];

    for(let i = 0; i < word.length; i++){
        if(vowels.includes(word[i])){
            count++;
        }
    }

    return count;
}

// let word = 'Brocolis';
// let result = countVowels(word);
// console.log(result);

// ----------------------------------------------------------------------------------------------

// 7. Escreva uma função que receba uma sequência de parênteses e colchetes e retorne se
// a sequência está bem formada ou não. O retorno deve ser um valor lógico. Exemplo:
// “(([]))” retorna true, “(([)])” retorna falso.

function checkParenthesesAndBrackets(sequence) {
    let stack = [];
    let openParentheses = ['(', '['];
    let closeParentheses = [')', ']'];

    for (let i = 0; i < sequence.length; i++) {
        if (openParentheses.includes(sequence[i])) {
            stack.push(sequence[i]);
        } else if (closeParentheses.includes(sequence[i])) {
            let lastOpenParentheses = stack.pop();
            if (openParentheses.indexOf(lastOpenParentheses) !== closeParentheses.indexOf(sequence[i])) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// let sequence = '(([]))';
// let result = checkParenthesesAndBrackets(sequence);
// console.log(result);

// ----------------------------------------------------------------------------------------------

// 8. Escreva uma função que receba um número e retorne uma lista de objetos (id, nome e
// idade) aleatórios gerados dinamicamente. O código deve ser sequencial; use uma lista
// de nomes pré-definida; e gere idades entre 18 e 90 anos.

function generateRandomPeople(n) {
    let names = ['Antônio', 'Pedro', 'Júlio', 'Ana', 'Carlos', 'Paulo', 'Paula', 'Luiz', 'Fernanda', 'Lucas'];
    let people = [];

    for (let i = 0; i < n; i++) {
        let id = i + 1;
        let name = names[Math.floor(Math.random() * names.length)];
        let age = Math.floor(Math.random() * (90 - 18 + 1)) + 18;

        people.push({ id, name, age });
    }

    return people;
}

// let n = 5;
// let people = generateRandomPeople(n);
// console.log(people[0]);

// ----------------------------------------------------------------------------------------------

// 9. Escreva uma função que receba a lista de objetos gerados anteriormente e calcule a
// média de idades das pessoas presentes na lista.

function calculateAverageAge(people) {
    let sum = 0;

    for (let i = 0; i < people.length; i++) {
        sum += people[i].age;
    }

    return sum / people.length;
}

// let n = 5;
// let people = generateRandomPeople(n);
// let averageAge = calculateAverageAge(people);
// console.log(averageAge);

// ----------------------------------------------------------------------------------------------

// 10. Escreva uma função que receba a lista de objetos gerados anteriormente e ordene os
// dados por um dos atributos informados por parâmetros.

function sortPeople(people, attribute) {
    return people.sort((a, b) => a[attribute] > b[attribute] ? 1 : -1);
}

// let n = 5;
// let people = generateRandomPeople(n);
// let sortedPeople = sortPeople(people, 'age');
// console.log(sortedPeople[0]);
// console.log(sortedPeople[n-1]);