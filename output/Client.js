
////////////////////////////////////////////////////////////////////////////////
// Client.Globals
var $Globals = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.BuildSite
var $Client_BuildSite = function(gatewayServerAddress) {
	this.$gatewayServerAddress = null;
	this.codeArea = null;
	this.devArea = null;
	this.home = null;
	this.questionArea = null;
	this.$scriptLoader = new $Client_ScriptLoader();
	this.$shuffUIManager = null;
	this.$selectedGame = 'Sevens';
	$Client_BuildSite.instance = this;
	this.$gatewayServerAddress = gatewayServerAddress;
	var url = 'http://50.116.22.241:8881/';
	window.topLevel = url;
	$Client_ScriptLoader.loadCss(url + 'lib/jquery-ui-1.8.20.custom.css');
	$Client_ScriptLoader.loadCss(url + 'lib/codemirror/codemirror.css');
	$Client_ScriptLoader.loadCss(url + 'lib/site.css');
	$Client_ScriptLoader.loadCss(url + 'lib/codemirror/theme/night.css');
	$Client_ScriptLoader.loadCss(url + 'lib/jqwidgets/styles/jqx.base.css');
	this.$scriptLoader.loadSync([url + 'lib/jquery-1.7.2.min.js', url + 'lib/jquery-ui-1.8.20.custom.min.js', url + 'lib/jqwidgets/scripts/gettheme.js', url + 'lib/jqwidgets/jqxcore.js'], Function.mkdel(this, function() {
		this.$scriptLoader.load([url + 'lib/jqwidgets/jqxbuttons.js', url + 'lib/jqwidgets/jqxscrollbar.js', url + 'lib/linq.js', url + 'lib/tween.js', url + 'lib/socket.io.js', url + 'lib/codemirror/codemirror.js', url + 'lib/jqwidgets/jqxlistbox.js'], false, Function.mkdel(this, function() {
			this.$scriptLoader.load([url + 'lib/codemirror/mode/javascript/javascript.js', url + 'lib/WorkerConsole.js', url + 'lib/FunctionWorker.js', url + 'lib/Stats.js', url + 'lib/keyboardjs.js', url + 'lib/Dialog.js'], false, Function.mkdel(this, function() {
				this.$scriptLoader.load([url + 'CommonLibraries.js', url + 'ShuffleGameLibrary.js', url + 'Models.js'], true, Function.mkdel(this, function() {
					this.$scriptLoader.load([url + 'lib/RawDeflate.js'], true, Function.mkdel(this, this.$ready));
				}));
			}));
		}));
	}));
};
$Client_BuildSite.prototype = {
	$ready: function() {
		var elem = document.getElementById('loading');
		elem.parentNode.removeChild(elem);
		var stats = new xStats();
		document.body.appendChild(stats.element);
		window.setTimeout(function() {
			$('.xstats').css('right', '0px');
			$('.xstats').css('position', 'absolute');
			$('.xstats').css('z-index', '9998!important');
			$('.xstats').children().css('z-index', '9998!important');
		}, 1000);
		var pageHandler = new $Client_PageHandler(this.$gatewayServerAddress, this);
		var shuffUIManager = new $Client_ShuffUI_ShuffUIManager();
		this.$shuffUIManager = shuffUIManager;
		var $t1 = new (Type.makeGenericType($Client_ShuffUI_ShuffWindow$1, [$Client_Information_HomeAreaInformation]).$ctor1)(new $Client_Information_HomeAreaInformation());
		$t1.title = 'CardGame';
		$t1.set_x($('body').innerWidth() - 500);
		$t1.set_y(100);
		$t1.set_width($Client_ShuffUI_Number.op_Implicit$2(420));
		$t1.set_height($Client_ShuffUI_Number.op_Implicit$2(450));
		$t1.allowClose = true;
		$t1.allowMinimize = true;
		$t1.set_visible(false);
		this.home = shuffUIManager.createWindow($Client_Information_HomeAreaInformation).call(shuffUIManager, $t1);
		var $t3 = this.home;
		var $t2 = $Client_ShuffUI_ShuffButtonOptions.$ctor();
		$t2.x = 280;
		$t2.y = 54;
		$t2.width = $Client_ShuffUI_Number.op_Implicit$2(150);
		$t2.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t2.text = Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit$2('Update game list');
		$t2.onClick = Function.mkdel(this, function(e) {
			pageHandler.gateway.emit('Area.Game.GetGames', this.devArea.data.gameServer, null);
			//NO EMIT'ING OUTSIDE OF PageHandler
		});
		$t3.addElement($Client_ShuffUI_ShuffButton).call($t3, new $Client_ShuffUI_ShuffButton($t2));
		//home.AddButton(new ShuffButton()
		//{
		//X = 280,
		//Y = 84,
		//Width = "150",
		//Height = "25",
		//Text = "Create Game",
		//Click = (e) =>
		//{
		//
		//pageHandler.gateway.Emit("Area.Game.Create", new { user = new { userName = home.Data.txtUserName[0].NodeValue } }, devArea.Data.gameServer); //NO EMIT'ING OUTSIDE OF PageHandler
		//
		//
		//}
		//});
		var $t6 = this.home.data;
		var $t5 = this.home;
		var $t4 = $Client_ShuffUI_ShuffButtonOptions.$ctor();
		$t4.x = 280;
		$t4.y = 164;
		$t4.width = $Client_ShuffUI_Number.op_Implicit$2(120);
		$t4.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t4.text = Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit$2('Start Game');
		$t4.onClick = Function.mkdel(this, function(e1) {
			pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(pageHandler.gameStuff.roomID), this.devArea.data.gameServer);
			//NO EMIT"ING OUTSIDE OF PageHandler
		});
		$t6.btnStartGame = $t5.addElement($Client_ShuffUI_ShuffButton).call($t5, new $Client_ShuffUI_ShuffButton($t4));
		var randomName = '';
		var ra = Math.random() * 10;
		for (var i = 0; i < ra; i++) {
			randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
		}
		var $t9 = this.home.data;
		var $t8 = this.home;
		var $t7 = $Client_ShuffUI_ShuffTextboxOptions.$ctor();
		$t7.x = 130;
		$t7.y = 43;
		$t7.width = $Client_ShuffUI_Number.op_Implicit$2(130);
		$t7.height = $Client_ShuffUI_Number.op_Implicit$2(20);
		$t7.text = randomName;
		$t7.label = 'Username=';
		$t9.txtUserName = $t8.addElement($Client_ShuffUI_ShuffTextbox).call($t8, new $Client_ShuffUI_ShuffTextbox($t7));
		//home.Data.gameList = home.AddListBox(new ShuffListBox()
		//{
		//X = 30,
		//Y = 85,
		//Width = "215",
		//Height = "150".ToString(),
		//Label = "Rooms",
		//Click = (e) =>
		//{
		//pageHandler.gateway.Emit("Area.Game.Join", new { roomID = "foo", user = new { userName = home.Data.txtUserName.GetValue() } }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//}
		//});
		//
		//            home.Data.userList = home.AddElement(new ShuffListBox(new ShuffListBoxOptions() {
		//
		//            X = 30,
		//
		//            Y = 280,
		//
		//            Width = 215,
		//
		//            Height = 25 * 5,
		//
		//            Label = "Users"
		//
		//            }));
		this.home.data.loadRoomInfo = function(room) {
			//
			//
			//                home.Data.userList.Remove();
			//
			//
			//                home.Data.btnStartGame.CSS("display","block");
			//
			//
			//                
			//
			//
			//                var users = new List<string>();
			//
			//
			//                
			//
			//
			//                for (var i = 0; i < room.players.length; i++) {
			//
			//
			//                
			//
			//
			//                users.Add(room.players[i]);
			//
			//
			//                
			//
			//
			//                }
			//
			//
			//                
			//
			//
			//                
			//
			//
			//                home.Data.userList = home.AddListBox(new ShuffListBox(){
			//
			//
			//                X= 30,
			//
			//
			//                Y= 280,
			//
			//
			//                Width= "215",
			//
			//
			//                Height = "125",
			//
			//
			//                Label= "Users",
			//
			//
			//                Items= users
			//
			//
			//                });
		};
		this.home.data.loadRoomInfos = function(room1) {
			//   home.Data.gameList.Remove();
			//   
			//   var rooms = new List<string>();
			//   
			//   for (var i = 0; i < room.length; i++) {
			//   //rooms.Add({ label= room[i].name, value= room[i].roomID });
			//   }
			//   
			//   
			//   home.Data.gameList = home.AddListBox(new ShuffListBox(){
			//   X= 30,
			//   Y= 85,
			//   Width = "215",
			//   Height = "150",
			//   Label= "Rooms",
			//   Items= rooms,
			//   Click=  (item)=> {
			//   pageHandler.gateway.Emit("Area.Game.Join", new { roomID= item.value, user=new  { userName= home.Data.txtUserName.GetValue()} }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
			//   }
			//   });
		};
		var $t10 = new (Type.makeGenericType($Client_ShuffUI_ShuffWindow$1, [$Client_Information_DevAreaInformation]).$ctor1)(new $Client_Information_DevAreaInformation());
		$t10.title = 'Developer';
		$t10.set_x(500);
		$t10.set_y(100);
		$t10.set_width($Client_ShuffUI_Number.op_Implicit$2(420));
		$t10.set_height($Client_ShuffUI_Number.op_Implicit$2(450));
		$t10.allowClose = true;
		$t10.allowMinimize = true;
		this.devArea = shuffUIManager.createWindow($Client_Information_DevAreaInformation).call(shuffUIManager, $t10);
		this.devArea.data.beginGame = Function.mkdel(this, function() {
			$('#dvGame').empty();
			pageHandler.clearCache();
			$('#dvGame').width('50%');
			$('#dvGame').height('100%');
			//clearLevel();
			this.devArea.data.created = false;
			this.devArea.data.joined = 0;
			pageHandler.startGameServer();
			var $t13 = pageHandler.gateway;
			var $t12 = this.$selectedGame;
			var $t11 = new Models.UserModel();
			$t11.userName = this.devArea.data.txtNumOfPlayers.get_text();
			$t13.emit('Area.Debug.Create', { gameName: $t12, user: $t11, Name: 'main room', Source: this.codeArea.data.codeEditor.information.editor.getValue(), BreakPoints: this.codeArea.data.breakPoints }, null);
		});
		var $t15 = this.devArea;
		var $t14 = $Client_ShuffUI_ShuffButtonOptions.$ctor();
		$t14.x = 280;
		$t14.y = 54;
		$t14.width = $Client_ShuffUI_Number.op_Implicit$2(150);
		$t14.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t14.text = Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit$2('Begin Game');
		$t14.onClick = Function.mkdel(this, function(e2) {
			this.devArea.data.beginGame();
		});
		$t15.addElement($Client_ShuffUI_ShuffButton).call($t15, new $Client_ShuffUI_ShuffButton($t14));
		var but = null;
		var $t17 = this.devArea;
		var $t16 = $Client_ShuffUI_ShuffButtonOptions.$ctor();
		$t16.x = 280;
		$t16.y = 84;
		$t16.width = $Client_ShuffUI_Number.op_Implicit$2(150);
		$t16.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t16.text = Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit$1(Function.mkdel(this, function() {
			return 'Game: ' + this.$selectedGame;
		}));
		$t16.onClick = Function.mkdel(this, function(e3) {
			if (this.$selectedGame === 'Sevens') {
				this.$selectedGame = 'BlackJack';
			}
			else {
				this.$selectedGame = 'Sevens';
			}
			var m = Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit(but.text);
		});
		$t17.addElement($Client_ShuffUI_ShuffButton).call($t17, but = new $Client_ShuffUI_ShuffButton($t16));
		var $t20 = this.devArea.data;
		var $t19 = this.devArea;
		var $t18 = $Client_ShuffUI_ShuffLabelOptions.$ctor();
		$t18.x = 80;
		$t18.y = 80;
		$t18.width = $Client_ShuffUI_Number.op_Implicit$2(250);
		$t18.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t18.text = 'Time Taken: ';
		$t20.lblHowFast = $t19.addElement($Client_ShuffUI_ShuffLabel).call($t19, new $Client_ShuffUI_ShuffLabel($t18));
		var $t23 = this.devArea.data;
		var $t22 = this.devArea;
		var $t21 = $Client_ShuffUI_ShuffLabelOptions.$ctor();
		$t21.x = 80;
		$t21.y = 100;
		$t21.width = $Client_ShuffUI_Number.op_Implicit$2(250);
		$t21.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t21.text = 'Another: ';
		$t23.lblAnother = $t22.addElement($Client_ShuffUI_ShuffLabel).call($t22, new $Client_ShuffUI_ShuffLabel($t21));
		// devArea.AddButton(new ShuffButton()
		// {
		// X = 280,
		// Y = 94,
		// Width = "150",
		// Height = "25",
		// Text = "Continue",
		// Click = (evt) =>
		// {
		// pageHandler.gateway.Emit("Area.Debug.Continue", new { }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		// }
		// });
		var pop;
		var $t25 = this.devArea;
		var $t24 = $Client_ShuffUI_ShuffListBoxOptions.$ctor();
		$t24.x = 25;
		$t24.y = 200;
		$t24.width = $Client_ShuffUI_Number.op_Implicit$2(250);
		$t24.height = $Client_ShuffUI_Number.op_Implicit$2(250);
		$t24.itemCreation = function(item, index) {
			var ik = $(String.format('<div style=\'width=100%;height=25px; background-color={0};\'></div>', ((index % 2 === 0) ? 'red' : 'green')));
			var ikc = $(String.format('<div style=\'width=50%;height=25px; float=left;\'>{0}</div>', item.label));
			ik.append(ikc);
			var ikd = $(String.format('<input type=\'text\' style=\'width=48%;height=25px\' value=\'{0}\' />', item.value));
			ik.append(ikd);
			return ik;
		};
		var propBox = $t25.addElement($Client_ShuffUI_ShuffListBox).call($t25, pop = new $Client_ShuffUI_ShuffListBox($t24));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		pop.addItem(new $Client_ShuffUI_ShuffListItem('foos', 99));
		var $t28 = this.devArea.data;
		var $t27 = this.devArea;
		var $t26 = $Client_ShuffUI_ShuffTextboxOptions.$ctor();
		$t26.x = 150;
		$t26.y = 134;
		$t26.width = $Client_ShuffUI_Number.op_Implicit$2(100);
		$t26.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t26.label = 'Var Lookup';
		$t28.varText = $t27.addElement($Client_ShuffUI_ShuffTextbox).call($t27, new $Client_ShuffUI_ShuffTextbox($t26));
		//  devArea.AddButton(new ShuffButton()
		//  {
		//  X = 280,
		//  Y = 134,
		//  Width = "150",
		//  Height = "25",
		//  Text = "Lookup",
		//  Click = (evt) =>
		//  {
		//  pageHandler.gateway.Emit("Area.Debug.VariableLookup.Request", new { variableName = devArea.Data.varText.GetValue() }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//  }
		//  });
		//   devArea.AddButton(new ShuffButton()
		//   {
		//   X = 280,
		//   Y = 164,
		//   Width = "150",
		//   Height = "25",
		//   Text = "Push New Source",
		//   Click = (evt) =>
		//   {
		//   pageHandler.gateway.Emit("Area.Debug.PushNewSource", new { source = codeArea.Data.codeEditor.editor.GetValue(), breakPoints = codeArea.Data.breakPoints },
		//   devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
		//   }
		//   });
		this.devArea.data.loadRoomInfo = Function.mkdel(this, function(room2) {
			this.devArea.data.gameServer = room2.gameServer;
			this.devArea.data.lblAnother.set_text(room2.gameServer);
			var count = parseInt(this.devArea.data.txtNumOfPlayers.get_text());
			if (!this.devArea.data.created) {
				pageHandler.gateway.emit('Area.Game.DebuggerJoin', Models.DebuggerJoinRequestModel.$ctor(room2.roomID), this.devArea.data.gameServer);
				//NO EMIT"ING OUTSIDE OF PageHandler
				for (var i1 = 0; i1 < count; i1++) {
					var $t31 = pageHandler.gateway;
					var $t30 = room2.roomID;
					var $t29 = new Models.UserModel();
					$t29.userName = 'player ' + (i1 + 1);
					$t31.emit('Area.Game.Join', Models.JoinGameRequestModel.$ctor($t30, $t29), this.devArea.data.gameServer);
					//NO EMIT"ING OUTSIDE OF PageHandler
				}
				this.devArea.data.created = true;
			}
			else {
				if (++this.devArea.data.joined === count) {
					pageHandler.gateway.emit('Area.Game.Start', Models.StartGameRequestModel.$ctor(room2.roomID), this.devArea.data.gameServer);
				}
				//NO EMIT"ING OUTSIDE OF PageHandler
			}
		});
		var $t34 = this.devArea.data;
		var $t33 = this.devArea;
		var $t32 = $Client_ShuffUI_ShuffTextboxOptions.$ctor();
		$t32.x = 130;
		$t32.y = 43;
		$t32.width = $Client_ShuffUI_Number.op_Implicit$2(130);
		$t32.height = $Client_ShuffUI_Number.op_Implicit$2(20);
		$t32.text = '6';
		$t32.label = 'Number of players=';
		$t32.labelStyle = 'font-size=13px';
		$t34.txtNumOfPlayers = $t33.addElement($Client_ShuffUI_ShuffTextbox).call($t33, new $Client_ShuffUI_ShuffTextbox($t32));
		var $t35 = new (Type.makeGenericType($Client_ShuffUI_ShuffWindow$1, [$Client_Information_CodeAreaInformation]).$ctor1)(new $Client_Information_CodeAreaInformation());
		$t35.title = 'Code';
		$t35.set_x(0);
		$t35.set_y(0);
		$t35.staticPositioning = true;
		$t35.set_width($Client_ShuffUI_Number.op_Implicit$2($(window).width() * 0.5));
		$t35.set_height($Client_ShuffUI_Number.op_Implicit$2($(window).height() * 0.9));
		$t35.allowClose = true;
		$t35.allowMinimize = true;
		$t35.set_visible(true);
		this.codeArea = shuffUIManager.createWindow($Client_Information_CodeAreaInformation).call(shuffUIManager, $t35);
		debugger;
		this.codeArea.data.breakPoints = [];
		var $t38 = this.codeArea.data;
		var $t37 = this.codeArea;
		var $t36 = $Client_ShuffUI_ShuffCodeEditorOptions.$ctor();
		$t36.height = $Client_ShuffUI_Number.op_Implicit$3('80%');
		$t36.lineNumbers = true;
		$t38.codeEditor = $t37.addElement($Client_ShuffUI_ShuffCodeEditor).call($t37, new $Client_ShuffUI_ShuffCodeEditor.$ctor1($t36));
		var $t41 = this.codeArea.data;
		var $t40 = this.codeArea;
		var $t39 = $Client_ShuffUI_ShuffCodeEditorOptions.$ctor();
		$t39.height = $Client_ShuffUI_Number.op_Implicit$3('20%');
		$t39.lineNumbers = false;
		$t41.console = $t40.addElement($Client_ShuffUI_ShuffCodeEditor).call($t40, new $Client_ShuffUI_ShuffCodeEditor.$ctor1($t39));
		var $t42 = new (Type.makeGenericType($Client_ShuffUI_ShuffWindow$1, [$Client_Information_QuestionAreaInformation]).$ctor1)(new $Client_Information_QuestionAreaInformation());
		$t42.title = 'Question';
		$t42.set_x(600);
		$t42.set_y(100);
		$t42.set_width($Client_ShuffUI_Number.op_Implicit$2(300));
		$t42.set_height($Client_ShuffUI_Number.op_Implicit$2(275));
		$t42.allowClose = true;
		$t42.allowMinimize = true;
		$t42.set_visible(true);
		this.questionArea = shuffUIManager.createWindow($Client_Information_QuestionAreaInformation).call(shuffUIManager, $t42);
		var $t45 = this.questionArea.data;
		var $t44 = this.questionArea;
		var $t43 = $Client_ShuffUI_ShuffLabelOptions.$ctor();
		$t43.x = 20;
		$t43.y = 5;
		$t43.width = $Client_ShuffUI_Number.op_Implicit$2(150);
		$t43.height = $Client_ShuffUI_Number.op_Implicit$2(25);
		$t43.text = '';
		$t45.question = $t44.addElement($Client_ShuffUI_ShuffLabel).call($t44, new $Client_ShuffUI_ShuffLabel($t43));
		this.questionArea.data.load = Function.mkdel(this, function(question) {
			this.questionArea.set_visible(true);
			this.questionArea.data.question.set_text(question.question);
			var $t46 = this.questionArea.data.answerBox.get_parent();
			$t46.removeElement($Client_ShuffUI_ShuffListBox).call($t46, this.questionArea.data.answerBox);
			var answers = [];
			for (var i2 = 0; i2 < question.answers.length; i2++) {
				answers.add(new $Client_ShuffUI_ShuffListItem(question.answers[i2], i2));
			}
			var $t49 = this.questionArea.data;
			var $t48 = this.questionArea;
			var $t47 = $Client_ShuffUI_ShuffListBoxOptions.$ctor();
			$t47.x = 30;
			$t47.y = 65;
			$t47.width = $Client_ShuffUI_Number.op_Implicit$2(215);
			$t47.height = $Client_ShuffUI_Number.op_Implicit$2(125);
			$t47.label = 'Answers';
			$t47.items = answers;
			$t49.answerBox = $t48.addElement($Client_ShuffUI_ShuffListBox).call($t48, new $Client_ShuffUI_ShuffListBox($t47));
		});
		var $t52 = this.questionArea.data;
		var $t51 = this.questionArea;
		var $t50 = $Client_ShuffUI_ShuffListBoxOptions.$ctor();
		$t50.x = 30;
		$t50.y = 65;
		$t50.width = $Client_ShuffUI_Number.op_Implicit$2(215);
		$t50.height = $Client_ShuffUI_Number.op_Implicit$2(125);
		$t50.label = 'Answers';
		$t52.answerBox = $t51.addElement($Client_ShuffUI_ShuffListBox).call($t51, new $Client_ShuffUI_ShuffListBox($t50));
		shuffUIManager.focus(this.devArea.information);
		//
		//
		//
		//
		//
		//        var chatArea = shuffUIManager.createWindow({
		//
		//
		//
		//
		//
		//        title: "Chat",
		//
		//
		//
		//
		//
		//        x: 600,
		//
		//
		//
		//
		//
		//        y: 100,
		//
		//
		//
		//
		//
		//        width: 300,
		//
		//
		//
		//
		//
		//        height: 275,
		//
		//
		//
		//
		//
		//        allowClose: true,
		//
		//
		//
		//
		//
		//        allowMinimize: true,
		//
		//
		//
		//
		//
		//        visible: false
		//
		//
		//
		//
		//
		//        
		//
		//
		//
		//
		//
		//        });
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameCanvasInformation
var $Client_GameCanvasInformation = function() {
	this.canvas = null;
	this.domCanvas = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.GameInfo
var $Client_GameInfo = function() {
	this.roomID = '-1';
};
////////////////////////////////////////////////////////////////////////////////
// Client.Gateway
var $Client_Gateway = function(gatewayServer) {
	this.$channels = null;
	this.gatewaySocket = null;
	this.$channels = new Object();
	var someChannels = this.$channels;
	this.gatewaySocket = io.connect(gatewayServer);
	this.gatewaySocket.on('Client.Message', function(data) {
		someChannels[data.channel](data.content);
	});
};
$Client_Gateway.prototype = {
	emit: function(channel, content, gameServer) {
		this.gatewaySocket.emit('Gateway.Message', Models.GatewayMessageModel.$ctor(channel, content, gameServer));
	},
	on: function(channel, callback) {
		this.$channels[channel] = callback;
	},
	login: function(userName) {
		var $t2 = this.gatewaySocket;
		var $t1 = new Models.UserModel();
		$t1.userName = userName;
		$t2.emit('Gateway.Login', $t1);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageGameContext
var $Client_PageGameContext = function(context, canvasInfo) {
	this.context = null;
	this.canvasInfo = null;
	this.context = context;
	this.canvasInfo = canvasInfo;
};
////////////////////////////////////////////////////////////////////////////////
// Client.PageHandler
var $Client_PageHandler = function(gatewayServerAddress, buildSite) {
	this.$buildSite = null;
	this.$cardImages = null;
	this.cards = {};
	this.$endTime = 0;
	this.gameStuff = null;
	this.gateway = null;
	this.$numOfTimes = 0;
	this.$resetStyles = ['border-radius', '-moz-border-radius', '-webkit-border-radius', 'box-shadow', '-moz-box-shadow', 'transform', '-webkit-transform', 'padding', 'background-color', 'border'];
	this.spaces = {};
	this.$startTime = 0;
	this.$timeValue = 0;
	this.$buildSite = buildSite;
	this.gameStuff = new $Client_GameInfo();
	this.$startTime = Date.get_now();
	//            Window.SetTimeout(() => { buildSite.devArea.Data.beginGame(); }, 2000);
	this.gateway = new $Client_Gateway(gatewayServerAddress);
	this.gateway.on('Area.Main.Login.Response', function(data) {
		window.alert(JSON.stringify(data));
	});
	this.gateway.on('Area.Lobby.ListCardGames.Response', function(data1) {
	});
	this.gateway.on('Area.Lobby.ListRooms.Response', function(data2) {
		console.log(data2);
	});
	var randomName = '';
	var ra = Math.random() * 10;
	for (var i = 0; i < ra; i++) {
		randomName += String.fromCharCode(ss.Int32.trunc(65 + Math.random() * 26));
	}
	this.gateway.login(randomName);
	this.gateway.on('Area.Debug.GetGameSource.Response', Function.mkdel(this, function(data3) {
		var endTime = new Date();
		var time = endTime - this.$startTime;
		this.$numOfTimes++;
		this.$timeValue += time;
		buildSite.devArea.data.lblHowFast.set_text('Time Taken: ' + ss.Int32.div(this.$timeValue, this.$numOfTimes));
		buildSite.codeArea.data.codeEditor.information.editor.setValue(data3.content);
		buildSite.codeArea.data.codeEditor.information.editor.setMarker(0, '<span style="color: #900">&nbsp;&nbsp;</span> %N%');
		buildSite.codeArea.data.codeEditor.information.editor.refresh();
	}));
	this.gateway.emit('Area.Debug2.GetGameSource.Request', Models.GameSourceRequestModel.$ctor('Sevens'), null);
	this.$cardImages = {};
	for (var i1 = 101; i1 < 153; i1++) {
		var img = new Image();
		var domain = window.topLevel + 'assets';
		var src = domain + '/cards/' + i1;
		var jm;
		img.src = jm = Type.cast(src + '.gif', String);
		this.$cardImages[jm] = img;
	}
	var dvGame;
	$('body').append(dvGame = document.createElement('div'));
	dvGame.id = 'dvGame';
	dvGame.style.left = '50%';
	dvGame.style.position = 'absolute';
	dvGame.style.top = '0';
	dvGame.style.right = '0';
	dvGame.style.bottom = '0';
	document.body.addEventListener('contextmenu', function(e) {
		//e.PreventDefault();
		//todo: Special right click menu;
	}, false);
	//ie8
	//   {
	//   dynamic d2 = (Action<string, ElementEventHandler>)Document.Body.AttachEvent;
	//   
	//   var m = (Action<string, ElementEventHandler>)d2;
	//   m("contextmenu", () =>
	//   {
	//   
	//   });
	//   }
};
$Client_PageHandler.prototype = {
	startGameServer: function() {
		this.gateway.on('Area.Game.RoomInfo', Function.mkdel(this, function(data) {
			this.gameStuff.roomID = data.roomID;
			this.$buildSite.home.data.loadRoomInfo(data);
			this.$buildSite.devArea.data.loadRoomInfo(data);
		}));
		//
		//                        gateway.On<GameRoom>("Area.Game.RoomInfos", data =>
		//
		//                        {
		//
		//                        buildSite.home.Data.loadRoomInfos(data);
		//
		//                        
		//
		//                        });
		this.gateway.on('Area.Debug.Log', Function.mkdel(this, function(data1) {
			this.$buildSite.home.data.loadRoomInfos(data1);
			var lines = this.$buildSite.codeArea.data.console.information.editor.getValue().split('\n');
			lines = lines.extract(lines.length - 40, 40);
			this.$buildSite.codeArea.data.console.information.editor.setValue(lines.join('\n') + '\n' + data1.value);
			this.$buildSite.codeArea.data.console.information.editor.setCursor(this.$buildSite.codeArea.data.console.information.editor.lineCount(), 0);
		}));
		this.gateway.on('Area.Debug.Break', Function.mkdel(this, function(data2) {
			this.$buildSite.home.data.loadRoomInfos(data2);
			var cm = this.$buildSite.codeArea.data.codeEditor;
			cm.information.editor.clearMarker(data2.lineNumber);
			cm.information.editor.setMarker(data2.lineNumber, '<span style="color: #059">●</span> %N%');
			cm.information.editor.setCursor(data2.lineNumber + 15, 0);
			cm.information.editor.setCursor(data2.lineNumber - 15, 0);
			cm.information.editor.setCursor(data2.lineNumber, 0);
		}));
		//
		//                        gateway.On("Area.Debug.VariableLookup.Response", data =>
		//
		//                        {
		//
		//                        Window.Alert(Json.Stringify(data));
		//
		//                        });
		this.gateway.on('Area.Game.AskQuestion', Function.mkdel(this, function(data3) {
			this.$buildSite.questionArea.data.load(data3);
			//alert(JSON.stringify(data));
			this.$endTime = new Date();
			var time = this.$endTime - this.$startTime;
			this.$buildSite.devArea.data.lblHowFast.set_text('how long: ' + time);
			window.setTimeout(Function.mkdel(this, function() {
				this.gateway.emit('Area.Game.AnswerQuestion', Models.GameAnswerQuestionModel.$ctor1(this.gameStuff.roomID, 1), this.$buildSite.devArea.data.gameServer);
				this.$buildSite.questionArea.set_visible(false);
				this.$startTime = new Date();
			}), 200);
		}));
		this.gateway.on('Area.Game.UpdateState', Function.mkdel(this, function(data21) {
			var data4 = JSON.parse((new Compressor()).DecompressText(data21));
			//  gameContext.Context.ClearRect(0, 0, gameContext.CanvasInfo.canvas.Width, gameContext.CanvasInfo.canvas.Height);
			for (var $t1 = 0; $t1 < data4.spaces.length; $t1++) {
				var space = data4.spaces[$t1];
				space.appearance = this.$fixAppearance(space.appearance);
				for (var $t2 = 0; $t2 < space.pile.cards.length; $t2++) {
					var card = space.pile.cards[$t2];
					card.appearance = this.$fixAppearance(card.appearance);
				}
			}
			this.drawArea(data4);
		}));
		this.gateway.on('Area.Game.Started', function(data5) {
			//alert(JSON.stringify(data));
		});
		this.gateway.on('Area.Game.GameOver', function(data6) {
		});
		this.gateway.on('Area.Debug.GameOver', function(data7) {
		});
	},
	$fixAppearance: function(appearance) {
		return global.Appearance.fromJson(appearance);
	},
	drawArea: function(mainArea) {
		this.$newDrawArea(mainArea);
		for (var $t1 = 0; $t1 < mainArea.textAreas.length; $t1++) {
			var ta = mainArea.textAreas[$t1];
			//  gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
			//  gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
		}
	},
	$findSpace: function(space) {
		var id = 'dv_space_' + space.name;
		if (ss.isValue(this.spaces[id])) {
			return this.spaces[id];
		}
		else {
			var sp = document.createElement('div');
			sp.id = id;
			sp.style.position = 'absolute';
			$('#dvGame').append(sp);
			return this.spaces[id] = new global.SpaceDrawing(sp);
		}
	},
	$findCard: function(wantedSpace, card) {
		var id = 'dv_card_' + card.type + '_' + card.value;
		var space = this.$findSpace(wantedSpace);
		var doc;
		if (ss.isValue(this.cards[id])) {
			var m = document.getElementById(id);
			if (!ss.referenceEquals(m.parentNode, space.outerElement)) {
				m.parentNode.removeChild(m);
				space.outerElement.appendChild(m);
			}
			doc = this.cards[id];
		}
		else {
			var sp = document.createElement('div');
			sp.id = id;
			$(space.outerElement).append(sp);
			var cardImage = this.$cloneImage(this.$cardImages[this.drawCard(card)]);
			sp.appendChild(cardImage);
			sp.style.position = 'absolute';
			doc = this.cards[id] = new global.CardDrawing(sp, cardImage);
		}
		return doc;
	},
	$newDrawArea: function(mainArea) {
		//jQuery.Select("#dvGame").Children().Remove();
		var scale = new CommonLibraries.Point(ss.Int32.div($('#dvGame').width(), mainArea.size.width), ss.Int32.div($(document).height() - 100, mainArea.size.height));
		//ExtensionMethods.debugger(null);
		var l;
		var sl = mainArea.spaces.length;
		for (var spaceIndex = 0; spaceIndex < sl; spaceIndex++) {
			var space = mainArea.spaces[spaceIndex];
			var jf = this.$findSpace(space).outerElement;
			for (var i = 0; i < this.$resetStyles.length; i++) {
				jf.style[this.$resetStyles[i]] = null;
			}
			l = space.pile.cards.length;
			for (var index = 0; index < l; index++) {
				var card = space.pile.cards[index];
				var m = this.$findCard(space, card);
				for (var i1 = 0; i1 < this.$resetStyles.length; i1++) {
					m.outerElement.style[this.$resetStyles[i1]] = null;
					m.image.style[this.$resetStyles[i1]] = null;
				}
			}
		}
		l = mainArea.spaces.length;
		for (var index1 = 0; index1 < l; index1++) {
			var space1 = mainArea.spaces[index1];
			var vertical = space1.vertical;
			var spaceDiv = this.$findSpace(space1);
			// var spaceDivJ = jQuery.FromElement(spaceDiv);
			spaceDiv.outerElement.style.left = global.domUtils.px(space1.x * scale.x);
			spaceDiv.outerElement.style.top = global.domUtils.px(space1.y * scale.y);
			spaceDiv.outerElement.style.width = global.domUtils.px(space1.width * scale.x);
			spaceDiv.outerElement.style.height = global.domUtils.px(space1.height * scale.y);
			//ExtensionMethods.debugger();
			var cl = space1.appearance.effects.length;
			for (var i2 = 0; i2 < cl; i2++) {
				var effect = space1.appearance.effects[i2];
				effect.build$1(spaceDiv);
			}
			//   gameboard.Context.FillRect(space.X * scale.X, space.Y * scale.Y, space.Width * scale.X, space.Height * scale.Y);
			var spaceScale = new CommonLibraries.Point(space1.width / space1.pile.cards.length, space1.height / space1.pile.cards.length);
			var j = 0;
			var lc = space1.pile.cards.length;
			for (var i3 = 0; i3 < lc; i3++) {
				var card1 = space1.pile.cards[i3];
				var xx = 0;
				var yy = 0;
				switch (space1.resizeType) {
					case 1: {
						if (vertical) {
							yy = card1.value * scale.y / 2;
						}
						else {
							xx = card1.value * scale.x / 2;
						}
						break;
					}
					case 0: {
						xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
						break;
					}
					default: {
						xx = (!vertical ? (j * spaceScale.x * scale.x) : 0);
						yy = (vertical ? (j * spaceScale.y * scale.y) : 0);
						break;
					}
				}
				var cardDiv = this.$findCard(space1, card1);
				xx -= ss.Int32.div(cardDiv.image.width, 2);
				yy -= ss.Int32.div(cardDiv.image.height, 2);
				//cardDiv.OuterElement.Style["transform"] = 0.0.transformRadius();
				cardDiv.outerElement.style.left = global.domUtils.px(xx + (vertical ? (space1.width * scale.x / 2) : 0));
				cardDiv.outerElement.style.top = global.domUtils.px(yy + (!vertical ? (space1.height * scale.y / 2) : 0));
				cardDiv.outerElement.style['transform'] = global.domUtils.transformRadius(space1.appearance.innerStyle.rotate);
				this.$styleAppearanceFromSpace(cardDiv, j, space1);
				this.$styleAppearance(cardDiv, card1.appearance);
				cardDiv.image.style['border-radius'] = '5px';
				cardDiv.image.style['box-shadow'] = '3px 3px 2px #2c2c2c';
				this.fixBrowserPrefixes(cardDiv.outerElement.style);
				this.fixBrowserPrefixes(cardDiv.image.style);
				//                    spaceDiv.AppendChild(cardDiv);
				j++;
				//effects
			}
			var el = space1.appearance.effects.length;
			for (var i4 = 0; i4 < el; i4++) {
				var effect1 = space1.appearance.effects[i4];
				effect1.tearDown$1(spaceDiv);
			}
		}
		//   foreach (var space in mainArea.Spaces)
		//   {
		//   setStyle(findSpace(space).OuterElement.Style, findSpace(space).OuterElement.Style);
		//   foreach (var card in space.Pile.Cards)
		//   {
		//   var m = findCard(space, card);
		//   setStyle(findSpace(space).OuterElement.Style, findSpace(space).OuterElementStyle);
		//   
		//   m.ImageStyle = new MyStyle();
		//   m.OuterElementStyle = new MyStyle();
		//   
		//   }
		//   }
		//
		//
		//            foreach (var ta in mainArea.TextAreas)
		//
		//
		//            {
		//
		//
		//            gameboard.Context.FillStyle = "rgba(200, 0, 200, 0.5)";
		//
		//
		//            gameboard.Context.FillText(ta.Text, ta.X * scale.X, ta.Y * scale.Y);
		//
		//
		//            }
	},
	$styleAppearanceFromSpace: function(element, cardIndex, space) {
		var appearance = space.appearance;
		for (var $t1 = 0; $t1 < appearance.effects.length; $t1++) {
			var cardGameAppearanceEffect = appearance.effects[$t1];
			//   cardGameAppearanceEffect.Build(element.Item1);
			switch (cardGameAppearanceEffect.type) {
				case 2: {
					var bEffect = cardGameAppearanceEffect;
					var trans = element.outerElement.style['transform'];
					if (trans.startsWith('rotate(')) {
						element.outerElement.style['transform'] = global.domUtils.transformRadius(-bEffect.degrees / 2 + bEffect.degrees / (space.pile.cards.length - 1) * cardIndex + global.domUtils.noTransformRadius(trans));
					}
					else {
						element.outerElement.style['transform'] = global.domUtils.transformRadius(appearance.innerStyle.rotate);
					}
					break;
				}
			}
		}
		element.image.style.backgroundColor = appearance.innerStyle.backColor;
	},
	$styleAppearance: function(element, appearance) {
		for (var $t1 = 0; $t1 < appearance.effects.length; $t1++) {
			var cardGameAppearanceEffect = appearance.effects[$t1];
			cardGameAppearanceEffect.build(element);
			//new object().debugger();
			cardGameAppearanceEffect.tearDown(element);
		}
		//rotate
		var trans = element.outerElement.style['transform'];
		if (trans.startsWith('rotate(')) {
			element.outerElement.style['transform'] = String.format('rotate({0}deg)', appearance.innerStyle.rotate + parseInt(trans.replaceAll('rotate(', '').replaceAll('deg)', '')));
		}
		else {
			element.outerElement.style['transform'] = String.format('rotate({0}deg)', appearance.innerStyle.rotate);
		}
		element.image.style.backgroundColor = appearance.innerStyle.backColor;
	},
	fixBrowserPrefixes: function(cardImage) {
		if (ss.isValue(cardImage['transform'])) {
			cardImage['-webkit-transform'] = cardImage['transform'];
		}
		if (ss.isValue(cardImage['box-shadow'])) {
			cardImage['-moz-box-shadow'] = cardImage['box-shadow'];
			cardImage['-webkit-box-shadow'] = cardImage['box-shadow'];
		}
		if (ss.isValue(cardImage['border-radius'])) {
			cardImage['-moz-border-radius'] = cardImage['box-shadow'];
			cardImage['-webkit-border-radius'] = cardImage['box-shadow'];
		}
	},
	$cloneImage: function(cardImage) {
		var img = new Image();
		img.src = cardImage.src;
		return img;
	},
	drawCard: function(card) {
		var src = '';
		var domain = window.topLevel + 'assets';
		src = Type.cast(domain + '/cards/' + (100 + (card.value + 1) + card.type * 13), String);
		return src + '.gif';
	},
	canvasOnClick: function(e) {
		e.preventDefault();
	},
	canvasMouseMove: function(e) {
		e.preventDefault();
		document.body.style.cursor = 'default';
	},
	canvasMouseUp: function(e) {
		e.preventDefault();
	},
	handleScroll: function(e) {
		e.preventDefault();
	},
	clearCache: function() {
		this.cards = {};
		this.spaces = {};
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ScriptLoader
var $Client_ScriptLoader = function() {
};
$Client_ScriptLoader.prototype = {
	$loadScript: function(url, cache, callback) {
		cache = false;
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url + (cache ? ('?' + Math.floor(Math.random() * 10000)) : '');
		//caching
		if (ss.isValue(callback)) {
			script.onreadystatechange = function(a) {
				if (!!(script.readyState === 'loaded' || script.readyState === 'complete')) {
					callback();
				}
			};
			script.onload = function(a1) {
				callback();
			};
		}
		head.appendChild(script);
	},
	load: function(items, cache, done) {
		var counter = 0;
		for (var i = 0; i < items.length; i++) {
			this.$loadScript(items[i], cache, function() {
				counter++;
				if (counter >= items.length) {
					done();
				}
			});
		}
	},
	loadSync: function(items, done) {
		var counter = 0;
		var nextOne = null;
		nextOne = Function.mkdel(this, function() {
			counter++;
			if (counter >= items.length) {
				done();
			}
			else {
				this.$loadScript(items[counter], false, nextOne);
			}
		});
		this.$loadScript(items[0], false, nextOne);
	}
};
$Client_ScriptLoader.loadCss = function(filename) {
	var fileref = document.createElement('link');
	fileref.setAttribute('rel', 'stylesheet');
	fileref.setAttribute('type', 'text/css');
	fileref.setAttribute('href', filename);
	document.getElementsByTagName('head')[0].appendChild(fileref);
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.CodeAreaInformation
var $Client_Information_CodeAreaInformation = function() {
	this.codeEditor = null;
	this.console = null;
	this.breakPoints = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.DevAreaInformation
var $Client_Information_DevAreaInformation = function() {
	this.txtNumOfPlayers = null;
	this.loadRoomInfo = null;
	this.varText = null;
	this.lblAnother = null;
	this.lblHowFast = null;
	this.gameServer = null;
	this.beginGame = null;
	this.joined = 0;
	this.created = false;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.HomeAreaInformation
var $Client_Information_HomeAreaInformation = function() {
	this.loadRoomInfos = null;
	this.userList = null;
	this.gameList = null;
	this.txtUserName = null;
	this.btnStartGame = null;
	this.loadRoomInfo = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.Information.QuestionAreaInformation
var $Client_Information_QuestionAreaInformation = function() {
	this.question = null;
	this.answerBox = null;
	this.load = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ButtonClickedEvent
var $Client_ShuffUI_ButtonClickedEvent = function() {
};
$Client_ShuffUI_ButtonClickedEvent.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.CodeMirrorInformation
var $Client_ShuffUI_CodeMirrorInformation = function() {
	this.codeElement = null;
	this.editor = null;
	this.element = null;
	this.data = null;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.CodeMirrorInformationData
var $Client_ShuffUI_CodeMirrorInformationData = function() {
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.DelegateOrValue
var $Client_ShuffUI_DelegateOrValue$1 = function(T) {
	var $type = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$oldValue = T.getDefaultValue();
		this.$1$StaticValueChangesField = null;
		this.$method = d;
		this.isValue = false;
		this.$oldValue = this.$method();
	};
	$type.prototype = {
		get_staticValueChanges: function() {
			return this.$1$StaticValueChangesField;
		},
		set_staticValueChanges: function(value) {
			this.$1$StaticValueChangesField = value;
		},
		$evaluate: function() {
			if (this.isValue === true) {
				return this.$value;
			}
			else if (this.isValue === false) {
				var val = this.$method();
				if (val !== this.$oldValue) {
					this.get_staticValueChanges()(val);
				}
				this.$oldValue = val;
				return val;
			}
			return T.getDefaultValue();
		}
	};
	$type.$ctor1 = function(d) {
		this.isValue = false;
		this.$method = null;
		this.$value = T.getDefaultValue();
		this.$oldValue = T.getDefaultValue();
		this.$1$StaticValueChangesField = null;
		this.$value = d;
		this.isValue = true;
	};
	$type.$ctor1.prototype = $type.prototype;
	$type.op_Implicit$2 = function(d) {
		return new (Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [T]).$ctor1)(d);
	};
	$type.op_Implicit$1 = function(d) {
		return new (Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [T]))(d);
	};
	$type.op_Implicit = function(d) {
		return d.$evaluate();
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_DelegateOrValue$1, [T], function() {
		return Object;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.DelegateOrValue$1', $Client_ShuffUI_DelegateOrValue$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ItemClickedEvent
var $Client_ShuffUI_ItemClickedEvent = function() {
};
$Client_ShuffUI_ItemClickedEvent.$ctor = function(item) {
	var $this = {};
	$this.item = null;
	$this.item = item;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.Number
var $Client_ShuffUI_Number = function(s) {
	this.$value = null;
	this.$value = s.toString();
};
$Client_ShuffUI_Number.$ctor1 = function(s) {
	this.$value = null;
	this.$value = s;
};
$Client_ShuffUI_Number.$ctor1.prototype = $Client_ShuffUI_Number.prototype;
$Client_ShuffUI_Number.op_Implicit = function(d) {
	return parseFloat(d.$value);
};
$Client_ShuffUI_Number.op_Implicit$3 = function(d) {
	return new $Client_ShuffUI_Number.$ctor1(d);
};
$Client_ShuffUI_Number.op_Implicit$2 = function(d) {
	return new $Client_ShuffUI_Number(d);
};
$Client_ShuffUI_Number.op_Implicit$1 = function(d) {
	return ((d.$value.indexOf('%') < 0) ? (d.$value + 'px') : d.$value);
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ParentChangedEvent
var $Client_ShuffUI_ParentChangedEvent = function() {
};
$Client_ShuffUI_ParentChangedEvent.$ctor = function(parent) {
	var $this = {};
	$this.parent = null;
	$this.parent = parent;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.PositionChangedEvent
var $Client_ShuffUI_PositionChangedEvent = function() {
};
$Client_ShuffUI_PositionChangedEvent.$ctor = function(x, y) {
	var $this = {};
	$this.x = 0;
	$this.y = 0;
	$this.x = x;
	$this.y = y;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
var $Client_ShuffUI_ShuffButton = function(options) {
	this.$myText = null;
	this.text = null;
	$Client_ShuffUI_ShuffElement.call(this);
	this.element = $('<div></div>');
	this.element.css('position', 'absolute');
	this.text = options.text;
	this.text.set_staticValueChanges(Function.combine(this.text.get_staticValueChanges(), Function.mkdel(this, function(value) {
		this.element.text(value);
	})));
	this.element.text(Type.makeGenericType($Client_ShuffUI_DelegateOrValue$1, [String]).op_Implicit(this.text));
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
	this.element.button();
	this.element.click(function(a) {
		options.onClick($Client_ShuffUI_ButtonClickedEvent.$ctor(a.clientX, a.clientY));
	});
	this.element.disableSelection();
};
$Client_ShuffUI_ShuffButton.prototype = {
	bindCustomEvents: function() {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButton
var $Client_ShuffUI_ShuffButton$1 = function(T) {
	var $type = function(options, data) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffButton.call(this, options);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffButton$1, [T], function() {
		return $Client_ShuffUI_ShuffButton;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffButton$1', $Client_ShuffUI_ShuffButton$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffButtonOptions
var $Client_ShuffUI_ShuffButtonOptions = function() {
};
$Client_ShuffUI_ShuffButtonOptions.createInstance = function() {
	return $Client_ShuffUI_ShuffButtonOptions.$ctor();
};
$Client_ShuffUI_ShuffButtonOptions.$ctor = function() {
	var $this = $Client_ShuffUI_ShuffOptions.$ctor();
	$this.text = null;
	$this.onClick = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditor
var $Client_ShuffUI_ShuffCodeEditor = function() {
	this.information = null;
	this.$codeMirror = null;
	this.$2$TextChangedField = null;
	this.text = null;
	this.lineNumbers = false;
	$Client_ShuffUI_ShuffElement.call(this);
	this.set_width($Client_ShuffUI_Number.op_Implicit$3('100%'));
	this.set_height($Client_ShuffUI_Number.op_Implicit$3('100%'));
};
$Client_ShuffUI_ShuffCodeEditor.prototype = {
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
							$Client_BuildSite.instance.codeArea.data.breakPoints.extract($Client_BuildSite.instance.codeArea.data.breakPoints.indexOf(n - 1), 0);
							cm.clearMarker(n);
						}
						else {
							$Client_BuildSite.instance.codeArea.data.breakPoints.add(n - 1);
							cm.setMarker(n, '<span style="color= #900">●</span> %N%');
						}
					},
					onCursorActivity: Function.mkdel(this, function(e2) {
						this.$codeMirror.editor.setLineClass(hlLine, null);
						hlLine = this.$codeMirror.editor.setLineClass(this.$codeMirror.editor.getCursor().line, 'activeline');
					}),
					onFocus: function(e3) {
					},
					onBlur: function(e4) {
					}
				});
				hlLine = this.$codeMirror.editor.setLineClass(0, 'activeline');
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
$Client_ShuffUI_ShuffCodeEditor.$ctor1 = function(options) {
	this.information = null;
	this.$codeMirror = null;
	this.$2$TextChangedField = null;
	this.text = null;
	this.lineNumbers = false;
	$Client_ShuffUI_ShuffElement.call(this);
	var fmw = options.width;
	var fmh = options.height;
	if (!!!fmw) {
		options.width = $Client_ShuffUI_Number.op_Implicit$3('100%');
	}
	if (!!!fmh) {
		options.height = $Client_ShuffUI_Number.op_Implicit$3('100%');
	}
	var divs = $('<div style=\'width:' + $Client_ShuffUI_Number.op_Implicit$1(options.width) + '; height:' + $Client_ShuffUI_Number.op_Implicit$1(options.height) + '\'> </div>');
	var fm = $('<textarea id=\'code\' name=\'code\' class=\'CodeMirror-fullscreen \' style=\'\'></textarea>');
	divs.append(fm);
	this.element = divs;
	var $t1 = new $Client_ShuffUI_CodeMirrorInformation();
	$t1.element = fm.get(0);
	this.$codeMirror = $t1;
	this.$codeMirror.element.value = this.text = options.text;
	this.lineNumbers = options.lineNumbers;
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
};
$Client_ShuffUI_ShuffCodeEditor.$ctor1.prototype = $Client_ShuffUI_ShuffCodeEditor.prototype;
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditor
var $Client_ShuffUI_ShuffCodeEditor$1 = function(T) {
	var $type = function(data) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffCodeEditor.call(this);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffCodeEditor$1, [T], function() {
		return $Client_ShuffUI_ShuffCodeEditor;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffCodeEditor$1', $Client_ShuffUI_ShuffCodeEditor$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffCodeEditorOptions
var $Client_ShuffUI_ShuffCodeEditorOptions = function() {
};
$Client_ShuffUI_ShuffCodeEditorOptions.createInstance = function() {
	return $Client_ShuffUI_ShuffCodeEditorOptions.$ctor();
};
$Client_ShuffUI_ShuffCodeEditorOptions.$ctor = function() {
	var $this = $Client_ShuffUI_ShuffOptions.$ctor();
	$this.text = null;
	$this.lineNumbers = false;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffElement
var $Client_ShuffUI_ShuffElement = function() {
	this.parentChanged = null;
	this.positionChanged = null;
	this.sizeChanged = null;
	this.visibleChanged = null;
	this.$myHeight = null;
	this.$myVisible = false;
	this.$myWidth = null;
	this.$myX = 0;
	this.$myY = 0;
	this.$1$ParentField = null;
	this.element = null;
	this.$myWidth = $Client_ShuffUI_Number.op_Implicit$2(0);
	this.$myHeight = $Client_ShuffUI_Number.op_Implicit$2(0);
	this.$bindEvents();
};
$Client_ShuffUI_ShuffElement.prototype = {
	get_x: function() {
		return this.$myX;
	},
	set_x: function(value) {
		this.$myX = value;
		this.positionChanged($Client_ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
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
		this.positionChanged($Client_ShuffUI_PositionChangedEvent.$ctor(this.$myX, this.$myY));
	},
	get_width: function() {
		return this.$myWidth;
	},
	set_width: function(value) {
		this.$myWidth = value;
		this.sizeChanged($Client_ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
	},
	get_height: function() {
		return this.$myHeight;
	},
	set_height: function(value) {
		this.$myHeight = value;
		this.sizeChanged($Client_ShuffUI_SizeChangedEvent.$ctor(this.$myWidth, this.$myHeight));
	},
	get_visible: function() {
		return this.$myVisible;
	},
	set_visible: function(value) {
		this.$myVisible = value;
		this.visibleChanged($Client_ShuffUI_VisibleChangedEvent.$ctor(this.$myVisible));
	},
	$bindEvents: function() {
		this.sizeChanged = Function.combine(this.sizeChanged, Function.mkdel(this, function(e) {
			if (!!e.width) {
				this.element.css('width', $Client_ShuffUI_Number.op_Implicit$1(e.width));
			}
			if (!!e.height) {
				this.element.css('height', $Client_ShuffUI_Number.op_Implicit$1(e.height));
			}
		}));
		this.positionChanged = Function.combine(this.positionChanged, Function.mkdel(this, function(e1) {
			this.element.css('left', e1.x + 'px');
			this.element.css('top', e1.y + 'px');
		}));
		this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e2) {
			this.element.css('display', (e2.visible ? 'block' : 'none'));
		}));
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e3) {
			this.set_parent(e3.parent);
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
// Client.ShuffUI.ShuffLabel
var $Client_ShuffUI_ShuffLabel = function(options) {
	this.$myText = null;
	this.$2$TextChangedField = null;
	$Client_ShuffUI_ShuffElement.call(this);
	var but = $('<span></span>');
	this.element = but;
	but.css('position', 'absolute');
	this.set_text(options.text);
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_visible(options.visible);
	but.disableSelection();
};
$Client_ShuffUI_ShuffLabel.prototype = {
	get_text: function() {
		return this.$myText;
	},
	set_text: function(value) {
		this.$myText = value;
		this.get_textChanged()($Client_ShuffUI_TextChangedEvent.$ctor(this.$myText, false));
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
// Client.ShuffUI.ShuffLabel
var $Client_ShuffUI_ShuffLabel$1 = function(T) {
	var $type = function(options, data) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffLabel.call(this, options);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffLabel$1, [T], function() {
		return $Client_ShuffUI_ShuffLabel;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffLabel$1', $Client_ShuffUI_ShuffLabel$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffLabelOptions
var $Client_ShuffUI_ShuffLabelOptions = function() {
};
$Client_ShuffUI_ShuffLabelOptions.createInstance = function() {
	return $Client_ShuffUI_ShuffLabelOptions.$ctor();
};
$Client_ShuffUI_ShuffLabelOptions.$ctor = function() {
	var $this = $Client_ShuffUI_ShuffOptions.$ctor();
	$this.text = null;
	$this.onClick = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox
var $Client_ShuffUI_ShuffListBox = function(options) {
	this.label = null;
	this.itemCreation = null;
	this.onClick = null;
	this.items = null;
	$Client_ShuffUI_ShuffElement.call(this);
	var but = $('<div></div>');
	this.element = but;
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
	// var theme = "getTheme()".me();
	// var theme = getTheme();
	// but.jqxListBox({ source: options.items, width: options.width, height: options.height, theme: theme });
	// but.bind('select', function (event) {
	// var item = event.args.item;
	// if (options.click)
	// options.click(item);
	// });
	// return but;
};
$Client_ShuffUI_ShuffListBox.prototype = {
	bindCustomEvents: function() {
	},
	addItem: function(p0) {
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBox
var $Client_ShuffUI_ShuffListBox$1 = function(T) {
	var $type = function(opts, data) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffListBox.call(this, opts);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffListBox$1, [T], function() {
		return $Client_ShuffUI_ShuffListBox;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffListBox$1', $Client_ShuffUI_ShuffListBox$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListBoxOptions
var $Client_ShuffUI_ShuffListBoxOptions = function() {
};
$Client_ShuffUI_ShuffListBoxOptions.createInstance = function() {
	return $Client_ShuffUI_ShuffListBoxOptions.$ctor();
};
$Client_ShuffUI_ShuffListBoxOptions.$ctor = function() {
	var $this = $Client_ShuffUI_ShuffOptions.$ctor();
	$this.label = null;
	$this.items = null;
	$this.itemCreation = null;
	$this.onClick = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffListItem
var $Client_ShuffUI_ShuffListItem = function(label, value) {
	this.label = null;
	this.value = 0;
	this.label = label;
	this.value = value;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffOptions
var $Client_ShuffUI_ShuffOptions = function() {
};
$Client_ShuffUI_ShuffOptions.createInstance = function() {
	return $Client_ShuffUI_ShuffOptions.$ctor();
};
$Client_ShuffUI_ShuffOptions.$ctor = function() {
	var $this = {};
	$this.visible = true;
	$this.x = 0;
	$this.y = 0;
	$this.width = null;
	$this.height = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffPanel
var $Client_ShuffUI_ShuffPanel = function() {
	this.elements = null;
	$Client_ShuffUI_ShuffElement.call(this);
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
$Client_ShuffUI_ShuffPanel.prototype = {
	addElement: function(T) {
		return function(element) {
			this.element.append(element.element);
			this.elements.add(element);
			element.parentChanged($Client_ShuffUI_ParentChangedEvent.$ctor(this));
			return element;
		};
	},
	removeElement: function(T) {
		return function(element) {
			element.element.remove();
			this.elements.remove(element);
			element.parentChanged($Client_ShuffUI_ParentChangedEvent.$ctor(null));
			return element;
		};
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextbox
var $Client_ShuffUI_ShuffTextbox = function(options) {
	this.$myText = null;
	this.$2$TextChangedField = null;
	this.$2$LabelElementField = null;
	$Client_ShuffUI_ShuffElement.call(this);
	var but = $('<input value=\'' + ss.coalesce(options.text, '') + '\' />');
	this.element = but;
	but.css('position', 'absolute');
	this.set_text(options.text);
	this.set_x(options.x);
	this.set_y(options.y);
	this.set_width(options.width);
	this.set_height(options.height);
	this.set_visible(options.visible);
	but.keydown(Function.mkdel(this, function(a) {
		this.$myText = but.text();
		this.get_textChanged()($Client_ShuffUI_TextChangedEvent.$ctor(this.$myText, true));
	}));
	if (ss.isValue(options.label)) {
		this.parentChanged = Function.combine(this.parentChanged, Function.mkdel(this, function(e) {
			if (ss.isNullOrUndefined(e.parent)) {
				this.get_labelElement().remove();
				this.set_labelElement(null);
			}
			else {
				//to LabeledElement
				var lbl = $('<span style=\'' + options.labelStyle + '\'></span>');
				this.set_labelElement(lbl);
				lbl.text(options.label);
				this.get_parent().element.append(lbl);
				lbl.css('position', 'absolute');
				lbl.css('left', this.get_x() - lbl.width());
				lbl.css('top', this.get_y() + 2);
				lbl.disableSelection();
			}
		}));
	}
	but.disableSelection();
};
$Client_ShuffUI_ShuffTextbox.prototype = {
	get_text: function() {
		return this.$myText;
	},
	set_text: function(value) {
		this.$myText = value;
		this.get_textChanged()($Client_ShuffUI_TextChangedEvent.$ctor(this.$myText, false));
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
// Client.ShuffUI.ShuffTextbox
var $Client_ShuffUI_ShuffTextbox$1 = function(T) {
	var $type = function(options, data) {
		this.data = T.getDefaultValue();
		$Client_ShuffUI_ShuffTextbox.call(this, options);
		this.data = data;
	};
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffTextbox$1, [T], function() {
		return $Client_ShuffUI_ShuffTextbox;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffTextbox$1', $Client_ShuffUI_ShuffTextbox$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffTextboxOptions
var $Client_ShuffUI_ShuffTextboxOptions = function() {
};
$Client_ShuffUI_ShuffTextboxOptions.createInstance = function() {
	return $Client_ShuffUI_ShuffTextboxOptions.$ctor();
};
$Client_ShuffUI_ShuffTextboxOptions.$ctor = function() {
	var $this = $Client_ShuffUI_ShuffOptions.$ctor();
	$this.label = null;
	$this.labelStyle = null;
	$this.text = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffUIManager
var $Client_ShuffUI_ShuffUIManager = function() {
	this.$uiAreas = [];
};
$Client_ShuffUI_ShuffUIManager.prototype = {
	createWindow: function(T) {
		return function(ui) {
			var windowID = ui.title;
			var outer = $('<div class=\'window-outer\' style=\'background-color: #87B6D9;\'></div>');
			$('body').append(outer);
			ui.outer = outer;
			var tp = outer[0].style;
			tp['box-shadow'] = '4px 4px 2px #333';
			if (ss.isValue(tp['box-shadow'])) {
				tp['-moz-box-shadow'] = tp['box-shadow'];
				tp['-webkit-box-shadow'] = tp['box-shadow'];
			}
			outer.css('position', 'absolute');
			outer.css('padding', '2em 0.8em 0.8em 1.3em');
			outer.css('left', ui.get_x() + 'px');
			outer.css('top', ui.get_y() + 'px');
			outer.css('width', $Client_ShuffUI_Number.op_Implicit$1(ui.get_width()));
			outer.css('height', $Client_ShuffUI_Number.op_Implicit$1(ui.get_height()));
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
			ui.set_$window($('#window' + windowID));
			var info;
			this.$uiAreas.add(info = new $Client_ShuffUI_UIAreaInformation(outer, inner));
			ui.information = info;
			x.click(function(evt) {
				outer.css('display', 'none');
			});
			var toggleSize = false;
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
				window.alert('3');
			});
			outer.mousedown(Function.mkdel(this, function(evt3) {
				this.focus(info);
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
					}
				});
			}
			ui.element = inner;
			//inner.Append(ui.Element);
			return ui;
		};
	},
	focus: function(info) {
		for (var i = 0; i < this.$uiAreas.length; i++) {
			this.$uiAreas[i].get_element().css('z-index', 1800);
		}
		info.get_element().css('z-index', 1900);
	}
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.ShuffWindow
var $Client_ShuffUI_ShuffWindow$1 = function(T) {
	var $type = function() {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.$3$WindowField = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		$Client_ShuffUI_ShuffPanel.call(this);
	};
	$type.prototype = {
		get_$window: function() {
			return this.$3$WindowField;
		},
		set_$window: function(value) {
			this.$3$WindowField = value;
		},
		get_$outer: function() {
			return this.outer;
		},
		set_$outer: function(value) {
			this.outer = value;
			this.outer.resizable({ handles: 'n, e, s, w, ne, se, sw, nw' });
		},
		bindCustomEvents: function() {
			$Client_ShuffUI_ShuffElement.prototype.bindCustomEvents.call(this);
			this.visibleChanged = Function.combine(this.visibleChanged, Function.mkdel(this, function(e) {
				if (ss.isValue(this.get_$window())) {
					this.get_$window().css('display', (e.visible ? 'block' : 'none'));
				}
			}));
		}
	};
	$type.$ctor1 = function(data) {
		this.outer = null;
		this.data = T.getDefaultValue();
		this.$3$WindowField = null;
		this.title = null;
		this.allowClose = false;
		this.allowMinimize = false;
		this.staticPositioning = false;
		this.information = null;
		$Client_ShuffUI_ShuffPanel.call(this);
		this.data = data;
	};
	$type.$ctor1.prototype = $type.prototype;
	Type.registerGenericClassInstance($type, $Client_ShuffUI_ShuffWindow$1, [T], function() {
		return $Client_ShuffUI_ShuffPanel;
	}, function() {
		return [];
	});
	return $type;
};
Type.registerGenericClass(global, 'Client.ShuffUI.ShuffWindow$1', $Client_ShuffUI_ShuffWindow$1, 1);
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.SizeChangedEvent
var $Client_ShuffUI_SizeChangedEvent = function() {
};
$Client_ShuffUI_SizeChangedEvent.$ctor = function(w, h) {
	var $this = {};
	$this.width = null;
	$this.height = null;
	$this.width = w;
	$this.height = h;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.TextChangedEvent
var $Client_ShuffUI_TextChangedEvent = function() {
};
$Client_ShuffUI_TextChangedEvent.$ctor = function(text, live) {
	var $this = {};
	$this.text = null;
	$this.live = false;
	$this.live = live;
	$this.text = text;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Client.ShuffUI.UIAreaInformation
var $Client_ShuffUI_UIAreaInformation = function(element, inner) {
	this.$1$ElementField = null;
	this.$1$InnerField = null;
	this.set_element(element);
	this.set_inner(inner);
};
$Client_ShuffUI_UIAreaInformation.prototype = {
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
// Client.ShuffUI.VisibleChangedEvent
var $Client_ShuffUI_VisibleChangedEvent = function() {
};
$Client_ShuffUI_VisibleChangedEvent.$ctor = function(visible) {
	var $this = {};
	$this.visible = false;
	$this.visible = visible;
	return $this;
};
Type.registerClass(global, 'Globals', $Globals, Object);
Type.registerClass(global, 'Client.BuildSite', $Client_BuildSite, Object);
Type.registerClass(global, 'Client.GameCanvasInformation', $Client_GameCanvasInformation, Object);
Type.registerClass(global, 'Client.GameInfo', $Client_GameInfo, Object);
Type.registerClass(global, 'Client.Gateway', $Client_Gateway, Object);
Type.registerClass(global, 'Client.PageGameContext', $Client_PageGameContext, Object);
Type.registerClass(global, 'Client.PageHandler', $Client_PageHandler, Object);
Type.registerClass(global, 'Client.ScriptLoader', $Client_ScriptLoader, Object);
Type.registerClass(global, 'Client.Information.CodeAreaInformation', $Client_Information_CodeAreaInformation, Object);
Type.registerClass(global, 'Client.Information.DevAreaInformation', $Client_Information_DevAreaInformation, Object);
Type.registerClass(global, 'Client.Information.HomeAreaInformation', $Client_Information_HomeAreaInformation, Object);
Type.registerClass(global, 'Client.Information.QuestionAreaInformation', $Client_Information_QuestionAreaInformation, Object);
Type.registerClass(global, 'Client.ShuffUI.ButtonClickedEvent', $Client_ShuffUI_ButtonClickedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.CodeMirrorInformation', $Client_ShuffUI_CodeMirrorInformation, Object);
Type.registerClass(global, 'Client.ShuffUI.CodeMirrorInformationData', $Client_ShuffUI_CodeMirrorInformationData, Object);
Type.registerClass(global, 'Client.ShuffUI.ItemClickedEvent', $Client_ShuffUI_ItemClickedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.Number', $Client_ShuffUI_Number, Object);
Type.registerClass(global, 'Client.ShuffUI.ParentChangedEvent', $Client_ShuffUI_ParentChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.PositionChangedEvent', $Client_ShuffUI_PositionChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffElement', $Client_ShuffUI_ShuffElement, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffLabel', $Client_ShuffUI_ShuffLabel, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffListBox', $Client_ShuffUI_ShuffListBox, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffListItem', $Client_ShuffUI_ShuffListItem, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffOptions', $Client_ShuffUI_ShuffOptions, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffPanel', $Client_ShuffUI_ShuffPanel, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffTextbox', $Client_ShuffUI_ShuffTextbox, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffTextboxOptions', $Client_ShuffUI_ShuffTextboxOptions);
Type.registerClass(global, 'Client.ShuffUI.ShuffUIManager', $Client_ShuffUI_ShuffUIManager, Object);
Type.registerClass(global, 'Client.ShuffUI.SizeChangedEvent', $Client_ShuffUI_SizeChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.TextChangedEvent', $Client_ShuffUI_TextChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.UIAreaInformation', $Client_ShuffUI_UIAreaInformation, Object);
Type.registerClass(global, 'Client.ShuffUI.VisibleChangedEvent', $Client_ShuffUI_VisibleChangedEvent, Object);
Type.registerClass(global, 'Client.ShuffUI.ShuffButton', $Client_ShuffUI_ShuffButton, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffButtonOptions', $Client_ShuffUI_ShuffButtonOptions);
Type.registerClass(global, 'Client.ShuffUI.ShuffCodeEditor', $Client_ShuffUI_ShuffCodeEditor, $Client_ShuffUI_ShuffElement);
Type.registerClass(global, 'Client.ShuffUI.ShuffCodeEditorOptions', $Client_ShuffUI_ShuffCodeEditorOptions);
Type.registerClass(global, 'Client.ShuffUI.ShuffLabelOptions', $Client_ShuffUI_ShuffLabelOptions);
Type.registerClass(global, 'Client.ShuffUI.ShuffListBoxOptions', $Client_ShuffUI_ShuffListBoxOptions);
$Client_BuildSite.instance = null;
