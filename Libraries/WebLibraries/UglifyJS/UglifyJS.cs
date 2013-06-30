using System;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using WebLibraries.Common;

namespace WebLibraries.UglifyJS
{
    [Imported]
    public class UglifyJS
    {
        public AST_Toplevel Parse(string code)
        {
            return null;
        }

        [InlineCode("UglifyJS")]
        public static UglifyJS Instance()
        {
            return null;
        }
    }

    public delegate bool TreeWalkerDelegate(AST_Node node, Action descend);

    [Imported()]
    [ScriptNamespace("UglifyJS")]
    public class TreeWalker
    {
        public TreeWalker( TreeWalkerDelegate walker)
        {
        }
    }
    
    
    [Imported]
    public class AST_Token
    {
        [ScriptName("col")]
        [IntrinsicProperty]
        public int Column { get; set; }
        [ScriptName("comments_before")]
        [IntrinsicProperty]
        public string[] CommentsBefore { get; set; }
        [ScriptName("endpos")]
        [IntrinsicProperty]
        public int EndPosition { get; set; }
        [IntrinsicProperty]
        public string File { get; set; }
        [IntrinsicProperty]
        public int Line { get; set; }
        [ScriptName("pos")]
        [IntrinsicProperty]
        public int Position { get; set; }
        [IntrinsicProperty]
        public AST_TokenType Type { get; set; }
        [IntrinsicProperty]
        public string Value { get; set; }

    }
    [NamedValues]
    public enum AST_TokenType
    {
        [ScriptName("string")]
        String,
        [ScriptName("num")]
        Number,
        [ScriptName("regexp")]
        Regexp,
        [ScriptName("operator")]
        Operator,
        [ScriptName("atom")]
        Atom,
        [ScriptName("name")]
        Name,
        [ScriptName("punc")]
        Punc,
        [ScriptName("keyword")]
        Keyword,

    }

    [NamedValues]
    public enum NodeType
    {
        [PreserveCase]
        Statement,
        [PreserveCase]
        Debugger,
        [PreserveCase]
        Directive,
        [PreserveCase]
        SimpleStatement,
        [PreserveCase]
        Block,
        [PreserveCase]
        BlockStatement,
        [PreserveCase]
        Scope,
        [PreserveCase]
        Toplevel,
        [PreserveCase]
        Lambda,
        [PreserveCase]
        Accessor,
        [PreserveCase]
        Function,
        [PreserveCase]
        Defun,
        [PreserveCase]
        Switch,
        [PreserveCase]
        SwitchBranch,
        [PreserveCase]
        Default,
        [PreserveCase]
        Case,
        [PreserveCase]
        Try,
        [PreserveCase]
        Catch,
        [PreserveCase]
        Finally,
        [PreserveCase]
        EmptyStatement,
        [PreserveCase]
        StatementWithBody,
        [PreserveCase]
        LabeledStatement,
        [PreserveCase]
        DWLoop,
        [PreserveCase]
        Do,
        [PreserveCase]
        While,
        [PreserveCase]
        For,
        [PreserveCase]
        ForIn,
        [PreserveCase]
        With,
        [PreserveCase]
        If,
        [PreserveCase]
        Jump,
        [PreserveCase]
        Exit,
        [PreserveCase]
        Return,
        [PreserveCase]
        Throw,
        [PreserveCase]
        LoopControl,
        [PreserveCase]
        Break,
        [PreserveCase]
        Continue,
        [PreserveCase]
        Definitions,
        [PreserveCase]
        Var,
        [PreserveCase]
        Const,
        [PreserveCase]
        VarDef,
        [PreserveCase]
        Call,
        [PreserveCase]
        New,
        [PreserveCase]
        Seq,
        [PreserveCase]
        PropAccess,
        [PreserveCase]
        Dot,
        [PreserveCase]
        Sub,
        [PreserveCase]
        Unary,
        [PreserveCase]
        UnaryPrefix,
        [PreserveCase]
        UnaryPostfix,
        [PreserveCase]
        Binary,
        [PreserveCase]
        Assign,
        [PreserveCase]
        Conditional,
        [PreserveCase]
        Array,
        [PreserveCase]
        Object,
        [PreserveCase]
        ObjectProperty,
        [PreserveCase]
        ObjectKeyVal,
        [PreserveCase]
        ObjectSetter,
        [PreserveCase]
        ObjectGetter,
        [PreserveCase]
        Symbol,
        [PreserveCase]
        SymbolAccessor,
        [PreserveCase]
        SymbolDeclaration,
        [PreserveCase]
        SymbolVar,
        [PreserveCase]
        SymbolFunarg,
        [PreserveCase]
        SymbolConst,
        [PreserveCase]
        SymbolDefun,
        [PreserveCase]
        SymbolLambda,
        [PreserveCase]
        SymbolCatch,
        [PreserveCase]
        Label,
        [PreserveCase]
        SymbolRef,
        [PreserveCase]
        LabelRef,
        [PreserveCase]
        This,
        [PreserveCase]
        Constant,
        [PreserveCase]
        String,
        [PreserveCase]
        Number,
        [PreserveCase]
        RegExp,
        [PreserveCase]
        Atom,
        [PreserveCase]
        Null,
        [PreserveCase]
        NaN,
        [PreserveCase]
        Undefined,
        [PreserveCase]
        Hole,
        [PreserveCase]
        Infinity,
        [PreserveCase]
        Boolean,
        [PreserveCase]
        False,
        [PreserveCase]
        True,
    }

    
    [Imported]
    public class AST_Node
    {
        [IntrinsicProperty]
        public AST_Token Start { get; set; }
        [IntrinsicProperty] 
        public AST_Token End { get; set; }
        [ScriptName("TYPE")]
        [IntrinsicProperty]
        public NodeType Type { get; set; }
    }


    
    [Imported]
    public class AST_Statement : AST_Node
    {
    }
    
