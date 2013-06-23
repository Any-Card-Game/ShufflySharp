/*using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Models;
using Models.GameManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
using jQueryApi;
namespace Client.UIWindow
{
    public class CodeEditorUI
    {
        public ShuffUIManager ShuffUIManager { get; set; }
        public PageHandler PageHandler { get; set; }
        [IntrinsicProperty]
        public ShuffCodeEditor codeEditor { get; set; }
        [IntrinsicProperty]
        public ShuffCodeEditor console { get; set; }
        [IntrinsicProperty]
        public List<int> breakPoints { get; set; }
        [IntrinsicProperty]
        public ShuffWindow UIWindow { get; set; }

        public CodeEditorUI(ShuffUIManager shuffUIManager, PageHandler pageHandler)
        {
            ShuffUIManager = shuffUIManager;

            UIWindow = shuffUIManager.CreateWindow(new ShuffWindow()
            {
                Title = "Code",
                X = 0,
                Y = 0,
                StaticPositioning = false,
                Width = jQuery.Window.GetWidth() * .50,
                Height = jQuery.Window.GetHeight() * .90,
                AllowClose = true,
                AllowMinimize = true,
                Visible = true
            });


            breakPoints = new List<int>();

            codeEditor = UIWindow.AddElement(new ShuffCodeEditor(0, 0, "100%", "80%", "") {Dock = DockStyle.FillWidth});

            console = UIWindow.AddElement(new ShuffCodeEditor(0, 0, "100%", "20%", "") {LineNumbers = false, Dock = DockStyle.FillWidth});

            pageHandler.ClientDebugManager.OnGetGameSource += populateGameSource;
            pageHandler.ClientDebugManager.RequestGameSource(new GameSourceRequestModel("Sevens"));

        }

        private void populateGameSource(UserModel user, GameSourceResponseModel gameSource)
        {
            var endTime = new DateTime();

            var timeTracker = PageHandler.TimeTracker;
            var time = endTime - timeTracker.StartTime;
            timeTracker.NumOfTimes++;
            timeTracker.TimeValue += time;
          //  PageHandler.DebugUI.lblHowFast.Text = ( "Time Taken: " + ( timeTracker.TimeValue / timeTracker.NumOfTimes ) );
            PageHandler.CodeEditorUI.codeEditor.Information.editor.SetValue(gameSource.Content); /*
                                                 buildSite.CodeEditorUI.codeEditor.Information.editor.SetMarker(0, "<span style=\"color: #900\">&nbsp;&nbsp;</span> %N%");#1#
            PageHandler.CodeEditorUI.codeEditor.Information.editor.Refresh();
        }
    }
}*/