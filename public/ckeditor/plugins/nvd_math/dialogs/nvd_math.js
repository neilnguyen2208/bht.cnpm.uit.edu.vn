window.CCounter = 0;
var preview;

CKEDITOR.dialog.add('nvd_mathDialog', function (editor) {

	var lang = editor.lang.nvd_math;
	window.CCounter++;

	return {
		title: lang.title,
		minWidth: 550,
		minHeight: 350,
		resizable: CKEDITOR.DIALOG_RESIZE_NONE,
		contents: [
			{
				id: 'NVD_CCEquationEditor',
				label: 'nvd-eqn-editor',
				elements:
					[{
						//this element for embed toolbar
						type: 'html',
						html: '<div class="ppr-whn-ld-dn" id="nvd_EquationToolbar' + window.CCounter + '"></div>',
					},

					(!(CKEDITOR.env.ie && CKEDITOR.env.version === 8)) && {
						id: 'preview',
						type: 'html',
						html:
							'<div class = "nvd-math-prw" style="text-align:center;">' +
							'<iframe style="border:0;width:0;height:0;font-size:16px; margin: auto" scrolling="no" frameborder="0" allowTransparency="true" src="' + CKEDITOR.plugins.nvd_math.fixSrc + '"></iframe>' +
							'</div>',

						onLoad: function () {
							var iFrame = CKEDITOR.document.getById(this.domId).getChild(0);
							preview = new CKEDITOR.plugins.nvd_math.frameWrapper(iFrame, editor);
						},

						setup: function (widget) {
							preview.setValue(widget.data.math);
						}
					},
					{
						//this element for embed toolbar
						type: 'html',
						html: '<label class="ppr-whn-ld-dn">Công thức (định dạng LaTeX):</div>',
					},
					//place to insert latex code.
					{
						type: 'textarea',
						class: "nvd-math-txtr unique ppr-whn-ld-dn",
						label: '',
						id: 'nvd-eqtn-txtr' + window.CCounter,

						onLoad: function () {
							var that = this;
							if (!(CKEDITOR.env.ie && CKEDITOR.env.version === 8)) {
								this.getInputElement().on('input', function () {
									// Add \( and \) for preview.
									preview.setValue('\\(' + that.getInputElement().getValue() + '\\)');
								});
							}
							EqEditor.add(new EqTextArea('', this.getInputElement().getAttribute('id')), false);

						},

						setup: function (widget) {
							// Remove \( and \).
							this.setValue(CKEDITOR.plugins.nvd_math.trim(widget.data.math));
							window._widget = widget;
						},

						commit: function (widget) {
							// Add \( and \) to make TeX be parsed by MathJax by default.
							window._widget = widget;
							widget.setData('math', '\\(' + this.getValue() + '\\)');
						}
					},

					]
			}
		],
		onLoad: function () {
			//embed toolbar 
			EqEditor.embed('nvd_EquationToolbar' + window.CCounter, '', 'efull');

			refineOnClickEvents();
		},

		onShow: function () {
			var dialog = this;
			var sel = editor.getSelection();
			var image = sel.getStartElement().getAscendant('img', true);


			if (document.querySelectorAll(".ppr-whn-ld-dn").length !== 0) {
				var loaderContent = '<div style="display: flex;flex-direction: column;" class="dppr-whn-ld-dn"> ' +
					'<img src="https://i.imgur.com/G6BCakp.gif" style="margin: auto; width: 80px; height: 80px" alt="" /> ' +
					'<div class="nvd-loader-text"> loading </div></div>';

				var loaderDiv = document.createElement('div');
				loaderDiv.innerHTML = loaderContent;
				document.querySelector("[name^='NVD_CCEquationEditor']").prepend(loaderDiv);
			}

			//#region simulate async
			setTimeout(function () {
				document.querySelectorAll(".ppr-whn-ld-dn").forEach(ele => { ele.classList.remove("ppr-whn-ld-dn") });
				document.querySelectorAll(".dppr-whn-ld-dn").forEach(ele => { ele.classList.add("d-none") });
				document.querySelector('.nvd-math-txtr').focus();
			}, 2000);

		},
	}

});

var http;
if ('https:' === document.location.protocol)
	http = 'https://';
else http = 'http://';
var host = 'latex.codecogs.com';

var EQUATION_ENGINE = http + host;
var FAVORITE_ENGINE = http + host + '/json';
var EDITOR_SRC = http + host;
var EDITOR_SW_FLASH = http + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0';
var EDITOR_SW_PLAYER = http + 'www.macromedia.com/go/getflashplayer';

