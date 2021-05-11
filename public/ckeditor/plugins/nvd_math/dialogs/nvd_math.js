window.CCounter = 0;


var onLoadDone = function (titleDiv1, titleDiv2) {
	document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
	document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") });
	let parent1 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2)");
	let parent2 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(3)");
	parent1.prepend(titleDiv1);
	document.querySelector('.nvd-math-txtr').focus();
	parent2.prepend(titleDiv2);

	//add event for all element in panel_14 area
	Array.from(document.querySelectorAll('#EqnEditor #panel14 area')).forEach(r => {
		r.onclick = function () {
			switch (r.title) {
				case "Math Bold Greek":
					EqEditor.insert('\\boldsymbol{}');
					break;
				case "Math Bold":
					EqEditor.insert('\\mathbf{}')
					break;
				case "Math Italic":
					EqEditor.insert('\\mathit{}')
					break;
				case "Math Roman":
					EqEditor.insert('\\mathrm{}')
					break;
				case "Math Fraktur":
					EqEditor.insert('\\mathfrak{}')
					break;
				case "Math Blackboard":
					EqEditor.insert('\\mathbb{}')
					break;
				case "Text Upright":
					EqEditor.insert('\\textup{}')
					break;
				case "Text Bold":
					EqEditor.insert('\\textbf{}')
					break;
				case "Text Italic":
					EqEditor.insert('\\textit{}')
					break;
				case "Text Roman":
					EqEditor.insert('\\textrm{}')
					break;
				case "Text Slanted":
					EqEditor.insert('\\textsl{}')
					break;
				case "Text Typewriter":
					EqEditor.insert('\\texttt{}')
					break;
				case "Text Small Caps":
					EqEditor.insert('\\textsc{}')
					break;
				case "Text Emphasis":
					EqEditor.insert('\\emph{}')
					break;
				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})

	//add event for all element in panel_13 area
	Array.from(document.querySelectorAll('#EqnEditor #panel13 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			switch (r.title) {
				case "thin space":
					EqEditor.insert('\\,')
					break;
				case "medium space":
					EqEditor.insert('\\:')
					break;
				case "thick space":
					EqEditor.insert('\\;')
					break;
				case "negative space":
					EqEditor.insert('\\!')
					break;
				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})

	//add event for all element in panel1 area
	Array.from(document.querySelectorAll('#EqnEditor #panel1 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			switch (r.title) {
				case "a'":
					EqEditor.insert('{a}\'')
					break;
				case "\\dot{a}":
					EqEditor.insert('\\dot{a}')
					break;
				case "\\hat{a}":
					EqEditor.insert('\\hat{a}')
					break;
				case "\\grave{a}":
					EqEditor.insert('\\grave{a}')
					break;
				case "\\tilde{a}":
					EqEditor.insert('\\tilde{a}')
					break;
				case "a''":
					EqEditor.insert('{a}\'\'')
					break;
				case "\\ddot{a}":
					EqEditor.insert('\\ddot{a}')
					break;
				case "\\check{a}":
					EqEditor.insert('\\check{a}')
					break;
				case "\\acute{a}":
					EqEditor.insert('\\acute{a}')
					break;
				case "\\breve{a}":
					EqEditor.insert('\\breve{a}')
					break;
				case "\\vec{a}":
					EqEditor.insert('\\vec{}')
					break;
				case "degrees":
					EqEditor.insert('a^{\\circ}', 0)
					break;
				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})

	//add event for all element in panel2 area
	Array.from(document.querySelectorAll('#EqnEditor #panel2 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			switch (r.title) {
				case "\\widetilde{abc}":
					EqEditor.insert('\\widetilde{abc}', 11)
					break;
				case "\\widehat{abc}":
					EqEditor.insert('\\widehat{abc}', 9)
					break;
				case "\\overleftarrow{abc}":
					EqEditor.insert('\\overleftarrow{abc}', 15)
					break;
				case "\\overrightarrow{abc}":
					EqEditor.insert('\\overrightarrow{abc}', 16)
					break;
				case "\\overline{abc}":
					EqEditor.insert('\\overline{abc}', 10)
					break;
				case "\\underline{abc}":
					EqEditor.insert('\\underline{abc}', 11)
					break;
				case "\\overbrace{abc}":
					EqEditor.insert('\\overbrace{abc}', 11)
					break;
				case "\\underbrace{abc}":
					EqEditor.insert('\\underbrace{abc}', 12)
					break;
				case "\\overset{a}{abc}":
					EqEditor.insert('\\overset{a}{abc}', 9, 11)
					break;

				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})

	//add event for all element in panel3 area arrow_map
	Array.from(document.querySelectorAll('#EqnEditor #panel3 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			switch (r.title) {
				case "\\mapsto":
				case "\\leftarrow":
				case "\\Leftarrow":
				case "\\leftrightarrow":
				case "\\leftharpoonup":
				case "\\leftharpoondown":
				case "\\leftrightharpoons":
				case "n \\to":
				case "\\rightarrow":
				case "\\Rightarrow":
				case "\\Leftrightarrow":
				case "\\rightharpoonup":
				case "\\rightharpoondown":
				case "\\rightleftharpoons":
					EqEditor.insert(r.latex);
					break;
				case "\\xleftarrow[text]{long}":
					EqEditor.insert('\\xleftarrow[text]{long}', 12)
					break;
				case "\\overset{a}{\\leftarrow}":
					EqEditor.insert('\\overset{a}{\\leftarrow}', 9);
					break;
				case "\\underset{a}{\\leftarrow}":
					EqEditor.insert('\\underset{a}{\\leftarrow}', 10)
					break;
				case "\\xrightarrow[text]{long}":
					EqEditor.insert('\\xrightarrow[text]{long}', 13)

					break;
				case "\\overset{a}{\\rightarrow}":
					EqEditor.insert('\\overset{a}{\\rightarrow}', 9)
					break;
				case "\\underset{a}{\\rightarrow}":
					EqEditor.insert('\\underset{a}{\\rightarrow}', 10)
					break;

				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})

	//add event for all element in panel11 area arrow_map
	Array.from(document.querySelectorAll('#EqnEditor #panel11 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			switch (r.title) {
				case "superscript":
					EqEditor.insert('x^{a}', 2, 0)
					break;
				case "subscript":
					EqEditor.insert('x_{a}', 2, 0)
					break;
				case "x_a^b":
					EqEditor.insert('x_{a}^{b}', 2, 0);
					break;
				case "{x_a}^b":
					EqEditor.insert('{x_{a}}^{b}', 1)
					break;
				case "_{a}^{b}\\textrm{C}":
					EqEditor.insert('_{a}^{b}\\textrm{C}', 2, 14)
					break;
				case "fraction":
					EqEditor.insert('\\frac{a}{b}', 6)
					break;
				case "tiny fraction":
					EqEditor.insert('x\\tfrac{a}{b}', 7)
					break;
				case "\\frac{\\partial }{\\partial x}":
					EqEditor.insert('\\frac{\\partial }{\\partial x}', 15)
					break;
				case "\\frac{\\partial^2 }{\\partial x^2}":
					EqEditor.insert('\\frac{\\partial^2 }{\\partial x^2}', 17)
					break;
				case "\\frac{\\mathrm{d} }{\\mathrm{d} x}":
					EqEditor.insert('\\frac{\\mathrm{d} }{\\mathrm{d} x}', 17)
					break;
				case "\\int":
					EqEditor.insert('\\int');
					break;
				case "\\int_{}^{}":
					EqEditor.insert('\\int_{can-duoi}^{can-tren}', 6, 1000)
					break;
				case "\\oint":
					EqEditor.insert('\\oint')
					break;
				case "\\oint_{}^{}":
					EqEditor.insert('\\oint_{can-duoi}^{can-tren}', 7, 1000)
					break;
				case "\\iint_{}^{}":
					EqEditor.insert('\\iint_{can-duoi}^{can-tren}', 7, 1000)
					break;
				case "\\bigcap":
					EqEditor.insert('\\bigcap ', 7, 1000)
					break;
				case "\\bigcap_{}^{}":
					EqEditor.insert('\\bigcap_{a}^{b}', 9, 1000)
					break;
				case "\\bigcup":
					EqEditor.insert('\\bigcup')
					break;
				case "\\bigcup_{}^{}":
					EqEditor.insert('\\bigcup_{a}^{b}', 9, 1000)
					break;
				case "\\lim_{x \\to 0}":
					EqEditor.insert('\\lim_{x \\to 0} f(x) ')
					break;
				case "\\sum":
					EqEditor.insert('\\sum', 7, 1000)
					break;
				case "\\sum_{}^{}":
					EqEditor.insert('\\sum_{x=0}^{n} f(x) ', 7, 1000)
					break;
				case "\\sqrt{}":
					EqEditor.insert('\\sqrt{x}', 6, 6)
					break;
				case "\\sqrt[]{}":
					EqEditor.insert('\\sqrt[n]{x}', 6, 8)
					break;
				case "\\prod":
					EqEditor.insert('\\prod', 7, 1000)
					break;
				case "\\prod_{}^{}":
					EqEditor.insert('\\prod_{x=1}^{n} f(x) ', 7, 1000)
					break;
				case "\\coprod":
					EqEditor.insert('\\coprod', 7, 1000)
					break;
				case "\\coprod_{}^{}":
					EqEditor.insert('\\coprod_{x=1}^{n} f(x)', 7, 1000)
					break;
				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})


	//add event for all element in panel10 area matrix
	Array.from(document.querySelectorAll('#EqnEditor #panel10 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			switch (r.title) {
				case "\\begin{matrix} ... \\end{matrix}":
					EqEditor.makeArrayMatrix('', '', '')
					break;
				case "\\begin{pmatrix} ... \\end{pmatrix}":
					EqEditor.makeArrayMatrix('p', '', '')
					break;
				case "\\begin{vmatrix} ... \\end{vmatrix}":
					EqEditor.makeArrayMatrix('v', '', '')
					break;
				case "\\begin{Vmatrix} ... \\end{Vmatrix}":
					EqEditor.makeArrayMatrix('V', '', '')
					break;
				case "\\left.\\begin{matrix}... \\end{matrix}\\right|":
					EqEditor.makeArrayMatrix('', '\\left.', '\\right|')
					break;
				case "\\being{bmatrix} ... \\end{bmatrix}":
					EqEditor.makeArrayMatrix('b', '', '')
					break;
				case "\\bigl(\\begin{smallmatrix} ... \\end{smallmatrix}\\bigr)":
					EqEditor.makeArrayMatrix('small', '\\bigl(', '\\bigr)')
					break;
				case "\\begin{Bmatrix} ... \\end{Bmatrix}":
					EqEditor.makeArrayMatrix('B', '', '')
					break;
				case "\\begin{Bmatrix} ... \\end{matrix}":
					EqEditor.makeArrayMatrix('', '\\left\\{', '\\right.')
					break;
				case "\\begin{matrix} ... \\end{Bmatrix}":
					EqEditor.makeArrayMatrix('', '\\left.', '\\right\\}')
					break;
				case "\\binom{n}{r}":
					EqEditor.insert('\\binom{n}{r}');
					break;
				case "\\begin{cases} ... \\end{cases}":
					EqEditor.insert('\\binom{n}{r}');
					break;
				case "\\begin{align} ... \\end{align}":
					EqEditor.makeEquationsMatrix('align', false)
					break;
				default:
					console.log(r.title + ' - ' + r.latex);
			}
		}
	})


	//add event for all element in panel4, panel16, panel6, panel15 area
	Array.from(document.querySelectorAll('#EqnEditor #panel4 area, #EqnEditor #panel16 area, #EqnEditor #panel6 area, #EqnEditor #panel15 area')).forEach(r => {
		r.onclick = function () {
			console.log('clicked');
			EqEditor.insert(r.latex)

		}
	})


}

