window.CCounter = 0;

CKEDITOR.dialog.add('nvd_mathDialog', function (editor) {
	var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
	window.CCounter++;

	return {
		title: editor.lang.nvd_math.title,
		minWidth: 550,
		minHeight: 380,
		resizable: CKEDITOR.DIALOG_RESIZE_NONE,
		contents: [
			{
				id: 'CCEquationEditor',
				label: 'EqnEditor',
				elements:
					[
						{
							type: 'html',
							html: '<div class = "j-c-spc-btwn ppr-whn-ld-dn" >' +
								'<div class = "nvd-nfr-lbl">Chúng tôi sử dụng LaTeX để định dạng các công thức toán học. </div>' +
								'<a class = "nvd-nfr-lnk">' +
								'<img src = "https://i.imgur.com/8SIDk8H.png" alt ="help" class = "question-icon"/>' +
								'<div  class = "nvd-nfr-lnk-lbl">Tìm hiểu thêm.</div>' +
								'</a>' +
								'</div>'
						},
						{
							type: 'html',
							html: '<div class = "ppr-whn-ld-dn" id="nvd_CCtoolbar' + window.CCounter + '"></div>',
							style: 'margin-top:-10px; border-bottom: 1px solid #c4c4c4 !important;  '
						},
						{
							type: 'html',
							html: ' <div style = "display: flex" class = "ppr-whn-ld-dn">' +
								'<div class = "ppr-whn-ld-dn" id="nvd-qck-dfntn">Công thức mẫu: </div>' +
								'<select  class = "ppr-whn-ld-dn" id = "nvd-qck-dfntn-slct" > ' +
								'<option disabled selected>Chọn công thức</option> ' +

								//Đạo hàm group
								'<optgroup label = "Đạo hàm"> ' +
								'<option value="saab"></option> ' +
								'<option value="volvo">Volvo</option> ' +
								'</optgroup> ' +

								//Đạo hàm group
								'<optgroup label = "Tích phân"> ' +
								'<option value="saab"></option> ' +
								'<option value="volvo">Volvo</option> ' +
								'</optgroup> ' +

								//Tích phân group
								'<optgroup label = "Ma trận"> ' +
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
							html: '<div><div for="CClatex' + window.CCounter + '" class = "  ppr-whn-ld-dn nvd-math-lbl required">Công thức (định dạng LaTeX):</div>' +
								'<textarea class = "nvd-math-txtr ppr-whn-ld-dn" id="CClatex' + window.CCounter + '" rows="5" ></textarea>  </div>',
						},
						{
							type: 'html',
							html: ' <div><div   class = "nvd-math-lbl ppr-whn-ld-dn"' + window.CCounter + '">Kết quả:' +
								'	</div>' +
								'<div    id="nvd-math-prvw" class = "ppr-whn-ld-dn"> ' +
								'</div>' +
								'</div>',
							style: 'border-bottom:1px solid #c4c4c4; padding-bottom: 4px; background: none !important'
						}
					]
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

		},

		onShow: function () {
			var dialog = this;
			var sel = editor.getSelection();
			var image = sel.getStartElement().getAscendant('img', true);

			// has the users selected an equation. Make sure we have the image element, include itself		
			if (image) {
				var sName = image.getAttribute('src').match(/(gif|svg)\.latex\?(.*)/);
				if (sName != null) EqEditor.getTextArea().setText(sName[2]);
				dialog.insertMode = true;
			}

			// set-up the field values based on selected or newly created image
			dialog.setupContent(dialog.image);

			//create ui
			var title1Content = '<div style = "display: flex; "> ' +
				'<div class = "tlbr-lbl" style = "width: 157px" >Trình bày bố cục:</div>' +
				'<div  class = "tlbr-lbl" style =  "width: 76px">Nhị phân:</div> ' +
				'<div  class = "tlbr-lbl" style = "width: 76px">Tập hợp: </div>' +
				'<div  class = "tlbr-lbl" style = "width: 240px">Phép toán khác:</div> ' +
				'</div>';

			var title2Content = '<div style = "display: flex; justify-content: space-between;">' +
				'<div style = "display: flex">' +
				'<div  class = "tlbr-lbl-2" style = "width: 172px">Phép toán giải tích:</div>' +
				'<div  class = "tlbr-lbl-2" style = "width: 106px">Ma trận:</div>' +
				'<div  class = "tlbr-lbl-2" style = "width: 58px">So sánh:</div>' +
				'<div  class = "tlbr-lbl-2" style = "width: 62px">Dấu ngoặc:</div>' +
				'</div>' +
				'<div  class = "tlbr-lbl-2" style = "width: 122px; margin-right: 0px">Ký tự đặc biệt:</div>' +
				'</div>'

			var loaderContent = '<div style = "display: flex;flex-direction: column;" class = "dppr-whn-ld-dn"> ' +
				'<img src = "https://i.imgur.com/G6BCakp.gif" style = "margin: auto; width: 80px; height: 80px" alt = ""/> ' +
				'<div class = "nvd-loader-text"> loading </div></div>';

			var loaderDiv = document.createElement('div');
			loaderDiv.innerHTML = loaderContent;

			var title1Div = document.createElement("div");
			title1Div.innerHTML = title1Content;

			var title2Div = document.createElement("div");
			title2Div.innerHTML = title2Content;

			//#region simulate async
			document.querySelector("[name^='CCEquationEditor']").prepend(loaderDiv);
			console.log("dm");
			if (
				document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2) .toolbar:last-child") === null
			)
				setTimeout(function () {
					if (document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2) .toolbar:last-child") === null)
						setTimeout(function () {
							if (document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2) .toolbar:last-child") === null)
								setTimeout(function () {
									document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
									document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") });
									let parent1 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2)");
									let parent2 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(3)");
									parent1.prepend(title1Div);
									parent2.prepend(title2Div);
								}, 3000)
							else {
								document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
								document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") });
								let parent1 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2)");
								let parent2 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(3)");
								parent1.prepend(title1Div);
								parent2.prepend(title2Div);
							}
						}, 2000)
					else {
						document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
						document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") })
						let parent1 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(2)");
						let parent2 = document.querySelector("#EqnEditor .top .toolbar_wrapper:nth-child(3)");
						parent1.prepend(title1Div);
						parent2.prepend(title2Div);
					}
				}, 3000);
			else {
				//show when loadeds :D
				document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
				//hide loader
				document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") });
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

