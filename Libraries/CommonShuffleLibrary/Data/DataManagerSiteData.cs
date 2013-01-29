using System;
using System.Collections.Generic;
using Models;
using Models.SiteManagerModels;
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

   



        public void Room_GetAllByGameType(string gameType, Action<List<RoomData>> results)
        {
            manager.client.Collection("Room",
                             (err, collection) =>
                             {
                                 var js = new JsDictionary<string, object>();
                                 js["gameType"] = gameType; 
                                 MongoHelper.Find<RoomData>(collection, js, (a, b) => results(b));
                             });
        }
        public void Room_CreateRoom(string gameType, string roomName, UserModel user, Action<RoomData> onRoomCreated)
        {
            RoomData rd = new RoomData(gameType,roomName,new List<UserModel>(){user});
            manager.client.Collection("Room", (err, collection) => { collection.Insert(rd);
                                                  onRoomCreated(rd);

                                              });
        }

        public void Room_JoinRoom(string gameType, string roomName, UserModel user, Action<RoomData> onRoomJoined)
        {

            manager.client.Collection("Room",
                 (err, collection) =>
                 {
                     var js = new JsDictionary<string, object>();
                     js["gameType"] = gameType;
                     js["roomName"] = roomName;
                     MongoHelper.Find<RoomData>(collection, js, (a, b) => {

                         if (b.Count == 0) {
                             onRoomJoined(null);
                         } else {
                             var roomData = b[0];
                             roomData.Players.Add(user);

                             collection.Save(roomData);
                             onRoomJoined(roomData);
                         }
                                                                });
                 });


        }

        public void Room_GetByRoomName(string gameType, string roomName, Action<RoomData> results)
        {
            manager.client.Collection("Room",
                    (err, collection) =>
                    {
                        var js = new JsDictionary<string, object>();
                        js["gameType"] = gameType;
                        js["roomName"] = roomName;
                        MongoHelper.Find<RoomData>(collection, js, (a, b) => results(b.Count>0?b[0]:null));
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