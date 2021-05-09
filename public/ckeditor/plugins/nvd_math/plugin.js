CKEDITOR.plugins.add('nvd_math', {
	availableLangs: { en: 1 },
	lang: "en",
	requires: ['dialog'],
	icons: "nvd_math",

	init: function (editor) {
		var host = 'latex.codecogs.com';
		var http = ('https:' == document.location.protocol ? 'https://' : 'http://');
		var pluginDirectory = this.path;

		// First make sure we have loaded the necessary scripts
		CKEDITOR.scriptLoader.load([
			http + host + '/js/eq_config.js',
			http + host + '/js/eq_editor-lite-18.js',
		]
		);

		editor.addContentsCss(pluginDirectory + 'styles/styles.css');

		// Load Additional CSS 
		var fileref = document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");

		fileref.setAttribute("href", pluginDirectory + 'styles/styles.css')

		document.getElementsByTagName("head")[0].appendChild(fileref);

		var pluginCmd = 'nvd_mathDialog';

		// Add the link and unlink buttons.
		editor.addCommand(pluginCmd, new CKEDITOR.dialogCommand(pluginCmd,
			{
				allowedContent: 'img[src,alt]',
				requiredContent: 'img[src,alt]'
			})
		);

		CKEDITOR.dialog.add(pluginCmd, this.path + "dialogs/nvd_math.js");

		editor.ui.addButton('NvdMath', {
			label: editor.lang.nvd_math.toolbar,
			command: pluginCmd,
			icon: this.path + 'icons/nvd_math.png',
			toolbar: 'insert'
		});

		// add context-menu entry
		if (editor.contextMenu) {
			editor.addMenuGroup(editor.lang.nvd_math.menu);
			editor.addMenuItem('nvd_math', {
				label: editor.lang.nvd_math.edit,
				icon: this.path + 'icons/nvd_math.png',
				command: pluginCmd,
				group: editor.lang.nvd_math.menu
			});

			// if the selected item is image of class 'mathImg',
			// we shold be interested in it
			editor.contextMenu.addListener(function (element) {
				var res = {};
				if (element.getAscendant('img', true)) {
					var sName = element.getAttribute('src').match(/(gif|svg)\.latex\?(.*)/);
					if (sName != null) {
						res['nvd_math'] = CKEDITOR.TRISTATE_OFF;
						return res;
					}
				}
			});

		}

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

	}
});
