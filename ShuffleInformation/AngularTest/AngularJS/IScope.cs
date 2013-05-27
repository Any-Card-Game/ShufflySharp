using System;
using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$rootScope.Scope
    /// </summary>
    [Imported]
    public interface IScope
    {
        [ScriptName("$watch")]
        Function watch(string watchExpression);

        [AlternateSignature]
        Function watch(string watchExpression, Action listener);
        [AlternateSignature]
        Function watch(string watchExpression, Action<object> listener);
        [AlternateSignature]
        Function watch(string watchExpression, Action<object, object> listener);
        [AlternateSignature]
        Function watch(string watchExpression, Action<object, object, IScope> listener);
        [AlternateSignature]
        Function watch(string watchExpression, Action listener, bool objectEquality);
        [AlternateSignature]
        Function watch(string watchExpression, Action<object> listener, bool objectEquality);
        [AlternateSignature]
        Function watch(string watchExpression, Action<object, object> listener, bool objectEquality);
        [AlternateSignature]
        Function watch(string watchExpression, Action<object, object, IScope> listener, bool objectEquality);
        /*
        Function watch(string watchExpression, Func<object, object> listener);
        Function watch(string watchExpression, Func<object, object, object> listener);
        Function watch(string watchExpression, Func<object, object, IScope, object> listener);
        Function watch(string watchExpression, Func<object, object> listener, bool objectEquality);
        Function watch(string watchExpression, Func<object, object, object> listener, bool objectEquality);
        Function watch(string watchExpression, Func<object, object, IScope, object> listener, bool objectEquality);
         */

        [ScriptName("$apply")]
        object Apply(Func<IScope, object> exp);
        [AlternateSignature]
        object Apply(string exp);

#if TODO
    // Documentation says exp is optional, but actual implementaton counts on it
        
        $broadcast(name: string, ...args: any[]): IAngularEvent;
        $destroy(): void;
        $digest(): void;
        $emit(name: string, ...args: any[]): IAngularEvent;
        
        // Documentation says exp is optional, but actual implementaton counts on it
        $eval(expression: string): any;
        $eval(expression: (scope: IScope) => any): any;

        // Documentation says exp is optional, but actual implementaton counts on it
        $evalAsync(expression: string): void;
        $evalAsync(expression: (scope: IScope) => any): void;

        // Defaults to false by the implementation checking strategy
        $new(isolate?: bool): IScope;

        $on(name: string, listener: (event: IAngularEvent, ...args: any[]) => any): Function;

        $watch(watchExpression: string, listener?: (newValue: any, oldValue: any, scope: IScope) => any, objectEquality?: bool): Function;
        
        /*
        $watch(watchExpression: string, listener?: string, objectEquality?: bool): Function;
        $watch(watchExpression: string, listener?: (newValue: any, oldValue: any, scope: IScope) => any, objectEquality?: bool): Function;
        $watch(watchExpression: (scope: IScope) => Function, listener?: string, objectEquality?: bool): Function;
        $watch(watchExpression: (scope: IScope) => Function, listener?: (newValue: any, oldValue: any, scope: IScope) => any, objectEquality?: bool): Function;
*/
        
        $id: number;
#endif
    }
}