//create matrix.
var createMatrix = function (type, start, end) {
	var matr = start + '\\begin{' + type + 'matrix}';
	var row = "\n";
	var mend = "\n\\end{" + type + "matrix}" + end;
	var i = 0;


	if (document.getElementByID("nvd-mtrx-x-dmnsn") && document.getElementByID("nvd-mtrx-x-dmnsn")) {
		var xDim, yDim;

		xDim = document.getElementById("nvd-mtrx-x-dmsn").value;
		yDim = document.getElementById("nvd-mtrx-y-dmsn").value;

		if (xDim === '' || xDim === null || isNaN(xDim)) {
			document.getElementById("nvd-mtrx-x-dmsn").setAttribute("value", 1);
			xDim = 1;
		}

		if (yDim === '' || yDim === null || isNaN(yDim)) {
			document.getElementById("nvd-mtrx-y-dmsn").setAttribute("value", 1);
			yDim = 1;
		}

		var m = parseInt(xDim);
		var n = parseInt(yDim);

		if (m > 9) {
			document.getElementById("nvd-mtrx-x-dmsn").setAttribute("value", 9);
			xDim = 9;
		}

		if (n > 9) {
			document.getElementById("nvd-mtrx-y-dmsn").setAttribute("value", 9);
			yDim = 9;
		}

		if (!isNaN(m) && !isNaN(n)) {
			for (i = 2; i <= n; i++)
				row = row + ' & '; for (i = 1; i <= m - 1; i++)matr = matr + row + '\\\\ ';
			matr = matr + row + mend;
			this.insert(matr, type.length + start.length + 15);
		}
	}



}


