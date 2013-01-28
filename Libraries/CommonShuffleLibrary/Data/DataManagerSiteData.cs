using System;
using System.Collections.Generic;
using Models.SiteManagerModels;
using MongoDBLibrary;
namespace CommonShuffleLibrary.Data
{
    public class DataManagerSiteData
    {
        private DataManager manager;

        public DataManagerSiteData(DataManager manager)
        {
            this.manager = manager;
        }

        public void User_Insert(UserModelData data)
        {
            manager.client.Collection("User", (err, collection) => { collection.Insert(data); });
        }

        public void User_GetFirstByUsernamePassword(string username, string password, Action<List<UserModelData>> results)
        {
            manager.client.Collection("User",
                                      (err, collection) => {
                                          var js = new JsDictionary<string, object>();


                                          js["username"] = username;
                                          js["password"] = password;

                                          MongoHelper.Find<UserModelData>(collection, js, (a, b) => results(b));

                                           
                                      });
        }

        public void Room_Insert(RoomData data)
        {
            manager.client.Collection("Room", (err, collection) => { collection.Insert(data); });
        }



        public void Room_GetAllByGameType(string gameType, Action<List<RoomData>> results )
        {
            manager.client.Collection("Room",
                             (err, collection) =>
                             {
                                 var js = new JsDictionary<string, object>();
                                 js["gameType"] = gameType;
                                  
                                 MongoHelper.Find<RoomData>(collection, js, (a, b) => results(b));
                             }); 
        }
    }
    public static class MongoHelper
    {
        public static void Find<T>(MongoCollection collection, JsDictionary<string, object> query, Action<string, List<T>> result)
        {
            collection.Find<T>(query, (a, b) => b.ToArray((c,d) => result(a, d)));

        }
    }
    [Serializable]
    public class UserModelData
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}