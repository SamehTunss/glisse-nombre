ecart_entre_chiffre = 90;
taillepolice = 80;
decale_vers_bas_police = 46;
avecvirgule = true;
aveczero = false;
positionnombre_x = 0;
xsouris_debut = 0;
xtablette_debut = 0;
fige = true;
nombre_tab = [];
num_placeunite = 0;
position_unite_sur_tableau_x = 470;
position_unite_sur_tableau_y_ligne1 = 370;
position_unite_sur_tableau_y_ligne2 = 460;
avec_op = true;
entier = false;
canvas = document.getElementById('mon_canvas');
marge = 5;
if (!canvas) {
	alert("Impossible de récupérer le canvas");
}
context = canvas.getContext('2d');
if (!context) {
	alert("Impossible de récupérer le context du canvas");
}

function initialisation() {
	//centrage du tableau
	decalagex = (canvas.width - 11 * ecart_entre_chiffre) / 2;

	position_unite_sur_tableau_x = 6 * ecart_entre_chiffre + ecart_entre_chiffre / 2 + decalagex;

	affichebande()
	document.getElementById('nb').value = '';
	if (GET('avecoperation') != undefined) {
		if (GET('avecoperation') == '1') {
			avec_op = true;
		}
		else {
			avec_op = false;
		}

	}
	if (GET('aveczero') != undefined) {
		if (GET('aveczero') == '1') {
			aveczero = true;
			document.getElementById('checke').checked = true;
		}
		else {
			aveczero = false;
			document.getElementById('checke').checked = false;
		}

	}
	if (GET('entier') != undefined) {
		if (GET('entier') == '1') {
			entier = true;
			position_unite_sur_tableau_x = 10 * ecart_entre_chiffre + ecart_entre_chiffre / 2 + decalagex;

		}
		else {
			entier = false;
			position_unite_sur_tableau_x = 6 * ecart_entre_chiffre + ecart_entre_chiffre / 2 + decalagex;

		}

	}
	if (GET('virgule') != undefined) {
		if (GET('virgule') == '1') {
			avecvirgule = true;

		}
		else {
			avecvirgule = false;

		}

	}
	if (GET('nb') != undefined) {
		document.getElementById('nb').value = GET('nb');
		placernombre(GET('nb'))

	}

	affichemessage();
	affichetableeau();

}
function clearCanvas(context, canvas) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	var w = canvas.width;
	canvas.width = 1;
	canvas.width = w;

}

function affichemessage() {
	var checkBox = document.getElementById("check");
	var text = document.getElementById("message");

	if (checkBox.checked == true) {
		text.style.display = "block";
	}
	else {
		text.style.display = "none";
	}
}

