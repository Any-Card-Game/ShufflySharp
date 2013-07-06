
(function() {
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.UglifyJS.AST_TokenType
	var $WebLibraries_UglifyJS_AST_TokenType = function() {
	};
	$WebLibraries_UglifyJS_AST_TokenType.prototype = { string: 'string', num: 'num', regexp: 'regexp', operator: 'operator', atom: 'atom', name: 'name', punc: 'punc', keyword: 'keyword' };
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.UglifyJS.NodeType
	var $WebLibraries_UglifyJS_NodeType = function() {
	};
	$WebLibraries_UglifyJS_NodeType.prototype = { Statement: 'Statement', Debugger: 'Debugger', Directive: 'Directive', SimpleStatement: 'SimpleStatement', Block: 'Block', BlockStatement: 'BlockStatement', Scope: 'Scope', Toplevel: 'Toplevel', Lambda: 'Lambda', Accessor: 'Accessor', Function: 'Function', Defun: 'Defun', Switch: 'Switch', SwitchBranch: 'SwitchBranch', Default: 'Default', Case: 'Case', Try: 'Try', Catch: 'Catch', Finally: 'Finally', EmptyStatement: 'EmptyStatement', StatementWithBody: 'StatementWithBody', LabeledStatement: 'LabeledStatement', DWLoop: 'DWLoop', Do: 'Do', While: 'While', For: 'For', ForIn: 'ForIn', With: 'With', If: 'If', Jump: 'Jump', Exit: 'Exit', Return: 'Return', Throw: 'Throw', LoopControl: 'LoopControl', Break: 'Break', Continue: 'Continue', Definitions: 'Definitions', Var: 'Var', Const: 'Const', VarDef: 'VarDef', Call: 'Call', New: 'New', Seq: 'Seq', PropAccess: 'PropAccess', Dot: 'Dot', Sub: 'Sub', Unary: 'Unary', UnaryPrefix: 'UnaryPrefix', UnaryPostfix: 'UnaryPostfix', Binary: 'Binary', Assign: 'Assign', Conditional: 'Conditional', Array: 'Array', Object: 'Object', ObjectProperty: 'ObjectProperty', ObjectKeyVal: 'ObjectKeyVal', ObjectSetter: 'ObjectSetter', ObjectGetter: 'ObjectGetter', Symbol: 'Symbol', SymbolAccessor: 'SymbolAccessor', SymbolDeclaration: 'SymbolDeclaration', SymbolVar: 'SymbolVar', SymbolFunarg: 'SymbolFunarg', SymbolConst: 'SymbolConst', SymbolDefun: 'SymbolDefun', SymbolLambda: 'SymbolLambda', SymbolCatch: 'SymbolCatch', Label: 'Label', SymbolRef: 'SymbolRef', LabelRef: 'LabelRef', This: 'This', Constant: 'Constant', String: 'String', Number: 'Number', RegExp: 'RegExp', Atom: 'Atom', Null: 'Null', NaN: 'NaN', Undefined: 'Undefined', Hole: 'Hole', Infinity: 'Infinity', Boolean: 'Boolean', False: 'False', True: 'True' };
	////////////////////////////////////////////////////////////////////////////////
	// WebLibraries.UglifyJS.SymbolDef
	var $WebLibraries_UglifyJS_SymbolDef = function() {
		this.name = null;
		this.orig = null;
		this.scope = null;
		this.references = null;
		this.global = false;
		this.undeclared = false;
		this.constant = false;
		this.mangled_name = false;
	};
	ss.registerEnum(global, 'WebLibraries.UglifyJS.AST_TokenType', $WebLibraries_UglifyJS_AST_TokenType);
	ss.registerEnum(global, 'WebLibraries.UglifyJS.NodeType', $WebLibraries_UglifyJS_NodeType);
	ss.registerClass(global, 'WebLibraries.UglifyJS.SymbolDef', $WebLibraries_UglifyJS_SymbolDef);
})();
