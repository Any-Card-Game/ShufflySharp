namespace ServerManager.GameServer
{
    public class GameData
    {
        public int FinishedGames;
        public int TotalGames;
        public int TotalPlayers;
        public int TotalQuestionsAnswered;

        public override string ToString()
        {
            return "Total: " + TotalGames + "\n Running: " + RunningGames() + "\n Total Players: " + TotalPlayers + "\n Answered: " + TotalQuestionsAnswered;
        }

        private int RunningGames()
        {
            return TotalGames - FinishedGames;
        }
    }
}