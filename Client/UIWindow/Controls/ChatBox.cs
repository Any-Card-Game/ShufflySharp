using System.Collections.Generic;
using Models.ChatManagerModels;
using WebLibraries.ShuffUI.ShuffUI;
using jQueryApi;
namespace Client.UIWindow.Controls
{
    public class ChatBox : ShuffElement
    {
        public ChatBox(int x, int y, int width, int height)
        {
            Element = jQuery.Select("<div></div>");
            Element.CSS("position", "absolute");
            Element.CSS("background-color", "grey");
            Element.CSS("overflow-y", "scroll");

            X = x;
            Y = y;
            Width = width;
            Height = height;
            Visible = true;
        }

        public void AddChatMessage(ChatMessageRoomModel message)
        {
            var msgElement = jQuery.Select("<div></div>");
            msgElement.CSS("background-color", "#DDDDDD");

            msgElement.Append(jQuery.Select("<span>" + message.User.UserName + "</span>"));
            msgElement.Append(jQuery.Select("<span>&nbsp;&nbsp;:&nbsp;&nbsp;</span>"));
            msgElement.Append(jQuery.Select("<span>" + message.Content + "</span>"));

            Element.Append(msgElement);
            Element.ScrollTop(Element.GetHeight());
        }

        public void AddChatMessages(List<ChatMessageRoomModel> messages)
        {
            foreach (var chatMessageRoomModel in messages) {
                AddChatMessage(chatMessageRoomModel);
            }
        }
    }
}