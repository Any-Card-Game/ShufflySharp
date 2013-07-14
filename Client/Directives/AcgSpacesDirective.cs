using System;
using Client.Scope;
using Client.Scope.Directive;
using Client.Services;
using CommonLibraries;
using jQueryApi;

namespace Client.Directives
{
    public class AcgSpacesDirective
    {
        public const string Name = "acgSpaces";
        private readonly CompileService myCompile;
        private readonly GameContentManagerService myGameContentManagerService;
        public Action<AcgSpacesScope, jQueryObject, object> link;
        public bool replace;
        public string restrict;
        public dynamic scope;
        public string template;
        public bool transclude;

        public AcgSpacesDirective(CompileService compile, GameContentManagerService gameContentManagerService)
        {
            myCompile = compile;
            myGameContentManagerService = gameContentManagerService;
            restrict = "EA";
            template = @"<div></div>";
            replace = true;
            transclude = false;
            scope = new
                    {
                        spaces = "=acgSpaces"
                    };
            link = linkFn;
        }

        private void linkFn(AcgSpacesScope scope, jQueryObject element, object attrs)
        {
            var updater = new Action(() =>
                                     {
                                         element.Children()
                                             .Each((ind, e) => { angular.Element(e).Scope<BaseScope>().Destroy(); });


                                         element.Empty();

                                         var content = @"<div>
    <div acg-draw-space ng-style='spaceStyle'>
        <div ng-repeat='card in space.pile.cards' acg-draw-card ng-style='cardStyle'>
        </div>
    </div> 
</div>";

                                         angular.ForEach(scope.Spaces,
                                             (space) =>
                                             {
                                                 var e = angular.Element(content);
                                                 var _scope = scope.New<AcgSpacesScope>();
                                                 _scope.Space = space;
                                                 var elk = myCompile(e.Contents())(_scope);

                                                 element.Append(elk);
                                             });
                                     });

            //scope["$watch"]("spaces",updater);

            myGameContentManagerService.Redraw += () =>
                                           {
                                               Console.Log("updating board");
                                               updater();
                                               scope.Apply();
                                           };

            updater();
        }
    }
}