//create system of linear equation - hệ phương trình tuyến tính.
var createSystemOfLinearEquation = function (x, y, type) {

}

//handle for demension of matrix
var onlyNumberKey = function (evt) {
	console.log("on number key fired")
	// Only ASCII charactar in that range allowed
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
		return false;
	return true;
}

CKEDITOR.dialog.add('nvd_mathDialog', function (editor) {
	window.CCounter++;
	var http = ('https:' == document.location.protocol ? 'https://' : 'http://');

	return {
		title: editor.lang.nvd_math.title,
		minWidth: 550,
		minHeight: 380,
		resizable: CKEDITOR.DIALOG_RESIZE_NONE,
		contents: [
			{
				id: 'NVD_CCEquationEditor',
				label: 'EqnEditor',
				elements:
					[
						{
							type: 'html',
							html: '<div class="j-c-spc-btwn ppr-whn-ld-dn" >' +
								'<div class="nvd-nfr-lbl">Chúng tôi sử dụng LaTeX để định dạng các công thức toán học. </div>' +
								'<a class="nvd-nfr-lnk">' +
								'<img src="https://i.imgur.com/8SIDk8H.png" alt="help" class="question-icon" />' +
								'<div class="nvd-nfr-lnk-lbl">Tìm hiểu thêm.</div>' +
								'</a>' +
								'</div>'
						},
						{
							type: 'html',
							html: '<div class="ppr-whn-ld-dn" id="nvd_CCtoolbar' + window.CCounter + '"></div>',
							style: 'margin-top:-10px; border-bottom: 1px solid #c4c4c4 !important;  '
						},
						{
							type: 'html',
							html: ' <div style="display: flex" class="ppr-whn-ld-dn">' +
								'<div class="ppr-whn-ld-dn" id="nvd-qck-dfntn">Công thức mẫu: </div>' +
								'<select class="ppr-whn-ld-dn" id="nvd-qck-dfntn-slct" > ' +
								'<option disabled selected>Chọn công thức</option> ' +

								//Đạo hàm group
								'<optgroup label="Đạo hàm"> ' +
								'<option value="saab"></option> ' +
								'<option value="volvo">Volvo</option> ' +
								'</optgroup> ' +

								//Đạo hàm group
								'<optgroup label="Tích phân"> ' +
								'<option value="saab"></option> ' +
								'<option value="volvo">Volvo</option> ' +
								'</optgroup> ' +

								//Tích phân group
								'<optgroup label="Ma trận"> ' +
								'<option value="saab">Ma trận 3x3</option> ' +
								'<option value="volvo">Ma trận 4x4</option> ' +
								'<option value="saab">Định thức 3x3</option> ' +
								'<option value="volvo">Định thức 4x4</option> ' +
								'</optgroup> ' +
								+ '</select>',

							style: 'margin-top:-10px; border-bottom: 1px solid #c4c4c4 !important;  '
						},
						{
							type: 'html',
							html: '<div><div for="CClatex' + window.CCounter + '" class="  ppr-whn-ld-dn nvd-math-lbl required">Công thức (định dạng LaTeX):</div>' +
								'<textarea class="nvd-math-txtr ppr-whn-ld-dn" id="CClatex' + window.CCounter + '" tabIndex="0" autofocus="true" placeholder="Nhập công thức ..." ></textarea>  </div>',
						},
						{
							type: 'html',
							html: ' <div><div class="nvd-math-lbl ppr-whn-ld-dn"' + window.CCounter + '">Kết quả:' +
								'	</div>' +
								'<div id="nvd-math-prvw" class="ppr-whn-ld-dn"> ' +
								'</div>' +
								'</div>',
							style: 'border-bottom:1px solid #c4c4c4; padding-bottom: 4px; background: none !important'
						},
						//to avoid error on log when click to an area
						{
							type: 'html',
							html: '<img id="CCequation' + window.CCounter + '" src="' + http + 'www.codecogs.com/images/spacer.gif" style = "display: none" />'
						}]
			}
		],


		onLoad: function () {
			//for preview
			EqEditor.embed('nvd_CCtoolbar' + window.CCounter, '', 'efull');
			EqEditor.add(new EqTextArea('CCequation' + window.CCounter, 'CClatex' + window.CCounter), false);

			document.querySelector('.nvd-math-txtr').oninput = function (e) {
				var node = document.createElement("img");
				node.setAttribute('alt', EqEditor.getTextArea().getLaTeX());
				node.setAttribute('src', EqEditor.getTextArea().exportEquation('urlencoded'));
				document.querySelector('#nvd-math-prvw').innerHTML = '';
				if (e.target.value) document.querySelector('#nvd-math-prvw').appendChild(node);
			}




			//disable hover to avoid dialog flicker in edge and chrome :D
			Panel.hover = function () { };

		},

		onShow: function () {
			var dialog = this;
			var sel = editor.getSelection();
			var image = sel.getStartElement().getAscendant('img', true);

			//modify hover event
			// has the users selected an equation. Make sure we have the image element, include itself
			if (image) {
				var sName = image.getAttribute('src').match(/(gif|svg)\.latex\?(.*)/);
				if (sName != null) EqEditor.getTextArea().setText(sName[2]);
				dialog.insertMode = true;
			}

			// set-up the field values based on selected or newly created image
			dialog.setupContent(dialog.image);

			//handle element after component loaddone.
			var title1Content = '<div style="display: flex; "> ' +
				'<div class="tlbr-lbl" style="width: 157px" >Trình bày bố cục:</div>' +
				'<div class="tlbr-lbl" style="width: 76px">Nhị phân:</div> ' +
				'<div class="tlbr-lbl" style="width: 76px">Tập hợp: </div>' +
				'<div class="tlbr-lbl" style="width: 240px">Phép toán khác:</div> ' +
				'</div>';

			var title2Content = '<div style="display: flex; margin-top: 10px;justify-content: space-between;">' +
				'<div style="display: flex">' +
				'<div class="tlbr-lbl-2" style="width: 172px">Phép toán giải tích:</div>' +
				'<div class="tlbr-lbl-2" style="width: 120px; display:flex; justify-content: space-between;">' +
				'<div>Ma trận:</div> ' +
				'<div style = "display: flex">' +
				'<input type = "text" class = "nvd-math-txt-inpt" maxlength= "1" onkeypress="return onlyNumberKey(event)" placeholder =  "1..9" defaultvalue   = "1"style = "margin-left: 4px; margin-right: 2px" id = "nvd-mtrx-x-dmnsn"/>x ' +
				'<input  type = "text" class = "nvd-math-txt-inpt" maxlength= "1" onkeypress="return onlyNumberKey(event)"   style = "margin-left: 2px"  placeholder =  "1..9"   defaultvalue   = "1" id = "nvd-mtrx-y-dmnsn"/>' +
				'</div>' +
				'</div>' +
				'<div class="tlbr-lbl-2" style="width: 58px">So sánh:</div>' +
				'<div class="tlbr-lbl-2" style="width: 62px">Dấu ngoặc:</div>' +
				'</div>' +
				'<div class="tlbr-lbl-2" style="width: 122px; margin-right: 0px">Ký tự đặc biệt:</div>' +
				'</div>'

			var loaderContent = '<div style="display: flex;flex-direction: column;" class="dppr-whn-ld-dn"> ' +
				'<img src="https://i.imgur.com/G6BCakp.gif" style="margin: auto; width: 80px; height: 80px" alt="" /> ' +
				'<div class="nvd-loader-text"> loading </div></div>';

			var loaderDiv = document.createElement('div');
			loaderDiv.innerHTML = loaderContent;

			var title1Div = document.createElement("div");
			title1Div.innerHTML = title1Content;

			var title2Div = document.createElement("div");
			title2Div.innerHTML = title2Content;

			document.querySelector("[name^='NVD_CCEquationEditor']").prepend(loaderDiv);

			//#region simulate async
			console.log("on show called!");
			if (
				document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2) .toolbar:last-child") === null
			)
				setTimeout(function () {
					if (document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2) .toolbar:last-child") === null)
						setTimeout(function () {
							if (document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2) .toolbar:last-child") === null)
								setTimeout(function () {
									onLoadDone(title1Div, title2Div);
								}, 3000)
							else {
								onLoadDone(title1Div, title2Div);
							}
						}, 2000)
					else {
						onLoadDone(title1Div, title2Div);
					}
				}, 3000);
			else {
				//show when loadeds :D
				document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
				//hide loader
				document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") });
				document.querySelector('.nvd-math-txtr').focus();

			}
		},

		onOk: function () {
			var eqn = editor.document.createElement('img');
			eqn.setAttribute('alt', EqEditor.getTextArea().getLaTeX());
			eqn.setAttribute('src', EqEditor.getTextArea().exportEquation('urlencoded'));
			editor.insertElement(eqn);
			EqEditor.Example.add_history(EqEditor.getTextArea().getLaTeX());

		},
	};
});

