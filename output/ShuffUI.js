
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ButtonClickedEvent
	var $ShuffUI_ButtonClickedEvent = function() {
	};
	$ShuffUI_ButtonClickedEvent.$ctor = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.CodeMirrorInformation
	var $ShuffUI_CodeMirrorInformation = function() {
		this.codeElement = null;
		this.editor = null;
		this.element = null;
		this.data = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.CodeMirrorInformationData
	var $ShuffUI_CodeMirrorInformationData = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.DockStyle
	var $ShuffUI_DockStyle = function() {
	};
	$ShuffUI_DockStyle.prototype = { none: 0, fill: 1, fillWidth: 2, fillHeight: 3 };
	Type.registerEnum(global, 'ShuffUI.DockStyle', $ShuffUI_DockStyle, false);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ParentChangedEvent
	var $ShuffUI_ParentChangedEvent = function() {
	};
	$ShuffUI_ParentChangedEvent.$ctor = function(parent) {
		var $this = {};
		$this.parent = null;
		$this.parent = parent;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.PositionChangedEvent
	var $ShuffUI_PositionChangedEvent = function() {
	};
	$ShuffUI_PositionChangedEvent.$ctor = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffButton
	var $ShuffUI_ShuffButton = function(x, y, width, height, text, click) {
		this.text = null;
		$ShuffUI_ShuffElement.call(this);
		this.element = $('<div></div>');
		this.element.css('position', 'absolute');
		this.text = text;
		this.text.set_staticValueChanges(Function.combine(this.text.get_staticValueChanges(), Function.mkdel(this, function(value) {
			this.element.text(value);
		})));
		this.element.text(Type.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(this.text));
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		this.element.button();
		this.element.click(function(a) {
			click($ShuffUI_ButtonClickedEvent.$ctor(a.clientX, a.clientY));
		});
		this.element.disableSelection();
	};
	$ShuffUI_ShuffButton.prototype = {
		bindCustomEvents: function() {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffButton
	var $ShuffUI_ShuffButton$1 = function(T) {
		var $type = function(data, x, y, width, height, text, click) {
			this.data = T.getDefaultValue();
			$ShuffUI_ShuffButton.call(this, x, y, width, height, text, click);
			this.data = data;
		};
		Type.registerGenericClassInstance($type, $ShuffUI_ShuffButton$1, [T], function() {
			return $ShuffUI_ShuffButton;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'ShuffUI.ShuffButton$1', $ShuffUI_ShuffButton$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffCodeEditor
	var $ShuffUI_ShuffCodeEditor = function() {
		this.information = null;
		this.$codeMirror = null;
		this.$2$TextChangedField = null;
		this.text = null;
		this.lineNumbers = false;
		$ShuffUI_ShuffElement.call(this);
		this.set_width(CommonLibraries.Number.op_Implicit$3('100%'));
		this.set_height(CommonLibraries.Number.op_Implicit$3('100%'));
	};
	$ShuffUI_ShuffCodeEditor.prototype = {
		get_textChanged: function() {
			return this.$2$TextChangedField;
		},
		set_textChanged: function(value) {
			this.$2$TextChangedField = value;
		},
		bindCustomEvents: function() {
			this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
				this.element.text(e.text);
			})));
			this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(ev) {
				if (ss.isValue(ev.parent)) {
					var hlLine = null;
					this.$codeMirror.editor = CodeMirror.fromTextArea(this.$codeMirror.element, {
						lineNumbers: this.lineNumbers,
						lineWrapping: true,
						matchBrackets: true,
						onGutterClick: function(cm, n, e1) {
							var info = cm.lineInfo(n);
							if (info.markerText) {
								//  BuildSite.Instance.codeArea.Data.breakPoints.Extract(BuildSite.Instance.codeArea.Data.breakPoints.IndexOf(n - 1), 0);
								// cm.SetGutterMarker(n);
							}
							else {
								//   BuildSite.Instance.codeArea.Data.breakPoints.Add(n - 1);
								//    cm.SetMarker(n, "<span style=\"color= #900\">●</span> %N%");
							}
						},
						onCursorActivity: function(e2) {
							//   codeMirror.editor.re(hlLine, null);
							//     hlLine = codeMirror.editor.SetLineClass(codeMirror.editor.GetCursor().Line, "activeline");
						},
						onFocus: function(e3) {
						},
						onBlur: function(e4) {
						}
					});
					//  hlLine = codeMirror.editor.SetLineClass(0, "activeline");
					var scroller = this.$codeMirror.editor.getScrollerElement();
					scroller.style.height = this.element[0].offsetHeight + 'px';
					scroller.style.width = this.element[0].offsetWidth + 'px';
					this.$codeMirror.editor.refresh();
					this.$codeMirror.editor.setOption('theme', 'night');
					this.information = this.$codeMirror;
				}
				else {
				}
			}));
		}
	};
	$ShuffUI_ShuffCodeEditor.$ctor1 = function(x, y, width, height, text) {
		this.information = null;
		this.$codeMirror = null;
		this.$2$TextChangedField = null;
		this.text = null;
		this.lineNumbers = false;
		$ShuffUI_ShuffElement.call(this);
		var fmw = width;
		var fmh = height;
		if (!!!fmw) {
			width = CommonLibraries.Number.op_Implicit$3('100%');
		}
		if (!!!fmh) {
			height = CommonLibraries.Number.op_Implicit$3('100%');
		}
		var divs = $('<div style=\'width:' + CommonLibraries.Number.op_Implicit$1(width) + '; height:' + CommonLibraries.Number.op_Implicit$1(height) + '\'> </div>');
		var fm = $('<textarea id=\'code\' name=\'code\' class=\'CodeMirror-fullscreen \' style=\'\'></textarea>');
		divs.append(fm);
		this.element = divs;
		var $t1 = new $ShuffUI_CodeMirrorInformation();
		$t1.element = fm.get(0);
		this.$codeMirror = $t1;
		this.$codeMirror.element.value = this.text = text;
		this.lineNumbers = true;
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		this.sizeChanged = Function.combine(this.sizeChanged, Function.mkdel(this, function(e) {
			window.alert(CommonLibraries.Number.op_Implicit$1(e.width) + ' ' + CommonLibraries.Number.op_Implicit$1(e.height));
			$(this.$codeMirror.element).width(CommonLibraries.Number.op_Implicit$1(e.width));
			$(this.$codeMirror.element).height(CommonLibraries.Number.op_Implicit$1(e.height));
		}));
	};
	$ShuffUI_ShuffCodeEditor.$ctor1.prototype = $ShuffUI_ShuffCodeEditor.prototype;
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffCodeEditor
	var $ShuffUI_ShuffCodeEditor$1 = function(T) {
		var $type = function(data, x, y, width, height, text) {
			this.data = T.getDefaultValue();
			$ShuffUI_ShuffCodeEditor.$ctor1.call(this, x, y, width, height, text);
			this.data = data;
		};
		Type.registerGenericClassInstance($type, $ShuffUI_ShuffCodeEditor$1, [T], function() {
			return $ShuffUI_ShuffCodeEditor;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'ShuffUI.ShuffCodeEditor$1', $ShuffUI_ShuffCodeEditor$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffElement
	var $ShuffUI_ShuffElement = function() {
		this.parentChanged = null;
		this.parentSizeChanged = null;
		this.positionChanged = null;
		this.sizeChanged = null;
		this.visibleChanged = null;
		this.$myHeight = null;
		this.$myVisible = false;
		this.$myWidth = null;
		this.$myX = 0;
		this.$myY = 0;
		this.$1$DockField = 0;
		this.$1$ParentField = null;
		this.element = null;
		this.$myWidth = CommonLibraries.Number.op_Implicit$2(0);
		this.$myHeight = CommonLibraries.Number.op_Implicit$2(0);
		this.$bindEvents();
	};
	$ShuffUI_ShuffElement.prototype = {
		get_dock: function() {
			return this.$1$DockField;
		},
		set_dock: function(value) {
			this.$1$DockField = value;
		},
		get_x: function() {
			return this.$myX;
		},
		set_x: function(value) {
			this.$myX = value;
			this.positionChanged($ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
		},
		get_parent: function() {
			return this.$1$ParentField;
		},
		set_parent: function(value) {
			this.$1$ParentField = value;
		},
		get_y: function() {
			return this.$myY;
		},
		set_y: function(value) {
			this.$myY = value;
			this.positionChanged($ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
		},
		get_width: function() {
			return this.$myWidth;
		},
		set_width: function(value) {
			this.$myWidth = value;
			this.sizeChanged($ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
		},
		get_height: function() {
			return this.$myHeight;
		},
		set_height: function(value) {
			this.$myHeight = value;
			this.sizeChanged($ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
		},
		get_visible: function() {
			return this.$myVisible;
		},
		set_visible: function(value) {
			this.$myVisible = value;
			this.visibleChanged($ShuffUI_VisibleChangedEvent.$ctor(this.$myVisible));
		},
		$bindEvents: function() {
			this.sizeChanged = Function.combine(this.sizeChanged, Function.mkdel(this, function(e) {
				if (!!e.width) {
					this.$myWidth = e.width;
					this.element.css('width', CommonLibraries.Number.op_Implicit$1(e.width));
				}
				if (!!e.height) {
					this.$myHeight = e.height;
					this.element.css('height', CommonLibraries.Number.op_Implicit$1(e.height));
				}
			}));
			this.parentSizeChanged = Function.combine(this.parentSizeChanged, Function.mkdel(this, function(e1) {
				switch (this.get_dock()) {
					case 0: {
						break;
					}
					case 1: {
						this.set_width(e1.width);
						this.set_height(e1.height);
						break;
					}
					case 2: {
						this.set_width(e1.width);
						break;
					}
					case 3: {
						this.set_height(e1.height);
						break;
					}
				}
			}));
			this.positionChanged = Function.combine(this.positionChanged, Function.mkdel(this, function(e2) {
				this.element.css('left', e2.x + 'px');
				this.element.css('top', e2.y + 'px');
			}));
			this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e3) {
				this.element.css('display', (e3.visible ? 'block' : 'none'));
			}));
			this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e4) {
				this.set_parent(e4.parent);
				if (ss.isNullOrUndefined(this.get_parent())) {
					this.element.remove();
				}
				else {
					this.get_parent().element.append(this.element);
				}
			}));
			this.bindCustomEvents();
		},
		bindCustomEvents: function() {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffLabel
	var $ShuffUI_ShuffLabel = function(x, y, text) {
		this.$myText = null;
		this.$2$TextChangedField = null;
		$ShuffUI_ShuffElement.call(this);
		var but = $('<span></span>');
		this.element = but;
		but.css('position', 'absolute');
		this.set_text(text);
		this.set_x(x);
		this.set_y(y);
		this.set_visible(true);
		but.disableSelection();
	};
	$ShuffUI_ShuffLabel.prototype = {
		get_text: function() {
			return this.$myText;
		},
		set_text: function(value) {
			this.$myText = value;
			this.get_textChanged()($ShuffUI_TextChangedEvent.$ctor(this.$myText, false));
		},
		get_textChanged: function() {
			return this.$2$TextChangedField;
		},
		set_textChanged: function(value) {
			this.$2$TextChangedField = value;
		},
		bindCustomEvents: function() {
			this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
				this.element.text(e.text);
			})));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffLabel
	var $ShuffUI_ShuffLabel$1 = function(T) {
		var $type = function(data, x, y, text) {
			this.data = T.getDefaultValue();
			$ShuffUI_ShuffLabel.call(this, x, y, text);
			this.data = data;
		};
		Type.registerGenericClassInstance($type, $ShuffUI_ShuffLabel$1, [T], function() {
			return $ShuffUI_ShuffLabel;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'ShuffUI.ShuffLabel$1', $ShuffUI_ShuffLabel$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffListBox
	var $ShuffUI_ShuffListBox = function(x, y, width, height) {
		this.onClick = null;
		this.items = null;
		this.selectedItem = null;
		$ShuffUI_ShuffElement.call(this);
		var but = $('<div style=\'position:absolute;\'></div>');
		this.element = but;
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		this.items = [];
		var theme = eval('getTheme()');
		but.jqxListBox({ source: this.items, width: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(width)), height: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(height)), theme: theme });
		window.setTimeout(Function.mkdel(this, function() {
			but.get(0).style.left = this.get_x() + 'px';
			but.get(0).style.top = this.get_y() + 'px';
		}), 2000);
		but.bind('select', Function.mkdel(this, function(e) {
			var item = e.args.item;
			this.selectedItem = item;
			if (ss.isValue(this.onClick)) {
				this.onClick(item);
			}
		}));
		this.update();
	};
	$ShuffUI_ShuffListBox.prototype = {
		bindCustomEvents: function() {
		},
		addItem: function(item) {
			if (this.items.length === 0) {
				this.selectedItem = item;
			}
			this.items.add(item);
			this.update();
		},
		update: function() {
			var theme = 'getTheme()';
			this.element.jqxListBox({ source: this.items, width: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(this.get_width())), height: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(this.get_height())), theme: theme });
		},
		clearItems: function() {
			this.items.clear();
			this.update();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffListBox
	var $ShuffUI_ShuffListBox$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = T.getDefaultValue();
			$ShuffUI_ShuffListBox.call(this, x, y, width, height);
			this.data = data;
		};
		Type.registerGenericClassInstance($type, $ShuffUI_ShuffListBox$1, [T], function() {
			return $ShuffUI_ShuffListBox;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'ShuffUI.ShuffListBox$1', $ShuffUI_ShuffListBox$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffListItem
	var $ShuffUI_ShuffListItem = function(label, value) {
		this.label = null;
		this.value = null;
		this.label = label;
		this.value = value;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffPanel
	var $ShuffUI_ShuffPanel = function() {
		this.elements = null;
		$ShuffUI_ShuffElement.call(this);
		this.elements = [];
		var but = $('<div />');
		this.element = but;
		but.css('position', 'absolute');
		but.css('width', '100%');
		but.css('height', '100%');
		but.css('top', '0');
		but.css('left', '0');
		this.set_visible(true);
	};
	$ShuffUI_ShuffPanel.prototype = {
		addElement: function(T) {
			return function(element) {
				this.element.append(element.element);
				this.elements.add(element);
				element.parentChanged($ShuffUI_ParentChangedEvent.$ctor(this));
				return element;
			};
		},
		removeElement: function(T) {
			return function(element) {
				element.element.remove();
				this.elements.remove(element);
				element.parentChanged($ShuffUI_ParentChangedEvent.$ctor(null));
				return element;
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffTextbox
	var $ShuffUI_ShuffTextbox = function(x, y, width, height, text, label, labelStyle) {
		this.$2$TextChangedField = null;
		this.$2$LabelElementField = null;
		$ShuffUI_ShuffElement.call(this);
		var but = $('<input value=\'' + ss.coalesce(text, '') + '\' />');
		this.element = but;
		but.css('position', 'absolute');
		this.set_text(text);
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		but.keydown(function(a) {
		});
		if (ss.isValue(label)) {
			this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e) {
				if (ss.isNullOrUndefined(e.parent)) {
					this.get_labelElement().remove();
					this.set_labelElement(null);
				}
				else {
					//to LabeledElement
					var lbl = $('<span style=\'' + labelStyle + '\'></span>');
					this.set_labelElement(lbl);
					lbl.text(label);
					this.get_parent().element.append(lbl);
					lbl.css('position', 'absolute');
					lbl.css('left', this.get_x() - lbl.width() - 15);
					lbl.css('top', this.get_y() + 2);
					lbl.disableSelection();
				}
			}));
		}
	};
	$ShuffUI_ShuffTextbox.prototype = {
		get_text: function() {
			return this.element.val();
		},
		set_text: function(value) {
			this.get_textChanged()($ShuffUI_TextChangedEvent.$ctor(value, false));
		},
		get_textChanged: function() {
			return this.$2$TextChangedField;
		},
		set_textChanged: function(value) {
			this.$2$TextChangedField = value;
		},
		get_labelElement: function() {
			return this.$2$LabelElementField;
		},
		set_labelElement: function(value) {
			this.$2$LabelElementField = value;
		},
		bindCustomEvents: function() {
			this.set_textChanged(Function.combine(this.get_textChanged(), Function.mkdel(this, function(e) {
				if (!e.live) {
					this.element.val(e.text);
				}
			})));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffTextbox
	var $ShuffUI_ShuffTextbox$1 = function(T) {
		var $type = function(data, x, y, width, height, text, label, labelStyle) {
			this.data = T.getDefaultValue();
			$ShuffUI_ShuffTextbox.call(this, x, y, width, height, text, label, labelStyle);
			this.data = data;
		};
		Type.registerGenericClassInstance($type, $ShuffUI_ShuffTextbox$1, [T], function() {
			return $ShuffUI_ShuffTextbox;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'ShuffUI.ShuffTextbox$1', $ShuffUI_ShuffTextbox$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffUIManager
	var $ShuffUI_ShuffUIManager = function() {
		this.$uiAreas = [];
	};
	$ShuffUI_ShuffUIManager.prototype = {
		createWindow: function(ui) {
			var windowID = ui.title;
			var outer = $('<div class=\'window-outer\' style=\'background-color: #87B6D9; overflow:hidden;\'></div>');
			$('body').append(outer);
			ui.outer = outer;
			var tp = outer[0].style;
			tp['box-shadow'] = '4px 4px 2px #333';
			if (ss.isValue(tp['box-shadow'])) {
				tp['-moz-box-shadow'] = tp['box-shadow'];
				tp['-webkit-box-shadow'] = tp['box-shadow'];
			}
			outer.css('position', 'absolute');
			outer.css('padding', '2em 1em 1em 1em');
			outer.css('left', ui.get_x() + 'px');
			outer.css('top', ui.get_y() + 'px');
			outer.css('width', CommonLibraries.Number.op_Implicit$1(ui.get_width()));
			outer.css('height', CommonLibraries.Number.op_Implicit$1(ui.get_height()));
			outer.css('display', ((ui.get_visible() === false) ? 'none' : 'block'));
			var top = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;  \'></div>');
			outer.append(top);
			var title = $('<div class=\'rounded\' style=\'margin:auto; background-color:white; width:40%; text-align:center;opacity:0.4;\'>' + ui.title + '</div>');
			top.append(title);
			var rightSideBar = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;\'></div>');
			top.append(rightSideBar);
			var x = $('<div class=\'rounded window-header-button window-close\' style=\'height:30px; vertical-align:top;background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>X</div> ');
			rightSideBar.append(x);
			var max = $('<div class=\'rounded window-header-button window-maximize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>[]</div>  ');
			rightSideBar.append(max);
			var min = $('<div class=\'rounded window-header-button window-minimize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>_</div>  ');
			rightSideBar.append(min);
			var inner = $('<div class=\'window-inner\' id=\'window' + windowID + '\' style=\'background-color: #FDFEFE;width:100%; height:100%; \'> </div> ');
			outer.append(inner);
			ui.window = $('#window' + windowID);
			var info;
			this.$uiAreas.add(info = new $ShuffUI_UIAreaInformation(outer, inner));
			ui.information = info;
			x.click(function(evt) {
				outer.css('display', 'none');
			});
			var toggleSize = false;
			var toggleMinSize = false;
			max.click(function(evt1) {
				toggleSize = !toggleSize;
				if (toggleSize) {
					outer.css('width', '100%');
					outer.css('height', '100%');
					outer.css('left', '0px');
					outer.css('top', '0px');
				}
				else {
					outer.css('width', '100%');
					outer.css('height', '100%');
				}
			});
			$('.window-minimize').click(function(evt2) {
				toggleMinSize = !toggleMinSize;
				if (toggleMinSize) {
					outer.css('height', '25px');
				}
				else {
					outer.css('height', CommonLibraries.Number.op_Implicit$1(ui.get_height()) + 'px');
					//                    outer.CSS("height", "100%");
				}
			});
			outer.mousedown(Function.mkdel(this, function(evt3) {
				this.focus(ui);
			}));
			$('.window-header-button').button();
			if (!ui.staticPositioning) {
				outer.draggable({
					cancel: '.window-inner, .CodeMirror, .CodeMirror-fullscreen, .CodeMirror-wrap, .CodeMirror-focused',
					containment: 'window',
					start: function(evt4, o) {
					}
				});
				outer.resizable({
					handles: 'n, e, s, w, ne, se, sw, nw',
					resize: function(evt5, o1) {
						ui.onResize(evt5, o1);
					}
				});
			}
			ui.element = inner;
			//inner.Append(ui.Element);
			return ui;
		},
		focus: function(info) {
			for (var i = 0; i < this.$uiAreas.length; i++) {
				this.$uiAreas[i].get_element().css('z-index', parseInt(this.$uiAreas[i].get_element().css('z-index')) - 1);
			}
			info.information.get_element().css('z-index', 1900);
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffWindow
	var $ShuffUI_ShuffWindow = function() {
		this.outer = null;
		this.window = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		$ShuffUI_ShuffPanel.call(this);
	};
	$ShuffUI_ShuffWindow.prototype = {
		get_$outer: function() {
			return this.outer;
		},
		set_$outer: function(value) {
			this.outer = value;
			this.outer.resizable({ handles: 'n, e, s, w, ne, se, sw, nw', resize: Function.mkdel(this, this.onResize) });
		},
		onResize: function(e, uievent) {
			this.set_width(CommonLibraries.Number.op_Implicit$3(uievent.size.width + 'px'));
			this.set_height(CommonLibraries.Number.op_Implicit$3(uievent.size.height + 'px'));
			for (var $t1 = 0; $t1 < this.elements.length; $t1++) {
				var shuffElement = this.elements[$t1];
				shuffElement.parentSizeChanged($ShuffUI_SizeChangedEvent.$ctor(this.get_width(), this.get_height()));
			}
		},
		bindCustomEvents: function() {
			$ShuffUI_ShuffElement.prototype.bindCustomEvents.call(this);
			this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e) {
				if (ss.isValue(this.get_$outer())) {
					this.get_$outer().css('display', (e.visible ? 'block' : 'none'));
				}
			}));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.ShuffWindow
	var $ShuffUI_ShuffWindow$1 = function(T) {
		var $type = function(data) {
			this.data = T.getDefaultValue();
			$ShuffUI_ShuffWindow.call(this);
		};
		Type.registerGenericClassInstance($type, $ShuffUI_ShuffWindow$1, [T], function() {
			return $ShuffUI_ShuffWindow;
		}, function() {
			return [];
		});
		return $type;
	};
	Type.registerGenericClass(global, 'ShuffUI.ShuffWindow$1', $ShuffUI_ShuffWindow$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.SizeChangedEvent
	var $ShuffUI_SizeChangedEvent = function() {
	};
	$ShuffUI_SizeChangedEvent.$ctor = function(w, h) {
		var $this = {};
		$this.width = null;
		$this.height = null;
		$this.width = w;
		$this.height = h;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.TextChangedEvent
	var $ShuffUI_TextChangedEvent = function() {
	};
	$ShuffUI_TextChangedEvent.$ctor = function(text, live) {
		var $this = {};
		$this.text = null;
		$this.live = false;
		$this.live = live;
		$this.text = text;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.UIAreaInformation
	var $ShuffUI_UIAreaInformation = function(element, inner) {
		this.$1$ElementField = null;
		this.$1$InnerField = null;
		this.set_element(element);
		this.set_inner(inner);
	};
	$ShuffUI_UIAreaInformation.prototype = {
		get_element: function() {
			return this.$1$ElementField;
		},
		set_element: function(value) {
			this.$1$ElementField = value;
		},
		get_inner: function() {
			return this.$1$InnerField;
		},
		set_inner: function(value) {
			this.$1$InnerField = value;
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// ShuffUI.VisibleChangedEvent
	var $ShuffUI_VisibleChangedEvent = function() {
	};
	$ShuffUI_VisibleChangedEvent.$ctor = function(visible) {
		var $this = {};
		$this.visible = false;
		$this.visible = visible;
		return $this;
	};
	Type.registerClass(global, 'ShuffUI.ButtonClickedEvent', $ShuffUI_ButtonClickedEvent, Object);
	Type.registerClass(global, 'ShuffUI.CodeMirrorInformation', $ShuffUI_CodeMirrorInformation, Object);
	Type.registerClass(global, 'ShuffUI.CodeMirrorInformationData', $ShuffUI_CodeMirrorInformationData, Object);
	Type.registerClass(global, 'ShuffUI.ParentChangedEvent', $ShuffUI_ParentChangedEvent, Object);
	Type.registerClass(global, 'ShuffUI.PositionChangedEvent', $ShuffUI_PositionChangedEvent, Object);
	Type.registerClass(global, 'ShuffUI.ShuffElement', $ShuffUI_ShuffElement, Object);
	Type.registerClass(global, 'ShuffUI.ShuffButton', $ShuffUI_ShuffButton, $ShuffUI_ShuffElement);
	Type.registerClass(global, 'ShuffUI.ShuffCodeEditor', $ShuffUI_ShuffCodeEditor, $ShuffUI_ShuffElement);
	Type.registerClass(global, 'ShuffUI.ShuffLabel', $ShuffUI_ShuffLabel, $ShuffUI_ShuffElement);
	Type.registerClass(global, 'ShuffUI.ShuffListBox', $ShuffUI_ShuffListBox, $ShuffUI_ShuffElement);
	Type.registerClass(global, 'ShuffUI.ShuffListItem', $ShuffUI_ShuffListItem, Object);
	Type.registerClass(global, 'ShuffUI.ShuffPanel', $ShuffUI_ShuffPanel, $ShuffUI_ShuffElement);
	Type.registerClass(global, 'ShuffUI.ShuffTextbox', $ShuffUI_ShuffTextbox, $ShuffUI_ShuffElement);
	Type.registerClass(global, 'ShuffUI.ShuffUIManager', $ShuffUI_ShuffUIManager, Object);
	Type.registerClass(global, 'ShuffUI.ShuffWindow', $ShuffUI_ShuffWindow, $ShuffUI_ShuffPanel);
	Type.registerClass(global, 'ShuffUI.SizeChangedEvent', $ShuffUI_SizeChangedEvent, Object);
	Type.registerClass(global, 'ShuffUI.TextChangedEvent', $ShuffUI_TextChangedEvent, Object);
	Type.registerClass(global, 'ShuffUI.UIAreaInformation', $ShuffUI_UIAreaInformation, Object);
	Type.registerClass(global, 'ShuffUI.VisibleChangedEvent', $ShuffUI_VisibleChangedEvent, Object);
})();
