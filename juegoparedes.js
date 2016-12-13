function pause(){
	alert("pausado");
}
class SvgForm { //forma cuadrada que envuelve todo
	constructor(nombre = "svg1"){
		this.parent = document.getElementById("divsvg");
		this.svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
		this.width = 600;
		this.height = 400;
		this.id = nombre;
		this.backgroundColor = "white";
		this.create();
	}
	create(){
		this.svg.setAttribute("width",this.width);
		this.svg.setAttribute("height",this.height);
		this.svg.setAttribute("id",this.id);
		this.svg.setAttribute("style", "background-color: "+this.backgroundColor);
		this.parent.appendChild(this.svg);
	}
}

class Circle{
	constructor(nombre = "circulo1", color,cx, cy, r, velx, vely){
		this.parent = document.getElementById("svg1");
		this.circulo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		this.cx = cx;
		this.cy = cy;
		this.r = r;
		this.color = color;
		this.id = nombre;
		this.velx = Math.random()*3-1;
		this.vely=Math.random()*3-1;
		this.create();
		this.int = setInterval(() => this.move(),1);
		this.choque ="";

	}
	create(){
		this.circulo.setAttribute("cx", this.cx);
		this.circulo.setAttribute("cy", this.cy);
		this.circulo.setAttribute("r", this.r);
		this.circulo.setAttribute("stroke", this.color);
		this.circulo.setAttribute("stroke-width", 1);
		this.circulo.setAttribute("fill", this.color);
		this.circulo.setAttribute("id", this.id);
		this.parent.appendChild(this.circulo);
	}
	move(){
		var c = this.circulo;
		this.colision();
		c.setAttribute("cx", c.cx.baseVal.value+this.velx);
		c.setAttribute("cy", c.cy.baseVal.value+this.vely);
		
	}
	colision(){ //por un lado la x y por otro la y. QUE NO SEAN ELSE IF ENCADENADOS
		if (this.circulo.cx.baseVal.value >= (this.parent.width.baseVal.value -10 - this.r -1)){
			this.velx = -this.velx;
			this.choque= "R";
		}
		if(this.circulo.cx.baseVal.value <= (10 + this.r + 1)){1
			this.velx = -this.velx;
			this.choque="L";
		}
		if (this.circulo.cy.baseVal.value >= (this.parent.height.baseVal.value -10 - this.r -1)) {
			this.vely = -this.vely;
			this.choque="D";
		} 
		if (this.circulo.cy.baseVal.value <= (10 + this.r +1)){
			this.vely = -this.vely;
			this.choque="U";
		}

	}

}
class ladrillo{
	constructor(){
		var x = Math.random()*(530-11)+11;
		var y = Math.random()*(360-11)+11;
		this.padre = document.getElementById("svg1");
		this.rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.rect.setAttribute("x", x);
		this.rect.setAttribute("y", y);
		this.rect.setAttribute("width", 60);
		this.rect.setAttribute("height", 30);
		this.rect.setAttribute("fill", "gold");
		this.padre.appendChild(this.rect);
	}
}
class poligonoPared{
	constructor	(puntos,color){
		this.padre = document.getElementById("svg1");
		this.p = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
		this.p.setAttribute("points", puntos);
		this.p.setAttribute("stroke", color);
		this.p.setAttribute("stroke-width", 1);
		this.p.setAttribute("fill", color);
		this.padre.appendChild(this.p);
		this.color = color;

	} //clase pared
}
class Juego{
	constructor(){ 
		this.svg = new SvgForm();
		this.circle = new Circle("circulo1","red",300,200,18,2,1);
		this.paredArriba = new poligonoPared("0,0,600,0,590,10,10,10","#FFA07A");
		this.paredAbajo = new poligonoPared("0,400,600,400,590,390,10,390","#FFA07A");
		this.paredDcha = new poligonoPared("600,0,600,400,590,390,590,10","#FFA07A");
		this.paredIzda = new poligonoPared("0,0,0,400,10,390,10,10","#FFA07A");
		this.conjuntoLadrillos = [];
		this.puntuacion=0;
		//this.c2 = new Circle("circulo2", "blue",100, 100, 30, 1,4);
		//this.colision();
		document.onkeydown = (e)=> this.pressedKey(e,this);
		this.time();
		
	}
	addLadrillo(){
		var b = new ladrillo();
		this.conjuntoLadrillos.push(b);
	}
	checkIfLooser(pared){
		if(pared.color == this.circle.color){
			return false;
		} else{
			return true;
		}
	}
	time(){
		var contador = 0;
		var intervalo = setInterval(() =>{
			contador = contador +1;
			if (this.conjuntoLadrillos.length >0){
				for (var i = this.conjuntoLadrillos.length-1; i >=0; i--) {
					this.choqueLadrillo(this.conjuntoLadrillos[i], i);
				}
			}

			var n = Math.random();
			var co = ""; //color aleatorio de la pared
			if (n<0.5){
				co = "#FFA07A";
			} else{
				co = "#20B2AA";
			}
			if (this.circle.choque == "R"){
				if (!this.checkIfLooser(this.paredDcha)){
					this.paredDcha.p.setAttribute("stroke",co);
					this.paredDcha.p.setAttribute("fill", co);
					this.paredDcha.color = co;
					this.circle.choque = "";
					this.puntuacion++;
				}else{
					clearInterval(intervalo);
					clearInterval(this.circle.int);
				}

			}
			if (this.circle.choque == "L"){
				if (!this.checkIfLooser(this.paredIzda)){
					this.paredIzda.p.setAttribute("stroke",co);
					this.paredIzda.p.setAttribute("fill", co);
					this.circle.choque = "";
					this.paredIzda.color = co;
					this.puntuacion++;
				}else{
					clearInterval(intervalo);
					clearInterval(this.circle.int);
				}
			}
			if (this.circle.choque == "U"){
				if (!this.checkIfLooser(this.paredArriba)){
					this.paredArriba.p.setAttribute("stroke",co);
					this.paredArriba.p.setAttribute("fill", co);
					this.circle.choque = "";
					this.paredArriba.color = co;
					this.puntuacion++;
				} else{
					clearInterval(intervalo);
					clearInterval(this.circle.int);
				}
			}
			if (this.circle.choque == "D"){
				if (!this.checkIfLooser(this.paredAbajo)){
					this.paredAbajo.p.setAttribute("stroke",co);
					this.paredAbajo.p.setAttribute("fill", co);
					this.circle.choque = "";
					this.paredAbajo.color = co;
					this.puntuacion++;
				} else{
					clearInterval(intervalo);
					clearInterval(this.circle.int);
				}
			}
			if (contador%500 == 0){ //añadir nuevo ladrillo cada 5seg.
				this.addLadrillo();
			}
			document.getElementById("puntuacion").innerHTML = "Tu puntuación es: "+ this.puntuacion;
		},1); // //cuando hay un choque, la función cambia los colores a las paredes de forma aleatoria
		
	}