    [Imported]
    public class AST_Debugger : AST_Statement
    {
    }
    
    [Imported]
    public class AST_Directive : AST_Statement
    {
        [IntrinsicProperty]
        public string Value { get; set; }
        [IntrinsicProperty]
        public AST_Scope Scope { get; set; }
    }
    
    [Imported]
    public class AST_SimpleStatement : AST_Statement
    {
        [IntrinsicProperty]
        public AST_Node Body { get; set; }
    }
    
    [Imported]
    public class AST_Block : AST_Statement
    {
        [IntrinsicProperty]
        public AST_Statement[] Body { get; set; }
    }
    
    [Imported]
    public class AST_BlockStatement : AST_Block
    {
    }
    
    [Imported]
    public class AST_Scope : AST_Block
    {
        [IntrinsicProperty]
        public string[] Directives { get; set; }
        [IntrinsicProperty]
        public Object Variables { get; set; }
        [IntrinsicProperty]
        public Object Functions { get; set; }
        [IntrinsicProperty]
        public bool Uses_with { get; set; }
        [IntrinsicProperty]
        public bool Uses_eval { get; set; }
        [IntrinsicProperty]
        public AST_Scope Parent_scope { get; set; }
        [IntrinsicProperty]
        public SymbolDef[] Enclosed { get; set; }
        [IntrinsicProperty]
        public int Cname { get; set; }
        [ScriptName("find_variable")]
        public SymbolDef FindVariable(string name)
        {
            return default(SymbolDef);
        }

        public object References(SymbolDef name)
        {
            return default(object);
        }
    }
    
    [Imported]
    public class AST_Toplevel : AST_Scope
    {
        [ScriptName("figure_out_scope")]
        public void FigureOutScope()
        {
                
        }
        [IntrinsicProperty]
        public Object Globals { get; set; }

        public void Walk(TreeWalker walker)
        {
        }
    }
    
    [Imported]
    public class AST_Lambda : AST_Scope
    {
        [IntrinsicProperty]
        public AST_SymbolDeclaration Name { get; set; }
        [IntrinsicProperty]
        public AST_SymbolFunarg[] Argnames { get; set; }
        [IntrinsicProperty]
        public bool Uses_arguments { get; set; }
    }
    
    [Imported]
    public class AST_Accessor : AST_Lambda
    {
    }
    
    [Imported]
    public class AST_Function : AST_Lambda
    {
    }
    
    [Imported]
    public class AST_Defun : AST_Lambda
    {
    }
    
    [Imported]
    public class AST_Switch : AST_Block
    {
        [IntrinsicProperty]
        public AST_Node Expression { get; set; }
    }
    
    [Imported]
    public class AST_SwitchBranch : AST_Block
    {
    }
    
    [Imported]
    public class AST_Default : AST_SwitchBranch
    {
    }
    
    [Imported]
    public class AST_Case : AST_SwitchBranch
    {
        [IntrinsicProperty]
        public AST_Node Expression { get; set; }
    }
    
    [Imported]
    public class AST_Try : AST_Block
    {
        [IntrinsicProperty]
        public AST_Catch Bcatch { get; set; }
        [IntrinsicProperty]
        public AST_Finally Bfinally { get; set; }
    }
    
    [Imported]
    public class AST_Catch : AST_Block
    {
        [IntrinsicProperty]
        public AST_SymbolCatch Argname { get; set; }
    }
    
    [Imported]
    public class AST_Finally : AST_Block
    {
    }
    
    [Imported]
    public class AST_EmptyStatement : AST_Statement
    {
    }
    
    [Imported]
    public class AST_StatementWithBody : AST_Statement
    {
        [IntrinsicProperty]
        public AST_Statement Body { get; set; }
    }
    
