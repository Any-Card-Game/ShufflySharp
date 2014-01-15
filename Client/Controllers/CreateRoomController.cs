using Client.Scope.Controller;
using Client.Scope.Directive;

namespace Client.Controllers
{
    internal class CreateRoomController
    {
        public const string View = "CreateRoomDialog";
        public const string Name = "CreateRoomController";
        private readonly CreateRoomScope myScope;

        public CreateRoomController(CreateRoomScope scope)
        {
            myScope = scope;
            myScope.Visible = false;

            myScope.Model.WindowClosed = () =>
                                         {
                                             myScope.SwingAway(SwingDirection.TopRight, false, null);
                                             myScope.Visible = false;
                                         };
            myScope.Model.CreateRoom = CreateRoomFn;
            myScope.OnReady += () =>
                               {

                                   myScope.SwingAway(SwingDirection.BottomLeft, true, null);
                                   myScope.SwingBack(null);
                               };
        }


        private void CreateRoomFn()
        {
            myScope.SwingAway(SwingDirection.TopRight, false, null);
            myScope.Model.OnCreateRoom(myScope.Model.RoomName);
        }
    }
}