	distancia(ax,ay,cx,cy){
		return Math.sqrt(Math.pow((cx-ax),2) + Math.pow((cy-ay),2));
	}
	choqueLadrillo(ladrillo, i ){
		var lx = ladrillo.rect.x.baseVal.value; //eje x de ladrillo
		var ly = ladrillo.rect.y.baseVal.value; //eje y de ladrillo
		var lheight = ladrillo.rect.height.baseVal.value; // height de ladrillo
		var lwidth = ladrillo.rect.width.baseVal.value; // width de ladrillo
		var cx = this.circle.circulo.cx.baseVal.value; // eje x de circulo
		var cy = this.circle.circulo.cy.baseVal.value; //eje y de circulo
		var cr = this.circle.circulo.r.baseVal.value; // radio de circulo

		
		if((cx + cr >= lx)&&(cy > ly)&&(cy < ly + lheight)&&(cx + cr < lx + lwidth))
		{ //choque con la izq 
			this.circle.velx = -this.circle.velx;
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if((cx - cr <= lx + lwidth)&&(cy > ly)&&(cy < ly + lheight)&&(cx - cr > lx))
		{ //choque con la dcha
			this.circle.velx = -this.circle.velx;
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if ((cy + cr >= ly)&&(cx> lx)&&(cx< lx + lwidth)&&(cy + cr < ly + lheight))
		{ //choque arriba
			this.circle.vely = -this.circle.vely;
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if ((cy - cr <= ly + lheight)&&(cx > lx)&&(cx< lx + lwidth)&&(cy + cr > ly))
		{ //choque abajo
			this.circle.vely = -this.circle.vely;
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if (this.distancia(lx,ly,cx,cy)< cr){ //esquina 0 0 
			this.circle.vely = - Math.abs(this.circle.vely);
			this.circle.velx = -Math.abs(this.circle.velx);
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if (this.distancia(lx + lwidth,ly,cx,cy)< cr){ // esquina 0 1
			this.circle.vely = - Math.abs(this.circle.vely);
			this.circle.velx = Math.abs(this.circle.velx);
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if (this.distancia(lx,ly+ lheight,cx,cy)< cr){ // esquina 1 0 
			this.circle.vely = Math.abs(this.circle.vely);
			this.circle.velx = - Math.abs(this.circle.velx);
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}
		else if (this.distancia(lx + lwidth,ly+lheight,cx,cy)< cr){ //esquina 1 1 
			this.circle.vely = Math.abs(this.circle.vely);
			this.circle.velx = Math.abs(this.circle.velx);
			ladrillo.padre.removeChild(ladrillo.rect);
			this.conjuntoLadrillos.splice(i,1);
		}

	}
	pressedKey(e, that){ //that = this(Juego)
		e = e || window.event;
		if (e.keyCode == '38') { // up arrow
			
    	}
    	else if (e.keyCode == '40') { // down arrow

        }
    	else if (e.keyCode == '37') { // left arrow
    		that.circle.circulo.setAttribute("stroke","#FFA07A");
    		that.circle.circulo.setAttribute("fill","#FFA07A");
    		that.circle.color = "#FFA07A";
    	}
    	else if (e.keyCode == '39') { // right arrow
    		that.circle.circulo.setAttribute("stroke","#20B2AA");
    		that.circle.circulo.setAttribute("fill","#20B2AA");
    		that.circle.color = "#20B2AA";
    	} //detecta las teclas pulsadas y cambia color a la pelota
    }

}

window.onload = function(){
	var juego = new Juego(); 	
}