    [Imported]
    public class AST_LabeledStatement : AST_StatementWithBody
    {
        [IntrinsicProperty]
        public AST_Label Label { get; set; }
    }
    
    [Imported]
    public class AST_DWLoop : AST_StatementWithBody
    {
        [IntrinsicProperty]
        public AST_Node Condition { get; set; }
    }
    
    [Imported]
    public class AST_Do : AST_DWLoop
    {
    }
    
    [Imported]
    public class AST_While : AST_DWLoop
    {
    }
    
    [Imported]
    public class AST_For : AST_StatementWithBody
    {
        [IntrinsicProperty]
        public AST_Node Init { get; set; }
        [IntrinsicProperty]
        public AST_Node Condition { get; set; }
        [IntrinsicProperty]
        public AST_Node Step { get; set; }
    }
    
    [Imported]
    public class AST_ForIn : AST_StatementWithBody
    {
        [IntrinsicProperty]
        public AST_Node Init { get; set; }
        [IntrinsicProperty]
        public AST_SymbolRef Name { get; set; }
        [IntrinsicProperty]
        public AST_Node Object { get; set; }
    }
    
    [Imported]
    public class AST_With : AST_StatementWithBody
    {
        [IntrinsicProperty]
        public AST_Node Expression { get; set; }
    }
    
    [Imported]
    public class AST_If : AST_StatementWithBody
    {
        [IntrinsicProperty]
        public AST_Node Condition { get; set; }
        [IntrinsicProperty]
        public AST_Statement Alternative { get; set; }
    }
    
    [Imported]
    public class AST_Jump : AST_Statement
    {
    }
    
    [Imported]
    public class AST_Exit : AST_Jump
    {
        [IntrinsicProperty]
        public AST_Node Value { get; set; }
    }
    
    [Imported]
    public class AST_Return : AST_Exit
    {
    }
    
    [Imported]
    public class AST_Throw : AST_Exit
    {
    }
    
    [Imported]
    public class AST_LoopControl : AST_Jump
    {
        [IntrinsicProperty]
        public AST_LabelRef Label { get; set; }
    }
    
    [Imported]
    public class AST_Break : AST_LoopControl
    {
    }
    
    [Imported]
    public class AST_Continue : AST_LoopControl
    {
    }
    
    [Imported]
    public class AST_Definitions : AST_Statement
    {
        [IntrinsicProperty]
        public AST_VarDef[] Definitions { get; set; }
    }
    
    [Imported]
    public class AST_Var : AST_Definitions
    {
    }
    
    [Imported]
    public class AST_Const : AST_Definitions
    {
    }
    
    [Imported]
    public class AST_VarDef : AST_Node
    {
        [ScriptName("name")]
        [IntrinsicProperty]
        public AST_SymbolVar Name_Var { get; set; }
        [ScriptName("name")]
        [IntrinsicProperty]
        public AST_SymbolConst Name_Const { get; set; }
        [IntrinsicProperty]
        public AST_Node Value { get; set; }
    }
    
    [Imported]
    public class AST_Call : AST_Node
    {
        public AST_Node Expression { get; set; }
        public AST_Node[] Args { get; set; }
    }
    
    [Imported]
    public class AST_New : AST_Call
    {
    }
    
    [Imported]
    public class AST_Seq : AST_Node
    {
        [IntrinsicProperty]
        public AST_Node Car { get; set; }
        [IntrinsicProperty]
        public AST_Node Cdr { get; set; }
    }
    
    [Imported]
    public class AST_PropAccess : AST_Node
    {
        [IntrinsicProperty]
        public AST_Node Expression { get; set; }
        [ScriptName("property")]
        [IntrinsicProperty]
        public AST_Node Property_Node { get; set; }
        [ScriptName("property")]
        [IntrinsicProperty]
        public string Property_String { get; set; }
    }
    
    [Imported]
    public class AST_Dot : AST_PropAccess
    {
    }
    
    [Imported]
    public class AST_Sub : AST_PropAccess
    {
    }
    
    [Imported]
    public class AST_Unary : AST_Node
    {
        [IntrinsicProperty]
        public string Operator { get; set; }
        [IntrinsicProperty]
        public AST_Node Expression { get; set; }
    }
    
    [Imported]
    public class AST_UnaryPrefix : AST_Unary
    {
    }
    
    [Imported]
    public class AST_UnaryPostfix : AST_Unary
    {
    }
    
    [Imported]
    public class AST_Binary : AST_Node
    {
        [IntrinsicProperty]
        public AST_Node Left { get; set; }
        [IntrinsicProperty]
        public string Operator { get; set; }
        [IntrinsicProperty]
        public AST_Node Right { get; set; }
    }
    
    [Imported]
    public class AST_Assign : AST_Binary
    {
    }
    
