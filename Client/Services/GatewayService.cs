using ClientLibs;

namespace Client.Services
{
    public class GatewayService
    {
        public const string Name = "GatewayService";

        public GatewayService(string serverUrl)
        {
            Gateway = new Gateway(serverUrl, false);
        }

        public Gateway Gateway { get; set; }
    }
}