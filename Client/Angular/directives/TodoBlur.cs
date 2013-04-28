using System;
using jQueryApi;
using ng;
namespace Client.Angular.directives
{
    public class TodoBlur
    {
        public Action<Scope, jQueryObject, TodoAttrs> link;
        private readonly ILogService log;

        public TodoBlur(ILogService log)
        {
            this.log = log;
            link = linkFn;
        }

        private void linkFn(Scope scope, jQueryObject elem, TodoAttrs attrs)
        {
            log.log("TodoBlur link");
            elem.Bind("blur", e => {
                log.log("TodoBlur bind");
                scope.Apply(attrs.todoBlur);
            });
        }
    }
}

