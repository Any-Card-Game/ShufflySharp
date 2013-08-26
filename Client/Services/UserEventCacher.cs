using System;
using System.Collections.Generic;
using Models;

namespace Client.Services
{
    public class UserEventCacher<T>
    {
        private List<Action<UserModel, T>> registeredEvents = new List<Action<UserModel, T>>();

        private event Action<UserModel, T> Event
        {
            add
            {
                registeredEvents.Add(value);
                if (cachedTriggers.Count > 0)
                {
                    foreach (var cachedTrigger in cachedTriggers)
                    {
                        Trigger(cachedTrigger.Item1, cachedTrigger.Item2);
                    }
                    cachedTriggers.Clear();
                }
            }
            remove
            {
                registeredEvents.Remove(value);
            }
        }

        private List<Tuple<UserModel, T>> cachedTriggers = new List<Tuple<UserModel, T>>();

        public static UserEventCacher<T> operator +(UserEventCacher<T> me, Action<UserModel, T> ev)
        {
            me.Event += ev;
            return me;
        }
        public void Trigger(UserModel user, T model)
        {
            if (registeredEvents.Count == 0)
            {
                cachedTriggers.Add(Tuple.Create(user, model));
                return;
            }
            foreach (var registeredEvent in registeredEvents)
            {
                registeredEvent(user, model);
            }
        }

    }
}