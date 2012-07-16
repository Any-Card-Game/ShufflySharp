using System.Runtime.CompilerServices;

[ScriptName("console")]
public static class Console
{
    [ScriptName("log")]
    public static void Log(string val)
    {
    }
    [ScriptName("log")]
    public static void Log()
    {
    }
}
[ScriptName("JSON")]

public static class JSON
{
    [ScriptName("stringify")]
    public static string Stringify(object obj)
    {
        return null;
    }

    [ScriptName("parse")]
    public static T Parse<T>(string data)
    {
        return default(T);
    }
}