function bonaffichagenombre(nb) {
	return nb.replace('.', ',');
}
function placernombre(nb) {
	clearCanvas(context, canvas);
	affichebande()
	nombre_tab = [];
	num_placeunite = -1;
	var nombre_tab_tmp = nb.split('');
	var long = nombre_tab_tmp.length;
	var j = 0;
	for (i = 0; i < long; i++) {
		if ((nombre_tab_tmp[i] == ',') || (nombre_tab_tmp[i] == '.')) {
			num_placeunite = i - 1;
		}
		else {
			nombre_tab[j] = nombre_tab_tmp[i];
			j = j + 1;

		}

	}
	if (num_placeunite == -1) {
		num_placeunite = nombre_tab.length - 1;
	}
	//console.log(nombre_tab+" "+num_placeunite);
	//nombre découpé et analysé;
	var long = nombre_tab.length;
	//for (i=num_placeunite;i>=0;i--)
	for (i = 0; i < long; i++) {
		positionx = position_unite_sur_tableau_x + positionnombre_x + (i - num_placeunite) * ecart_entre_chiffre;
		positiony = position_unite_sur_tableau_y_ligne1 + decale_vers_bas_police;

		positionx_de_base = position_unite_sur_tableau_x + (i - num_placeunite) * ecart_entre_chiffre;
		positiony_de_base = position_unite_sur_tableau_y_ligne2 + decale_vers_bas_police;
		//console.log(nombre_tab[i]);
		context.beginPath();

		context.font = taillepolice + "px OpenDyslexicalta";
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillStyle = "black";

		context.fillText(nombre_tab[i], positionx, positiony);
		context.fillText(nombre_tab[i], positionx_de_base, positiony_de_base);
		context.closePath();
	}
	//ajout du message
	decalage = Math.floor((positionnombre_x + ecart_entre_chiffre / 4) / ecart_entre_chiffre);


	if (aveczero) {
		if (nb != 0) {
			//rajout des zéros inutiles devant
			nombredezeroa_ajouter_avant = Math.trunc((positionnombre_x + ecart_entre_chiffre / 4) / ecart_entre_chiffre) - num_placeunite;

			if (0 < nombredezeroa_ajouter_avant) {
				for (i = 0; i < nombredezeroa_ajouter_avant; i++) {
					positionx = position_unite_sur_tableau_x + positionnombre_x + (-i - num_placeunite - 1) * ecart_entre_chiffre;
					positiony = position_unite_sur_tableau_y_ligne1 + decale_vers_bas_police;
					//console.log(positionx);
					context.beginPath();

					context.font = taillepolice + "px OpenDyslexicalta";
					context.textBaseline = "middle";
					context.textAlign = "center";
					context.fillStyle = "#8cdd83";

					context.fillText("0", positionx, positiony);
					context.closePath();
				}

				//console.log(positionnombre_x);
			}

			//rajout des zéros inutiles derrière
			//nombredezeroa_ajouter_apres=Math.trunc((positionnombre_x-78/3)/78)-num_placeunite+long-1);
			nombredezeroa_ajouter_apres = num_placeunite - long + 1 - Math.trunc((positionnombre_x - ecart_entre_chiffre / 4) / ecart_entre_chiffre);
			if (0 < nombredezeroa_ajouter_apres) {
				for (i = 0; i < nombredezeroa_ajouter_apres; i++) {
					positionx = position_unite_sur_tableau_x + positionnombre_x + (long + i - num_placeunite) * ecart_entre_chiffre;
					positiony = position_unite_sur_tableau_y_ligne1 + decale_vers_bas_police;
					//console.log(positionx);
					context.beginPath();

					context.font = taillepolice + "px OpenDyslexicalta";
					context.textBaseline = "middle";
					context.textAlign = "center";
					context.fillStyle = "#8cdd83";

					context.fillText("0", positionx, positiony);
					context.closePath();
				}

			}
		}
		else {
			positionnombre_x = 0;
		}
	}
	affichetableeau();
	nouveauplacementunite = num_placeunite - decalage;
	resultat = "";
	if (nouveauplacementunite < 0) {

		for (i = 0; i < -nouveauplacementunite; i++) {
			if (i == 1) {
				resultat = resultat + ",";
			}
			resultat = resultat + "0"
		}
		if (-nouveauplacementunite == 1) {
			resultat = resultat + ",";
		}

		for (i = 0; i < nombre_tab.length; i++) {
			resultat = resultat + nombre_tab[i]
		}
	}
	else {
		if (nouveauplacementunite >= nombre_tab.length) {

			for (i = 0; i < nombre_tab.length; i++) {
				resultat = resultat + nombre_tab[i]
			}
			for (i = nombre_tab.length; i < nouveauplacementunite + 1; i++) {
				resultat = resultat + "0";
			}

		}
		else {
			for (i = 0; i < nombre_tab.length; i++) {

				resultat = resultat + nombre_tab[i]
				if ((i == nouveauplacementunite) && (nouveauplacementunite < nombre_tab.length - 1)) {
					resultat = resultat + ",";
				}
			}
		}

	}
	if (decalage != 0) {
		if (decalage > 0) {
			document.getElementById('message').innerHTML = "On a décalé tous les chiffres du nombre de " + decalage + " rang(s) vers la droite." + "<br/>Les chiffres du nombre sont rendus <b>" + Math.floor(Math.pow(10, decalage)) + " fois moins forts.</b>" + "<br/>J'ai divisé par " + Math.floor(Math.pow(10, decalage)) + ".";
			document.getElementById('message').innerHTML += "<br/>" + bonaffichagenombre(document.getElementById('nb').value) + "÷" + Math.floor(Math.pow(10, decalage)) + "=" + resultat;
		}
		else {
			document.getElementById('message').innerHTML = "On a décalé tous les chiffres du nombre de " + -decalage + " rang(s) vers la gauche.<br/>Les chiffres du nombre sont rendus <b>" + Math.floor(Math.pow(10, -decalage)) + " fois plus forts.</b>";
			document.getElementById('message').innerHTML += "<br/>J'ai multiplié par " + Math.floor(Math.pow(10, -decalage)) + "."

			document.getElementById('message').innerHTML += "<br/>" + bonaffichagenombre(document.getElementById('nb').value) + "×" + Math.floor(Math.pow(10, -decalage)) + "=" + resultat;
		}
	}
	else {
		document.getElementById('message').innerHTML = "Pour faire glisser le nombre, maintenez un clic gauche sur la grille et déplacez la souris sur la gauche ou la droite.";
	}

}
function affichebande() {
	context.beginPath();

	context.fillStyle = "#e3e3e3";
	context.fillRect(-marge, position_unite_sur_tableau_y_ligne1, canvas.width + 2 * marge, position_unite_sur_tableau_y_ligne2 - position_unite_sur_tableau_y_ligne1 - 2 * marge);

	context.closePath();
}

