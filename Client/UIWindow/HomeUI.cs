using System;
using System.Runtime.CompilerServices;
using Models.GameManagerModels;
using ShuffUI;
using jQueryApi;
namespace Client.UIWindow
{
    public class HomeUI
    {
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }
        [IntrinsicProperty]
        public Action<GameAnswerModel> loadRoomInfos { get; set; }
        [IntrinsicProperty]
        public ShuffListBox userList { get; set; }
        [IntrinsicProperty]
        public ShuffListBox gameList { get; set; }
        [IntrinsicProperty]
        public ShuffTextbox txtUserName { get; set; }
        [IntrinsicProperty]
        public ShuffButton btnStartGame { get; set; }
        [IntrinsicProperty]
        public Action<GameRoomModel> loadRoomInfo { get; set; }

        public HomeUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow() {
                                                                             Title = "CardGame",
                                                                             X = jQuery.Select("body").GetInnerWidth() - 500,
                                                                             Y = 100,
                                                                             Width = 420,
                                                                             Height = 450,
                                                                             AllowClose = true,
                                                                             AllowMinimize = true,
                                                                             Visible = false
                                                                     });

            UIWindow.AddElement(new ShuffButton(280, 54, 150, 25, "Update game list", (e) => { pageHandler.ClientSiteManager.GetGameList(); }));

            /*home.AddButton(new ShuffButton()
            {
                X = 280,
                Y = 84,
                Width = "150",
                Height = "25",
                Text = "Create Game",
                Click = (e) =>
                {

                    pageHandler.gateway.Emit("Area.Game.Create", new { user = new { userName = home.Data.txtUserName[0].NodeValue } }, devArea.Data.gameServer); //NO EMIT'ING OUTSIDE OF PageHandler


                }
            });*/

            btnStartGame = UIWindow.AddElement(new ShuffButton(280, 164, 120, 25, "Start Game", (e) => { pageHandler.ClientGameManager.StartGame(new StartGameRequestModel(pageHandler.gameStuff.RoomID)); }));

            var randomName = "";
            var ra = Math.Random() * 10;
            for (var i = 0; i < ra; i++) {
                randomName += String.FromCharCode((char) ( 65 + ( Math.Random() * 26 ) ));
            }

            txtUserName = UIWindow.AddElement(new ShuffTextbox(130, 43, 130, 20, randomName, "Username="));

            /*home.Data.gameList = home.AddListBox(new ShuffListBox()
            {
                X = 30,
                Y = 85,
                Width = "215",
                Height = "150".ToString(),
                Label = "Rooms",
                Click = (e) =>
                {
                    pageHandler.gateway.Emit("Area.Game.Join", new { roomID = "foo", user = new { userName = home.Data.txtUserName.GetValue() } }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
                }
            });*/

            /*
            home.Data.userList = home.AddElement(new ShuffListBox(new ShuffListBoxOptions() {
                    X = 30,
                    Y = 280,
                    Width = 215,
                    Height = 25 * 5,
                    Label = "Users"
                }));
*/

            loadRoomInfo = (room) => {
                               /*

home.Data.userList.Remove();
home.Data.btnStartGame.CSS("display","block");

var users = new List<string>();

for (var i = 0; i < room.players.length; i++) {

users.Add(room.players[i]);

}


home.Data.userList = home.AddListBox(new ShuffListBox(){
X= 30,
Y= 280,
Width= "215",
Height = "125",
Label= "Users",
Items= users
});*/
                           };

            loadRoomInfos = (room) => {
                                /*   home.Data.gameList.Remove();

   var rooms = new List<string>();

for (var i = 0; i < room.length; i++) {
//rooms.Add({ label= room[i].name, value= room[i].roomID });
}


home.Data.gameList = home.AddListBox(new ShuffListBox(){
X= 30,
Y= 85,
Width = "215",
Height = "150",
Label= "Rooms",
Items= rooms,
Click=  (item)=> {
pageHandler.gateway.Emit("Area.Game.Join", new { roomID= item.value, user=new  { userName= home.Data.txtUserName.GetValue()} }, devArea.Data.gameServer); //NO EMIT"ING OUTSIDE OF PageHandler
}
});*/
                            };
        }
    }
}