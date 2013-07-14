using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using CommonLibraries;
namespace Models.SiteManagerModels.Game
{
    [Serializable]
    public class GameModel
    {
        public string Name { get; set; }
        public GameModel()
        {
            GameCode=new GameCodeModel();
            CardImages = new List<object>();
            Assets = new List<object>();
            GameLayout=new GameLayoutModel();
            GameLayoutScenarios = new List<GameLayoutScenario>();
            Effects = new List<GameEffectModel>();

        }
        public string UserHash { get; set; }
        public string Description { get; set; }
        public int MaxNumberOfPlayers { get; set; }

        public List<object> CardImages { get; set; }

        public List<object> Assets { get; set; }

        public GameCodeModel GameCode { get; set; }

        public GameLayoutModel GameLayout { get; set; }

        public List<GameLayoutScenario> GameLayoutScenarios { get; set; }
        public List<GameEffectModel> Effects { get; set; }
        [ScriptName("_id")]
        public string ID { get; set; }

        public bool Deleted { get; set; }
    }
    [Serializable]
    public class GameLayoutScenario
    {
        public string Name { get; set; }
        public int NumberOfPlayers { get; set; }
        public IntPoint ScreenSize { get; set; }
        public List<GameLayoutScenarioSpace> Spaces { get; set; }
        public List<GameLayoutScenarioEffect> Effects { get; set; }


    }
     

    [Serializable]
    public class GameLayoutScenarioSpace
    {
        public string SpaceGuid { get; set; }
        public List<GameLayoutScenarioCard> Cards { get; set; } 
    }
    [Serializable]
    public class GameLayoutScenarioCard 
    {
        public string CardGuid { get; set; }
        public int Value { get; set; }
        public int Type { get; set; }
        public GameLayoutCardState State { get; set; }  
    }
    [ScriptName("CardState")]
    [NamedValues]
    public enum GameLayoutCardState
    {
        FaceUp = 0,
        FaceDown = 1,
        FaceUpIfOwned = 2
    }
    [Serializable]
    public class GameLayoutScenarioEffect
    {
        public string EffectGuid { get; set; }
        public List<string> SpaceGuids { get; set; }
        public List<string> CardGuids { get; set; }
        public List<string> TextGuids { get; set; }
        public List<string> AreaGuids { get; set; }
    }
    [Serializable]
    public class GameLayoutModel
    {
        public GameLayoutModel()
        {
            Width = 25;
            Height = 15;
            Spaces = new List<GameSpaceModel>();
            Texts = new List<GameTextModel>();
            Areas = new List<GameAreaModel>();

        }
        public int Width { get; set; }
        public int Height { get; set; }
        public List<GameSpaceModel> Spaces { get; set; }
        public List<GameTextModel> Texts { get; set; }
        public List<GameAreaModel> Areas { get; set; }

    }
    [Serializable]
    public class GameTextModel
    {
        public string Guid { get; set; }
        public double Top { get; set; }
        public double Left { get; set; }

        public string Name { get; set; }
        public string Text { get; set; }

    }
    [Serializable]
    public class GameAreaModel
    {
        public string Guid { get; set; }
        public string Name { get; set; }

        public double Top { get; set; }
        public double Left { get; set; }

        public double Width { get; set; }
        public double Height { get; set; }

    }
    [Serializable]
    public class GameSpaceModel : GameAreaModel
    { 
        public GameSpaceLayoutType LayoutType { get; set; }
        public bool Vertical { get; set; }
        public TableSpaceResizeType ResizeType { get; set; }
    }
    [NamedValues]
    public enum TableSpaceResizeType
    {
        Grow,
        Static
    } 
    [NamedValues]
    public enum GameSpaceLayoutType
    {
        Grow,
        Static
    }
    [Serializable]
    public class GameCodeModel
    {
        public GameCodeModel()
        {
            Code = "dada";
            CursorPosition = new IntPoint(0, 0);
        }
        public string Code { get; set; }
        public IntPoint CursorPosition { get; set; }
    }

    [Serializable]
    public class GameEffectModel
    { 
        public string Guid { get; set; }
        public string Name { get; set; }
        public EffectType Type { get; set; }
        public List<GameEffectPropertyModel> Properties { get; set; }
    }

    public static class EffectHelper
    {
        public static double GetNumber(this GameEffectModel effect, string name)
        {
            foreach (var effectProperty in effect.Properties)
            {
                if (effectProperty.Name.ToLower() == name.ToLower())
                {
                    return double.Parse(effectProperty.Value.ToString());
                }
            }
            return 0.0;
        }
        public static string GetString(this GameEffectModel effect, string name)
        {
            foreach (var effectProperty in effect.Properties)
            {
                if (effectProperty.Name.ToLower() == name.ToLower())
                {
                    return effectProperty.Value.ToString();
                }
            }
            return "";
        } 
    }
    [NamedValues]
    public enum EffectType
    {
        Highlight,
        Rotate,
        Bend,
        StyleProperty,
        Animated,
    }

    [Serializable]
    public class GameEffectPropertyModel
    {
        public string Name { get; set; }
        public object Value { get; set; }
        public GameEffectPropertyType Type { get; set; }
    }
    [NamedValues]
    public enum GameEffectPropertyType
    {
        Text, Number, Color
    }

}