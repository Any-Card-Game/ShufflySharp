using System;
using System.Collections.Generic;
using Client.Scope.Controller;
using Client.Scope.Directive;
using Client.Services;
using ng;

namespace Client.Controllers
{
    internal class MinimizeController:AngularController
    {
        public const string Name = "MinimizeController";
        public const string View = "MinimizeArea";
        private readonly MinimizeScope myScope;
        private UIManagerService myUIManager;

        public MinimizeController(MinimizeScope scope, UIManagerService uiManager)
        {
            myScope = scope;
            myUIManager = uiManager;
            scope.Items = new List<FloatingWindowScope>();

            uiManager.OnMinimize = floatingWindowBaseScope => scope.Items.Add(floatingWindowBaseScope);

            scope.Open = OpenFn;
            scope.Remove = RemoveFn;
        }

        private void RemoveFn(FloatingWindowScope arg)
        {
            arg.Close();
            myScope.Items.Remove(arg);
        }

        private void OpenFn(FloatingWindowScope arg)
        {
            arg.Restore();
            myScope.Items.Remove(arg);
        }

        public static IModule Register(IModule module)
        {
            return module.Controller(Name,
                AngularController.Make<MinimizeController, MinimizeScope, UIManagerService>((scope, uiManager) => new MinimizeController(scope, uiManager),
                    MinimizeScope.Name,
                    UIManagerService.Name));
        }
    }

    internal class AngularController
    {
        protected static object[] Make<T>(Func<T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1>(Func<T1, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2>(Func<T1, T2, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2,T3>(Func<T1, T2,T3, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2,T3,T4>(Func<T1, T2,T3,T4, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2, T3, T4, T5>(Func<T1, T2, T3, T4, T5, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2, T3, T4, T5, T6>(Func<T1, T2, T3, T4, T5,T6, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2, T3, T4, T5, T6, T7>(Func<T1, T2, T3, T4, T5, T6, T7, T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
        protected static object[] Make<T, T1, T2, T3, T4, T5, T6, T7, T8>(Func<T1, T2, T3, T4, T5, T6, T7,T8,T> func, params string[] parms)
        {
            var m = new object[parms.Length + 1];
            for (int i = 0; i < parms.Length; i++)
            {
                m[i] = parms[i];
            }
            m[parms.Length] = func;
            return m;
        }
    }
}