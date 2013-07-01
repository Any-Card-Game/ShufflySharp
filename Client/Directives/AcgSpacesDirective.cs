using System;
using Client.Scope;
using Client.Scope.Directive;
using Client.Services;
using CommonLibraries;
using global;
using jQueryApi;
namespace Client.Directives
{
    public class AcgSpacesDirective
    {
        private readonly CompileService myCompile;
        private readonly GameContentManager myGameContentManager;
        public Action<AcgSpacesScope, jQueryObject, object> link;
        public string template;
        public string restrict;
        public bool replace;
        public bool transclude;
        public dynamic scope;
        public AcgSpacesDirective(CompileService compile, GameContentManager gameContentManager)
        {
            myCompile = compile;
            myGameContentManager = gameContentManager;
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

            var updater = new Action(() => {

                                         element.Children().Each((ind, e) => { 
                                             angular.Element(e).Scope<BaseScope>().Destroy();
                                         });


                element.Empty();

                var content = @"<div>
    <div acg-draw-space ng-style='spaceStyle'>
        <div ng-repeat='card in space.pile.cards' acg-draw-card ng-style='cardStyle' ng-click='cardClick()'>
        </div>
    </div> 
</";

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

            myGameContentManager.Redraw += () =>
            {
                Console.Log("updating board");
                updater();
                scope.Apply();
            };

            updater();

        }
    }
}