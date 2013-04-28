using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// see http://docs.angularjs.org/api/ng.$routeProvider#when for options explanations
    /// </summary>
    [Imported]
    public interface IRoute
    {
#if TODO
        controller?: any;
        template?: string;
        templateUrl?: string;
        resolve?: any;
        redirectTo?: any;
        reloadOnSearch?: bool;
#endif
    }
}