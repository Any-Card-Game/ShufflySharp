using ClientLibs;
namespace CardGameUI.Services
{
    public class GatewayService
    {
        public GatewayService(string serverUrl)
        {
            Gateway = new Gateway(serverUrl, false);
        }
        public Gateway Gateway { get; set; }
    }
}