    [Imported]
    public class AST_Conditional : AST_Node
    {
        [IntrinsicProperty]
        public AST_Node Condition { get; set; }
        [IntrinsicProperty]
        public AST_Node Consequent { get; set; }
        [IntrinsicProperty]
        public AST_Node Alternative { get; set; }
    }
    
    [Imported]
    public class AST_Array : AST_Node
    {
        [IntrinsicProperty]
        public AST_Node[] Elements { get; set; }
    }
    
    [Imported]
    public class AST_Object : AST_Node
    {
        [IntrinsicProperty]
        public AST_ObjectProperty[] Properties { get; set; }
    }
    
    [Imported]
    public class AST_ObjectProperty : AST_Node
    {
        [IntrinsicProperty]
        public string Key { get; set; }
        [IntrinsicProperty]
        public AST_Node Value { get; set; }
    }
    
    [Imported]
    public class AST_ObjectKeyVal : AST_ObjectProperty
    {
    }
    
    [Imported]
    public class AST_ObjectSetter : AST_ObjectProperty
    {
    }
    
    [Imported]
    public class AST_ObjectGetter : AST_ObjectProperty
    {
    }
    
    [Imported]
    public class AST_Symbol : AST_Node
    {
        [IntrinsicProperty]
        public AST_Scope Scope { get; set; }
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public SymbolDef Thedef { get; set; }

        public SymbolDef Definition()
        {
            return default(SymbolDef);
        }
        public bool Global()
        {
            return default(bool);
        }
        public bool Undeclared()
        {
            return default(bool);
        }
        public bool Unreferenced()
        {
            return default(bool);
        }
    }
    
    [Imported]
    public class AST_SymbolAccessor : AST_Symbol
    {
    }
    
    [Imported]
    public class AST_SymbolDeclaration : AST_Symbol
    {
        [IntrinsicProperty]
        public AST_Node[] Init { get; set; }
    }
    
    [Imported]
    public class AST_SymbolVar : AST_SymbolDeclaration
    {
    }
    
    [Imported]
    public class AST_SymbolFunarg : AST_SymbolVar
    {
    }
    
    [Imported]
    public class AST_SymbolConst : AST_SymbolDeclaration
    {
    }
    
    [Imported]
    public class AST_SymbolDefun : AST_SymbolDeclaration
    {
    }
    
    [Imported]
    public class AST_SymbolLambda : AST_SymbolDeclaration
    {
    }
    
    [Imported]
    public class AST_SymbolCatch : AST_SymbolDeclaration
    {
    }
    
    [Imported]
    public class AST_Label : AST_Symbol
    {
        [IntrinsicProperty]
        public AST_LabelRef[] References { get; set; }
    }
    
    [Imported]
    public class AST_SymbolRef : AST_Symbol
    {
    }
    
    [Imported]
    public class AST_LabelRef : AST_Symbol
    {
    }
    
    [Imported]
    public class AST_This : AST_Symbol
    {
    }
    
    [Imported]
    public class AST_Constant : AST_Node
    {
    }
    
    [Imported]
    public class AST_String : AST_Constant
    {
        [IntrinsicProperty]
        public string Value { get; set; }
    }
    
    [Imported]
    public class AST_Number : AST_Constant
    {
        [IntrinsicProperty]
        public float Value { get; set; }
    }
    
    [Imported]
    public class AST_RegExp : AST_Constant
    {
        [IntrinsicProperty]
        public Regex Value { get; set; }
    }
    
    [Imported]
    public class AST_Atom : AST_Constant
    {
    }
    
    [Imported]
    public class AST_Null : AST_Atom
    {
    }
    
    [Imported]
    public class AST_NaN : AST_Atom
    {
    }
    
    [Imported]
    public class AST_Undefined : AST_Atom
    {
    }
    
    [Imported]
    public class AST_Hole : AST_Atom
    {
    }
    
    [Imported]
    public class AST_Infinity : AST_Atom
    {
    }
    
    [Imported]
    public class AST_Boolean : AST_Atom
    {
    }
    
    [Imported]
    public class AST_False : AST_Boolean
    {
    }
    
    [Imported]
    public class AST_True : AST_Boolean
    {
    }
    
    public class SymbolDef
    {
        [IntrinsicProperty]
        public string Name { get; set; }
        [IntrinsicProperty]
        public AST_SymbolDeclaration[] Orig { get; set; }
        [IntrinsicProperty]
        public AST_Scope Scope { get; set; }
        [IntrinsicProperty]
        public AST_SymbolRef[] References { get; set; }
        [IntrinsicProperty]
        public bool Global { get; set; }
        [IntrinsicProperty]
        public bool Undeclared { get; set; }
        [IntrinsicProperty]
        public bool Constant { get; set; }
        [IntrinsicProperty]
        public bool Mangled_name { get; set; }
    }
}
