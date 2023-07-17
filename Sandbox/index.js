// SPREAD OPERATOR

// pour les tableaux
const arr1 = [2, 4, 7]
const arr2 = [3, 5, 8]

const newArr = [...arr1, ...arr2]

console.log(newArr)

// pour les objets
const amir = {
    name: 'Amir',
    age: 36
}

const amirWithEmail = {
    ...amir,
    email: 'amir@example.com'
}

console.log(amirWithEmail)

// Exercice

const arr3 = ["Bonjour", "tout", "le monde"]
const arr4 = ["Salut", "à tous"]
const arr5 = ["je m'appelle", "mon nom est"]
const arr6 = ["Laurian", "Mathiot"]
const arr7 = ["Antoine", "Dupont"]

const result = [...arr3, arr5[0], ...arr7]
console.log(result.join(' '))

const result1 = [...arr4, arr5[1], ...arr6]
console.log(result1.join(' '))

// CONFUSION AVEC LE REST PARAMETER

function sum(...params) {

let total = 0
    params.forEach(el => {total += el})
    return total
}

console.log(sum(3, 5, 8))