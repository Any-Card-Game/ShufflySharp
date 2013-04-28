using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Client.Angular.models;
using ng;
namespace Client.Angular.interfaces
{
    [Serializable]
    public class StatusFilter
    {
        [ObjectLiteral]
        public StatusFilter()
        {
        }
        
        public bool completed;
    }

    public class TodoScope : Scope
    {
        public List<TodoItem> todos;
        public string newTodo;
        public TodoItem editedTodo;
        public int remainingCount;
        public int doneCount;
        public bool allChecked;
        public StatusFilter statusFilter;
        public ILocationService location;

        public Action addTodo;
        public Action clearDoneTodos;
        public Action<TodoItem> editTodo;
        public Action<TodoItem> doneEditing;
        public Action<TodoItem> removeTodo;
        public Action<bool> markAll;
    }
}
