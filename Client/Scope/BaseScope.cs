using System;
using System.Runtime.CompilerServices;
using ng;
namespace Client.Scope
{
    public class _KeepBaseScopeAlive
    {

    }

    [Imported]
    public class BaseScope:IScope
    {
 

        /*
            Function watch(string watchExpression, Func<object, object> listener);
            Function watch(string watchExpression, Func<object, object, object> listener);
            Function watch(string watchExpression, Func<object, object, IScope, object> listener);
            Function watch(string watchExpression, Func<object, object> listener, bool objectEquality);
            Function watch(string watchExpression, Func<object, object, object> listener, bool objectEquality);
            Function watch(string watchExpression, Func<object, object, IScope, object> listener, bool objectEquality);
             */

        public Function watch(string watchExpression)
        {
            return null;
        }

        public Function watch(string watchExpression, Action listener)
        {
            return null;
        }

        public Function watch(string watchExpression, Action<object> listener)
        {
            return null;
        }

        public Function watch(string watchExpression, Action<object, object> listener)
        {
            return null;
        }

        public Function watch(string watchExpression, Action<object, object, IScope> listener)
        {
            return null;
        }

        public Function watch(string watchExpression, Action listener, bool objectEquality)
        {
            return null;
        }

        public Function watch(string watchExpression, Action<object> listener, bool objectEquality)
        {
            return null;
        }

        public Function watch(string watchExpression, Action<object, object> listener, bool objectEquality)
        {
            return null;
        }

        public Function watch(string watchExpression, Action<object, object, IScope> listener, bool objectEquality)
        {
            return null;
        }



        public Function watch<T>(Func<T, object> watchExpression) where T:IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action listener) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action<object> listener) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action<object, object> listener) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action<object, object, IScope> listener) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action listener, bool objectEquality) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action<object> listener, bool objectEquality) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action<object, object> listener, bool objectEquality) where T : IScope
        {
            return null;
        }

        public Function watch<T>(Func<T, object> watchExpression, Action<object, object, IScope> listener, bool objectEquality) where T : IScope
        {
            return null;
        }




        public object Apply(Func<IScope, object> exp)
        {
            return null;
        }

        public object Apply()
        {
            return null;
        }

        public void Destroy()
        {
            
        }

        public object Apply(string exp)
        {
            return null;
        }

        public T New<T>()
        {
            return default(T);
        }

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