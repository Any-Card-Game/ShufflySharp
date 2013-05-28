using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IHttpPromise : IPromise
    {
#if TODO
        success(callback: (response: IDestructuredResponse) => any): IHttpPromise;
        error(callback: (response: IDestructuredResponse) => any): IHttpPromise;
#endif
    }
}