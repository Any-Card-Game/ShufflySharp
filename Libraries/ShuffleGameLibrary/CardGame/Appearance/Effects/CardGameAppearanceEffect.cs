using System.Runtime.CompilerServices;
using CommonLibraries;
namespace global
{
    [ScriptName("Effect")]
    public class CardGameAppearanceEffect
    {
        [IntrinsicProperty]
        public EffectType Type { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceEffectDrawTime DrawTime { get; set; }
        [IntrinsicProperty]
        public CardGameAppearanceEffect ChainedEffect { get; set; }

        public CardGameAppearanceEffect(EffectType type)
        {
            Type = type;
            DrawTime = CardGameAppearanceEffectDrawTime.Pre;
        }

        public CardGameAppearanceEffect ChainEffect(CardGameAppearanceEffect ef)
        {
            ChainedEffect = ( ef );
            return ef;
        }

        public virtual void Build(CardDrawing m)
        {
            ///Window.Alert("bad1");
        }

        public virtual void TearDown(CardDrawing m)
        {
            ///Window.Alert("bad2");
        }

        public virtual void Build(SpaceDrawing m)
        {
            ///Window.Alert("bad1");
        }

        public virtual void TearDown(SpaceDrawing em)
        {
            ///Window.Alert("bad2");
        }

        public static CardGameAppearanceEffect FromJson(CardGameAppearanceEffect effect)
        {
            CardGameAppearanceEffect ef;
            switch (effect.Type) {
                case EffectType.Highlight:
                    ef = new CardGameAppearanceEffectHighlight(new CardGameEffectHighlightOptions() {
                                                                                                            Color = effect.me().color,
                                                                                                            OffsetX = effect.me().offsetX ?? 0,
                                                                                                            OffsetY = effect.me().offsetY ?? 0,
                                                                                                            Radius = effect.me().radius ?? 0,
                                                                                                            Rotate = effect.me().rotate ?? 0,
                                                                                                    });
                    break;
                case EffectType.Rotate:
                    ef = new CardGameAppearanceEffectRotate(new CardGameEffectRotateOptions() {
                                                                                                      Degrees = effect.me().degrees ?? 0,
                                                                                              });
                    break;
                case EffectType.Bend:
                    ef = new CardGameAppearanceEffectBend(new CardGameEffectBendOptions() {
                                                                                                  Degrees = effect.me().degrees ?? 0,
                                                                                          });
                    break;
                case EffectType.StyleProperty:
                    ef = new CardGameAppearanceEffectStyleProperty(new CardGameAppearanceStyle());
                    var jm = ef;
                    "jm.style=effect.style".eval();
                    break;
                case EffectType.Animated:
                    ef = null;
                    break;
                default:
                    ef = null;
                    break;
            }
            if (ef.ChainedEffect != null)
                ef.ChainedEffect = FromJson(effect.ChainedEffect);

            return ef;
        }
    }
    //[NamedValues]todo:::
    //[NamedValues]todo:::
}