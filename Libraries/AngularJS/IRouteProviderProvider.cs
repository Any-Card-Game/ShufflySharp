using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IRouteProviderProvider : IServiceProvider
    {
#if TODO
        otherwise(params: any): IRouteProviderProvider;
        when(path: string, route: IRoute): IRouteProviderProvider;
#endif
    }
}