using System;
using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$rootScope.Scope
    /// </summary>
    [Imported]
    public abstract class Scope
    {
      
        [ScriptName("$watch")]
        public Function watch(string watchExpression)
        {
            return null;
        }
        [AlternateSignature]

        public Function watch(string watchExpression, Action listener)
        {
            return null;
        }
        [AlternateSignature]

        public Function watch(string watchExpression, Action<object> listener)
        {
            return null;
        }
        [AlternateSignature]

        public Function watch(string watchExpression, Action<object, object> listener)
        {
            return null;
        }

        [AlternateSignature]
        public Function watch(string watchExpression, Action<object, object, Scope> listener)
        {
            return null;
        }
        [AlternateSignature]

        public Function watch(string watchExpression, Action listener, bool objectEquality)
        {
            return null;
        }

        [AlternateSignature]
        public Function watch(string watchExpression, Action<object> listener, bool objectEquality)
        {
            return null;
        }

        [AlternateSignature]
        public Function watch(string watchExpression, Action<object, object> listener, bool objectEquality)
        {
            return null;
        }

        [AlternateSignature]
        public Function watch(string watchExpression, Action<object, object, Scope> listener, bool objectEquality)
        {
            return null;
        }

        [ScriptName("$apply")]
        public object Apply(Func<Scope, object> exp)
        {
            return null;
        }

        [AlternateSignature]
        public object Apply(string exp)
        {
            return null;
        }
        /*
        Function watch(string watchExpression, Func<object, object> listener);
        Function watch(string watchExpression, Func<object, object, object> listener);
        Function watch(string watchExpression, Func<object, object, Scope, object> listener);
        Function watch(string watchExpression, Func<object, object> listener, bool objectEquality);
        Function watch(string watchExpression, Func<object, object, object> listener, bool objectEquality);
        Function watch(string watchExpression, Func<object, object, Scope, object> listener, bool objectEquality);
         */
         

#if TODO
    // Documentation says exp is optional, but actual implementaton counts on it
        
        $broadcast(name: string, ...args: any[]): IAngularEvent;
        $destroy(): void;
        $digest(): void;
        $emit(name: string, ...args: any[]): IAngularEvent;
        
        // Documentation says exp is optional, but actual implementaton counts on it
        $eval(expression: string): any;
        $eval(expression: (scope: Scope) => any): any;

        // Documentation says exp is optional, but actual implementaton counts on it
        $evalAsync(expression: string): void;
        $evalAsync(expression: (scope: Scope) => any): void;

        // Defaults to false by the implementation checking strategy
        $new(isolate?: bool): Scope;

        $on(name: string, listener: (event: IAngularEvent, ...args: any[]) => any): Function;

        $watch(watchExpression: string, listener?: (newValue: any, oldValue: any, scope: Scope) => any, objectEquality?: bool): Function;
        
        /*
        $watch(watchExpression: string, listener?: string, objectEquality?: bool): Function;
        $watch(watchExpression: string, listener?: (newValue: any, oldValue: any, scope: Scope) => any, objectEquality?: bool): Function;
        $watch(watchExpression: (scope: Scope) => Function, listener?: string, objectEquality?: bool): Function;
        $watch(watchExpression: (scope: Scope) => Function, listener?: (newValue: any, oldValue: any, scope: Scope) => any, objectEquality?: bool): Function;
*/
        
        $id: number;
#endif
    }
}