using System.Runtime.CompilerServices;

namespace ng
{
    /// <summary>
    /// http://docs.angularjs.org/api/ng.$route#current
    /// </summary>
    [Imported]
    public interface ICurrentRoute : IRoute
    {
#if TODO
        locals: {
            $scope: Scope;
            $template: string;
        };
#endif
    }
}