function CCgetId(n) {
	return document.getElementById(n);
}
function CConchange(n, fn) {
	var a = CCgetId(n);
	if (a) a.onchange = fn;
}
function CConclick(n, fn) {
	var a = CCgetId(n);
	if (a) a.onclick = fn;
}
var nocookies = false;
var Cookie = {
	set: function (c_name, value, expiredays) {
		if (nocookies) return;
		{
			var exdate = new Date();
			exdate.setDate(exdate.getDate() + expiredays);
			document.cookie = c_name + "=" + escape(value) + (expiredays === null ? ";SameSite=None; Secure" : ";SameSite=None; Secure;expires=" + exdate.toGMTString());
		}
	},
	get: function (c_name) {
		if (document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_name + "=");
			if (c_start !== -1) {
				c_start = c_start + c_name.length + 1;
				var c_end = document.cookie.indexOf(";", c_start);
				if (c_end === -1) c_end = document.cookie.length;
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	},
};
var URL = {
	get: function (type, default_val) {
		if (window.location.href.match(type + "=")) return window.location.href.split(type + "=")[1].split("&")[0];
		return default_val;
	},
};
var Opacity = {
	set: function (id, opacity) {
		var obj = CCgetId(id).style;
		obj.opacity = opacity / 100;
		obj.MozOpacity = opacity / 100;
		obj.KhtmlOpacity = opacity / 100;
		obj.filter = "alpha(opacity=" + opacity + ")";
	},
	fade: function (id, opacStart, opacEnd, millisec) {
		var speed = Math.round(millisec / 100);
		var sgn = opacStart > opacEnd ? -1 : 1;
		var count = sgn * (opacEnd - opacStart);
		for (var i = 1; i < count; i++) setTimeout("Opacity.set('" + id + "'," + (i * sgn + opacStart) + ")", i * speed);
	},
	fadeout: function (id) {
		if (CCgetId(id)) {
			this.fade(id, 100, 10, 800);
			setTimeout("CCgetId('" + id + "').style.display='none'", 800);
		}
	},
	fadein: function (id) {
		if (CCgetId(id)) {
			this.set(id, 20);
			CCgetId(id).style.display = "block";
			this.fade(id, 20, 100, 800);
		}
	},
};
var Panel = {
	plock: null,
	ctimer: null,
	otimer: null,
	oid: null,
	timer: Array(),
	open: function (a) {
		if (a) {
			var id = a.id;
			if (this.timer[id] !== "") {
				clearTimeout(this.timer[id]);
				this.timer[id] = "";
			}
			this.timer[id] = setTimeout("CCgetId('" + id + "').style.overflow='visible';", 200);
		}
	},
	close: function (a) {
		if (a) {
			var id = a.id;
			if (this.timer[id] !== "") {
				clearTimeout(this.timer[id]);
				this.timer[id] = "";
			}
			this.timer[id] = setTimeout("CCgetId('" + id + "').style.overflow='hidden';", 200);
		}
	},
	hoverdiv: null,
	hlock: false,
	hover: function (img, e) {
		if (this.hoverdiv) {
			this.lock = true;
			this.hoverdiv.innerHTML = '<img src="' + EQUATION_ENGINE + "/gif.latex?\\200dpi " + img.latex + '"/>';
			if (document.all) {
				this.hoverdiv.style.top = event.clientY - 10 + "px";
				this.hoverdiv.style.left = event.clientX + 20 + "px";
			} else {
				if (!e) e = window.event;
				this.hoverdiv.style.top = e.pageY - 10 + "px";
				this.hoverdiv.style.left = e.pageX + 20 + "px";
			}
			this.hoverdiv.style.display = "block";
			this.lock = false;
			img.onmouseout = Panel.hidehover;
		}
	},
	hidehover: function () {
		if (!this.hlock) CCgetId("hover").style.display = "none";
	},
	init: function (hoverbox, editorid) {
		this.hoverdiv = CCgetId(hoverbox);
		var divElem;
		if (editorid !== undefined) divElem = document.getElementById(editorid);
		else divElem = document;
		var areas = divElem.getElementsByTagName("area");
		for (var i = 0; i < areas.length; i++) {
			areas[i].onmouseover = function (e) {
				Panel.hover(this, e);
			};
			var latex = areas[i].alt;
			areas[i].latex = latex;
			areas[i].alt = "";
			if (areas[i].title === "") areas[i].title = latex;
			if (areas[i].onclick === undefined)
				areas[i].onclick = function () {
					EqEditor.insert(this.latex);
				};
		}
		if (divElem.getElementsByClassName === undefined) {
			divElem.getElementsByClassName = function (className) {
				var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
				var allElements = divElem.getElementsByTagName("*");
				var results = [];
				var element;
				for (var i = 0; (element = allElements[i]) !== null; i++) {
					var elementClass = element.className;
					if (elementClass && elementClass.indexOf(className) !== -1 && hasClassName.test(elementClass)) results.push(element);
				}
				return results;
			};
		}
		var panels = divElem.getElementsByClassName("panel");
		for (i = 0; i < panels.length; i++)
			if (panels[i].id !== "") {
				panels[i].onmouseover = function (e) {
					Panel.open(this);
				};
				panels[i].onmouseout = function (e) {
					Panel.close(this);
				};
			}
	},
};

function EqTextArea(preview, input, comment, download, intro) {
	this.changed = false;
	this.orgtxt = "";
	this.bArray_id = [];
	this.bArray_area = [];
	this.bArray_mode = [];
	this.bsize = 0;
	this.updateExportArea = function () {
		for (var i = 0; i < this.bsize; i++) {
			var v = this.exportEquation(this.bArray_mode[i]);
			if (this.bArray_area[i].src !== undefined) this.bArray_area[i].src = v;
			else if (this.bArray_area[i].value !== undefined) this.bArray_area[i].value = v;
			else if (this.bArray_area[i].innerHTML !== undefined) this.bArray_area[i].innerHTML = v;
		}
	};
	this.addExportArea = function (textarea_id, mode) {
		var a = CCgetId(textarea_id);
		if (a) {
			this.bArray_id[this.bsize] = textarea_id;
			this.bArray_area[this.bsize] = a;
			this.bArray_mode[this.bsize] = mode;
			this.bsize++;
		}
	};
	this.changeExportArea = function (textarea_id, mode) {
		for (var i = 0; i < this.bsize; i++) {
			if (textarea_id === this.bArray_id[i]) {
				this.bArray_mode[i] = mode;
				i = this.bsize;
			}
		}
	};
	this.myUndo = 0;
	this.myRedo = 0;
	this.store_text = [];
	this.store_text.push("");
	this.addEvent = function (action, fn) {
		if (this.equation_input.addEventListener) this.equation_input.addEventListener(action, fn, false);
		else this.equation_input.attachEvent("on" + action, fn);
	};
	this.set = function (preview, input, comment, download, intro) {
		if (preview === undefined || preview === "") preview = "equationview";
		if (input === undefined || input === "") input = "latex_formula";
		if (comment === undefined || comment === "") comment = "equationcomment";
		if (download === undefined || download === "") download = "download";
		if (intro === undefined || intro === "") intro = "intro";
		this.equation_preview = CCgetId(preview);
		this.equation_input = CCgetId(input);
		this.equation_comment = CCgetId(comment);
		this.equation_download = CCgetId(download);
		this.intro_text = intro;
		if (this.equation_input) {
			this.addEvent("keydown", function (e) {
				Panel.close();
				EqEditor.countclick();
				EqEditor.tabHandler(e);
			});
			this.addEvent("keyup", function () {
				EqEditor.textchanged();
				EqEditor.autorenderEqn(10);
			});
			this.addEvent("keypress", function (e) {
				EqEditor.keyHandler(e);
			});
			if (CCgetId(this.intro_text)) {
				CCgetId(this.intro_text).onclick = function (e) {
					EqEditor.targetArea.equation_input.focus();
					Opacity.fadeout(this.intro_text);
				};
			}
		}
	};
	this.setText = function (val) {
		var latex = unescape(
			val
				.replace(/&space;/g, " ")
				.replace(/&plus;/g, "+")
				.replace(/&hash;/g, "#")
				.replace(/@plus;/g, "+")
				.replace(/@hash;/g, "#")
		);
		EqEditor.reset();
		var i, subtex, go;
		do {
			go = 0;
			latex = latex.replace(new RegExp("^[\\s]+", "g"), "");
			i = latex.indexOf(" ");
			var ii = latex.indexOf("}");
			if (ii !== -1 && (ii < i || i === -1)) i = ii;
			if (i !== -1) {
				subtex = latex.substr(0, i);
				if (EqEditor.setSelIndx("fontsize", subtex)) go = 1;
				if (subtex === "\\inline") {
					CCgetId("inline").checked = true;
					CCgetId("compressed").checked = true;
					go = 1;
				}
				if (subtex.substr(0, 4) === "\\bg_" && EqEditor.setSelIndx("bg", subtex.substr(4))) go = 1;
				if (subtex.substr(0, 4) === "\\fn_" && EqEditor.setSelIndx("font", subtex.substr(4))) go = 1;
				if (subtex.substr(0, 5) === "\\dpi{" && EqEditor.setSelIndx("dpi", subtex.substr(5))) go = 1;
				if (go) latex = latex.substr(i + 1);
			}
		} while (go);
		if (latex.length > 0) {
			this.equation_input.value = latex;
			this.textchanged();
			this.renderEqn();
		}
	};
	this.clearText = function () {
		this.equation_input.value = "";
		this.equation_input.focus();
		this.changed = false;
		this.equation_preview.src = EDITOR_SRC + "/images/spacer.gif";
		Opacity.fadein(this.intro_text);
	};
	this.textchanged = function () {
		var txt = this.getEquationStr();
		if (txt.length === 0) Opacity.fadein(this.intro_text);
		else Opacity.fadeout(this.intro_text);
		if (txt !== this.orgtxt) {
			this.orgtxt = txt;
			this.changed = true;
			return true;
		}
		return false;
	};
	this.auton = 0;
	this.renderCountdown = function () {
		if (this.auton > 0) {
			this.auton--;
			var fn = new Function(this.renderCountdown());
			setTimeout(fn, 100);
		} else this.renderEqn(null);
	};
	this.autorenderEqn = function (n) {
		if (this.auton > 0 && n > 0) this.auton = n;
		else {
			this.auton = n;
			this.renderCountdown();
		}
	};
	this.insertText = function (txt, pos, inspos) {
		var key_text = "";
		if (pos === 1000) {
			pos = txt.length - 1;
		}
		if (pos === null) {
			pos = txt.indexOf("{") + 1;
			if (pos <= 0) {
				txt += " ";
				pos = txt.length;
			} else {
				if (txt.charAt(pos) !== "}") pos = txt.indexOf("}", pos) + 1;
			}
		}
		var insert_pos = inspos === null ? pos : inspos;
		var i;
		var myField = this.equation_input;
		var leftbracket = txt.substring(1, 5) === "left";
		if (document.selection) {
			myField.focus();
			var sel = document.selection.createRange();
			i = this.equation_input.value.length + 1;
			var theCaret = sel.duplicate();
			var ins_point;
			while (theCaret.parentElement() === myField && theCaret.move("character", 1) === 1) --i;
			if ((leftbracket || insert_pos >= 0) && sel.text.length) {
				if (leftbracket) ins_point = 7;
				else ins_point = insert_pos;
				if (insert_pos === null) pos = txt.length + sel.text.length + 1;
				else if (insert_pos < pos) pos += sel.text.length;
				sel.text = txt.substring(0, ins_point) + sel.text + txt.substr(ins_point);
			} else sel.text = txt;
			var range = myField.createTextRange();
			range.collapse(true);
			pos = i + pos;
			pos -= myField.value.substr(0, pos).split("\n").length - 1;
			range.moveEnd("character", pos);
			range.moveStart("character", pos);
			range.select();
		} else {
			if (myField.selectionStart || myField.selectionStart === "0") {
				var startPos = myField.selectionStart;
				var endPos = myField.selectionEnd;
				var cursorPos = startPos + txt.length;
				if ((leftbracket || insert_pos >= 0) && endPos > startPos) {
					if (leftbracket) ins_point = 7;
					else ins_point = insert_pos;
					if (insert_pos === null) pos = txt.length + endPos - startPos + 1;
					else if (insert_pos < pos) pos += endPos - startPos;
					txt = txt.substring(0, ins_point) + myField.value.substring(startPos, endPos) + txt.substr(ins_point);
				}
				myField.value = myField.value.substring(0, startPos) + txt + myField.value.substring(endPos, myField.value.length);
				myField.selectionStart = cursorPos;
				myField.selectionEnd = cursorPos;
				myField.focus();
				myField.setSelectionRange(startPos + pos, startPos + pos);
			} else myField.value += txt;
		}
		this.textchanged();
		this.autorenderEqn(10);
		Panel.close(null);
		myField.focus();
	};
	this.getLaTeX = function () {
		var a = this.equation_input.value.replace(/^\s+|\s+$/g, "").replace(/\s+/g, " ");
		if (a.length > 0) return EqEditor.getSize() + a;
		return "";
	};
	this.getEquationStr = function () {
		var a = this.getLaTeX();
		if (a.length > 0) return EqEditor.getCompressed() + EqEditor.getDPI() + EqEditor.getBG() + EqEditor.getFont() + a;
		return "";
	};
	this.exportMessage = function (text) {
		var a = CCgetId("exportmessage");
		if (a) a.innerHTML = text;
	};
	this.exportEquation = function (type) {
		var format = EqEditor.getFormat();
		switch (type) {
			case "safe":
				return this.getEquationStr().replace(/\s/g, "&space;").replace(/\+/g, "&plus;").replace(/#/g, "&hash;");
			case "encoded":
				return escape(this.getEquationStr()).replace(/\+/g, "&plus;");
			case "wp":
				{
					this.exportMessage("Wordpress markup for this equation is:");
					return EqEditor.get_inline_wrap(this.getLaTeX(), "[latex]{$TEXT}[/latex]\n", "$latex {$TEXT}$ ");
				}
			case "phpBB":
				{
					this.exportMessage("PHP Bulletin Board markup for this equation is:");
					return "[tex]" + this.getLaTeX() + "[/tex]\n";
				}
			case "tw":
				{
					this.exportMessage("TiddlyWiki markup for this equation is:");
					var text = this.getEquationStr();
					text = text.replace(/\[/g, "%5B");
					text = text.replace(/\]/g, "%5D");
					return "[img[" + EQUATION_ENGINE + "/" + format + ".latex?" + text.replace(/#/g, "&hash;") + "]]";
				}
			case "url":
				{
					this.exportMessage("The URL link to this equation is:");
					return EQUATION_ENGINE + "/" + format + ".latex?" + this.exportEquation("safe");
				}
			case "urlencoded":
				{
					this.exportMessage("The Encoded URL link to this equation is:");
					return EQUATION_ENGINE + "/" + format + ".latex?" + this.exportEquation("encoded");
				}
			case "pre":
				{
					this.exportMessage("HTML code using pre-tags is:");
					return EqEditor.get_inline_wrap(this.getLaTeX(), '<pre xml:lang="latex">{$TEXT}</pre>\n', '<code xml:lang="latex">{$TEXT}</code> ');
				}
			case "doxygen":
				{
					this.exportMessage("DOxygen markup for this equation is:");
					return EqEditor.get_inline_wrap(this.getLaTeX(), "\\f[{$TEXT}\\f]\n", "\\f${$TEXT}\\f$ ");
				}
			case "htmledit":
				{
					this.exportMessage("HTML code to embed this equation into a web page is:");
					var a = this.exportEquation("safe");
					if (format === "swf")
						return (
							'<a href="' +
							EDIT_ENGINE +
							"?latex=" +
							a +
							'" target="_blank">' +
							AC_FL_RunContent(
								"codebase",
								EDITOR_SW_FLASH,
								"width",
								"600",
								"height",
								"100",
								"src",
								EQUATION_ENGINE + "/swf.latex?" + a,
								"quality",
								"high",
								"pluginspage",
								EDITOR_SW_PLAYER,
								"align",
								"top",
								"scale",
								"showall",
								"wmode",
								"window",
								"devicefont",
								"false",
								"bgcolor",
								"#ffffff",
								"menu",
								"true",
								"allowFullScreen",
								"true",
								"movie",
								EQUATION_ENGINE + "/swf.latex?" + text
							) +
							"</a>"
						);
					else return '<a href="' + EDIT_ENGINE + "?latex=" + a + '" target="_blank"><img src="' + EQUATION_ENGINE + "/" + format + ".latex?" + a + '" title="' + this.getLaTeX() + '" /></a>';
				}
			case "html":
				{
					this.exportMessage("HTML code to embed this equation into a web page is:");
					var a = this.exportEquation("safe");
					if (format === "swf")
						return AC_FL_RunContent(
							"codebase",
							EDITOR_SW_FLASH,
							"width",
							"600",
							"height",
							"100",
							"src",
							EQUATION_ENGINE + "/swf.latex?" + a,
							"quality",
							"high",
							"pluginspage",
							EDITOR_SW_PLAYER,
							"align",
							"top",
							"scale",
							"showall",
							"wmode",
							"window",
							"devicefont",
							"false",
							"bgcolor",
							"#ffffff",
							"menu",
							"true",
							"allowFullScreen",
							"true",
							"movie",
							EQUATION_ENGINE + "/swf.latex?" + a
						);
					else return '<img src="' + EQUATION_ENGINE + "/" + format + ".latex?" + a + '" title="' + this.getLaTeX() + '" />';
				}
			default:
				{
					this.exportMessage("LaTeX markup for this equation is:");
					return EqEditor.get_inline_wrap(this.getLaTeX(), "\\[{$TEXT}\\]\n", "${$TEXT}$ ");
				}
		}
		return text;
	};
	this.setdownload = function (text) {
		if (this.equation_download) this.equation_download.innerHTML = text;
	};
	this.setcomment = function (text) {
		if (this.equation_comment) this.equation_comment.innerHTML = text;
	};
	this.renderEqn = function (callback) {
		/* var val = this.equation_input.value;
		val = val.replace(/^\s+|\s+$/g, "");
		if (val.length === 0) return true;
		var bracket = 0;
		var i;
		for (i = 0; i < val.length; i++) {
			switch (val.charAt(i)) {
				case "{":
					if (i === 0 || val[i - 1] !== "\\") bracket++;
					break;
				case "}":
					if (i === 0 || val[i - 1] !== "\\") bracket--;
					break;
				default: { }
			}
		}
		if (bracket === 0) {
			if (CCgetId("renderbutton")) CCgetId("renderbutton").className = "greybutton";
			var img = this.equation_preview;
			var val = this.exportEquation("encoded");
			var sval = val.replace(/"/g, '\\"');
			var format = EqEditor.getFormat();
			if (this.changed) {
				this.setcomment("");
				switch (format) {
					case "gif":
					case "png":
					case "svg":
						img.src = EQUATION_ENGINE + "/" + format + ".latex?" + val;
						this.setdownload('<a href="' + EQUATION_ENGINE + "/" + format + ".download?" + sval + '">Click here to Download Image (' + format.toUpperCase() + ")</a>");
						break;
					case "pdf":
						img.src = EQUATION_ENGINE + "/gif.latex?" + val;
						this.setdownload('<a target="_blank" href="' + EQUATION_ENGINE + "/pdf.download?" + sval + '"><img src="images/pdf.jpg" width="30" height="30" align="middle" />Click here to Download Equation (PDF)</a>');
						break;
					default: { }
				}
				this.updateExportArea();
			}
		} else {
			if (bracket < 0) this.setcomment("<br/><span class=\"orange\">You have more <strong>closed '}' brackets</strong> than open '{' brackets</span>");
			else this.setcomment("<br/><span class=\"orange\">You have more <strong>open '{' brackets</strong> than closed '}' brackets</span>");
		} */
		this.changed = false;
	};
	this.clickval = 0;
	this.countclick = function () {
		var x = this.equation_input.value;
		this.clickval++;
		if (this.clickval >= 3) {
			this.clickval = 0;
			if (this.myUndo === 0 || this.store_text[this.myUndo] !== x) {
				if (this.myUndo > 20) this.store_text.shift();
				else this.myUndo++;
				this.store_text[this.myUndo] = x;
			}
		}
		this.myRedo = 0;
	};
	this.undo = function (box) {
		if (this.myRedo === 0) {
			if (this.myUndo > 20) this.store_text.shift();
			else this.myUndo++;
			this.store_text[this.myUndo] = this.equation_input.value;
		}
		if (this.myRedo < this.myUndo) {
			this.myRedo++;
			if (this.myRedo === this.myUndo && CCgetId("undobutton")) CCgetId("undobutton").src = EDITOR_SRC + "/images/buttons/undo-x.gif";
			var a = CCgetId("redobutton");
			if (a) a.src = EDITOR_SRC + "/images/buttons/redo.gif";
		} else return;
		var z = this.store_text.length - this.myRedo - 1;
		if (this.store_text[z]) this.equation_input.value = this.store_text[z];
		else this.equation_input.value = this.store_text[0];
		this.equation_input.focus();
	};
	this.redo = function (box) {
		if (this.myRedo > 0) {
			this.myRedo--;
			if (this.myRedo === 0 && CCgetId("redobutton")) CCgetId("redobutton").src = EDITOR_SRC + "/images/buttons/redo-x.gif";
			var a = CCgetId("undobutton");
			if (a) a.src = EDITOR_SRC + "/images/buttons/undo.gif";
		} else return;
		var z = this.store_text.length - this.myRedo - 1;
		if (this.store_text[z]) this.equation_input.value = this.store_text[z];
		else this.equation_input.value = this.store_text[0];
		this.equation_input.focus();
	};
	this.Export = function (fnobj, type) {
		Example.add_history(this.equation_input.value);
		Example.hide();
		fnobj(this.exportEquation(type));
	};
	this.load = function (val) {
		if (typeof val !== "undefined") this.setText(val);
	};
	if (preview !== undefined) this.set(preview, input, comment, download, intro);
}

var gallery = null;
var Example = {
	lastbutton: null,
	load_json: function (file, text) {
		var old = CCgetId("load_json");
		if (old !== null) {
			old.parentNode.removeChild(old);
			old = null;
		}
		var d = new Date();
		text = "rand=" + d.getTime() + "&" + text;
		var head = document.getElementsByTagName("head")[0];
		var script = document.createElement("script");
		script.src = FAVORITE_ENGINE + "/" + file + "?" + text;
		script.id = "load_json";
		head.appendChild(script);
	},
	add_fav: function () {
		var text = EqEditor.targetArea.getEquationStr();
		if (text !== "") {
			this.load_json("favorite_json.php", "sid=" + EqEditor.SID + "&add&eqn=" + escape(text.replace(/\+/g, "@plus;").replace(/#/g, "@hash;")));
			setTimeout("Example.show(null, 'fav')", 200);
		}
	},
	del_fav: function (name) {
		this.load_json("favorite_json.php", "sid=" + EqEditor.SID + "&delete=" + name);
		setTimeout("Example.show(null, 'fav')", 200);
	},
	add_history: function (text) {
		if (text !== "") {
			this.load_json("history_json.php", "sid=" + EqEditor.SID + "&add&eqn=" + escape(text.replace(/\+/g, "@plus;").replace(/#/g, "@hash;")));
		}
	},
	show: function (button, group) {
		CCgetId("bar1").style.display = "none";
		CCgetId("bar2").style.display = "block";
		if (CCgetId("photos")) CCgetId("photos").innerHTML = "";
		if (button !== null) {
			if (this.lastbutton !== null) this.lastbutton.className = "lightbluebutton";
			button.className = "greybutton";
			this.lastbutton = button;
		}
		gallery = new Scroll();
		if (group === "fav" || group === "history") {
			var d = new Date();
			gallery.init("photos", "leftarrow", "rightarrow", "overview", FAVORITE_ENGINE + "/example_json.php?fn=gallery&rand=" + d.getTime() + "&sid=" + EqEditor.SID);
		} else gallery.init("photos", "leftarrow", "rightarrow", "overview", FAVORITE_ENGINE + "/example_json.php?fn=gallery");
		gallery.visible_num = 1;
		gallery.new_offset = 5;
		gallery.maxpanels = 1;
		gallery.set_width(600, 100, 60);
		gallery.set_subtext("&type=" + group);
		gallery.add_panel();
		gallery.setarrow();
		gallery.setoverview();
	},
	hide: function () {
		CCgetId("bar2").style.display = "none";
		CCgetId("bar1").style.display = "block";
		if (this.lastbutton !== null) this.lastbutton.className = "lightbluebutton";
		this.lastbutton = null;
	},
};

var ExportButton = {
	bArray_id: [],
	bArray_area: [],
	bArray_mode: [],
	bArray_fn: [],
	bsize: 0,
	state: function (state) {
		for (var i = 0; i < this.bsize; i++) {
			if (state) this.bArray_id[i].className = "lightbluebutton";
			else this.bArray_id[i].className = "greybutton";
		}
	},
	add: function (textarea, button_id, targetFn, mode) {
		var a = CCgetId(button_id);
		if (a) {
			this.bArray_id[this.bsize] = a;
			this.bArray_area[this.bsize] = textarea;
			this.bArray_mode[this.bsize] = mode;
			this.bArray_fn[this.bsize] = targetFn;
			a.onclick = function (e) {
				var i = this.exportid;
				ExportButton.bArray_area[i].Export(ExportButton.bArray_fn[i], ExportButton.bArray_mode[i]);
				window.close();
			};
			a.exportid = this.bsize;
			this.bsize++;
		}
	},
};

var EqEditor = {
	SID: 0,
	copy_button: null,
	key_text: "",
	format: "gif",
	setSelIndx: function (id, v) {
		var s = CCgetId(id);
		if (s)
			for (var i = 0; i < s.options.length; i++) {
				if (s.options[i].value === v) {
					s.options[i].selected = true;
					return true;
				}
			}
		return false;
	},
	targetArray: [],
	targetSize: 0,
	targetArea: null,
	curTarget: 0,
	changeExportArea: function (id, mode) {
		for (var i = 0; i < this.targetSize; i++) this.targetArray[i].changeExportArea(id, mode);
	},
	autorenderEqn: function (n) {
		this.targetArea.autorenderEqn(n);
	},
	change: function (i) {
		if (i !== this.curTarget) {
			this.curTarget = i;
			this.key_rext = "";
		}
		this.targetArea = this.targetArray[i];
	},
	add: function (obj, resize) {
		this.targetArray[this.targetSize] = obj;
		obj.equation_input.onfocus = new Function("EqEditor.change(" + this.targetSize + ");");
		if (resize) {
			if (window.addEventListener) window.addEventListener("resize", new Function("EqEditor.resize(" + this.targetSize + ");"), false);
			else window.attachEvent("onresize", new Function("EqEditor.resize(" + this.targetSize + ");"));
			EqEditor.resize(this.targetSize);
		}
		if (this.targetSize === 0) obj.equation_input.focus();
		this.targetSize++;
	},
	editor_id: null,
	embed: function (id, SID, design, language) {
		if (this.targetSize > 0) {
			this.targetArray = [];
			this.targetSize = 0;
			this.targetArea = null;
			this.curTarget = 0;
		}
		if (this.editor_id !== id) {
			this.editor_id = id;
			document.getElementById('nvd_EquationToolbar' + window.CCounter).innerHTML = toolbarPlainText;
		}
	},
	moveto: function (id) {
		if (id !== this.editor_id) {
			var newNode = CCgetId(id);
			while (CCgetId(this.editor_id).childNodes[0]) {
				var oldNode = CCgetId(this.editor_id).childNodes[0];
				oldNode.parentNode.removeChild(oldNode);
				newNode.appendChild(oldNode);
			}
			this.editor_id = id;
		}
	},
	targetFn: null,
	copyToTarget: function (text) {
		if (this.targetFn !== null) this.targetFn(text);
	},
	reset: function () {
		this.setSelIndx("format", "gif");
		this.setSelIndx("font", "");
		this.setSelIndx("fontsize", "");
		this.setSelIndx("dpi", "110");
		this.setSelIndx("bg", "Transparent");
	},
	init: function (SID, obj, resize, editorid) {
		Panel.init("hover", editorid);
		if (SID === "") {
			this.SID = Cookie.get("eqeditor");
			if (!this.SID) {
				var d = new Date();
				this.SID = d.getTime();
				Cookie.set("eqeditor", SID, 30);
			}
		} else this.SID = SID;
		if (obj !== undefined) {
			this.add(obj, resize);
			this.targetArea = obj;
		}
		this.setSelIndx("format", Cookie.get("format"));
		this.setSelIndx("font", Cookie.get("font"));
		this.setSelIndx("fontsize", Cookie.get("fontsize"));
		this.setSelIndx("dpi", Cookie.get("dpi"));
		this.setSelIndx("bg", Cookie.get("bg"));
		CConclick("undobutton", function (e) {
			EqEditor.targetArea.undo();
		});
		CConclick("redobutton", function (e) {
			EqEditor.targetArea.redo();
		});
		CConchange("bg", function (e) {
			var b = CCgetId("bg");
			if (b) {
				Cookie.set("bg", b.value, 10);
			}
			EqEditor.update();
		});
		CConchange("dpi", function (e) {
			var d = CCgetId("dpi");
			if (d) {
				Cookie.set("dpi", d.value, 10);
			}
			EqEditor.update();
		});
		CConchange("font", function (e) {
			var f = CCgetId("font");
			if (f) {
				Cookie.set("font", f.value, 10);
			}
			EqEditor.update();
		});
		CConchange("format", function (e) {
			var action = false;
			EqEditor.setFormat(EqEditor.getFormat());
		});
		CConchange("fontsize", function () {
			var f = CCgetId("fontsize");
			if (f) {
				Cookie.set("fontsize", f.value, 10);
			}
			EqEditor.update();
		});
		CConclick("inline", function (e) {
			var a = CCgetId("compressed");
			if (a) a.checked = this.checked;
			EqEditor.update();
		});
		CConclick("compressed", function (e) {
			EqEditor.update();
		});
	},
	textchanged: function () {
		if (this.targetArea.textchanged()) ExportButton.state(true);
	},
	update: function () {
		this.targetArea.textchanged();
		this.targetArea.renderEqn(null);
	},
	load: function (txt) {
		if (this.targetArea !== null) this.targetArea.load(txt);
	},
	insert: function (txt, pos, inspos) {
		if (this.targetArea !== null) {

			this.targetArea.insertText(txt, pos, inspos);
			ExportButton.state(true);
		}
	},
	getTextArea: function () {
		if (this.targetArea !== null) return this.targetArea;
		return null;
	},
	clearText: function () {
		this.targetArea.clearText();
		ExportButton.state(false);
	},
	setFormat: function (type) {
		EqEditor.format = type;
		var action;
		switch (type) {
			case "gif":
				action = false;
				break;
			case "png":
				action = false;
				break;
			case "pdf":
				action = true;
				break;
			case "swf":
				action = true;
				break;
			case "emf":
				action = true;
				break;
			default: { }
		}
		Cookie.set("format", type, 10);
		var a = CCgetId("dpi");
		if (a) {
			a.disabled = action;
			a.readonly = action;
		}
		a = CCgetId("bg");
		if (a) {
			a.disabled = action;
			a.readonly = action;
		}
		EqEditor.targetArea.changed = true;
		EqEditor.targetArea.renderEqn(null);
	},
	getFormat: function () {
		var a = CCgetId("format");
		if (a) return a.value;
		return EqEditor.format;
	},
	getFont: function () {
		var a = CCgetId("font");
		if (a && a.value !== "") return "\\fn_" + a.value + " ";
		return "";
	},
	getSize: function () {
		var a = CCgetId("fontsize");
		if (a && a.value !== "") return a.value + " ";
		return "";
	},
	getDPI: function () {
		var a = CCgetId("dpi");
		if (a && a.value !== "110") return "\\dpi{" + a.value + "} ";
		return "";
	},
	getBG: function () {
		var a = CCgetId("bg");
		if (a) {
			var b = a.value.toLowerCase();
			if (b !== "transparent") return "\\bg_" + b + " ";
		}
		return "";
	},
	getCompressed: function () {
		var a = CCgetId("compressed");
		if (a && a.checked) return "\\inline ";
		return "";
	},
	get_inline_wrap: function (text, norm, inline) {
		var a = CCgetId("inline");
		if (a) {
			var b = CCgetId("compressed");
			if (a.checked) {
				if (!b.checked) text = "\\displaystyle " + text;
				return inline.replace("{$TEXT}", text);
			} else {
				if (b.checked) text = "\\inline " + text;
				return norm.replace("{$TEXT}", text);
			}
		}
		return norm.replace("{$TEXT}", text);
	},
	extendchar: null,
	countclick: function () {
		this.targetArea.countclick();
		var a = CCgetId("redobutton");
		if (a) a.src = EDITOR_SRC + "/images/buttons/redo-x.gif";
		a = CCgetId("undobutton");
		if (a) a.src = EDITOR_SRC + "/images/buttons/undo.gif";
	},
	tabHandler: function (e) {
		var TABKEY = 9;
		var inp = this.targetArea.equation_input;
		if (e.keyCode === TABKEY) {
			if (document.selection) {
				var sel = document.selection.createRange();
				var i = inp.value.length + 1;
				var theCaret = sel.duplicate();
				while (theCaret.parentElement() === inp && theCaret.move("character", 1) === 1) --i;
				var startPos = i;
				if (startPos === inp.value.length) return true;
			} else {
				startPos = inp.selectionStart;
				if (startPos === inp.value.length) return true;
			}
			var a = inp.value.indexOf("{", startPos);
			if (a === -1) a = inp.value.length;
			else a++;
			var b = inp.value.indexOf("&", startPos);
			if (b === -1) b = inp.value.length;
			else b++;
			var c = inp.value.indexOf("\\\\", startPos);
			if (c === -1) c = inp.value.length;
			else c += 2;
			var pos = Math.min(Math.min(a, b), c);
			if (document.selection) {
				var range = inp.createTextRange();
				range.collapse(true);
				pos -= inp.value.substr(0, pos).split("\n").length - 1;
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select();
			} else inp.setSelectionRange(pos, pos);
			if (e.preventDefault) e.preventDefault();
			else e.returnValue = false;
			return false;
		}
	},
	backCursor: function (myField) {
		if (document.selection) {
			myField.focus();
			var sel = document.selection.createRange();
			if (sel.text.length > 0) sel.text = "";
			else {
				sel.moveEnd("character", 1);
				sel.text = "";
			}
			sel.select();
		} else if (myField.selectionStart || myField.selectionStart === "0") {
			var s = myField.selectionStart;
			var e = myField.selectionEnd;
			myField.value = myField.value.substring(0, s) + myField.value.substring(e + 1, myField.value.length);
			myField.selectionStart = s;
			myField.selectionEnd = s;
			myField.focus();
		}
	},
	extendkey: function (letter) {
		switch (this.key_text) {
			case "\\left":
				this.insert(" \\right " + letter, 0);
				break;
			case "\\frac":
			case "\\tfrac":
				if (letter === "}") this.insert("}{}", 0);
				break;
			case "\\begin":
				if (letter === "}") this.insert("} \\end{}", 0);
				break;
			default:
				this.insert(letter, 0);
		}
		this.extendchar = letter;
	},
	keyHandler: function (e) {
		var keycode;
		if (window.event) keycode = window.event.keyCode;
		else if (e) keycode = e.which;
		var keystr = String.fromCharCode(keycode);
		if (keystr === this.extendchar) this.backCursor(this.equation_input);
		this.extendchar = null;
		switch (keystr) {
			case "{":
				this.extendkey("}");
				break;
			case "[":
				this.extendkey("]");
				break;
			case "(":
				this.extendkey(")");
				break;
			case '"':
				this.extendkey('"');
				break;
			default: { }
		}
		if (keystr !== " ") {
			if (keystr === "\\") this.key_text = "\\";
			else if (!keystr.match(/^[a-zA-Z]$/)) this.key_text = "";
			else this.key_text += keystr;
		}
	},
	addText: function (wind, textbox, txt) {
		var myField = wind.getElementById(textbox);
		if (wind.selection) {
			myField.focus();
			var sel = wind.selection.createRange();
			sel.text = txt;
		} else {
			var scrolly = myField.scrollTop;
			if (myField.selectionStart || myField.selectionStart === "0") {
				var startPos = myField.selectionStart;
				var endPos = myField.selectionEnd;
				var cursorPos = startPos + txt.length;
				myField.value = myField.value.substring(0, startPos) + txt + myField.value.substring(endPos, myField.value.length);
				var pos = txt.length + endPos - startPos;
				myField.selectionStart = cursorPos;
				myField.selectionEnd = cursorPos;
				myField.focus();
				myField.setSelectionRange(startPos + pos, startPos + pos);
			} else myField.value += txt;
			myField.scrollTop = scrolly;
		}
	},
	makeEquationsMatrix: function (type, isNumbered, isConditional) {
		var xDim;
		xDim = document.getElementById("nvd-mtrx-x-dmnsn").value;

		if (xDim === '' || xDim === null || isNaN(xDim)) {
			document.getElementById("nvd-mtrx-x-dmnsn").setAttribute("value", 2);
			xDim = 2;
		}

		var dim = parseInt(xDim);
		if (dim > 9) {
			document.getElementById("nvd-mtrx-x-dmnsn").setAttribute("value", 9);
			xDim = 9;
			dim = 9;
		}

		if (isNumbered === undefined)
			isNumbered = false;
		if (isConditional === undefined) isNumbered = false;

		var eqns = '';
		var eqi = "\n&";
		var eqEnd = '\\end{' + type;

		if (isConditional) {
			eqns = eqns + "f(x) = ";
		}

		eqns = eqns + "\\begin{" + type;
		if (!isNumbered)
			eqns = eqns + "*}";
		else
			eqns = eqns + "}";


		if (!isNumbered)
			eqEnd = eqEnd + "*}";
		else
			eqEnd = eqEnd + "}";

		if (dim !== '' && dim !== null) {
			var rows = parseInt(dim);
			if (!isNaN(rows)) {
				for (var i = 1; i <= rows; i++) {
					eqi = "\n&";
					if (isNumbered)
						eqi = eqi + "";
					else
						eqi = eqi + "= ";
					if (isConditional) {
						eqi = eqi + 'f_{ ' + i + '}(x)\\ \\text{nếu} x <  x_{' + i + '}';
					}
					eqns = eqns + (eqi + "\\\\ ");
				}
				eqns = eqns + eqEnd;
				this.insert(eqns, type.length + ((isNumbered) ? 0 : 1) + 9);
			}
		}
	},
	makeArrayMatrix: function (type, start, end) {
		var matr = start + '\\begin{' + type + 'matrix}';
		var row = "\n";
		var mend = "\n\\end{" + type + "matrix}" + end;


		if (document.getElementById("nvd-mtrx-x-dmnsn") && document.getElementById("nvd-mtrx-x-dmnsn")) {
			var xDim, yDim;

			xDim = document.getElementById("nvd-mtrx-x-dmnsn").value;
			yDim = document.getElementById("nvd-mtrx-y-dmnsn").value;

			if (xDim === '' || xDim === null || isNaN(xDim)) {
				document.getElementById("nvd-mtrx-x-dmnsn").setAttribute("value", 1);
				xDim = 1;
			}

			if (yDim === '' || yDim === null || isNaN(yDim)) {
				document.getElementById("nvd-mtrx-y-dmnsn").setAttribute("value", 1);
				yDim = 1;
			}

			var m = parseInt(xDim);
			var n = parseInt(yDim);

			if (m > 9) {
				document.getElementById("nvd-mtrx-x-dmnsn").setAttribute("value", 9);
				xDim = 9;
				m = 9;
			}

			if (n > 9) {
				document.getElementById("nvd-mtrx-y-dmnsn").setAttribute("value", 9);
				yDim = 9;
				n = 9;
			}

			//check if user want to create system of linear equations
			var isSOLE = false;
			if (start === '\\left\\{' && end === '\\right.') {
				isSOLE = true;
			}


			if (!isNaN(m) && !isNaN(n)) {
				for (var mi = 1; mi <= m; mi++) {
					for (var ni = 1; ni <= n; ni++) {
						if (ni === 1) {
							row = row + 'a_{' + mi + ni + '} ';
							if (isSOLE) {
								row += 'x_{' + (ni - 1) + '}';
								if (ni !== n)
									row = row + ' +';
							}
						}
						else {
							row = row + ' &a_{' + mi + ni + '} ';
							if (isSOLE) {
								row += 'x_{' + (ni - 1) + '}';
								if (ni !== n)
									row = row + '\\ +';
							}
						}
					}
					if (isSOLE)
						row = row + ' = b_{' + mi + '} \\\\ \n';
					else row = row + '\\\\ \n';

				}
				matr = matr + row + mend;
			}
			this.insert(matr, type.length + start.length + 15);

		}
	},
	resize: function (num) {
		var x, y;
		if (self.innerHeight) y = self.innerHeight;
		else if (document.documentElement && document.documentElement.clientHeight) y = document.documentElement.clientHeight;
		else if (document.body) y = document.body.clientHeight;
		this.targetArray[num].equation_input.style.height = parseInt(Math.max((y - 200) / 3, 40)) + "px";
	},
};
var oDiv = document.createElement("div");
var oImg = document.createElement("img");
var Scroll = function () { };
Scroll.prototype = {
	init: function (maindiv, leftarrow, rightarrow, overview, newpanel_php) {
		this.panels = 0;
		this.maxpanels = 0;
		this.speed = 10;
		this.pause = 2;
		this.visible = 0;
		this.visible_num = 2;
		this.layers = [];
		this.layers_offset = [];
		this.new_offset = 0;
		this.subtext = "";
		this.vertical = false;
		this.left_arrow = document.getElementById(leftarrow);
		this.right_arrow = document.getElementById(rightarrow);
		this.maindiv = document.getElementById(maindiv);
		if (overview !== "") this.overview = document.getElementById(overview);
		else this.overview = null;
		if (newpanel_php.indexOf("_json") > -1) {
			this.ajax_php = null;
			this.json_php = newpanel_php;
			this.ajax_response_fn = null;
		} else {
			this.ajax_php = newpanel_php;
			this.json_php = null;
			var obj = this;
			this.ajax_response_fn = function () {
				obj.add_panel_response();
			};
		}
	},
	set_subtext: function (text) {
		this.subtext = text;
	},
	set_width: function (width, height, speed) {
		this.width = width;
		this.height = height;
		this.speed = speed;
		if (this.vertical) this.step = this.step_total = this.height / this.speed;
		else this.step = this.step_total = this.width / this.speed;
	},
	add: function (layer) {
		var offset = this.new_offset;
		if (this.vertical) this.new_offset += this.height;
		else this.new_offset += this.width;
		this.layers[this.panels] = layer;
		this.layers_offset[this.panels] = offset;
		this.panels++;
		if (this.panels > this.maxpanels) this.maxpanels = this.panels;
		layer.style.position = "absolute";
		if (this.vertical) layer.style.top = offset + "px";
		else layer.style.left = offset + "px";
	},
	add_id: function (layer_id) {
		var lyr = document.getElementById(layer_id);
		if (lyr) this.add(lyr);
	},
	add_panel_div: function (newdiv) {
		this.add(newdiv);
		this.maindiv.appendChild(newdiv);
		if (this.visible + this.visible_num >= this.panels) this.add_panel();
	},
	add_panel_response: function () {
		if (req.readyState === 4) {
			if (req.status === 200 && req.responseText.length > 0) {
				var newdiv = oDiv.cloneNode(false);
				newdiv.innerHTML = req.responseText;
				this.add_panel_div(newdiv);
			}
			this.setarrow();
			this.setoverview();
		}
	},
	add_panel_json: function (info) {
		if (info.length > 0) {
			var newdiv = oDiv.cloneNode(false);
			newdiv.innerHTML = info;
			this.add_panel_div(newdiv);
		}
		this.setarrow();
		this.setoverview();
	},
	add_panel: function () {
		if (this.ajax_php && this.ajax_response_fn) {
			if (this.ajax_php.indexOf("?") === -1) loadXMLDoc(this.ajax_php + "?panel=" + this.panels + this.subtext, this.ajax_response_fn);
			else loadXMLDoc(this.ajax_php + "&panel=" + this.panels + this.subtext, this.ajax_response_fn);
		} else if (this.json_php) {
			var a = this.panels;
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			if (this.json_php.indexOf("?") === -1) script.src = this.json_php + "?panel=" + a + this.subtext;
			else script.src = this.json_php + "&panel=" + a + this.subtext;
			head.appendChild(script);
		}
	},
	redraw: function () {
		if (this.json_php || (this.ajax_php && this.ajax_response_fn)) {
			this.panels = 0;
			this.visible = 0;
			this.new_offset = 0;
			while (this.maindiv.firstChild) {
				this.maindiv.removeChild(this.maindiv.firstChild);
			}
		}
		if (this.ajax_php && this.ajax_response_fn) {
			var obj = this;
			if (this.ajax_php.indexOf("?") === -1) loadXMLDoc(obj.ajax_php + "?panel=" + this.panels + this.subtext, obj.ajax_response_fn);
			else loadXMLDoc(obj.ajax_php + "&panel=" + this.panels + this.subtext, obj.ajax_response_fn);
		} else if (this.json_php) {
			var a = this.panels;
			var head = document.getElementsByTagName("head")[0];
			var script = document.createElement("script");
			if (this.json_php.indexOf("?") === -1) script.src = this.json_php + "?panel=" + a + this.subtext;
			else script.src = this.json_php + "&panel=" + a + this.subtext;
			head.appendChild(script);
		}
	},
	move: function (dx) {
		this.new_offset += dx;
		for (var p = 0; p < this.panels; p++) {
			this.layers_offset[p] += dx;
			if (this.vertical) this.layers[p].style.top = this.layers_offset[p] + "px";
			else this.layers[p].style.left = this.layers_offset[p] + "px";
		}
		this.step++;
		if (this.step < this.step_total) {
			var obj = this;
			window.setTimeout(function () {
				obj.move(dx);
			}, this.pause);
		}
	},
	setoverview: function () {
		if (this.overview !== null) {
			this.overview.innerHTML = "";
			var txt = "";
			var obj = this;
			for (var i = 0; i < this.maxpanels; i++) {
				var newimg = oImg.cloneNode(false);
				newimg.className = "overview";
				if (i >= this.visible && i < this.visible + this.visible_num) newimg.src = "http://www.codecogs.com/images/scroll/soliddot.gif";
				else {
					newimg.src = "http://www.codecogs.com/images/scroll/emptydot.gif";
					newimg.i = i;
					newimg.onclick = function () {
						obj.jump(this);
					};
				}
				this.overview.appendChild(newimg);
			}
		}
	},
	setarrow: function () {
		this.left_arrow.src = "http://www.codecogs.com/images/scroll/" + (this.visible <= 0 ? "leftarrow_grey.gif" : "leftarrow.gif");
		this.right_arrow.src = "http://www.codecogs.com/images/scroll/" + (this.visible >= this.panels - 1 ? "rightarrow_grey.gif" : "rightarrow.gif");
	},
	jump: function (obj) {
		if (this.step === this.step_total) {
			panel = obj.i;
			var gap = panel - this.visible;
			this.step = this.step_total - Math.abs(gap) * this.step_total;
			if (this.visible > panel) this.move(this.speed);
			else this.move(-this.speed);
			this.visible += gap;
			if (this.visible + this.visible_num >= this.panels) this.add_panel();
			else {
				this.setarrow();
				this.setoverview();
			}
		}
	},
	left: function () {
		if (this.step === this.step_total) {
			if (this.visible < this.panels - 1) {
				this.visible++;
				this.step = 0;
				this.move(-this.speed);
				if (this.visible + this.visible_num >= this.panels) this.add_panel();
				else {
					this.setarrow();
					this.setoverview();
				}
			}
		}
	},
	right: function () {
		if (this.step === this.step_total) {
			if (this.visible > 0) {
				this.step = 0;
				this.move(this.speed);
				this.visible--;
				this.setarrow();
				this.setoverview();
			}
		}
	},
	subsearch: function (text) {
		if (text !== "") this.subtext = "&subtext=" + text;
		else this.subtext = "";
		this.redraw();
	},
};

var toolbarPlainText = `
	<div>
		<div>
			<div style="display: flex;flex-direction: column;" class="dppr-whn-ld-dn"> <img
				src="https://imgur.com/G6BCakp.gif" style="margin: auto; width: 80px; height: 80px" alt="" />
				<div class="nvd-loader-text"> loading </div>
			</div>
		</div>
		<div class="ppr-whn-ld-dn" id="nvd_EquationToolbar" style="border-bottom: 1px solid #c4c4c4;">
			<div id="nvd-eqn-editor">
				<div id="hover">
				</div>
				<div id="bar1" class="top">
					<div class="toolbar_wrapper">
						<div class="toolbar" style="display: flex; justify-content: space-between;" style="z-index:23;">
							<div style="display: flex">
								<div class="panel">
									<!--	<img id="undobutton" src="https://latex.codecogs.com/legacy/eqneditor/images/buttons/undo-x.gif" alt="undo" title="undo" onclick="onUndoClick()" />
									<img id="redobutton" src="https://latex.codecogs.com/legacy/eqneditor/images/buttons/redo-x.gif"
										alt="redo" title="redo" onclick="EqEditor.targetArea.undo();" /> -->
									<input type="button" class="lightbluebutton" onclick="EqEditor.clearText()" value="Clear" title="Clear the editor window" />
								</div>
								<div style="display: flex" class="panel">
									<div class="bfr-slct-lbl" > Chèn màu sắc: </div>
									<select id="nvd-clr-slct" title="Color"
										onchange='EqEditor.insert(this.value, this.value.length-1);
										 document.getElementById("nvd-clr-slct").setAttribute("selectedIndex", 0); '>
										<option value="" selected="true">
											Màu ...
										</option>
										<option value="{\\color{Red} {text}}" >Red </option>
										<option value="{\\color{Green} {text}" >Green</option>
										<option value="{\\color{Blue} {text}" >Blue</option>
										<option value="{\\color{Yellow} {text}" >Yellow</option>
										<option value="{\\color{Cyan} {text}" >Cyan</option>
										<option value="{\\color{Magenta} {text}" >Magenta</option>
										<option value="{\\color{Teal} {text}" >Teal</option>
										<option value="{\\color{Purple} {text}">Purple</option>
										<option value="{\\color{Orange} {text}" >Orange</option>
									</select>
								</div>
							</div>
							<div style="display: flex" class="panel">
								<div class="bfr-slct-lbl" >Chèn hàm: </div>
								<select id="fnctn-slct" title="Functions"
									onchange="EqEditor.insert(this.value); this.selectedIndex=0;">
									<option selected="selected" value="" style="color:#8080ff">Functions…</option>
									<option value="\\displaystyle">display style</option>
									<optgroup label="Trig">
										<option value="\\sin">sin</option>
										<option value="\\cos">cos</option>
										<option value="\\tan">tan</option>
										<option value="\\csc">csc</option>
										<option value="\\sec">sec</option>
										<option value="\\cot">cot</option>
										<option value="\\sinh">sinh</option>
										<option value="\\cosh">cosh</option>
										<option value="\\tanh">tanh</option>
										<option value="\\coth">coth</option>
									</optgroup>
									<optgroup label="Inverse Trig">
										<option value="\\arcsin">arcsin</option>
										<option value="\\arccos">arccos</option>
										<option value="\\arctan">arctan</option>
										<option value="\\textrm{arccsc}">arccsc</option>
										<option value="\\textrm{arcsec}">arcsec</option>
										<option value="\\textrm{arccot}">arccot</option>
										<option value="\\sin^{-1}">sin-1</option>
										<option value="\\cos^{-1}">cos-1</option>
										<option value="\\tan^{-1}">tan-1</option>
										<option value="\\sinh^{-1}">sinh-1</option>
										<option value="\\cosh^{-1}">cosh-1</option>
										<option value="\\tanh^{-1}">tanh-1</option>
									</optgroup>
									<optgroup label="Logs">
										<option value="\\exp">exp</option>
										<option value="\\lg">lg</option>
										<option value="\\ln">ln</option>
										<option value="\\log">log</option>
										<option value="\\log_{e}">log e</option>
										<option value="\\log_{10}">log 10</option>
									</optgroup>
									<optgroup label="Limits">
										<option value="\\lim">limit</option>
										<option value="\\liminf">liminf</option>
										<option value="\\limsup">limsup</option>
										<option value="\\max">maximum</option>
										<option value="\\min">minimum</option>
										<option value="\\infty">infinite</option>
									</optgroup>
									<optgroup label="Operators">
										<option value="\\arg">arg</option>
										<option value="\\det">det</option>
										<option value="\\dim">dim</option>
										<option value="\\gcd">gcd</option>
										<option value="\\hom">hom</option>
										<option value="\\ker">ker</option>
										<option value="\\Pr">Pr</option>
										<option value="\\sup">sup</option>
										<option value="\\ran">ran</option>
									</optgroup>
								</select>
							</div>
						</div>
					</div>
					<div class="toolbar_wrapper" >
						<div style="display: flex; justify-content: space-between;">
						<div style = "display: flex">
							<div class="tlbr-lbl" style="width: 157px">Trình bày bố cục:</div>
							<div class="tlbr-lbl" style="width: 76px">Nhị phân:</div>
							<div class="tlbr-lbl" style="width: 76px">Tập hợp: </div>
							</div>
							<div>
							<div class="tlbr-lbl" style="width: 202px">Phép toán khác:</div>
						</div>
						</div>


						<div class="toolbar" style="z-index:22; display:flex; justify-content: space-between;">
							<div style =  "display:flex;" >
								<div class="panel" id="nvd-style-panel" style="height: 23px; overflow: hidden;">
									<img src="https://i.imgur.com/wVdR4DL.png" title="Style"
										alt="Style Panel" usemap="#style_map" width="106" height="184" border="0" />
									<map name="style_map" id="style_map">
										<area shape="rect" alt="" title="Math Bold Greek" coords="0,0,50,20" />
										<area shape="rect" alt="" title="Math Bold" coords="0,23,50,43" />
										<area shape="rect" alt="" title="Math Italic" coords="0,46,50,66" />
										<area shape="rect" alt="" title="Math Roman" coords="0,69,50,89" />
										<area shape="rect" alt="" title="Math Fraktur" coords="0,92,50,112" />
										<area shape="rect" alt="" title="Math Blackboard" coords="0,115,50,135" />
										<area shape="rect" alt="" title="Text Upright" coords="53,0,103,20" />
										<area shape="rect" alt="" title="Text Bold" coords="53,23,103,43" />
										<area shape="rect" alt="" title="Text Italic" coords="53,46,103,66" />
										<area shape="rect" alt="" title="Text Roman" coords="53,69,103,89" />
										<area shape="rect" alt="" title="Text Typewriter" coords="53,92,103,112" />
										<!--		<area shape="rect" alt="" title="Text Slanted" coords="53,92,103,112" />  -->
									<!--			<area shape="rect" alt="" title="Text Typewriter" coords="53,115,103,135" />-->
									<!--		<area shape="rect" alt="" title="Text Small Caps" coords="53,138,103,158" /> -->
								<!--	<area shape="rect" alt="" title="Text Emphasis" coords="53,161,103,181" /> -->
								</map>
									<div class="vertical-line" style="height: 23px;">
									</div>
								</div>
								<div class="panel" id="nvd-space-panel" style="height: 34px; overflow: hidden;">
									<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/spaces.png" title="Spaces"
										alt="Spaces Panel" usemap="#spaces_map" width="31" height="68" border="0" />
									<map name="spaces_map" id="spaces_map">
										<area shape="rect" alt="" title="thin space" coords="0,0,28,14" />
										<area shape="rect" alt="" title="medium space" coords="0,17,28,31" />
										<area shape="rect" alt="" title="thick space" coords="0,34,28,48" />
										<area shape="rect" alt="" title="negative space" coords="0,51,28,65" />
									</map>

								</div>
								<div class="panel" id="nvd-binary-panel" style="height: 34px; overflow: hidden;">
									<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/binary.png" title="Binary"
										alt="Binary Panel" usemap="#binary_map" width="68" height="238" border="0" />
									<map name="binary_map" id="binary_map">
										<area shape="rect" alt="" coords="0,0,14,14" title="\\pm" />
										<area shape="rect" alt="" coords="0,17,14,31" title="\\mp" />
										<area shape="rect" alt="" coords="0,34,14,48" title="\\times" />
										<area shape="rect" alt="" coords="0,51,14,65" title="\\ast" />
										<area shape="rect" alt="" coords="0,68,14,82" title="\\div" />
										<area shape="rect" alt="" coords="0,85,14,99" title="\\setminus" />
										<area shape="rect" alt="" coords="0,102,14,116" title="\\dotplus" />
										<area shape="rect" alt="" coords="0,119,14,133" title="\\amalg" />
										<area shape="rect" alt="" coords="0,136,14,150" title="\\dagger" />
										<area shape="rect" alt="" coords="0,153,14,167" title="\\ddagger" />
										<area shape="rect" alt="" coords="0,170,14,184" title="\\wr" />
										<area shape="rect" alt="" coords="0,187,14,201" title="\\diamond" />
										<area shape="rect" alt="" coords="0,204,14,218" title="\\circledcirc" />
										<area shape="rect" alt="" coords="0,221,14,235" title="\\circledast" />
										<area shape="rect" alt="" coords="17,0,31,14" title="\\cap" />
										<area shape="rect" alt="" coords="17,17,31,31" title="\\Cap" />
										<area shape="rect" alt="" coords="17,34,31,48" title="\\sqcap" />
										<area shape="rect" alt="" coords="17,51,31,65" title="\\wedge" />
										<area shape="rect" alt="" coords="17,68,31,82" title="\\barwedge" />
										<area shape="rect" alt="" coords="17,85,31,99" title="\\triangleleft" />
										<area shape="rect" alt="" coords="17,102,31,116" title="\\lozenge" />
										<area shape="rect" alt="" coords="17,119,31,133" title="\\circ" />
										<area shape="rect" alt="" coords="17,136,31,150" title="\\square" />
										<area shape="rect" alt="" coords="17,153,31,167" title="\\triangle" />
										<area shape="rect" alt="" coords="17,170,31,184" title="\\triangledown" />
										<area shape="rect" alt="" coords="17,187,31,201" title="\\ominus" />
										<area shape="rect" alt="" coords="17,204,31,218" title="\\oslash" />
										<area shape="rect" alt="" coords="17,221,31,235" title="\\circleddash" />
										<area shape="rect" alt="" coords="34,0,48,14" title="\\cup" />
										<area shape="rect" alt="" coords="34,17,48,31" title="\\Cup" />
										<area shape="rect" alt="" coords="34,34,48,48" title="\\sqcup" />
										<area shape="rect" alt="" coords="34,51,48,65" title="\\vee" />
										<area shape="rect" alt="" coords="34,68,48,82" title="\\veebar" />
										<area shape="rect" alt="" coords="34,85,48,99" title="\\triangleright" />
										<area shape="rect" alt="" coords="34,102,48,116" title="\\blacklozenge" />
										<area shape="rect" alt="" coords="34,119,48,133" title="\\bullet" />
										<area shape="rect" alt="" coords="34,136,48,150" title="\\blacksquare" />
										<area shape="rect" alt="" coords="34,153,48,167" title="\\blacktriangle" />
										<area shape="rect" alt="" coords="34,170,48,184" title="\\blacktriangledown" />
										<area shape="rect" alt="" coords="34,187,48,201" title="\\oplus" />
										<area shape="rect" alt="" coords="34,204,48,218" title="\\otimes" />
										<area shape="rect" alt="" coords="34,221,48,235" title="\\odot" />
										<area shape="rect" alt="" coords="51,0,65,14" title="\\cdot" />
										<area shape="rect" alt="" coords="51,17,65,31" title="\\uplus" />
										<area shape="rect" alt="" coords="51,34,65,48" title="\\bigsqcup" />
										<area shape="rect" alt="" coords="51,51,65,65" title="\\bigtriangleup" />
										<area shape="rect" alt="" coords="51,68,65,82" title="\\bigtriangledown" />
										<area shape="rect" alt="" coords="51,85,65,99" title="\\star" />
										<area shape="rect" alt="" coords="51,102,65,116" title="\\bigstar" />
										<area shape="rect" alt="" coords="51,119,65,133" title="\\bigcirc" />
										<area shape="rect" alt="" coords="51,136,65,150" title="\\bigoplus" />
										<area shape="rect" alt="" coords="51,153,65,167" title="\\bigotimes" />
										<area shape="rect" alt="" coords="51,170,65,184" title="\\bigodot" />
									</map>

								</div>
								<div class="panel" id="nvd-symbol-1-panel" style="height: 34px; overflow: hidden;">
									<img src="https://imgur.com/vgqOmV7.png" title="Symbols"
										alt="Symbols Panel" usemap="#symbols_map" width="68" height="136" border="0" />
									<map name="symbols_map" id="symbols_map">
										<area shape="rect" alt="" title="\\therefore" coords="0,0,14,14" />
										<area shape="rect" alt="" title="\\because" coords="0,17,14,31" />
										<area shape="rect" alt="" title="\\cdots" coords="0,34,14,48" />
										<area shape="rect" alt="" title="\\ddots" coords="0,51,14,65" />
										<area shape="rect" alt="" title="\\vdots" coords="0,68,14,82" />
										<area shape="rect" alt="" title="\\S" coords="0,85,14,99" />
										<area shape="rect" alt="" title="\\top" coords="0,102,14,116" />

										<area shape="rect" alt="" title="\\partial" coords="17,0,31,14" />
										<area shape="rect" alt="" coords="17,17,31,31" title="\\imath" />
										<area shape="rect" alt="" coords="17,34,31,48" title="\\jmath" />
										<area shape="rect" alt="" title="\\Re" coords="17,51,31,65" />
										<area shape="rect" alt="" title="\\Im" coords="17,68,31,82" />
										<area shape="rect" alt="" coords="17,85,31,99" title="\\forall" />
										<area shape="rect" alt="" coords="17,102,31,116" title="\\exists" />
										<area shape="rect" alt="" title="\\mathbb{P}" coords="34,0,48,14" />
										<area shape="rect" alt="" title="\\mathbb{N}" coords="34,17,48,31" />
										<area shape="rect" alt="" title="\\mathbb{Z}" coords="34,34,48,48" />
										<area shape="rect" alt="" title="\\mathbb{I}" coords="34,51,48,65" />
										<area shape="rect" alt="" title="\\mathbb{Q}" coords="34,68,48,82" />
										<area shape="rect" alt="" title="\\mathbb{R}" coords="34,85,48,99" />
										<area shape="rect" alt="" title="\\mathbb{C}" coords="34,102,48,116" />
										<area shape="rect" alt="" coords="51,0,65,14" title="\\angle" />
										<area shape="rect" alt="" coords="51,17,65,31" title="\\measuredangle" />
										<area shape="rect" alt="" coords="51,34,65,48" title="\\sphericalangle" />
										<area shape="rect" alt="" coords="51,51,65,65" title="\\varnothing" />
										<area shape="rect" alt="" coords="51,68,65,82" title="\\infty" />
										<area shape="rect" alt="" coords="51,85,65,99" title="\\mho" />
										<area shape="rect" alt="" coords="51,102,65,116" title="\\wp" />
									</map>

								</div>
							</div>
							<div>

								<div class="panel" id="nvd-subsup-set-panel" style="height:34px">
									<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/subsupset.png"
										title="Subsupset" alt="Subsupset Panel" usemap="#subsupset_map" width="34" height="153"
										border="0" />
									<map name="subsupset_map" id="subsupset_map">
										<area shape="rect" alt="" coords="0,0,14,14" title="\\sqsubset" />
										<area shape="rect" alt="" coords="0,17,14,31" title="\\sqsubseteq" />
										<area shape="rect" alt="" coords="0,34,14,48" title="\\subset" />
										<area shape="rect" alt="" coords="0,51,14,65" title="\\subseteq" />
										<area shape="rect" alt="" coords="0,68,14,82" title="\\nsubseteq" />
										<area shape="rect" alt="" coords="0,85,14,99" title="\\subseteqq" />
										<area shape="rect" alt="" coords="0,102,14,116" title="\\nsubseteq" />
										<area shape="rect" alt="" coords="0,119,14,133" title="\\in" />
										<area shape="rect" alt="" coords="0,136,14,150" title="\\notin" />
										<area shape="rect" alt="" coords="17,0,31,14" title="\\sqsupset" />
										<area shape="rect" alt="" coords="17,17,31,31" title="\\sqsupseteq" />
										<area shape="rect" alt="" coords="17,34,31,48" title="\\supset" />
										<area shape="rect" alt="" coords="17,51,31,65" title="\\supseteq" />
										<area shape="rect" alt="" coords="17,68,31,82" title="\\nsupseteq" />
										<area shape="rect" alt="" coords="17,85,31,99" title="\\supseteqq" />
										<area shape="rect" alt="" coords="17,102,31,116" title="\\nsupseteqq" />
										<area shape="rect" alt="" coords="17,119,31,133" title="\\ni" />
									</map>

								</div>
								<div class="panel" id="nvd-accents-panel" style="height:34px">
									<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/accents.png" title="Accents"
										alt="Accents Panel" usemap="#accents_map" width="34" height="119" border="0" />
									<map name="accents_map" id="accents_map">
										<area shape="rect" alt="" coords="0,0,14,14" onclick="EqEditor.insert('{}\'')" title="a'" />
										<area shape="rect" alt="" coords="0,17,14,31" onclick="EqEditor.insert('\\dot{}')" title="\\dot{a}" />
										<area shape="rect" alt="" coords="0,34,14,48" title="\\hat{a}" />
										<area shape="rect" alt="" coords="0,51,14,65" title="\\grave{a}" />
										<area shape="rect" alt="" coords="0,68,14,82" title="\\tilde{a}" />
										<area shape="rect" alt="" coords="0,85,14,99" title="\\bar{a}" />
										<area shape="rect" alt="" coords="0,102,14,116" title="\\not{a}" />
										<area shape="rect" alt="" coords="17,0,31,14" title="{a}''" />
										<area shape="rect" alt="" coords="17,17,31,31" title="\\ddot{a}" />
										<area shape="rect" alt="" coords="17,34,31,48" title="\\check{a}" />
										<area shape="rect" alt="" coords="17,51,31,65" title="\\acute{a}" />
										<area shape="rect" alt="" coords="17,68,31,82" title="\\breve{a}" />
										<area shape="rect" alt="" coords="17,85,31,99" title="\\vec{a}" />
										<area shape="rect" alt="" title="a^{\\circ}" coords="17,102,31,116" />
									</map>

								</div>
								<div class="panel" id="panel2" style="height:34px">
									<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/accents_ext.png"
										title="Accents_ext" alt="Accents_ext Panel" usemap="#accents_ext_map" width="25" height="170"
										border="0" />
									<map name="accents_ext_map" id="accents_ext_map" >
										<area shape="rect" alt="" coords="0,0,22,14" title="\\widetilde{abc}" />
										<area shape="rect" alt="" coords="0,17,22,31" title="\\widehat{abc}" />
										<area shape="rect" alt="" coords="0,34,22,48" title="\\overleftarrow{abc}" />
										<area shape="rect" alt="" coords="0,51,22,65" title="\\overrightarrow{abc}" />
										<area shape="rect" alt="" coords="0,68,22,82" title="\\overline{abc}" />
										<area shape="rect" alt="" coords="0,85,22,99" title="\\underline{abc}" />
										<area shape="rect" alt="" coords="0,102,22,116" title="\\overbrace{abc}" />
										<area shape="rect" alt="" coords="0,119,22,133" title="\\underbrace{abc}" />
										<area shape="rect" alt="" coords="0,136,22,150" title="\\overset{a}{abc}" />
										<area shape="rect" alt="" coords="0,153,22,167" title="\\underset{a}{abc}" />

									</map>

								</div>
								<div class="panel" id="panel3" style="height:34px">
									<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/arrows.png" title="Arrows"
										alt="Arrows Panel" usemap="#arrows_map" width="56" height="170" border="0" />
									<map name="arrows_map" id="arrows_map">
										<area shape="rect" alt="" title="x \\mapsto x^2" coords="0,0,25,14" />
										<area shape="rect" alt="" coords="0,17,25,31" title="\\leftarrow" />
										<area shape="rect" alt="" coords="0,34,25,48" title="\\Leftarrow" />
										<area shape="rect" alt="" coords="0,51,25,65" title="\\leftrightarrow" />
										<area shape="rect" alt="" coords="0,68,25,82" title="\\leftharpoonup" />
										<area shape="rect" alt="" coords="0,85,25,99" title="\\leftharpoondown" />
										<area shape="rect" alt="" coords="0,102,25,116" title="\\leftrightharpoons" />
										<area shape="rect" alt="" coords="0,119,25,133" title="\\xleftarrow[text]{long}" />
										<area shape="rect" alt="" coords="0,136,25,150" title="\\overset{a}{\\leftarrow}" />
										<area shape="rect" alt="" coords="0,153,25,167" title="\\underset{a}{\\leftarrow}" />
										<area shape="rect" alt="" coords="28,0,53,14" title="n \\to" />
										<area shape="rect" alt="" coords="28,17,53,31" title="\\rightarrow" />
										<area shape="rect" alt="" coords="28,34,53,48" title="\\Rightarrow" />
										<area shape="rect" alt="" coords="28,51,53,65" title="\\Leftrightarrow" />
										<area shape="rect" alt="" coords="28,68,53,82" title="\\rightharpoonup" />
										<area shape="rect" alt="" coords="28,85,53,99" title="\\rightharpoondown" />
										<area shape="rect" alt="" coords="28,102,53,116" title="\\rightleftharpoons" />
										<area shape="rect" alt="" coords="28,119,53,133" title="\\xrightarrow[text]{long}" />
										<area shape="rect" alt="" coords="28,136,53,150" title="\\overset{a}{\\rightarrow}" />
										<area shape="rect" alt="" coords="28,153,53,167" title="\\underset{a}{\\rightarrow}" />
									</map>
								</div>
							</div>
						</div>
					</div>
					<div class="toolbar_wrapper">
						<div>
							<div style="display: flex; margin-top: 10px;justify-content: space-between;">
								<div style="display: flex">
									<div class="tlbr-lbl-2" style="width: 172px">Phép toán giải tích:</div>
									<div class="tlbr-lbl-2" style="width: 120px; display:flex; justify-content: space-between;">
										<div>Ma trận:</div>
										<div style="display: flex">
											<input type="text" class="nvd-math-txt-inpt" maxlength="1"
												onkeypress="return onlyNumberKey(event)" placeholder="1..9" defaultvalue="1"
												style="margin-left: 4px; margin-right: 2px" id="nvd-mtrx-x-dmnsn" />
																x
															<input type="text"
												class="nvd-math-txt-inpt" maxlength="1" onkeypress="return onlyNumberKey(event)"
												style="margin-left: 2px" placeholder="1..9" defaultvalue="1" id="nvd-mtrx-y-dmnsn" />
										</div>
									</div>
									<div class="tlbr-lbl-2" style="width: 58px">So sánh:</div>
									<div class="tlbr-lbl-2" style="width: 62px">Dấu ngoặc:</div>
								</div>
								<div class="tlbr-lbl-2" style="width: 122px; margin-right: 0px">Ký tự đặc biệt:</div>
							</div>
						</div>
						<div class="toolbar" style="z-index:21">
							<div class="panel" id="nvd-operator-panel" style="height: 28px; overflow: hidden;">
								<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/operators.png"
									title="Operators" alt="Operators Panel" usemap="#operators_map" width="168" height="140"
									border="0" />
								<map name="operators_map" id="operators_map">
									<area shape="rect" alt="" title="superscript" coords="0,0,25,25"" />
									<area shape="rect" alt="" title="subscript" coords="0,28,25,53" " />
									<area shape="rect" alt="" coords="0,56,25,81" title="x_a^b" />
									<area shape="rect" alt="" coords="0,84,25,109" title="{x_a}^b" />
									<area shape="rect" alt="" title="_{a}^{b}\\textrm{C}" coords="0,112,25,137" />
									<area shape="rect" alt="" title="fraction" coords="28,0,53,25" />
									<area shape="rect" alt="" title="tiny fraction" coords="28,28,53,53" ư />
									<area shape="rect" alt="" coords="28,56,53,81" title="\\frac{\\partial }{\\partial x}" />
									<area shape="rect" alt="" coords="28,84,53,109" title="\\frac{\\partial^2 }{\\partial x^2}" />
									<area shape="rect" alt="" coords="28,112,53,137" title="\\frac{\\mathrm{d} }{\\mathrm{d} x}" />
									<area shape="rect" alt="" coords="56,0,81,25" title="\\int" />
									<area shape="rect" alt="" title="\\int_{}^{}" coords="56,28,81,53" />
									<area shape="rect" alt="" title = "\\oint" coords="56,56,81,81" />
									<area shape="rect" alt="" title="\\oint_{}^{}" coords="56,84,81,109" />
									<area shape="rect" alt="" title="\\iint_{}^{}" coords="56,112,81,137" />
									<area shape="rect" alt="" coords="84,0,109,25" title="\\bigcap" />
									<area shape="rect" alt="" title="\\bigcap_{}^{}" coords="84,28,109,53" />
									<area shape="rect" alt="" coords="84,56,109,81" title="\\bigcup" />
									<area shape="rect" alt="" title="\\bigcup_{}^{}" coords="84,84,109,109" />
									<area shape="rect" alt="" title="\\lim_{x \\to 0}" coords="84,112,109,137" />
									<area shape="rect" alt="" coords="112,0,137,25" title="\\sum" />
									<area shape="rect" alt="" title="\\sum_{}^{}" coords="112,28,137,53" />
									<area shape="rect" alt="" title="\\sqrt{}" coords="112,56,137,81" />
									<area shape="rect" alt="" title="\\sqrt[]{}" coords="112,84,137,109" />
									<area shape="rect" alt="" coords="140,0,165,25" title="\\prod" />
									<area shape="rect" alt="" title="\\prod_{}^{}" coords="140,28,165,53" />
									<area shape="rect" alt="" coords="140,56,165,81" title="\\coprod" />
									<area shape="rect" alt="" title="\\coprod_{}^{}" coords="140,84,165,109" />
								</map>
							</div>
							<div class="panel" id="nvd-matrix-panel" style="height: 34px; overflow: hidden;">
								<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/matrix.png" title="Matrix"
									alt="Matrix Panel" usemap="#matrix_map" width="102" height="170" border="0" />
								<map name="matrix_map" id="matrix_map">
									<area shape="rect" alt="" title="\\begin{matrix} ... \\end{matrix}" coords="0,0,31,31" onclick="EqEditor.makeArrayMatrix('','','')" />
									<area shape="rect" alt="" title="\\begin{pmatrix} ... \\end{pmatrix}" coords="0,34,31,65" onclick="EqEditor.makeArrayMatrix('p','','')" />
									<area shape="rect" alt="" title="\\begin{vmatrix} ... \\end{vmatrix}" coords="0,68,31,99" onclick="EqEditor.makeArrayMatrix('v','','')" />
									<area shape="rect" alt="" title="\\begin{Vmatrix} ... \\end{Vmatrix}" coords="0,102,31,133" onclick="EqEditor.makeArrayMatrix('V','','')" />
									<area shape="rect" alt="" title="\\left.\\begin{matrix}... \\end{matrix}\\right|" coords="0,136,31,167" onclick="EqEditor.makeArrayMatrix('','\\left.','\\right|')" />
									<area shape="rect" alt="" title="\\being{bmatrix} ... \\end{bmatrix}" coords="34,0,65,31" onclick="EqEditor.makeArrayMatrix('b','','')" />
									<area shape="rect" alt="" title="\\bigl(\\begin{smallmatrix} ... \\end{smallmatrix}\\bigr)" coords="34,34,65,65" onclick="EqEditor.makeArrayMatrix('small','\\bigl(','\\bigr)')" />
									<area shape="rect" alt="" title="\\begin{Bmatrix} ... \\end{Bmatrix}" coords="34,68,65,99" onclick="EqEditor.makeArrayMatrix('B','','')" />
									<area shape="rect" alt="" title="\\begin{Bmatrix} ... \\end{matrix}" coords="34,102,65,133" onclick="EqEditor.makeArrayMatrix('','\\left\\{','\\right.')" />
									<area shape="rect" alt="" title="\\begin{matrix} ... \\end{Bmatrix}" coords="34,136,65,167" onclick="EqEditor.makeArrayMatrix('','\\left.','\\right\\}')" />
									<area shape="rect" alt="" coords="68,0,99,31" onclick="EqEditor.insert('\\binom{}{}')" title=" \\binom{n}{r}" />
									<area shape="rect" alt="" title="\\begin{cases} ... \\end{cases}" coords="68,34,99,65" onclick="EqEditor.makeEquationsMatrix('cases', true, true)" />
									<area shape="rect" alt="" title="\\begin{align} ... \\end{align}" coords="68,68,99,99" onclick="EqEditor.makeEquationsMatrix('align', false)" />
								</map>
							</div>

							<div class="panel" id="nvd-relation-panel" style="height: 34px; overflow: hidden;">
								<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/relations.png"
									title="Relations" alt="Relations Panel" usemap="#relations_map" width="51" height="221"
									border="0" />
								<map name="relations_map" id="relations_map">
									<area shape="rect" alt="" coords="0,0,14,14" title="<" />
									<area shape="rect" alt="" coords="0,17,14,31" title="\\leq" />
									<area shape="rect" alt="" coords="0,34,14,48" title="\\leqslant" />
									<area shape="rect" alt="" coords="0,51,14,65" title="\\nless" />
									<area shape="rect" alt="" coords="0,68,14,82" title="\\nleqslant" />
									<area shape="rect" alt="" coords="0,85,14,99" title="\\prec" />
									<area shape="rect" alt="" coords="0,102,14,116" title="\\preceq" />
									<area shape="rect" alt="" coords="0,119,14,133" title="\\ll" />
									<area shape="rect" alt="" coords="0,136,14,150" title="\\vdash" />
									<area shape="rect" alt="" title="\\smile" coords="0,153,14,167" />
									<area shape="rect" alt="" coords="0,170,14,184" title="\\models" />
									<area shape="rect" alt="" coords="0,187,14,201" title="\\mid" />
									<area shape="rect" alt="" coords="0,204,14,218" title="\\bowtie" />
									<area shape="rect" alt="" coords="17,0,31,14" title=">" />
									<area shape="rect" alt="" coords="17,17,31,31" title="\\geq" />
									<area shape="rect" alt="" coords="17,34,31,48" title="\\geqslant" />
									<area shape="rect" alt="" coords="17,51,31,65" title="\\ngtr" />
									<area shape="rect" alt="" coords="17,68,31,82" title="\\ngeqslant" />
									<area shape="rect" alt="" coords="17,85,31,99" title="\\succ" />
									<area shape="rect" alt="" coords="17,102,31,116" title="\\succeq" />
									<area shape="rect" alt="" coords="17,119,31,133" title="\\gg" />
									<area shape="rect" alt="" coords="17,136,31,150" title="\\dashv" />
									<area shape="rect" alt="" title="\\frown" coords="17,153,31,167" />
									<area shape="rect" alt="" coords="17,170,31,184" title="\\perp" />
									<area shape="rect" alt="" title="\\parallel" coords="17,187,31,201" />
									<area shape="rect" alt="" coords="17,204,31,218" title="\\Join" />
									<area shape="rect" alt="" coords="34,0,48,14" title="=" />
									<area shape="rect" alt="" coords="34,17,48,31" title="\\doteq" />
									<area shape="rect" alt="" title="\\equiv" coords="34,34,48,48" />
									<area shape="rect" alt="" coords="34,51,48,65" title="\\neq" />
									<area shape="rect" alt="" title="\\not\\equiv" coords="34,68,48,82" />
									<area shape="rect" alt="" title="\\overset{\\underset{\\mathrm{def}}{}}{f(x)=g(x)} " coords="34,85,48,99" />
									<area shape="rect" alt="" coords="34,102,48,116" title="\\sim" />
									<area shape="rect" alt="" coords="34,119,48,133" title="\\approx" />
									<area shape="rect" alt="" coords="34,136,48,150" title="\\simeq" />
									<area shape="rect" alt="" coords="34,153,48,167" title="\\cong" />
									<area shape="rect" alt="" coords="34,170,48,184" title="\\asymp" />
									<area shape="rect" alt="" title="\\propto" coords="34,187,48,201" />
								</map>
								<div class="vertical-line" style="height: 34px;">
								</div>
							</div>
							<div class="panel" id="nvd-brackets-panel" style="height: 28px; overflow: hidden;">
								<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/brackets.png"
									title="Brackets" alt="Brackets Panel" usemap="#brackets_map" width="56" height="140"
									border="0" />
								<map name="brackets_map" id="brackets_map">
									<area shape="rect" alt="" title="\\left ( \\right )" coords="0,0,25,25" />
									<area shape="rect" alt="" title="\\left ( \\right )" coords="0,28,25,53" />
									<area shape="rect" alt="" title="\\left\\{ \\right\\}" coords="0,56,25,81" />
									<area shape="rect" alt="" title="\\left | \\right |" coords="0,84,25,109" />
									<area shape="rect" alt="" title="\\left \\{ \\right." coords="0,112,25,137" />
									<area shape="rect" alt="" title="\\left \\| \\right \\|" coords="28,0,53,25" />
									<area shape="rect" alt="" title="\\left \\langle \\right \\rangle" coords="28,28,53,53" />
									<area shape="rect" alt="" title="\\left \\lfloor \\right \\rfloor" coords="28,56,53,81" />
									<area shape="rect" alt="" title="\\left \\lceil \\right \\rceil" coords="28,84,53,109" />
									<area shape="rect" alt="" title="\\left. \\right \\}" coords="28,112,53,137" />
								</map>
								<div class="vertical-line" style="height: 28px;">
								</div>
							</div>
							<div class="panel" id="panel8" style="height: 34px; overflow: hidden;">
								<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/greeklower.png"
									title="Greeklower" alt="Greeklower Panel" usemap="#greeklower_map" width="68" height="136"
									border="0" />
								<map name="greeklower_map" id="greeklower_map">
									<area shape="rect" alt="" coords="0,0,14,14" title="\\alpha" />
									<area shape="rect" alt="" coords="0,17,14,31" title="\\epsilon" />
									<area shape="rect" alt="" coords="0,34,14,48" title="\\theta" />
									<area shape="rect" alt="" coords="0,51,14,65" title="\\lambda" />
									<area shape="rect" alt="" coords="0,68,14,82" title="\\pi" />
									<area shape="rect" alt="" coords="0,85,14,99" title="\\sigma" />
									<area shape="rect" alt="" coords="0,102,14,116" title="\\phi" />
									<area shape="rect" alt="" coords="0,119,14,133" title="\\omega" />
									<area shape="rect" alt="" coords="17,0,31,14" title="\\beta" />
									<area shape="rect" alt="" coords="17,17,31,31" title="\\varepsilon" />
									<area shape="rect" alt="" coords="17,34,31,48" title="\\vartheta" />
									<area shape="rect" alt="" coords="17,51,31,65" title="\\mu" />
									<area shape="rect" alt="" coords="17,68,31,82" title="\\varpi" />
									<area shape="rect" alt="" coords="17,85,31,99" title="\\varsigma" />
									<area shape="rect" alt="" coords="17,102,31,116" title="\\varphi" />
									<area shape="rect" alt="" coords="34,0,48,14" title="\\gamma" />
									<area shape="rect" alt="" coords="34,17,48,31" title="\\zeta" />
									<area shape="rect" alt="" coords="34,34,48,48" title="\\iota" />
									<area shape="rect" alt="" coords="34,51,48,65" title="\\nu" />
									<area shape="rect" alt="" coords="34,68,48,82" title="\\rho" />
									<area shape="rect" alt="" coords="34,85,48,99" title="\\tau" />
									<area shape="rect" alt="" coords="34,102,48,116" title="\\chi" />
									<area shape="rect" alt="" coords="51,0,65,14" title="\\delta" />
									<area shape="rect" alt="" coords="51,17,65,31" title="\\eta" />
									<area shape="rect" alt="" coords="51,34,65,48" title="\\kappa" />
									<area shape="rect" alt="" coords="51,51,65,65" title="\\xi" />
									<area shape="rect" alt="" coords="51,68,65,82" title="\\varrho" />
									<area shape="rect" alt="" coords="51,85,65,99" title="\\upsilon" />
									<area shape="rect" alt="" coords="51,102,65,116" title="\\psi" />
								</map>

							</div>
							<div class="panel" id="panel9" style="height: 34px; overflow: hidden;">
								<img src="https://latex.codecogs.com/legacy/eqneditor/panels/cache/greekupper.png"
									title="Greekupper" alt="Greekupper Panel" usemap="#greekupper_map" width="34" height="102"
									border="0" />
								<map name="greekupper_map" id="greekupper_map">
									<area shape="rect" alt="" coords="0,0,14,14" title="\\Gamma" />
									<area shape="rect" alt="" coords="0,17,14,31" title="\\Theta" />
									<area shape="rect" alt="" coords="0,34,14,48" title="\\Xi" />
									<area shape="rect" alt="" coords="0,51,14,65" title="\\Sigma" />
									<area shape="rect" alt="" coords="0,68,14,82" title="\\Phi" />
									<area shape="rect" alt="" coords="0,85,14,99" title="\\Omega" />
									<area shape="rect" alt="" coords="17,0,31,14" title="\\Delta" />
									<area shape="rect" alt="" coords="17,17,31,31" title="\\Lambda" />
									<area shape="rect" alt="" coords="17,34,31,48" title="\\Pi" />
									<area shape="rect" alt="" coords="17,51,31,65" title="\\Upsilon" />
									<area shape="rect" alt="" coords="17,68,31,82" title="\\Psi" />
								</map>

							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="justify-content:space-between;display:flex; margin-top:5px;">
				<div class="nvd-nfr-lbl">Chúng tôi sử dụng LaTeX để định dạng các công thức toán học.
						</div>
				<a class="nvd-nfr-lnk">
					<img src="https://imgur.com/8SIDk8H.png" alt="help" class="question-icon" />
					<div class="nvd-nfr-lnk-lbl">Tìm hiểu thêm.</div>
				</a>
			</div>
		</div>
	</div >
`

//function contain all onClick of operator in toolbar except undo, redo, refresh, colors, functions
var refineOnClickEvents = function () {
	//add event for all element in panel_14 area
	Array.from(document.querySelectorAll('#nvd-eqn-editor #nvd-style-panel area')).forEach(r => {
		r.onclick = function () {
			switch (r.title) {
				case "Math Bold Greek":
					EqEditor.insert('\\boldsymbol{Text}');
					break;
				case "Math Bold":
					EqEditor.insert('\\mathbf{Text}')
					break;
				case "Math Italic":
					EqEditor.insert('\\mathit{Text}')
					break;
				case "Math Roman":
					EqEditor.insert('\\mathrm{Text}')
					break;
				case "Math Fraktur":
					EqEditor.insert('\\mathfrak{Text}')
					break;
				case "Math Blackboard":
					EqEditor.insert('\\mathbb{Text}')
					break;
				case "Text Upright":
					EqEditor.insert('\\textup{Text}')
					break;
				case "Text Bold":
					EqEditor.insert('\\textbf{Text}')
					break;
				case "Text Italic":
					EqEditor.insert('\\textit{Text}')
					break;
				case "Text Roman":
					EqEditor.insert('\\textrm{Text}')
					break;
				case "Text Slanted":
					EqEditor.insert('\\textsl{Text}')
					break;
				case "Text Typewriter":
					EqEditor.insert('\\texttt{Text}')
					break;
				case "Text Small Caps":
					EqEditor.insert('\\textsc{Text}')
					break;
				case "Text Emphasis":
					EqEditor.insert('\\emph{Text}')
					break;
				default: { }
			}
			previewFunction();

		}
	})

	//add event for all element in panel_13 area
	Array.from(document.querySelectorAll('#nvd-eqn-editor #nvd-space-panel area')).forEach(r => {
		r.onclick = function () {
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
					{ }
			}
			previewFunction();

		}

	})

	//add event for all element in panel2 area
	Array.from(document.querySelectorAll('#nvd-eqn-editor #panel2 area')).forEach(r => {
		r.onclick = function () {
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
				case "\\underset{a}{abc}":
					EqEditor.insert('\\underset{a}{abc}', 9, 11)
					break;

				default:
					{ }
			}
			previewFunction();

		}
	})

	//add event for all element in panel3 area arrow_map
	Array.from(document.querySelectorAll('#nvd-eqn-editor #panel3 area')).forEach(r => {
		r.onclick = function () {
			switch (r.title) {
				case "x \\mapsto x^2":
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
					EqEditor.insert(r.title);
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
					{ }
			}
			previewFunction();

		}
	})

	//add event for all element in nvd-operator-panel area arrow_map
	Array.from(document.querySelectorAll('#nvd-eqn-editor #nvd-operator-panel area')).forEach(r => {
		r.onclick = function () {
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
					{ }

			}
			previewFunction();

		}
	})

	//add event for all element in nvd-matrix-panel area matrix
	Array.from(document.querySelectorAll('#nvd-eqn-editor #nvd-matrix-panel area')).forEach(r => {
		r.onclick = function () {
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
					//hasVar use for create system of linear equations :D
					EqEditor.makeArrayMatrix('', '\\left\\{', '\\right.')
					break;
				case "\\begin{matrix} ... \\end{Bmatrix}":
					EqEditor.makeArrayMatrix('', '\\left.', '\\right\\}')
					break;
				case " \\binom{n}{r}":
					EqEditor.insert('\\binom{n}{r}');
					break;
				case "\\begin{cases} ... \\end{cases}":
					EqEditor.makeEquationsMatrix('cases', true, true)
					break;
				case "\\begin{align} ... \\end{align}":
					EqEditor.makeEquationsMatrix('align', false)
					break;
				default:
					{ }
			}
			previewFunction();

		}
	})

	//add event for all element in nvd-matrix-panel area matrix
	Array.from(document.querySelectorAll('#nvd-eqn-editor #nvd-brackets-panel area')).forEach(r => {
		r.onclick = function () {
			switch (r.title) {
				case "\\left ( \\right )":
					if (r.coords === "0,0,25,25")
						EqEditor.insert('\\left (  \\right )', 8)
					if (r.coords === "0,28,25,53")
						EqEditor.insert('\\left [  \\right ]', 8)
					break;
				case "\\left\\{ \\right\\}":
					EqEditor.insert('\\left \\{  \\right \\}', 9)
					break;
				case "\\left | \\right |":
					EqEditor.insert('\\left |  \\right |', 8)
					break;
				case "\\left \\{ \\right.":
					EqEditor.insert('\\left \\{  \\right.', 9)
					break;
				case "\\left \\| \\right \\|":
					EqEditor.insert('\\left \\|  \\right \\|', 9)
					break;
				case "\\left \\langle \\right \\rangle":
					EqEditor.insert('\\left \\langle  \\right \\rangle', 14)
					break;
				case "\\left \\lfloor \\right \\rfloor":
					EqEditor.insert('\\left \\lfloor  \\right \\rfloor', 14);
					break;
				case "\\left \\lceil \\right \\rceil":
					EqEditor.insert('\\left \\lceil  \\right \\rceil', 13)
					break;
				case "\\left. \\right \\}":
					EqEditor.insert('\\left.  \\right \\}', 7)
					break;
				default:
					{ }
			}

			previewFunction();
		}
	})

	//These panel have title is the same as its own latex.
	Array.from(document.querySelectorAll(`
	#nvd-eqn-editor #nvd-accents-panel area,
	#nvd-eqn-editor #nvd-binary-panel area,
	#nvd-eqn-editor #nvd-symbol-2-panel area,
	#nvd-eqn-editor #nvd-symbol-1-panel area,
	#nvd-eqn-editor #nvd-relation-panel area,
	#nvd-eqn-editor #nvd-subsup-set-panel area,
	#nvd-eqn-editor #panel8 area,
	#nvd-eqn-editor #panel9 area`)).forEach(r => {
		r.onclick = function () {
			EqEditor.insert(r.title);
			previewFunction();
		}
	})
}

//for limit value for demension input of matrix
var onlyNumberKey = function (evt) {
	// Only ASCII charactar in that range allowed
	var ASCIICode = (evt.which) ? evt.which : evt.keyCode
	if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
		return false;
	return true;
}

//call every time textarea input change or toolbar item click for update preview and widget.
var previewFunction = function () {
	preview.setValue('\\(' + document.querySelector(".nvd-math-txtr.unique").value + '\\)');
}
