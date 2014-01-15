#define FTP
namespace CommonLibraries
{
    public class Constants
    {
#if FTP
        public const bool Local = false;
#else
        public const bool Local = true;
#endif
        public const string RootAddress = Local ? "http://localhost" : "http://198.211.107.235";
        public const string HomeAddress = Local ? "http://localhost:1700" : "http://198.211.107.235";
        public const string ContentAddress = Local ? "http://localhost:8881/" : "http://content.anycardgame.com/";
        public const string RedisIP = Local ? "198.211.107.101" : "198.211.107.101";
        public const string MongoIP = Local ? "198.211.107.101" : "198.211.107.101";
        public const string HARDLOCATION =Local? @"C:\code\node\":@"/usr/local/src/new/";
    }
}