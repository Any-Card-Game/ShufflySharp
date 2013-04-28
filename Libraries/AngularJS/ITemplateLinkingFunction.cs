using System.Runtime.CompilerServices;

namespace ng
{
    [Imported]
    public interface ITemplateLinkingFunction
    {
#if TODO
    // Let's hint but not force cloneAttachFn's signature
        (scope: Scope, cloneAttachFn?: (clonedElement?: IJQLiteOrBetter, scope?: Scope) => any): IJQLiteOrBetter;
#endif
    }
}