using Client.Scope;
using Client.Scope.Controller;
using Client.Services;
using Client.Scope.Directive;
namespace Client.Controllers
{
    internal class CreateRoomController
    {
        private readonly CreateRoomScope myScope;
        private readonly UIManagerService myUIManager;

        public CreateRoomController(CreateRoomScope scope, UIManagerService uiManager)
        {
            myScope = scope;
            myScope.Visible = false;
            myUIManager = uiManager;
            myScope.Model = new CreateRoomModel();

            myScope.Model.WindowClosed = () =>
            {
                myScope.SwingAway(SwingDirection.TopRight, false, null);
                myScope.Visible = false;
            };
            myScope.Model.CreateRoom = CreateRoomFn;
            uiManager.OpenCreateRoomDialog += () => {
                                                  myScope.Visible = true;
                                                  myScope.SwingAway(SwingDirection.BottomLeft, true, null);
                                                  myScope.SwingBack(null);
                                              };
        }

        private void CreateRoomFn()
        {
            myScope.SwingAway(SwingDirection.TopRight, false, null);
            myUIManager.CreateRoom(myScope.Model.RoomName);
        }
         
    }
}