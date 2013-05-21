
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ButtonClickedEvent
	var $WebLibraries_ShuffUI_ShuffUI_ButtonClickedEvent = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_ButtonClickedEvent.$ctor = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.CodeMirrorInformation
	var $WebLibraries_ShuffUI_ShuffUI_CodeMirrorInformation = function() {
		this.codeElement = null;
		this.editor = null;
		this.element = null;
		this.data = null;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.CodeMirrorInformationData
	var $WebLibraries_ShuffUI_ShuffUI_CodeMirrorInformationData = function() {
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.DockStyle
	var $WebLibraries_ShuffUI_ShuffUI_DockStyle = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_DockStyle.prototype = { none: 0, fill: 1, fillWidth: 2, fillHeight: 3 };
	ss.registerEnum(global, 'WebLibraries.ShuffUI.ShuffUI.DockStyle', $WebLibraries_ShuffUI_ShuffUI_DockStyle, false);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ParentChangedEvent
	var $WebLibraries_ShuffUI_ShuffUI_ParentChangedEvent = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_ParentChangedEvent.$ctor = function(parent) {
		var $this = {};
		$this.parent = null;
		$this.parent = parent;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.PositionChangedEvent
	var $WebLibraries_ShuffUI_ShuffUI_PositionChangedEvent = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_PositionChangedEvent.$ctor = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffButton
	var $WebLibraries_ShuffUI_ShuffUI_ShuffButton = function(x, y, width, height, text, click) {
		this.text = null;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
		this.element = $('<div></div>');
		this.element.css('position', 'absolute');
		this.text = text;
		this.text.set_staticValueChanges(ss.delegateCombine(this.text.get_staticValueChanges(), ss.mkdel(this, function(value) {
			this.element.text(value);
		})));
		this.element.text(ss.makeGenericType(CommonLibraries.DelegateOrValue$1, [String]).op_Implicit(this.text));
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		this.element.button();
		this.element.click(function(a) {
			click($WebLibraries_ShuffUI_ShuffUI_ButtonClickedEvent.$ctor(a.clientX, a.clientY));
		});
		this.element.disableSelection();
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffButton.prototype = {
		bindCustomEvents: function() {
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffButton
	var $WebLibraries_ShuffUI_ShuffUI_ShuffButton$1 = function(T) {
		var $type = function(data, x, y, width, height, text, click) {
			this.data = ss.getDefaultValue(T);
			$WebLibraries_ShuffUI_ShuffUI_ShuffButton.call(this, x, y, width, height, text, click);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $WebLibraries_ShuffUI_ShuffUI_ShuffButton$1, [T], function() {
			return $WebLibraries_ShuffUI_ShuffUI_ShuffButton;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffButton$1', $WebLibraries_ShuffUI_ShuffUI_ShuffButton$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor
	var $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor = function() {
		this.information = null;
		this.$codeMirror = null;
		this.$2$TextChangedField = null;
		this.text = null;
		this.lineNumbers = false;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
		this.set_width(CommonLibraries.Number.op_Implicit$3('100%'));
		this.set_height(CommonLibraries.Number.op_Implicit$3('100%'));
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor.prototype = {
		get_textChanged: function() {
			return this.$2$TextChangedField;
		},
		set_textChanged: function(value) {
			this.$2$TextChangedField = value;
		},
		bindCustomEvents: function() {
			this.set_textChanged(ss.delegateCombine(this.get_textChanged(), ss.mkdel(this, function(e) {
				this.element.text(e.text);
			})));
			this.parentChanged = ss.delegateCombine(this.parentChanged, ss.mkdel(this, function(ev) {
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
	$WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor.$ctor1 = function(x, y, width, height, text) {
		this.information = null;
		this.$codeMirror = null;
		this.$2$TextChangedField = null;
		this.text = null;
		this.lineNumbers = false;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
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
		var $t1 = new $WebLibraries_ShuffUI_ShuffUI_CodeMirrorInformation();
		$t1.element = fm.get(0);
		this.$codeMirror = $t1;
		this.$codeMirror.element.value = this.text = text;
		this.lineNumbers = true;
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		this.sizeChanged = ss.delegateCombine(this.sizeChanged, ss.mkdel(this, function(e) {
			window.alert(CommonLibraries.Number.op_Implicit$1(e.width) + ' ' + CommonLibraries.Number.op_Implicit$1(e.height));
			$(this.$codeMirror.element).width(CommonLibraries.Number.op_Implicit$1(e.width));
			$(this.$codeMirror.element).height(CommonLibraries.Number.op_Implicit$1(e.height));
		}));
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor.$ctor1.prototype = $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor.prototype;
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor
	var $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor$1 = function(T) {
		var $type = function(data, x, y, width, height, text) {
			this.data = ss.getDefaultValue(T);
			$WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor.$ctor1.call(this, x, y, width, height, text);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor$1, [T], function() {
			return $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor$1', $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffElement
	var $WebLibraries_ShuffUI_ShuffUI_ShuffElement = function() {
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
	$WebLibraries_ShuffUI_ShuffUI_ShuffElement.prototype = {
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
			this.positionChanged($WebLibraries_ShuffUI_ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
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
			this.positionChanged($WebLibraries_ShuffUI_ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
		},
		get_width: function() {
			return this.$myWidth;
		},
		set_width: function(value) {
			this.$myWidth = value;
			this.sizeChanged($WebLibraries_ShuffUI_ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
		},
		get_height: function() {
			return this.$myHeight;
		},
		set_height: function(value) {
			this.$myHeight = value;
			this.sizeChanged($WebLibraries_ShuffUI_ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
		},
		get_visible: function() {
			return this.$myVisible;
		},
		set_visible: function(value) {
			this.$myVisible = value;
			this.visibleChanged($WebLibraries_ShuffUI_ShuffUI_VisibleChangedEvent.$ctor(this.$myVisible));
		},
		$bindEvents: function() {
			this.sizeChanged = ss.delegateCombine(this.sizeChanged, ss.mkdel(this, function(e) {
				if (!!e.width) {
					this.$myWidth = e.width;
					this.element.css('width', CommonLibraries.Number.op_Implicit$1(e.width));
				}
				if (!!e.height) {
					this.$myHeight = e.height;
					this.element.css('height', CommonLibraries.Number.op_Implicit$1(e.height));
				}
			}));
			this.parentSizeChanged = ss.delegateCombine(this.parentSizeChanged, ss.mkdel(this, function(e1) {
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
			this.positionChanged = ss.delegateCombine(this.positionChanged, ss.mkdel(this, function(e2) {
				this.element.css('left', e2.x + 'px');
				this.element.css('top', e2.y + 'px');
			}));
			this.visibleChanged = ss.delegateCombine(this.visibleChanged, ss.mkdel(this, function(e3) {
				this.element.css('display', (e3.visible ? 'block' : 'none'));
			}));
			this.parentChanged = ss.delegateCombine(this.parentChanged, ss.mkdel(this, function(e4) {
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
	// WebLibraries.ShuffUI.ShuffUI.ShuffLabel
	var $WebLibraries_ShuffUI_ShuffUI_ShuffLabel = function(x, y, text) {
		this.$myText = null;
		this.$2$TextChangedField = null;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
		var but = $('<span></span>');
		this.element = but;
		but.css('position', 'absolute');
		this.set_text(text);
		this.set_x(x);
		this.set_y(y);
		this.set_visible(true);
		but.disableSelection();
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffLabel.prototype = {
		get_text: function() {
			return this.$myText;
		},
		set_text: function(value) {
			this.$myText = value;
			this.get_textChanged()($WebLibraries_ShuffUI_ShuffUI_TextChangedEvent.$ctor(this.$myText, false));
		},
		get_textChanged: function() {
			return this.$2$TextChangedField;
		},
		set_textChanged: function(value) {
			this.$2$TextChangedField = value;
		},
		bindCustomEvents: function() {
			this.set_textChanged(ss.delegateCombine(this.get_textChanged(), ss.mkdel(this, function(e) {
				this.element.text(e.text);
			})));
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffLabel
	var $WebLibraries_ShuffUI_ShuffUI_ShuffLabel$1 = function(T) {
		var $type = function(data, x, y, text) {
			this.data = ss.getDefaultValue(T);
			$WebLibraries_ShuffUI_ShuffUI_ShuffLabel.call(this, x, y, text);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $WebLibraries_ShuffUI_ShuffUI_ShuffLabel$1, [T], function() {
			return $WebLibraries_ShuffUI_ShuffUI_ShuffLabel;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffLabel$1', $WebLibraries_ShuffUI_ShuffUI_ShuffLabel$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffListBox
	var $WebLibraries_ShuffUI_ShuffUI_ShuffListBox = function(x, y, width, height, items) {
		this.onClick = null;
		this.items = null;
		this.selectedItem = null;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
		var but = $('<div style=\'position:absolute;\'></div>');
		this.element = but;
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		this.items = items || [];
		var theme = eval('getTheme()');
		but.jqxListBox({ source: this.items, width: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(width)), height: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(height)), theme: theme });
		window.setTimeout(ss.mkdel(this, function() {
			but.get(0).style.left = this.get_x() + 'px';
			but.get(0).style.top = this.get_y() + 'px';
		}), 2000);
		but.bind('select', ss.mkdel(this, function(e) {
			var item = e.args.item;
			this.selectedItem = item;
			if (!ss.staticEquals(this.onClick, null)) {
				this.onClick(item);
			}
		}));
		this.update();
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffListBox.prototype = {
		bindCustomEvents: function() {
		},
		addItem: function(item) {
			if (this.items.length === 0) {
				this.selectedItem = item;
			}
			ss.add(this.items, item);
			this.update();
		},
		update: function() {
			var theme = 'getTheme()';
			this.element.jqxListBox({ source: this.items, width: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(this.get_width())), height: ss.Int32.trunc(CommonLibraries.Number.op_Implicit(this.get_height())), theme: theme });
		},
		clearItems: function() {
			ss.clear(this.items);
			this.update();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffListBox
	var $WebLibraries_ShuffUI_ShuffUI_ShuffListBox$1 = function(T) {
		var $type = function(data, x, y, width, height) {
			this.data = ss.getDefaultValue(T);
			$WebLibraries_ShuffUI_ShuffUI_ShuffListBox.call(this, x, y, width, height, null);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $WebLibraries_ShuffUI_ShuffUI_ShuffListBox$1, [T], function() {
			return $WebLibraries_ShuffUI_ShuffUI_ShuffListBox;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffListBox$1', $WebLibraries_ShuffUI_ShuffUI_ShuffListBox$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffListItem
	var $WebLibraries_ShuffUI_ShuffUI_ShuffListItem = function(label, value) {
		this.label = null;
		this.value = null;
		this.label = label;
		this.value = value;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffPanel
	var $WebLibraries_ShuffUI_ShuffUI_ShuffPanel = function() {
		this.elements = null;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
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
	$WebLibraries_ShuffUI_ShuffUI_ShuffPanel.prototype = {
		addElement: function(T) {
			return function(element) {
				this.element.append(element.element);
				ss.add(this.elements, element);
				element.parentChanged($WebLibraries_ShuffUI_ShuffUI_ParentChangedEvent.$ctor(this));
				return element;
			};
		},
		removeElement: function(T) {
			return function(element) {
				element.element.remove();
				ss.remove(this.elements, element);
				element.parentChanged($WebLibraries_ShuffUI_ShuffUI_ParentChangedEvent.$ctor(null));
				return element;
			};
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffTextbox
	var $WebLibraries_ShuffUI_ShuffUI_ShuffTextbox = function(x, y, width, height, text, label, labelStyle) {
		this.$2$TextChangedField = null;
		this.$2$LabelElementField = null;
		this.$2$OnEnterField = null;
		$WebLibraries_ShuffUI_ShuffUI_ShuffElement.call(this);
		var but = $('<input value=\'' + ss.coalesce(text, '') + '\' />');
		this.element = but;
		but.css('position', 'absolute');
		this.set_text(text);
		this.set_x(x);
		this.set_y(y);
		this.set_width(width);
		this.set_height(height);
		this.set_visible(true);
		but.keyup(ss.mkdel(this, function(a) {
			if (a.which === 13) {
				if (!ss.staticEquals(this.get_onEnter(), null)) {
					this.get_onEnter()();
				}
			}
		}));
		if (ss.isValue(label)) {
			this.parentChanged = ss.delegateCombine(this.parentChanged, ss.mkdel(this, function(e) {
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
	$WebLibraries_ShuffUI_ShuffUI_ShuffTextbox.prototype = {
		get_text: function() {
			return this.element.val();
		},
		set_text: function(value) {
			this.get_textChanged()($WebLibraries_ShuffUI_ShuffUI_TextChangedEvent.$ctor(value, false));
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
		get_onEnter: function() {
			return this.$2$OnEnterField;
		},
		set_onEnter: function(value) {
			this.$2$OnEnterField = value;
		},
		bindCustomEvents: function() {
			this.set_textChanged(ss.delegateCombine(this.get_textChanged(), ss.mkdel(this, function(e) {
				if (!e.live) {
					this.element.val(e.text);
				}
			})));
		},
		focus: function() {
			this.element.focus();
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffTextbox
	var $WebLibraries_ShuffUI_ShuffUI_ShuffTextbox$1 = function(T) {
		var $type = function(data, x, y, width, height, text, label, labelStyle) {
			this.data = ss.getDefaultValue(T);
			$WebLibraries_ShuffUI_ShuffUI_ShuffTextbox.call(this, x, y, width, height, text, label, labelStyle);
			this.data = data;
		};
		ss.registerGenericClassInstance($type, $WebLibraries_ShuffUI_ShuffUI_ShuffTextbox$1, [T], function() {
			return $WebLibraries_ShuffUI_ShuffUI_ShuffTextbox;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffTextbox$1', $WebLibraries_ShuffUI_ShuffUI_ShuffTextbox$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffUIManager
	var $WebLibraries_ShuffUI_ShuffUI_ShuffUIManager = function() {
		this.$uiAreas = [];
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffUIManager.prototype = {
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
			var title = $('<div class=\'rounded\' style=\'margin:auto; background-color:white; width:60%; text-align:center;opacity:0.4;\'>' + ui.title + '</div>');
			top.append(title);
			var rightSideBar = $('<div style=\'width:100%; text-align:center; font-size:25px; position:absolute; top:0px;left:-2px;\'></div>');
			top.append(rightSideBar);
			if (ui.allowClose) {
				var x = $('<div class=\'rounded window-header-button window-close\' style=\'height:30px; vertical-align:top;background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>X</div> ');
				rightSideBar.append(x);
				x.click(function(evt) {
					outer.css('display', 'none');
					ui.onClose();
				});
			}
			if (ui.allowMaximize) {
				var max = $('<div class=\'rounded window-header-button window-maximize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>[]</div>  ');
				rightSideBar.append(max);
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
			}
			if (ui.allowMinimize) {
				var min = $('<div class=\'rounded window-header-button window-minimize\' style=\'height:30px; vertical-align:top; background-color:white; width:6%; text-align:center;opacity:0.4;float:right;\'>_</div>  ');
				rightSideBar.append(min);
			}
			var inner = $('<div class=\'window-inner\' id=\'window' + windowID + '\' style=\'background-color: #FDFEFE;width:100%; height:100%; \'> </div> ');
			outer.append(inner);
			ui.window = $('#window' + windowID);
			var info;
			ss.add(this.$uiAreas, info = new $WebLibraries_ShuffUI_ShuffUI_UIAreaInformation(outer, inner));
			ui.information = info;
			outer.mousedown(ss.mkdel(this, function(evt3) {
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
	// WebLibraries.ShuffUI.ShuffUI.ShuffWindow
	var $WebLibraries_ShuffUI_ShuffUI_ShuffWindow = function() {
		this.outer = null;
		this.window = null;
		this.onClose = null;
		this.title = null;
		this.allowClose = false;
		this.allowMaximize = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		$WebLibraries_ShuffUI_ShuffUI_ShuffPanel.call(this);
		this.allowClose = true;
		this.allowMaximize = true;
		this.allowMinimize = true;
	};
	$WebLibraries_ShuffUI_ShuffUI_ShuffWindow.prototype = {
		get_$outer: function() {
			return this.outer;
		},
		set_$outer: function(value) {
			this.outer = value;
			this.outer.resizable({ handles: 'n, e, s, w, ne, se, sw, nw', resize: ss.mkdel(this, this.onResize) });
		},
		onResize: function(e, uievent) {
			this.set_width(CommonLibraries.Number.op_Implicit$3(uievent.size.width + 'px'));
			this.set_height(CommonLibraries.Number.op_Implicit$3(uievent.size.height + 'px'));
			for (var $t1 = 0; $t1 < this.elements.length; $t1++) {
				var shuffElement = this.elements[$t1];
				shuffElement.parentSizeChanged($WebLibraries_ShuffUI_ShuffUI_SizeChangedEvent.$ctor(this.get_width(), this.get_height()));
			}
		},
		bindCustomEvents: function() {
			$WebLibraries_ShuffUI_ShuffUI_ShuffElement.prototype.bindCustomEvents.call(this);
			this.visibleChanged = ss.delegateCombine(this.visibleChanged, ss.mkdel(this, function(e) {
				if (ss.isValue(this.get_$outer())) {
					this.get_$outer().css('display', (e.visible ? 'block' : 'none'));
				}
			}));
			//            SizeChanged += (e) => {
			//            
			//            outer.CSS("width", this.Width);
			//            outer.CSS("height", this.Height);
			//            };
		},
		swingBack: function() {
			var js = {};
			js['left'] = this.get_x() + 'px';
			js['top'] = this.get_y() + 'px';
			this.information.get_element().animate(js, 'fast', 'swing');
		},
		swingAway: function(direction, simulate) {
			var js = {};
			var distance = '2000';
			switch (direction) {
				case 0: {
					js['left'] = '-' + distance + 'px';
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 1: {
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 2: {
					js['left'] = distance + 'px';
					js['top'] = '-' + distance + 'px';
					break;
				}
				case 3: {
					js['left'] = distance + 'px';
					break;
				}
				case 4: {
					js['left'] = distance + 'px';
					js['top'] = distance + 'px';
					break;
				}
				case 5: {
					js['top'] = distance + 'px';
					break;
				}
				case 6: {
					js['left'] = '-' + distance + 'px';
					js['top'] = distance + 'px';
					break;
				}
				case 7: {
					js['left'] = distance + 'px';
					break;
				}
			}
			if (simulate) {
				this.information.get_element().css(js);
			}
			else {
				this.information.get_element().animate(js, 'slow', 'swing');
			}
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.ShuffWindow
	var $WebLibraries_ShuffUI_ShuffUI_ShuffWindow$1 = function(T) {
		var $type = function(data) {
			this.data = ss.getDefaultValue(T);
			$WebLibraries_ShuffUI_ShuffUI_ShuffWindow.call(this);
		};
		ss.registerGenericClassInstance($type, $WebLibraries_ShuffUI_ShuffUI_ShuffWindow$1, [T], function() {
			return $WebLibraries_ShuffUI_ShuffUI_ShuffWindow;
		}, function() {
			return [];
		});
		return $type;
	};
	ss.registerGenericClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffWindow$1', $WebLibraries_ShuffUI_ShuffUI_ShuffWindow$1, 1);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.SizeChangedEvent
	var $WebLibraries_ShuffUI_ShuffUI_SizeChangedEvent = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_SizeChangedEvent.$ctor = function(w, h) {
		var $this = {};
		$this.width = null;
		$this.height = null;
		$this.width = w;
		$this.height = h;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.SwingDirection
	var $WebLibraries_ShuffUI_ShuffUI_SwingDirection = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_SwingDirection.prototype = { topLeft: 0, top: 1, topRight: 2, right: 3, bottomRight: 4, bottom: 5, bottomLeft: 6, left: 7 };
	ss.registerEnum(global, 'WebLibraries.ShuffUI.ShuffUI.SwingDirection', $WebLibraries_ShuffUI_ShuffUI_SwingDirection, false);
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.TextChangedEvent
	var $WebLibraries_ShuffUI_ShuffUI_TextChangedEvent = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_TextChangedEvent.$ctor = function(text, live) {
		var $this = {};
		$this.text = null;
		$this.live = false;
		$this.live = live;
		$this.text = text;
		return $this;
	};
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.ShuffUI.ShuffUI.UIAreaInformation
	var $WebLibraries_ShuffUI_ShuffUI_UIAreaInformation = function(element, inner) {
		this.$1$ElementField = null;
		this.$1$InnerField = null;
		this.set_element(element);
		this.set_inner(inner);
	};
	$WebLibraries_ShuffUI_ShuffUI_UIAreaInformation.prototype = {
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
	// WebLibraries.ShuffUI.ShuffUI.VisibleChangedEvent
	var $WebLibraries_ShuffUI_ShuffUI_VisibleChangedEvent = function() {
	};
	$WebLibraries_ShuffUI_ShuffUI_VisibleChangedEvent.$ctor = function(visible) {
		var $this = {};
		$this.visible = false;
		$this.visible = visible;
		return $this;
	};
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ButtonClickedEvent', $WebLibraries_ShuffUI_ShuffUI_ButtonClickedEvent);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.CodeMirrorInformation', $WebLibraries_ShuffUI_ShuffUI_CodeMirrorInformation);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.CodeMirrorInformationData', $WebLibraries_ShuffUI_ShuffUI_CodeMirrorInformationData);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ParentChangedEvent', $WebLibraries_ShuffUI_ShuffUI_ParentChangedEvent);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.PositionChangedEvent', $WebLibraries_ShuffUI_ShuffUI_PositionChangedEvent);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffElement', $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffButton', $WebLibraries_ShuffUI_ShuffUI_ShuffButton, $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffCodeEditor', $WebLibraries_ShuffUI_ShuffUI_ShuffCodeEditor, $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffLabel', $WebLibraries_ShuffUI_ShuffUI_ShuffLabel, $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffListBox', $WebLibraries_ShuffUI_ShuffUI_ShuffListBox, $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffListItem', $WebLibraries_ShuffUI_ShuffUI_ShuffListItem);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffPanel', $WebLibraries_ShuffUI_ShuffUI_ShuffPanel, $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffTextbox', $WebLibraries_ShuffUI_ShuffUI_ShuffTextbox, $WebLibraries_ShuffUI_ShuffUI_ShuffElement);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffUIManager', $WebLibraries_ShuffUI_ShuffUI_ShuffUIManager);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.ShuffWindow', $WebLibraries_ShuffUI_ShuffUI_ShuffWindow, $WebLibraries_ShuffUI_ShuffUI_ShuffPanel);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.SizeChangedEvent', $WebLibraries_ShuffUI_ShuffUI_SizeChangedEvent);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.TextChangedEvent', $WebLibraries_ShuffUI_ShuffUI_TextChangedEvent);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.UIAreaInformation', $WebLibraries_ShuffUI_ShuffUI_UIAreaInformation);
	ss.registerClass(global, 'WebLibraries.ShuffUI.ShuffUI.VisibleChangedEvent', $WebLibraries_ShuffUI_ShuffUI_VisibleChangedEvent);
})();
