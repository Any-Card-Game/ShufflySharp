using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using Client.Angular.controllers;
using Client.Angular.directives;
using Client.Angular.interfaces; 
using ng;
[assembly: ScriptSharpCompatibility(OmitDowncasts = true, OmitNullableChecks = true)]

namespace AngularTest
{
    class Program
    {
        static void Main( )
        {
            angular.module("acg", new string[] { })
      .config(new object[] {
                                                "$routeProvider",
                           new Action<IRouteProviderProvider>(provider => {
                               provider.When("/gameUI", new Route(){Controller="GameCtrl",TemplateURL =  "partials/gameUI.html"}).
                                   Otherwise(new OtherwiseRoute() { RedirectTo = "/gameUI" });
                                                              })
                                        })
      .controller("GameCtrl", new object[] { "$scope", new Func<GameCtrlScope, object>((scope) => new GameCtrl(scope)) })
      .controller("EffectEditorController", new object[] { "$scope", new Func<EffectEditorScope, object>((scope) => new EffectEditorController(scope)) })
      .directive("draggable", new object[] { new Func<object>(() => new DraggableDirective()) })
      .directive("acgDrawCard", new object[] { new Func<object>(() => new AcgDrawCardDirective()) })
      .directive("acgDrawSpace", new object[] { new Func<object>(() => new AcgDrawSpaceDirective()) });
            
        }
    }
}
 