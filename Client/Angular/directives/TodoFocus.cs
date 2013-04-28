using System;
using jQueryApi;
using ng;
namespace Client.Angular.directives
{
    public class TodoAttrs
    {
        public string todoFocus;
        public string todoBlur;
    }

    public class TodoFocus
    {
        public Action<Scope, jQueryObject, TodoAttrs> link;
        private readonly ITimeoutService timeout;
        private readonly ILogService log;

        public TodoFocus(ITimeoutService timeout, ILogService log)
        {
            this.log = log;
            this.timeout = timeout;
            link = linkFn;
        }

        private void linkFn(Scope scope, jQueryObject elem, TodoAttrs attrs)
        {
            log.log("TodoFocus link");
            scope.watch(attrs.todoFocus, newval =>
            {
                log.log("TodoFocus watch");
                if ((bool)newval)
                {
                    timeout.callback(() => {
                        log.log("TodoFocus timeout");
                        elem[0].Focus();
                    }, 0, false);
                }
            });
        }
    }
}