function affichetableeau() {
	//centrage du tableau

	//clearCanvas(context, canvas);
	//context.drawImage(fond,0,0);
	//context.save();
	//context.restore();



	context.beginPath();

	context.lineWidth = marge;
	context.fillStyle = "black";

	context.lineCap = "round";
	tab_titre = ['آحاد الملايين', ' مئات اآلاف', 'عشرات الآلاف', 'آحاد الآلاف', 'المئات', 'العشرات', 'الآحاد', 'الأعشار', 'الأجزاء من 100', 'الأجزاء من 1000', 'الأجزاء من 10000']
	tab_titre_entier = ['', 'Unité de Milliards', 'Centaines de Millions', 'Dizaines de Millions', 'Unité de Millions', 'Centaines de milliers', 'Dizaines de milliers', 'Unité de milliers', 'Centaines', 'Dizaines', 'Unités']
	tab_op = ['', '', '', '', '', '', '', '', '', '', '']
	tab_op_entier = ['×10 000 000 000', '×1 000 000 000', '×100 000 000', '×10 000 000', '×1 000 000', '×100 000', '×10 000', '×1 000', '×100', '×10', '×1']

	for (i = 0; i < 12; i++) {
		context.moveTo(decalagex + i * ecart_entre_chiffre + marge, marge);
		context.lineTo(decalagex + i * ecart_entre_chiffre + marge, position_unite_sur_tableau_y_ligne2 + taillepolice + marge);
		context.stroke();
	}

	for (i = 0; i < 11; i++) {

		context.font = "22px OpenDyslexicalta";
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillStyle = "black";
		var posx = decalagex + i * ecart_entre_chiffre + ecart_entre_chiffre / 2 + marge;
		var posy = (position_unite_sur_tableau_y_ligne1 - 62) / 2 + marge;
		context.translate(posx, posy);
		context.rotate((-Math.PI / 2));
		if (entier) {
			context.fillText(tab_titre_entier[i], 0, 0);
		}
		else {
			context.fillText(tab_titre[i], 0, 0);
		}
		context.rotate((Math.PI / 2));
		context.translate(-posx, -posy);

		if (avec_op) {
			if (entier) {
				if (i == 10 + Math.round(positionnombre_x / ecart_entre_chiffre)) {
					context.fillStyle = "green";
				}
				else {
					context.fillStyle = "blue";
				}
				if (tab_op_entier[i].length > 6) {
					chaine = (tab_op_entier[i]).split(' ');
					chaine1 = ''
					chaine2 = (chaine.slice(0, chaine.length - 1)).join(' ')
					chaine3 = chaine[chaine.length - 1];
					if (chaine2.length > 6) {
						chaine = (chaine2).split(' ');
						chaine1 = (chaine.slice(0, chaine.length - 1)).join(' ')
						chaine2 = chaine[chaine.length - 1];
					}
					context.beginPath();
					context.font = "20px OpenDyslexicalta";
					context.textBaseline = "middle";
					context.textAlign = "center";
					var posx = decalagex + i * ecart_entre_chiffre + ecart_entre_chiffre / 2 + marge;
					var posy = (position_unite_sur_tableau_y_ligne1) - 30 + marge;
					context.translate(posx, posy);
					context.fillText(chaine1, 0, -50);
					context.fillText(chaine2, 0, -25);
					context.fillText(chaine3, 0, 0);
					context.translate(-posx, -posy);
					context.closePath();
				}
				else {
					context.beginPath();
					context.font = "20px OpenDyslexicalta";
					context.textBaseline = "middle";
					context.textAlign = "center";
					var posx = decalagex + i * ecart_entre_chiffre + ecart_entre_chiffre / 2 + marge;
					var posy = (position_unite_sur_tableau_y_ligne1) - 30 + marge;
					context.translate(posx, posy);
					context.fillText(tab_op_entier[i], 0, 0);
					context.translate(-posx, -posy);
					context.closePath();
				}
			}
			else {
				if (i == 6 + Math.round(positionnombre_x / ecart_entre_chiffre)) {
					context.fillStyle = "green";
				}
				else {
					context.fillStyle = "blue";
				}
				if (tab_op[i].length > 6) {
					chaine = (tab_op[i]).split(' ');
					chaine1 = (chaine.slice(0, chaine.length - 1)).join(' ')
					chaine2 = chaine[chaine.length - 1];
					context.font = "22px OpenDyslexicalta";
					context.textBaseline = "middle";
					context.textAlign = "center";
					var posx = decalagex + i * ecart_entre_chiffre + ecart_entre_chiffre / 2 + marge;
					var posy = (position_unite_sur_tableau_y_ligne1) - 30 + marge;
					context.translate(posx, posy);
					context.fillText(chaine1, 0, -30);
					context.fillText(chaine2, 0, 0);
					context.translate(-posx, -posy);
				}
				else {
					context.font = "22px OpenDyslexicalta";
					context.textBaseline = "middle";
					context.textAlign = "center";
					var posx = decalagex + i * ecart_entre_chiffre + ecart_entre_chiffre / 2 + marge;
					var posy = (position_unite_sur_tableau_y_ligne1) - 30 + marge;
					context.translate(posx, posy);
					context.fillText(tab_op[i], 0, 0);
					context.translate(-posx, -posy);
				}
			}
		}

	}

	context.moveTo(decalagex + marge, marge);
	context.lineTo(decalagex + 11 * ecart_entre_chiffre + marge, marge);
	context.moveTo(decalagex + marge, position_unite_sur_tableau_y_ligne2 + taillepolice + marge);
	context.lineTo(decalagex + 11 * ecart_entre_chiffre + marge, position_unite_sur_tableau_y_ligne2 + taillepolice + marge);
	context.moveTo(decalagex + marge, position_unite_sur_tableau_y_ligne1 - 10 + marge);
	context.lineTo(decalagex + 11 * ecart_entre_chiffre + marge, position_unite_sur_tableau_y_ligne1 - 10 + marge);
	context.moveTo(decalagex + marge, position_unite_sur_tableau_y_ligne2 - 10 + marge);
	context.lineTo(decalagex + 11 * ecart_entre_chiffre + marge, position_unite_sur_tableau_y_ligne2 - 10 + marge);
	context.stroke();
	context.closePath();
	if ((!entier) && (avecvirgule)) {
		context.beginPath();
		context.font = taillepolice + "px OpenDyslexicalta";
		context.textBaseline = "middle";
		context.textAlign = "center";
		context.fillStyle = "red";
		context.fillText(',', position_unite_sur_tableau_x + ecart_entre_chiffre / 2 + marge, position_unite_sur_tableau_y_ligne2 - decale_vers_bas_police + marge);
		context.fillText(',', position_unite_sur_tableau_x + ecart_entre_chiffre / 2 + marge, position_unite_sur_tableau_y_ligne2 - decale_vers_bas_police + taillepolice + 10 + marge);
		context.closePath();
	}
}
function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}

