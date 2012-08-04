using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace global
{
    /*    public class MyStyle
        {
            public bool Accelerator
            {
                get { return (bool)props["Accelerator"]; }
                set
                {
                    if (props["accelerator"] == null) someCouner++;
                    props["accelerator"] = value;
                }
            }
            public string Background
            {
                get { return (string)props["background"]; }
                set
                {
                    if (props["background"] == null) someCouner++;
                    props["background"] = value;
                }
            }
            public string BackgroundAttachment
            {
                get { return (string)props["backgroundAttachment"]; }
                set
                {
                    if (props["backgroundAttachment"] == null) someCouner++;
                    props["backgroundAttachment"] = value;
                }
            }
            public string BackgroundColor
            {
                get { return (string)props["backgroundColor"]; }
                set
                {
                    if (props["backgroundColor"] == null) someCouner++;
                    props["backgroundColor"] = value;
                }
            }
            public string BackgroundImage
            {
                get { return (string)props["backgroundImage"]; }
                set
                {
                    if (props["backgroundImage"] == null) someCouner++;
                    props["backgroundImage"] = value;
                }
            }
            public string BackgroundPosition
            {
                get { return (string)props["backgroundPosition"]; }
                set
                {
                    if (props["backgroundPosition"] == null) someCouner++;
                    props["backgroundPosition"] = value;
                }
            }
            public string BackgroundPositionX
            {
                get { return (string)props["backgroundPositionX"]; }
                set
                {
                    if (props["backgroundPositionX"] == null) someCouner++;
                    props["backgroundPositionX"] = value;
                }
            }
            public string BackgroundPositionY
            {
                get { return (string)props["backgroundPositionY"]; }
                set
                {
                    if (props["backgroundPositionY"] == null) someCouner++;
                    props["backgroundPositionY"] = value;
                }
            }
            public string BackgroundRepeat
            {
                get { return (string)props["backgroundRepeat"]; }
                set
                {
                    if (props["backgroundRepeat"] == null) someCouner++;
                    props["backgroundRepeat"] = value;
                }
            }
            public string Border
            {
                get { return (string)props["border"]; }
                set
                {
                    if (props["border"] == null) someCouner++;
                    props["border"] = value;
                }
            }
            public string BorderBottom
            {
                get { return (string)props["borderBottom"]; }
                set
                {
                    if (props["borderBottom"] == null) someCouner++;
                    props["borderBottom"] = value;
                }
            }
            public string BorderBottomColor
            {
                get { return (string)props["borderBottomColor"]; }
                set
                {
                    if (props["borderBottomColor"] == null) someCouner++;
                    props["borderBottomColor"] = value;
                }
            }
            public string BorderBottomStyle
            {
                get { return (string)props["borderBottomStyle"]; }
                set
                {
                    if (props["borderBottomStyle"] == null) someCouner++;
                    props["borderBottomStyle"] = value;
                }
            }
            public string BorderBottomWidth
            {
                get { return (string)props["borderBottomWidth"]; }
                set
                {
                    if (props["borderBottomWidth"] == null) someCouner++;
                    props["borderBottomWidth"] = value;
                }
            }
            public string BorderCollapse
            {
                get { return (string)props["borderCollapse"]; }
                set
                {
                    if (props["borderCollapse"] == null) someCouner++;
                    props["borderCollapse"] = value;
                }
            }
            public string BorderColor
            {
                get { return (string)props["borderColor"]; }
                set
                {
                    if (props["borderColor"] == null) someCouner++;
                    props["borderColor"] = value;
                }
            }
            public string BorderLeft
            {
                get { return (string)props["borderLeft"]; }
                set
                {
                    if (props["borderLeft"] == null) someCouner++;
                    props["borderLeft"] = value;
                }
            }
            public string BorderLeftColor
            {
                get { return (string)props["borderLeftColor"]; }
                set
                {
                    if (props["borderLeftColor"] == null) someCouner++;
                    props["borderLeftColor"] = value;
                }
            }
            public string BorderLeftStyle
            {
                get { return (string)props["borderLeftStyle"]; }
                set
                {
                    if (props["borderLeftStyle"] == null) someCouner++;
                    props["borderLeftStyle"] = value;
                }
            }
            public string BorderLeftWidth
            {
                get { return (string)props["borderLeftWidth"]; }
                set
                {
                    if (props["borderLeftWidth"] == null) someCouner++;
                    props["borderLeftWidth"] = value;
                }
            }
            public string BorderRight
            {
                get { return (string)props["borderRight"]; }
                set
                {
                    if (props["borderRight"] == null) someCouner++;
                    props["borderRight"] = value;
                }
            }
            public string BorderRightColor
            {
                get { return (string)props["borderRightColor"]; }
                set
                {
                    if (props["borderRightColor"] == null) someCouner++;
                    props["borderRightColor"] = value;
                }
            }
            public string BorderRightStyle
            {
                get { return (string)props["borderRightStyle"]; }
                set
                {
                    if (props["borderRightStyle"] == null) someCouner++;
                    props["borderRightStyle"] = value;
                }
            }
            public string BorderRightWidth
            {
                get { return (string)props["borderRightWidth"]; }
                set
                {
                    if (props["borderRightWidth"] == null) someCouner++;
                    props["borderRightWidth"] = value;
                }
            }
            public string BorderStyle
            {
                get { return (string)props["borderStyle"]; }
                set
                {
                    if (props["borderStyle"] == null) someCouner++;
                    props["borderStyle"] = value;
                }
            }
            public string BorderTop
            {
                get { return (string)props["borderTop"]; }
                set
                {
                    if (props["borderTop"] == null) someCouner++;
                    props["borderTop"] = value;
                }
            }
            public string BorderTopColor
            {
                get { return (string)props["borderTopColor"]; }
                set
                {
                    if (props["borderTopColor"] == null) someCouner++;
                    props["borderTopColor"] = value;
                }
            }
            public string BorderTopStyle
            {
                get { return (string)props["borderTopStyle"]; }
                set
                {
                    if (props["borderTopStyle"] == null) someCouner++;
                    props["borderTopStyle"] = value;
                }
            }
            public string BorderTopWidth
            {
                get { return (string)props["borderTopWidth"]; }
                set
                {
                    if (props["borderTopWidth"] == null) someCouner++;
                    props["borderTopWidth"] = value;
                }
            }
            public string BorderWidth
            {
                get { return (string)props["borderWidth"]; }
                set
                {
                    if (props["borderWidth"] == null) someCouner++;
                    props["borderWidth"] = value;
                }
            }
            public string Bottom
            {
                get { return (string)props["bottom"]; }
                set
                {
                    if (props["bottom"] == null) someCouner++;
                    props["bottom"] = value;
                }
            }
            public string Clear
            {
                get { return (string)props["clear"]; }
                set
                {
                    if (props["clear"] == null) someCouner++;
                    props["clear"] = value;
                }
            }
            public string Clip
            {
                get { return (string)props["clip"]; }
                set
                {
                    if (props["clip"] == null) someCouner++;
                    props["clip"] = value;
                }
            }
            public string Color
            {
                get { return (string)props["color"]; }
                set
                {
                    if (props["color"] == null) someCouner++;
                    props["color"] = value;
                }
            }
            public string CssFloat
            {
                get { return (string)props["CssFloat"]; }
                set
                {
                    if (props["CssFloat"] == null) someCouner++;
                    props["CssFloat"] = value;
                }
            }
            public string CssText
            {
                get { return (string)props["cssText"]; }
                set
                {
                    if (props["cssText"] == null) someCouner++;
                    props["cssText"] = value;
                }
            }
            public string Cursor
            {
                get { return (string)props["cursor"]; }
                set
                {
                    if (props["cursor"] == null) someCouner++;
                    props["crsor"] = value;
                }
            }
            public string Direction
            {
                get { return (string)props["direction"]; }
                set
                {
                    if (props["direction"] == null) someCouner++;
                    props["direction"] = value;
                }
            }
            public string Display
            {
                get { return (string)props["display"]; }
                set
                {
                    if (props["display"] == null) someCouner++;
                    props["display"] = value;
                }
            }
            public string Filter
            {
                get { return (string)props["filter"]; }
                set
                {
                    if (props["filter"] == null) someCouner++;
                    props["filter"] = value;
                }
            }
            public string Font
            {
                get { return (string)props["font"]; }
                set
                {
                    if (props["font"] == null) someCouner++;
                    props["font"] = value;
                }
            }
            public string FontFamily
            {
                get { return (string)props["fontFamily"]; }
                set
                {
                    if (props["fontFamily"] == null) someCouner++;
                    props["fontFamily"] = value;
                }
            }
            public string FontSize
            {
                get { return (string)props["fontSize"]; }
                set
                {
                    if (props["fontSize"] == null) someCouner++;
                    props["fontSize"] = value;
                }
            }
            public string FontStyle
            {
                get { return (string)props["fontStyle"]; }
                set
                {
                    if (props["fontStyle"] == null) someCouner++;
                    props["fontStyle"] = value;
                }
            }
            public string FontVariant
            {
                get { return (string)props["fontVariant"]; }
                set
                {
                    if (props["fontVariant"] == null) someCouner++;
                    props["fontVariant"] = value;
                }
            }
            public string FontWeight
            {
                get { return (string)props["fontWeight"]; }
                set
                {
                    if (props["fontWeight"] == null) someCouner++;
                    props["fontWeight"] = value;
                }
            }
            public string Height
            {
                get { return (string)props["height"]; }
                set
                {
                    if (props["height"] == null) someCouner++;
                    props["height"] = value;
                }
            }
            public string Left
            {
                get { return (string)props["left"]; }
                set
                {
                    if (props["left"] == null) someCouner++;
                    props["left"] = value;
                }
            }
            public string LetterSpacing
            {
                get { return (string)props["letterSpacing"]; }
                set
                {
                    if (props["letterSpacing"] == null) someCouner++;
                    props["letterSpacing"] = value;
                }
            }
            public string LineHeight
            {
                get { return (string)props["lineHeight"]; }
                set
                {
                    if (props["lineHeight"] == null) someCouner++;
                    props["lineHeight"] = value;
                }
            }
            public string ListStyle
            {
                get { return (string)props["listStyle"]; }
                set
                {
                    if (props["listStyle"] == null) someCouner++;
                    props["listStyle"] = value;
                }
            }
            public string ListStyleImage
            {
                get { return (string)props["listStyleImage"]; }
                set
                {
                    if (props["listStyleImage"] == null) someCouner++;
                    props["listStyleImage"] = value;
                }
            }
            public string ListStylePosition
            {
                get { return (string)props["listStylePosition"]; }
                set
                {
                    if (props["listStylePosition"] == null) someCouner++;
                    props["listStylePosition"] = value;
                }
            }
            public string ListStyleType
            {
                get { return (string)props["listStyleType"]; }
                set
                {
                    if (props["listStyleType"] == null) someCouner++;
                    props["listStyleType"] = value;
                }
            }
            public string Margin
            {
                get { return (string)props["margin"]; }
                set
                {
                    if (props["margin"] == null) someCouner++;
                    props["margin"] = value;
                }
            }
            public string MarginBottom
            {
                get { return (string)props["marginBottom"]; }
                set
                {
                    if (props["marginBottom"] == null) someCouner++;
                    props["marginBottom"] = value;
                }
            }
            public string MarginLeft
            {
                get { return (string)props["marginLeft"]; }
                set
                {
                    if (props["marginLeft"] == null) someCouner++;
                    props["marginLeft"] = value;
                }
            }
            public string MarginRight
            {
                get { return (string)props["marginRight"]; }
                set
                {
                    if (props["marginRight"] == null) someCouner++;
                    props["marginRight"] = value;
                }
            }
            public string MarginTop
            {
                get { return (string)props["marginTop"]; }
                set
                {
                    if (props["marginTop"] == null) someCouner++;
                    props["marginTop"] = value;
                }
            }
            public string MaxHeight
            {
                get { return (string)props["maxHeight"]; }
                set
                {
                    if (props["maxHeight"] == null) someCouner++;
                    props["maxHeight"] = value;
                }
            }
            public string MaxWidth
            {
                get { return (string)props["maxWidth"]; }
                set
                {
                    if (props["maxWidth"] == null) someCouner++;
                    props["maxWidth"] = value;
                }
            }
            public string MinHeight
            {
                get { return (string)props["minHeight"]; }
                set
                {
                    if (props["minHeight"] == null) someCouner++;
                    props["minHeight"] = value;
                }
            }
            public string MinWidth
            {
                get { return (string)props["minWidth"]; }
                set
                {
                    if (props["minWidth"] == null) someCouner++;
                    props["minWidth"] = value;
                }
            }
            public string MsInterpolationMode
            {
                get { return (string)props["msInterpolationMode"]; }
                set
                {
                    if (props["msInterpolationMode"] == null) someCouner++;
                    props["msInterpolationMode"] = value;
                }
            }
            public string Opacity
            {
                get { return (string)props["opacity"]; }
                set
                {
                    if (props["opacity"] == null) someCouner++;
                    props["opacity"] = value;
                }
            }
            public string Overflow
            {
                get { return (string)props["overflow"]; }
                set
                {
                    if (props["overflow"] == null) someCouner++;
                    props["overflow"] = value;
                }
            }
            public string OverflowX
            {
                get { return (string)props["overflowX"]; }
                set
                {
                    if (props["overflowX"] == null) someCouner++;
                    props["overflowX"] = value;
                }
            }
            public string OverflowY
            {
                get { return (string)props["overflowY"]; }
                set
                {
                    if (props["overflowY"] == null) someCouner++;
                    props["overflowY"] = value;
                }
            }
            public string PaddingBottom
            {
                get { return (string)props["paddingBottom"]; }
                set
                {
                    if (props["paddingBottom"] == null) someCouner++;
                    props["paddingBottom"] = value;
                }
            }
            public string PaddingLeft
            {
                get { return (string)props["paddingLeft"]; }
                set
                {
                    if (props["paddingLeft"] == null) someCouner++;
                    props["paddingLeft"] = value;
                }
            }
            public string PaddingRight
            {
                get { return (string)props["paddingRight"]; }
                set
                {
                    if (props["paddingRight"] == null) someCouner++;
                    props["paddingRight"] = value;
                }
            }
            public string PaddingTop
            {
                get { return (string)props["paddingTop"]; }
                set
                {
                    if (props["paddingTop"] == null) someCouner++;
                    props["paddingTop"] = value;
                }
            }
            public string PageBreakAfter
            {
                get { return (string)props["pageBreakAfter"]; }
                set
                {
                    if (props["pageBreakAfter"] == null) someCouner++;
                    props["pageBreakAfter"] = value;
                }
            }
            public string PageBreakBefore
            {
                get { return (string)props["pageBreakBefore"]; }
                set
                {
                    if (props["pageBreakBefore"] == null) someCouner++;
                    props["pageBreakBefore"] = value;
                }
            }
            public int PixelBottom
            {
                get { return (int)props["pixelBottom"]; }
                set
                {
                    if (props["pixelBottom"] == null) someCouner++;
                    props["pixelBottom"] = value;
                }
            }
            public int PixelHeight
            {
                get { return (int)props["pixelHeight"]; }
                set
                {
                    if (props["pixelHeight"] == null) someCouner++;
                    props["pixelHeight"] = value;
                }
            }
            public int PixelLeft
            {
                get { return (int)props["pixelLeft"]; }
                set
                {
                    if (props["pixelLeft"] == null) someCouner++;
                    props["pixelLeft"] = value;
                }
            }
            public int PixelRight
            {
                get { return (int)props["pixelRight"]; }
                set
                {
                    if (props["pixelRight"] == null) someCouner++;
                    props["pixelRight"] = value;
                }
            }
            public int PixelTop
            {
                get { return (int)props["pixelTop"]; }
                set
                {
                    if (props["pixelTop"] == null) someCouner++;
                    props["pixelTop"] = value;
                }
            }
            public int PixelWidth
            {
                get { return (int)props["pixelWidth"]; }
                set
                {
                    if (props["pixelWidth"] == null) someCouner++;
                    props["pixelWidth"] = value;
                }
            }
            public int PosBottom
            {
                get { return (int)props["posBottom"]; }
                set
                {
                    if (props["posBottom"] == null) someCouner++;
                    props["posBottom"] = value;
                }
            }
            public int PosHeight
            {
                get { return (int)props["posHeight"]; }
                set
                {
                    if (props["posHeight"] == null) someCouner++;
                    props["posHeight"] = value;
                }
            }
            public string Position
            {
                get { return (string)props["position"]; }
                set
                {
                    if (props["position"] == null) someCouner++;
                    props["position"] = value;
                }
            }
            public int PosLeft
            {
                get { return (int)props["posLeft"]; }
                set
                {
                    if (props["posLeft"] == null) someCouner++;
                    props["posLeft"] = value;
                }
            }
            public int PosRight
            {
                get { return (int)props["posRight"]; }
                set
                {
                    if (props["posRight"] == null) someCouner++;
                    props["posRight"] = value;
                }
            }
            public int PosTop
            {
                get { return (int)props["posTop"]; }
                set
                {
                    if (props["posTop"] == null) someCouner++;
                    props["posTop"] = value;
                }
            }
            public int PosWidth
            {
                get { return (int)props["posWidth"]; }
                set
                {
                    if (props["posWidth"] == null) someCouner++;
                    props["posWidth"] = value;
                }
            }
            public string Right
            {
                get { return (string)props["right"]; }
                set
                {
                    if (props["right"] == null) someCouner++;
                    props["right"] = value;
                }
            }
            public string StyleFloat
            {
                get { return (string)props["styleFloat"]; }
                set
                {
                    if (props["styleFloat"] == null) someCouner++;
                    props["styleFloat"] = value;
                }
            }
            public string TableLayout
            {
                get { return (string)props["tableLayout"]; }
                set
                {
                    if (props["tableLayout"] == null) someCouner++;
                    props["tableLayout"] = value;
                }
            }
            public string TextAlign
            {
                get { return (string)props["textAlign"]; }
                set
                {
                    if (props["textAlign"] == null) someCouner++;
                    props["textAlign"] = value;
                }
            }
            public string TextDecoration
            {
                get { return (string)props["textDecoration"]; }
                set
                {
                    if (props["textDecoration"] == null) someCouner++;
                    props["textDecoration"] = value;
                }
            }
            public string TextDecorationBlink
            {
                get { return (string)props["textDecorationBlink"]; }
                set
                {
                    if (props["textDecorationBlink"] == null) someCouner++;
                    props["textDecorationBlink"] = value;
                }
            }
            public string TextDecorationLineThrough
            {
                get { return (string)props["textDecorationLineThrough"]; }
                set
                {
                    if (props["textDecorationLineThrough"] == null) someCouner++;
                    props["textDecorationLineThrough"] = value;
                }
            }
            public string TextDecorationNone
            {
                get { return (string)props["textDecorationNone"]; }
                set
                {
                    if (props["textDecorationNone"] == null) someCouner++;
                    props["textDecorationNone"] = value;
                }
            }
            public string TextDecorationOverline
            {
                get { return (string)props["textDecorationOverline"]; }
                set
                {
                    if (props["textDecorationOverline"] == null) someCouner++;
                    props["textDecorationOverline"] = value;
                }
            }
            public string TextDecorationUnderline
            {
                get { return (string)props["textDecorationUnderline"]; }
                set
                {
                    if (props["textDecorationUnderline"] == null) someCouner++;
                    props["textDecorationUnderline"] = value;
                }
            }
            public string TextIndent
            {
                get { return (string)props["textIndent"]; }
                set
                {
                    if (props["textIndent"] == null) someCouner++;
                    props["textIndent"] = value;
                }
            }
            public string TextJustify
            {
                get { return (string)props["textJustify"]; }
                set
                {
                    if (props["textJustify"] == null) someCouner++;
                    props["textJustify"] = value;
                }
            }
            public string TextOverflow
            {
                get { return (string)props["textOverflow"]; }
                set
                {
                    if (props["textOverflow"] == null) someCouner++;
                    props["textOverflow"] = value;
                }
            }
            public string TextTransform
            {
                get { return (string)props["textTransform"]; }
                set
                {
                    if (props["textTransform"] == null) someCouner++;
                    props["textTransform"] = value;
                }
            }
            public string Top
            {
                get { return (string)props["top"]; }
                set
                {
                    if (props["top"] == null) someCouner++;
                    props["top"] = value;
                }
            }
            public string VerticalAlign
            {
                get { return (string)props["verticalAlign"]; }
                set
                {
                    if (props["verticalAlign"] == null) someCouner++;
                    props["verticalAlign"] = value;
                }
            }
            public string Visibility
            {
                get { return (string)props["visibility"]; }
                set
                {
                    if (props["visibility"] == null) someCouner++;
                    props["visibility"] = value;
                }
            }
            public string WhiteSpace
            {
                get { return (string)props["whiteSpace"]; }
                set
                {
                    if (props["whiteSpace"] == null) someCouner++;
                    props["whiteSpace"] = value;
                }
            }
            public string Width
            {
                get { return (string)props["width"]; }
                set
                {
                    if (props["width"] == null) someCouner++;
                    props["width"] = value;
                }
            }
            public string WordSpacing
            {
                get { return (string)props["wordSpacing"]; }
                set
                {
                    if (props["wordSpacing"] == null) someCouner++;
                    props["wordSpacing"] = value;
                }
            }
            public string WordWrap
            {
                get { return (string)props["wordWrap"]; }
                set
                {
                    if (props["wordWrap"] == null) someCouner++;
                    props["wordWrap"] = value;
                }
            }
            public string WritingMode
            {
                get { return (string)props["writingMode"]; }
                set
                {
                    if (props["writingMode"] == null) someCouner++;
                    props["writingMode"] = value;
                }
            }
            public short ZIndex
            {
                get { return (short)props["zIndex"]; }
                set
                {
                    if (props["zIndex"] == null) someCouner++;
                    props["zIndex"] = value;
                }
            }
            public string Zoom
            {
                get { return (string)props["zoom"]; }
                set
                {
                    if (props["zoom"] == null) someCouner++;
                    props["zoom"] = value;
                }
            }

            public int someCouner = 0;
            public string Padding;
     
            public void SetPadding(string value)
            {
                var fm = value.Split(' ');
                for (int i = 0; i < fm.Length; i++)
                {
                    switch (i)
                    {
                        case 0:
                            PaddingLeft = fm[i];
                            break;
                        case 1:
                            PaddingTop = fm[i];
                            break;
                        case 2:
                            PaddingRight = fm[i];
                            break;
                        case 3:
                            PaddingRight = fm[i];
                            break;
                    }
                }
                Padding = value;
            }
            public JsDictionary<string, object> props = new JsDictionary<string, object>();
       
        }
    */
}