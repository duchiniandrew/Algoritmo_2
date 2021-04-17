const matrizAdj = require("./adjMatriz/index.json")
const Search = require("./search")

console.log("\tMatriz de Adjacência: ")
console.log("")

for (const line of matrizAdj) {
    let printLine = "\t|"
    for (const collumn of line) {
        printLine += `${collumn} `
    }
    console.log(printLine + "|")
    console.log()
}
console.log("")

const search = new Search(matrizAdj, 0)
search.iniciar()

//O Conhecimento para desenvolver este algoritmo foi obtido deste video: https://www.youtube.com/watch?v=ovkITlgyJ2s