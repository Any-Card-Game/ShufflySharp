namespace ShufflyNode.GameServer
{
    public class GameData
    {
        public int TotalGames;
        public int TotalQuestionsAnswered;
        public int TotalPlayers;
        public int FinishedGames;
        public override string ToString()
        {
            return "Total: " + this.TotalGames + "\n Running: " + this.RunningGames() + "\n Total Players: " + this.TotalPlayers + "\n Answered: " + this.TotalQuestionsAnswered;

        }

        private int RunningGames()
        {
            return this.TotalGames - this.FinishedGames;
        }
    }
}