canvas.addEventListener('mousedown', function (evt) {
	fige = false;
	var mousePos = getMousePos(canvas, evt);
	xsouris_debut = mousePos.x;
}, false);

canvas.addEventListener("touchstart", function (evt) {
	fige = false;
	var touches = evt.touches;
	var rect = canvas.getBoundingClientRect();
	xtablette_debut = touches[0].clientX - rect.left;

});

canvas.addEventListener('mouseup', function (evt) {
	fige = true;
}, false);

canvas.addEventListener("touchend", function (evt) {
	evt.preventDefault();
	fige = true;
}, false);

canvas.addEventListener("touchleave", function (evt) {
	evt.preventDefault();
	fige = true;
}, false);

canvas.addEventListener("touchmove", function (evt) {
	evt.preventDefault();
	var touches = evt.touches;
	var rect = canvas.getBoundingClientRect();

	if (fige == false) {

		xtablette = touches[0].clientX - rect.left;
		ytablette = touches[0].clientY - rect.top;

		positionnombre_x = positionnombre_x - (xtablette_debut - xtablette);
		xtablette_debut = xtablette;
		placernombre(document.getElementById('nb').value);

	}



});

canvas.addEventListener('mousemove', function (evt) {
	if (fige == false) {
		var mousePos = getMousePos(canvas, evt);
		var xsouris = mousePos.x;
		positionnombre_x = positionnombre_x - (xsouris_debut - xsouris);
		xsouris_debut = xsouris;
		placernombre(document.getElementById('nb').value);
	}
	else {
		var mousePos = getMousePos(canvas, evt);

		if ((mousePos.y < position_unite_sur_tableau_y_ligne2) && ((mousePos.y > position_unite_sur_tableau_y_ligne1))) {
			canvas.style.cursor = 'move'
		}
		else {
			canvas.style.cursor = 'auto'
		}
	}
});
function GET(param) {
	var vars = {};

	window.location.href.replace(location.hash, '').replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function (m, key, value) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if (param) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

window.onload = initialisation
