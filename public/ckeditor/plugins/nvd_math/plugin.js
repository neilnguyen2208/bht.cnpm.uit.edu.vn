(function () {
	CKEDITOR.plugins.add('nvd_math', {
		availableLangs: { en: 1, vi: 2 },
		lang: "en,vi",
		requires: 'widget,dialog',
		icons: "nvd_math",
		hidpi: true, // %REMOVE_LINE_CORE%

		isSupportedEnvironment: function () {
			return !CKEDITOR.env.ie || CKEDITOR.env.version > 8;
		},

		init: function (editor) {
			var pluginDirectory = this.path;
			var cls = editor.config.mathJaxClass || 'math-tex';
			if (!editor.config.mathJaxLib) {
				CKEDITOR.error('nvd-mathjax-no-config');
			};

			editor.addContentsCss(pluginDirectory + '/styles/styles.css');

			// Load Additional CSS 
			var fileref = document.createElement("link");
			fileref.setAttribute("rel", "stylesheet");
			fileref.setAttribute("type", "text/css");
			fileref.setAttribute("href", pluginDirectory + '/styles/styles.css')

			document.getElementsByTagName("head")[0].appendChild(fileref);

			var pluginCmd = 'nvd_mathDialog';

			// Add the link and unlink buttons.
			editor.addCommand(pluginCmd, new CKEDITOR.dialogCommand(pluginCmd,
				{
					allowedContent: 'img[src,alt], span(!' + cls + ')',
					requiredContent: 'img[src,alt]'
				})
			);

			editor.widgets.add('nvd_math', {
				inline: true,
				dialog: pluginCmd,
				button: 'MathBtn',
				mask: true,
				allowedContent: 'span(!' + cls + ')',
				// Allow style classes only on spans having mathjax class.
				styleToAllowedContentRules: function (style) {
					var classes = style.getClassesArray();
					if (!classes)
						return null;
					classes.push('!' + cls);

					return 'span(' + classes.join(',') + ')';
				},

				pathName: editor.lang.nvd_math.pathName,

				template: '<span class="' + cls + '" style="display:inline-block" data-cke-survive=1></span>',

				parts: {
					span: 'span'
				},

				defaults: {
					math: ''
				},

				init: function () {
					var iframe = this.parts.span.getChild(0);

					// Check if span contains iframe and create it otherwise.
					if (!iframe || iframe.type !== CKEDITOR.NODE_ELEMENT || !iframe.is('iframe')) {
						iframe = new CKEDITOR.dom.element('iframe');
						iframe.setAttributes({
							style: 'border:0;width:0;height:0',
							scrolling: 'no',
							frameborder: 0,
							allowTransparency: true,
							src: CKEDITOR.plugins.nvd_math.fixSrc
						});
						this.parts.span.append(iframe);
					}

					// Wait for ready because on some browsers iFrame will not
					// have document element until it is put into document.
					// This is a problem when you crate widget using dialog.
					this.once('ready', function () {
						// Src attribute must be recreated to fix custom domain error after undo
						// (see iFrame.removeAttribute( 'src' ) in frameWrapper.load).

						if (CKEDITOR.env.ie)
							iframe.setAttribute('src', CKEDITOR.plugins.nvd_math.fixSrc);

						this.frameWrapper = new CKEDITOR.plugins.nvd_math.frameWrapper(iframe, editor);
						this.frameWrapper.setValue(this.data.math);
					});
				},

				data: function () {
					if (this.frameWrapper)
						this.frameWrapper.setValue(this.data.math);
				},

				upcast: function (el, data) {
					if (!(el.name === 'span' && el.hasClass(cls)))
						return;

					if (el.children.length > 1 || el.children[0].type !== CKEDITOR.NODE_TEXT)
						return;

					data.math = CKEDITOR.tools.htmlDecode(el.children[0].value);

					// Add style display:inline-block to have proper height of widget wrapper and mask.
					var attrs = el.attributes;

					if (attrs.style)
						attrs.style += ';display:inline-block';
					else
						attrs.style = 'display:inline-block';

					// Add attribute to prevent deleting empty span in data processing.
					attrs['data-cke-survive'] = 1;

					el.children[0].remove();

					return el;
				},

				downcast: function (el) {
					el.children[0].replaceWith(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.math)));

					// Remove style display:inline-block.
					var attrs = el.attributes;
					attrs.style = attrs.style.replace(/display:\s?inline-block;?\s?/, '');
					if (attrs.style === '')
						delete attrs.style;

					return el;
				}
			}
			);

			// editor.execCommand('nvd_math');

			editor.ui.addButton('MathBtn', {
				label: editor.lang.nvd_math.toolbar,
				command: 'nvd_math',
				icon: this.path + 'icons/nvd_math.png',
				toolbar: 'insert'
			});

			CKEDITOR.dialog.add(pluginCmd, this.path + "dialogs/nvd_math.js");

			// add context-menu entry
			// if (editor.contextMenu) {
			// 	// editor.contextMenu.remove();
			// 	editor.addMenuGroup(editor.lang.nvd_math.menu);
			// 	editor.addMenuItem('nvd_math', {
			// 		label: editor.lang.nvd_math.edit,
			// 		icon: this.path + 'icons/nvd_math.png',
			// 		command: pluginCmd,
			// 		group: editor.lang.nvd_math.menu
			// 	});

			// 	// if the selected item is image of class 'mathImg',
			// 	// we shold be interested in it
			// 	editor.contextMenu.addListener(function (element) {
			// 		var res = {};
			// 		if (element.getAscendant('img', true)) {
			// 			var sName = element.getAttribute('src').match(/(gif|svg)\.latex\?(.*)/);
			// 			if (sName != null) {
			// 				res['nvd_math'] = CKEDITOR.TRISTATE_OFF;
			// 				return res;
			// 			}
			// 		}
			// 	});

			// }

			editor.on('doubleclick', function (evt) {
				var element = evt.data.element;
				if (element && element.is('img')) {
					var sName = element.getAttribute('src').match(/(gif|svg)\.latex\?(.*)/);
					if (sName != null) {

						evt.data.dialog = pluginCmd;
						evt.cancelBubble = true;
						evt.returnValue = false;
						evt.stop();
					}
				}
			}, null, null, 1);

			// Add MathJax script to page preview.
			editor.on('contentPreview', function (evt) {
				evt.data.dataValue = evt.data.dataValue.replace(
					/<\/head>/,
					'<script src="' + CKEDITOR.getUrl(editor.config.mathJaxLib) + '"></script></head>'
				);
			});

			//MathJax
			editor.on('paste', function (evt) {
				// Firefox does remove iFrame elements from pasted content so this event do the same on other browsers.
				// Also iFrame in paste content is reason of "Unspecified error" in IE9 (https://dev.ckeditor.com/ticket/10857).
				var regex = new RegExp('<span[^>]*?' + cls + '.*?</span>', 'ig');
				evt.data.dataValue = evt.data.dataValue.replace(regex, function (match) {
					return match.replace(/(<iframe.*?\/iframe>)/i, '');
				});
			});
		}

	})


	/** 
	 * @private @singleton @class CKEDITOR.plugins.nvd_math
	*/

	CKEDITOR.plugins.nvd_math = {};

	/**
	 * A variable to fix problems with `iframe`. This variable is global
	 * because it is used in both the widget and the dialog window.
	 *
	 * @private
	 * @property {String} fixSrc
	 */
	CKEDITOR.plugins.nvd_math.fixSrc =
		// In Firefox src must exist and be different than about:blank to emit load event.
		CKEDITOR.env.gecko ? 'javascript:true' : // jshint ignore:line
			// Support for custom document.domain in IE.
			CKEDITOR.env.ie ? 'javascript:' + // jshint ignore:line
				'void((function(){' + encodeURIComponent(
					'document.open();' +
					'(' + CKEDITOR.tools.fixDomain + ')();' +
					'document.close();'
				) + '})())' :
				// In Chrome src must be undefined to emit load event.
				'javascript:void(0)'; // jshint ignore:line

	/**
	 * Loading indicator image generated by http://preloaders.net.
	 *
	 * @private
	 * @property {String} loadingIcon
	 */
	CKEDITOR.plugins.nvd_math.loadingIcon = CKEDITOR.plugins.get('nvd_math').path + 'images/loading.gif';

	/**
	 * Computes predefined styles and copies them to another element.
	 *
	 * @private
	 * @param {CKEDITOR.dom.element} from Copy source.
	 * @param {CKEDITOR.dom.element} to Copy target.
	 */
	CKEDITOR.plugins.nvd_math.copyStyles = function (from, to) {
		var stylesToCopy = ['color', 'font-family', 'font-style', 'font-weight', 'font-variant', 'font-size'];

		for (var i = 0; i < stylesToCopy.length; i++) {
			var key = stylesToCopy[i],
				val = from.getComputedStyle(key);
			if (val)
				to.setStyle(key, val);
		}
	};

	//Trims MathJax value from '\(1+1=2\)' to '1+1=2'.
	CKEDITOR.plugins.nvd_math.trim = function (value) {
		var begin = value.indexOf('\\(') + 2,
			end = value.lastIndexOf('\\)');

		return value.substring(begin, end);
	};

	/**
	 * FrameWrapper is responsible for communication between the MathJax library
	 * and the `iframe` element that is used for rendering mathematical formulas
	 * inside the editor.
	 * It lets you create visual mathematics by using the
	 * {@link CKEDITOR.plugins.nvd_math.frameWrapper#setValue setValue} method.
	 *
	 * @private
	 * @class CKEDITOR.plugins.nvd_math.frameWrapper
	 * @constructor Creates a class instance.
	 * @param {CKEDITOR.dom.element} iFrame The `iframe` element to be wrapped.
	 * @param {CKEDITOR.editor} editor The editor instance.
	 */

	if (!(CKEDITOR.env.ie && CKEDITOR.env.version === 8)) {
		CKEDITOR.plugins.nvd_math.frameWrapper = function (iFrame, editor) {

			var buffer, preview, value, newValue,
				doc = iFrame.getFrameDocument(),

				// Is MathJax loaded and ready to work.
				isInit = false,

				// Is MathJax parsing Tex.
				isRunning = false,

				// Function called when MathJax is loaded.
				loadedHandler = CKEDITOR.tools.addFunction(function () {
					preview = doc.getById('preview');
					buffer = doc.getById('buffer');
					isInit = true;

					if (newValue)
						update();

					// Private! For test usage only.
					CKEDITOR.fire('mathJaxLoaded', iFrame);
				}),

				// Function called when MathJax finish his job.
				updateDoneHandler = CKEDITOR.tools.addFunction(function () {
					CKEDITOR.plugins.nvd_math.copyStyles(iFrame, preview);

					preview.setHtml(buffer.getHtml());

					editor.fire('lockSnapshot');

					iFrame.setStyles({
						height: 0,
						width: 0
					});

					// Set iFrame dimensions.
					var height = Math.max(doc.$.body.offsetHeight, doc.$.documentElement.offsetHeight),
						width = Math.max(preview.$.offsetWidth, doc.$.body.scrollWidth);

					iFrame.setStyles({
						height: height + 'px',
						width: width + 'px'
					});

					editor.fire('unlockSnapshot');

					// Private! For test usage only.
					CKEDITOR.fire('mathJaxUpdateDone', iFrame);

					// If value changed in the meantime update it again.
					if (value !== newValue)
						update();
					else
						isRunning = false;
				});

			iFrame.on('load', load);

			load();

			function load() {
				doc = iFrame.getFrameDocument();

				if (doc.getById('preview'))
					return;

				// Because of IE9 bug in a src attribute can not be javascript
				// when you undo (https://dev.ckeditor.com/ticket/10930). If you have iFrame with javascript in src
				// and call insertBefore on such element then IE9 will see crash.
				if (CKEDITOR.env.ie)
					iFrame.removeAttribute('src');

				doc.write('<!DOCTYPE html>' +
					'<html>' +
					'<head>' +
					'<meta charset="utf-8">' +
					'<script type="text/x-mathjax-config">' +

					// MathJax configuration, disable messages.
					'MathJax.Hub.Config( {' +
					'showMathMenu: false,' +
					'messageStyle: "none"' +
					'} );' +

					// Get main CKEDITOR form parent.
					'function getCKE() {' +
					'if ( typeof window.parent.CKEDITOR == \'object\' ) {' +
					'return window.parent.CKEDITOR;' +
					'} else {' +
					'return window.parent.parent.CKEDITOR;' +
					'}' +
					'}' +

					// Run MathJax.Hub with its actual parser and call callback function after that.
					// Because MathJax.Hub is asynchronous create MathJax.Hub.Queue to wait with callback.
					'function update() {' +
					'MathJax.Hub.Queue(' +
					'[ \'Typeset\', MathJax.Hub, this.buffer ],' +
					'function() {' +
					'getCKE().tools.callFunction( ' + updateDoneHandler + ' );' +
					'}' +
					');' +
					'}' +

					// Run MathJax for the first time, when the script is loaded.
					// Callback function will be called then it's done.
					'MathJax.Hub.Queue( function() {' +
					'getCKE().tools.callFunction(' + loadedHandler + ');' +
					'} );' +
					'</script>' +

					// Load MathJax lib.
					'<script src="' + (editor.config.mathJaxLib) + '"></script>' +
					'</head>' +
					'<body style="padding:0;margin:0;background:transparent;overflow:hidden">' +
					'<span id="preview"></span>' +

					// Render everything here and after that copy it to the preview.
					'<span id="buffer" style="display:none"></span>' +
					'</body>' +
					'</html>');
			}

			// Run MathJax parsing Tex.
			function update() {
				isRunning = true;
				value = newValue;

				editor.fire('lockSnapshot');

				buffer.setHtml(value);

				// Set loading indicator.
				preview.setHtml('<img src=' + CKEDITOR.plugins.nvd_math.loadingIcon + ' alt=' + editor.lang.nvd_math.loading + '>');

				iFrame.setStyles({
					height: '16px',
					width: '16px',
					display: 'inline',
					'vertical-align': 'middle'
				});

				editor.fire('unlockSnapshot');

				// Run MathJax.
				doc.getWindow().$.update(value);
			}

			return {
				/**
				 * Sets the TeX value to be displayed in the `iframe` element inside
				 * the editor. This function will activate the MathJax
				 * library which interprets TeX expressions and converts them into
				 * their representation that is displayed in the editor.
				 *
				 * @param {String} value TeX string.
				 */
				setValue: function (value) {
					newValue = CKEDITOR.tools.htmlEncode(value);

					if (isInit && !isRunning)
						update();
				}
			};
		};
	} else {
		// In IE8 MathJax does not work stable so instead of using standard
		// frame wrapper it is replaced by placeholder to show pure TeX in iframe.
		CKEDITOR.plugins.nvd_math.frameWrapper = function (iFrame, editor) {
			iFrame.getFrameDocument().write('<!DOCTYPE html>' +
				'<html>' +
				'<head>' +
				'<meta charset="utf-8">' +
				'</head>' +
				'<body style="padding:0;margin:0;background:transparent;overflow:hidden">' +
				'<span style="white-space:nowrap;" id="tex"></span>' +
				'</body>' +
				'</html>');

			return {
				setValue: function (value) {
					var doc = iFrame.getFrameDocument(),
						tex = doc.getById('tex');

					tex.setHtml(CKEDITOR.plugins.nvd_math.trim(CKEDITOR.tools.htmlEncode(value)));

					CKEDITOR.plugins.nvd_math.copyStyles(iFrame, tex);

					editor.fire('lockSnapshot');

					iFrame.setStyles({
						width: Math.min(250, tex.$.offsetWidth) + 'px',
						height: doc.$.body.offsetHeight + 'px',
						display: 'inline',
						'vertical-align': 'middle'
					});

					editor.fire('unlockSnapshot');
				}
			};
		};
	}

})();
