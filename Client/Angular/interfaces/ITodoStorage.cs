using System.Collections.Generic;
using Client.Angular.models;
namespace Client.Angular.interfaces
{
    public interface ITodoStorage
    {
        List<TodoItem> todos { get; set; }
    }
}
