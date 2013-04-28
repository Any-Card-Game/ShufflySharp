using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface IDestructuredResponse
    {
#if TODO
        data: any;
        status: number;
        headers: (headerName: string) => string;
        config: IRequestConfig;
#endif
    }
}