using System;
using System.Collections.Generic;
using System.Html;
using CardGameUI.Scope;
using CardGameUI.Services;
using CommonLibraries;
using global;
using jQueryApi;
using jQueryApi.UI.Interactions;
namespace CardGameUI.Directives
{
    public class AcgSpacesDirective
    {
        private readonly CompileService myCompile;
        private readonly GameContentManager myGameContentManager;
        public Action<SpaceScope, jQueryObject, object> link;
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
            template = @"
    <div  >
        
    </div>";
            replace = true;
            transclude = false;
            scope = new
            {
                spaces = "=acgSpaces"
            };
            link = linkFn;

        }

        private void linkFn(dynamic scope, jQueryObject element, object attrs)
        {

            var updater = new Action(() =>
            {

                element.Empty();

                var content = @"<div>
    <div acg-draw-space ng-style='spaceStyle'>
        <div ng-repeat='card in space.pile.cards' acg-draw-card ng-style='cardStyle' ng-click='cardClick()'>
        </div>
    </div> 
</";

                angular.ForEach(scope.spaces,
                                new Action<CardGameTableSpace>((space) =>
                                {
                                    var e = angular.Element(content);
                                    var _scope = scope["$new"]();
                                    _scope.space = space;
                                    myCompile(e.Contents())(_scope);

                                    element.Append(e);
                                }));

            });

            //scope["$watch"]("spaces",updater);

            myGameContentManager.Redraw += () => {
                Console.Log("updatinggagaga");
                                               updater();
                                               scope["$apply"]();
                                           };

            updater();

        }
    }
}