module.exports = class Search {
    constructor(graph, origin) {
        this.graph = graph
        this.origin = origin
    }
    iniciar() {
        //Aqui foi implementado um algoritmo de Dijkstra

        this.paths = new Array(this.graph.length)
        this.paths[this.origin] = {
            aberto: true,
            custoAcumulado: 0,
            predecessor: 0
        }
        for (let i = 1; i < this.paths.length; i++) {
            this.paths[i] = {
                aberto: true,
                custoAcumulado: Number.MAX_SAFE_INTEGER,
                predecessor: ""
            }
        }
        console.log("Iniciando busca...")

        this.verificaAdjacencia(this.origin)
        console.log("")
        console.log("Busca Finalizada!")
        this.mostraResposta()
    }
    verificaNosAberto() {
        for (const path of this.paths) {
            if (path.aberto) {
                return true
            }
        }
        return false
    }

    verificaAdjacencia(no) {
        this.paths[no].aberto = false

        while (this.verificaNosAberto()) {
            for (let i = 0; i < this.graph[no].length; i++) {
                if (this.graph[no][i] !== "-") {
                    if (this.paths[i].aberto && this.paths[i].custoAcumulado > this.paths[no].custoAcumulado + this.graph[no][i]) {
                        if (this.paths[no].predecessor !== "") {
                            this.paths[i].custoAcumulado = this.graph[no][i] + this.paths[no].custoAcumulado
                            this.paths[i].predecessor = no
                        }
                    }
                }
            }
            this.verificaAdjacencia(this.procuraMenorCaminho())
        }
    }
    procuraMenorCaminho() {
        let menorCaminho = Number.MAX_SAFE_INTEGER
        let noEscolhido = undefined
        this.paths.forEach((path, index) => {
            if (menorCaminho > path.custoAcumulado && path.aberto) {
                menorCaminho = path.custoAcumulado
                noEscolhido = index
            }
        })
        return noEscolhido
    }
    mostraResposta() {
        console.log("")
        console.log("Imprimindo Resultados...")
        console.log("")

        for (let i = this.paths.length - 1; i >= 0; i--) {
            console.log(`Vertex: ${i}, Cost: ${this.paths[i].custoAcumulado}, Path: ${this.tracaCaminhoRecursivo(i, `${i}`)}`)
        }
    }
    tracaCaminhoRecursivo(destino, caminho) {
        if (this.paths[destino].predecessor === this.origin) {
            return `${caminho} -> ${this.paths[destino].predecessor}`
        }
        else {
            caminho = `${caminho} -> ${this.paths[destino].predecessor}`
            return this.tracaCaminhoRecursivo(this.paths[destino].predecessor, caminho)
        }
    }
}