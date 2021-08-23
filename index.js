const btnEmpezar = document.getElementById("btnEmpezar");
const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const amarillo = document.getElementById("amarillo");
const azul = document.getElementById("azul");
const ultimoNivel = 10;

class Juego {
    constructor() {
        // this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 500)

    }

    inicializar() {
        btnEmpezar.classList.toggle("hide");
        this.siguienteNivel = this.siguienteNivel.bind(this);
        // this.eliminarEventosClick = this.eliminarEventosClick.bind(this);
        this.ganarJuego = this.ganarJuego.bind(this);
        this.perderJuego = this.perderJuego.bind(this);
        this.elegirColor = this.elegirColor.bind(this);
        this.nivel = 1;
        this.colores = {
            rojo, 
            verde,
            amarillo,
            azul
        }
    }

    // toggleBtnEmpezar() {
    //     if (btnEmpezar.classList.contains('hide')) {
    //       btnEmpezar.classList.remove('hide')
    //     } else {
    //       btnEmpezar.classList.add('hide')
    //     }
    //   }

    generarSecuencia() {
        this.secuencia = new Array(ultimoNivel).fill(0).map(n => Math.floor(Math.random()*4));
    }

    siguienteNivel() {
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosClick();
    }

    transformarNumeroAColor(n) {
        switch(n) {
            case 0:
                return "rojo";
            case 1:
                return "verde";
            case 2:
                return "amarillo";
            case 3:
                return "azul";
        }
    }

    transformarColorANumero(color) {
        switch(color) {
            case "rojo":
                return 0;
            case "verde":
                return 1;
            case "amarillo":
                return 2;
            case "azul":
                return 3;
        }
    }

    iluminarSecuencia() {
        for(let i=0; i < this.nivel; i++) {
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout(()=> this.iluminarColor(color), 750*i);
        }
    }

    iluminarColor(color) {
        this.colores[color].classList.add("light")
        setTimeout(()=> this.apagarColor(color), 200);
    }

    apagarColor(color) {
        this.colores[color].classList.remove("light");
    }

    agregarEventosClick() {
        this.colores.rojo.addEventListener("click", this.elegirColor);
        this.colores.verde.addEventListener("click", this.elegirColor);
        this.colores.amarillo.addEventListener("click", this.elegirColor);
        this.colores.azul.addEventListener("click", this.elegirColor);
    }

    eliminarEventosClick() {
        this.colores.rojo.removeEventListener("click", this.elegirColor);
        this.colores.verde.removeEventListener("click", this.elegirColor);
        this.colores.amarillo.removeEventListener("click", this.elegirColor);
        this.colores.azul.removeEventListener("click", this.elegirColor);
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel ++ 
            if (this.subnivel === this.nivel) {
                this.nivel ++
                this.eliminarEventosClick()
                if (this.nivel === (ultimoNivel +1)) {
                    this.ganarJuego();
                } else { 
                    setTimeout(this.siguienteNivel, 1500) 
                }
            }
        } else {
            setTimeout(this.perderJuego, 100)
        }
    }

    ganarJuego() {
        swal("Felicitaciones", "¡Ganaste el juego!", "success")
            .then(()=> this.inicializar())

    }

    perderJuego() {
        swal("Oops", "¡Perdiste, inténtalo de nuevo", "error")
            .then(()=>{
                this.eliminarEventosClick();
                this.inicializar();
            })  
    }

}

function empezarJuego(){
 const juego = new Juego();
}


