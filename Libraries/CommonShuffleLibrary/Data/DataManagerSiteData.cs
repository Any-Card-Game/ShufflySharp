using System;
namespace CommonShuffleLibrary.Data
{
    public class DataManagerSiteData
    {
        private DataManager manager;

        public DataManagerSiteData(DataManager manager)
        {
            this.manager = manager;
        }

        public void Insert(UserModelData data)
        {
            manager.client.Collection("UserData", (err, collection) => { collection.Insert(data); });
        }
        public void Get(UserModelData data, Action<UserModelData[]> results)
        {
            manager.client.Collection("UserData",
                                      (err, collection) => {
                                          dynamic obj = new object();
                                          if (data.Username != null) {
                                              obj.username = data.Username;
                                          }

                                          if (data.Password != null) {
                                              obj.password = data.Password;
                                          }

                                          collection.Find<UserModelData>((object) obj, (a, b) => { results(b); });
                                      });
        }
    }

    [Serializable]
    public class UserModelData
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

}