using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
namespace global
{
    public class InternalStyle
    {
        private JsDictionary<string, object> keys = new JsDictionary<string, object>();
        private InternalStyle lastStyle;
        private bool myAccelerator;
        private string myBackground;
        private string myBackgroundAttachment;
        private string myBackgroundColor;
        private string myBackgroundImage;
        private string myBackgroundPosition;
        private string myBackgroundPositionX;
        private string myBackgroundPositionY;
        private string myBackgroundRepeat;
        private string myBorder;
        private string myBorderBottom;
        private string myBorderBottomColor;
        private string myBorderBottomStyle;
        private string myBorderBottomWidth;
        private string myBorderCollapse;
        private string myBorderColor;
        private string myBorderLeft;
        private string myBorderLeftColor;
        private string myBorderLeftStyle;
        private string myBorderLeftWidth;
        private string myBorderRadius;
        private string myBorderRight;
        private string myBorderRightColor;
        private string myBorderRightStyle;
        private string myBorderRightWidth;
        private string myBorderStyle;
        private string myBorderTop;
        private string myBorderTopColor;
        private string myBorderTopStyle;
        private string myBorderTopWidth;
        private string myBorderWidth;
        private string myBottom;
        private string myBoxShadow;
        private string myClear;
        private string myClip;
        private string myColor;
        private string myCssFloat;
        private string myCssText;
        private string myCursor;
        private string myDirection;
        private string myDisplay;
        private string myFilter;
        private string myFont;
        private string myFontFamily;
        private string myFontSize;
        private string myFontStyle;
        private string myFontVariant;
        private string myFontWeight;
        private string myHeight;
        private string myLeft;
        private string myLetterSpacing;
        private string myLineHeight;
        private string myListStyle;
        private string myListStyleImage;
        private string myListStylePosition;
        private string myListStyleType;
        private string myMargin;
        private string myMarginBottom;
        private string myMarginLeft;
        private string myMarginRight;
        private string myMarginTop;
        private string myMaxHeight;
        private string myMaxWidth;
        private string myMinHeight;
        private string myMinWidth;
        private string myMsInterpolationMode;
        private string myOpacity;
        private string myOverflow;
        private string myOverflowX;
        private string myOverflowY;
        private string myPadding;
        private string myPaddingBottom;
        private string myPaddingLeft;
        private string myPaddingRight;
        private string myPaddingTop;
        private string myPageBreakAfter;
        private string myPageBreakBefore;
        private int myPixelBottom;
        private int myPixelHeight;
        private int myPixelLeft;
        private int myPixelRight;
        private int myPixelTop;
        private int myPixelWidth;
        private int myPosBottom;
        private int myPosHeight;
        private int myPosLeft;
        private int myPosRight;
        private int myPosTop;
        private int myPosWidth;
        private string myPosition;
        private string myRight;
        private string myStyleFloat;
        private string myTableLayout;
        private string myTextAlign;
        private string myTextDecoration;
        private string myTextDecorationBlink;
        private string myTextDecorationLineThrough;
        private string myTextDecorationNone;
        private string myTextDecorationOverline;
        private string myTextDecorationUnderline;
        private string myTextIndent;
        private string myTextJustify;
        private string myTextOverflow;
        private string myTextTransform;
        private string myTop;
        private string myTransform;
        private string myVerticalAlign;
        private string myVisibility;
        private string myWhiteSpace;
        private string myWidth;
        private string myWordSpacing;
        private string myWordWrap;
        private string myWritingMode;
        private short myZIndex;
        private string myZoom;
        [IntrinsicProperty]
        private InternalStyle Parent { get; set; }
        [IntrinsicProperty]
        private List<InternalStyle> Children { get; set; }
        public bool Accelerator
        {
            get { return myAccelerator; }
            set
            {
                myAccelerator = value;
                setValue("accelerator", value);
            }
        }
        public string Background
        {
            get { return myBackground; }
            set
            {
                myBackground = value;
                setValue("background", value);
            }
        }
        public string BackgroundAttachment
        {
            get { return myBackgroundAttachment; }
            set
            {
                myBackgroundAttachment = value;
                setValue("background-attachment", value);
            }
        }
        public string BoxShadow
        {
            get { return myBoxShadow; }
            set
            {
                myBoxShadow = value;
                setValue("box-shadow", value);
            }
        }
        public string BorderRadius
        {
            get { return myBorderRadius; }
            set
            {
                myBorderRadius = value;
                setValue("border-radius", value);
            }
        }
        public string Transform
        {
            get { return myTransform; }
            set
            {
                myTransform = value;
                setValue("transform", value);
            }
        }
        public string BackgroundColor
        {
            get { return myBackgroundColor; }
            set
            {
                myBackgroundColor = value;
                setValue("background-color", value);
            }
        }
        public string BackgroundImage
        {
            get { return myBackgroundImage; }
            set
            {
                myBackgroundImage = value;
                setValue("background-image", value);
            }
        }
        public string BackgroundPosition
        {
            get { return myBackgroundPosition; }
            set
            {
                myBackgroundPosition = value;
                setValue("background-position", value);
            }
        }
        public string BackgroundPositionX
        {
            get { return myBackgroundPositionX; }
            set
            {
                myBackgroundPositionX = value;
                setValue("background-position-x", value);
            }
        }
        public string BackgroundPositionY
        {
            get { return myBackgroundPositionY; }
            set
            {
                myBackgroundPositionY = value;
                setValue("background-position-y", value);
            }
        }
        public string BackgroundRepeat
        {
            get { return myBackgroundRepeat; }
            set
            {
                myBackgroundRepeat = value;
                setValue("background-repeat", value);
            }
        }
        public string Border
        {
            get { return myBorder; }
            set
            {
                myBorder = value;
                setValue("border", value);
            }
        }
        public string BorderBottom
        {
            get { return myBorderBottom; }
            set
            {
                myBorderBottom = value;
                setValue("border-bottom", value);
            }
        }
        public string BorderBottomColor
        {
            get { return myBorderBottomColor; }
            set
            {
                myBorderBottomColor = value;
                setValue("border-bottom-color", value);
            }
        }
        public string BorderBottomStyle
        {
            get { return myBorderBottomStyle; }
            set
            {
                myBorderBottomStyle = value;
                setValue("border-bottom-style", value);
            }
        }
        public string BorderBottomWidth
        {
            get { return myBorderBottomWidth; }
            set
            {
                myBorderBottomWidth = value;
                setValue("border-bottom-width", value);
            }
        }
        public string BorderCollapse
        {
            get { return myBorderCollapse; }
            set
            {
                myBorderCollapse = value;
                setValue("border-collapse", value);
            }
        }
        public string BorderColor
        {
            get { return myBorderColor; }
            set
            {
                myBorderColor = value;
                setValue("border-color", value);
            }
        }
        public string BorderLeft
        {
            get { return myBorderLeft; }
            set
            {
                myBorderLeft = value;
                setValue("border-left", value);
            }
        }
        public string BorderLeftColor
        {
            get { return myBorderLeftColor; }
            set
            {
                myBorderLeftColor = value;
                setValue("border-left-color", value);
            }
        }
        public string BorderLeftStyle
        {
            get { return myBorderLeftStyle; }
            set
            {
                myBorderLeftStyle = value;
                setValue("border-left-style", value);
            }
        }
        public string BorderLeftWidth
        {
            get { return myBorderLeftWidth; }
            set
            {
                myBorderLeftWidth = value;
                setValue("border-left-width", value);
            }
        }
        public string BorderRight
        {
            get { return myBorderRight; }
            set
            {
                myBorderRight = value;
                setValue("border-right", value);
            }
        }
        public string BorderRightColor
        {
            get { return myBorderRightColor; }
            set
            {
                myBorderRightColor = value;
                setValue("border-right-color", value);
            }
        }
        public string BorderRightStyle
        {
            get { return myBorderRightStyle; }
            set
            {
                myBorderRightStyle = value;
                setValue("border-right-style", value);
            }
        }
        public string BorderRightWidth
        {
            get { return myBorderRightWidth; }
            set
            {
                myBorderRightWidth = value;
                setValue("border-right-width", value);
            }
        }
        public string BorderStyle
        {
            get { return myBorderStyle; }
            set
            {
                myBorderStyle = value;
                setValue("border-style", value);
            }
        }
        public string BorderTop
        {
            get { return myBorderTop; }
            set
            {
                myBorderTop = value;
                setValue("border-top", value);
            }
        }
        public string BorderTopColor
        {
            get { return myBorderTopColor; }
            set
            {
                myBorderTopColor = value;
                setValue("border-top-color", value);
            }
        }
        public string BorderTopStyle
        {
            get { return myBorderTopStyle; }
            set
            {
                myBorderTopStyle = value;
                setValue("border-top-style", value);
            }
        }
        public string BorderTopWidth
        {
            get { return myBorderTopWidth; }
            set
            {
                myBorderTopWidth = value;
                setValue("border-top-width", value);
            }
        }
        public string BorderWidth
        {
            get { return myBorderWidth; }
            set
            {
                myBorderWidth = value;
                setValue("border-width", value);
            }
        }
        public string Bottom
        {
            get { return myBottom; }
            set
            {
                myBottom = value;
                setValue("bottom", value);
            }
        }
        public string Clear
        {
            get { return myClear; }
            set
            {
                myClear = value;
                setValue("clear", value);
            }
        }
        public string Clip
        {
            get { return myClip; }
            set
            {
                myClip = value;
                setValue("clip", value);
            }
        }
        public string Color
        {
            get { return myColor; }
            set
            {
                myColor = value;
                setValue("color", value);
            }
        }
        public string CssFloat
        {
            get { return myCssFloat; }
            set
            {
                myCssFloat = value;
                setValue("css-float", value);
            }
        }
        public string CssText
        {
            get { return myCssText; }
            set
            {
                myCssText = value;
                setValue("css-text", value);
            }
        }
        public string Cursor
        {
            get { return myCursor; }
            set
            {
                myCursor = value;
                setValue("cursor", value);
            }
        }
        public string Direction
        {
            get { return myDirection; }
            set
            {
                myDirection = value;
                setValue("direction", value);
            }
        }
        public string Display
        {
            get { return myDisplay; }
            set
            {
                myDisplay = value;
                setValue("display", value);
            }
        }
        public string Filter
        {
            get { return myFilter; }
            set
            {
                myFilter = value;
                setValue("filter", value);
            }
        }
        public string Font
        {
            get { return myFont; }
            set
            {
                myFont = value;
                setValue("font", value);
            }
        }
        public string FontFamily
        {
            get { return myFontFamily; }
            set
            {
                myFontFamily = value;
                setValue("font-family", value);
            }
        }
        public string FontSize
        {
            get { return myFontSize; }
            set
            {
                myFontSize = value;
                setValue("font-size", value);
            }
        }
        public string FontStyle
        {
            get { return myFontStyle; }
            set
            {
                myFontStyle = value;
                setValue("font-style", value);
            }
        }
        public string FontVariant
        {
            get { return myFontVariant; }
            set
            {
                myFontVariant = value;
                setValue("font-variant", value);
            }
        }
        public string FontWeight
        {
            get { return myFontWeight; }
            set
            {
                myFontWeight = value;
                setValue("font-weight", value);
            }
        }
        public string Height
        {
            get { return myHeight; }
            set
            {
                myHeight = value;
                setValue("height", value);
            }
        }
        public string Left
        {
            get { return myLeft; }
            set
            {
                myLeft = value;
                setValue("left", value);
            }
        }
        public string LetterSpacing
        {
            get { return myLetterSpacing; }
            set
            {
                myLetterSpacing = value;
                setValue("letter-spacing", value);
            }
        }
        public string LineHeight
        {
            get { return myLineHeight; }
            set
            {
                myLineHeight = value;
                setValue("line-height", value);
            }
        }
        public string ListStyle
        {
            get { return myListStyle; }
            set
            {
                myListStyle = value;
                setValue("list-style", value);
            }
        }
        public string ListStyleImage
        {
            get { return myListStyleImage; }
            set
            {
                myListStyleImage = value;
                setValue("list-style-image", value);
            }
        }
        public string ListStylePosition
        {
            get { return myListStylePosition; }
            set
            {
                myListStylePosition = value;
                setValue("list-style-position", value);
            }
        }
        public string ListStyleType
        {
            get { return myListStyleType; }
            set
            {
                myListStyleType = value;
                setValue("list-style-type", value);
            }
        }
        public string Margin
        {
            get { return myMargin; }
            set
            {
                myMargin = value;
                setValue("margin", value);
            }
        }
        public string MarginBottom
        {
            get { return myMarginBottom; }
            set
            {
                myMarginBottom = value;
                setValue("margin-bottom", value);
            }
        }
        public string MarginLeft
        {
            get { return myMarginLeft; }
            set
            {
                myMarginLeft = value;
                setValue("margin-left", value);
            }
        }
        public string MarginRight
        {
            get { return myMarginRight; }
            set
            {
                myMarginRight = value;
                setValue("margin-right", value);
            }
        }
        public string MarginTop
        {
            get { return myMarginTop; }
            set
            {
                myMarginTop = value;
                setValue("margin-top", value);
            }
        }
        public string MaxHeight
        {
            get { return myMaxHeight; }
            set
            {
                myMaxHeight = value;
                setValue("max-height", value);
            }
        }
        public string MaxWidth
        {
            get { return myMaxWidth; }
            set
            {
                myMaxWidth = value;
                setValue("max-width", value);
            }
        }
        public string MinHeight
        {
            get { return myMinHeight; }
            set
            {
                myMinHeight = value;
                setValue("min-height", value);
            }
        }
        public string MinWidth
        {
            get { return myMinWidth; }
            set
            {
                myMinWidth = value;
                setValue("min-width", value);
            }
        }
        public string MsInterpolationMode
        {
            get { return myMsInterpolationMode; }
            set
            {
                myMsInterpolationMode = value;
                setValue("ms-interpolation-mode", value);
            }
        }
        public string Opacity
        {
            get { return myOpacity; }
            set
            {
                myOpacity = value;
                setValue("opacity", value);
            }
        }
        public string Overflow
        {
            get { return myOverflow; }
            set
            {
                myOverflow = value;
                setValue("overflow", value);
            }
        }
        public string OverflowX
        {
            get { return myOverflowX; }
            set
            {
                myOverflowX = value;
                setValue("overflow-x", value);
            }
        }
        public string OverflowY
        {
            get { return myOverflowY; }
            set
            {
                myOverflowY = value;
                setValue("overflow-y", value);
            }
        }
        public string Padding
        {
            get { return myPadding; }
            set
            {
                myPadding = value;
                setValue("padding", value);
            }
        }
        public string PaddingBottom
        {
            get { return myPaddingBottom; }
            set
            {
                myPaddingBottom = value;
                setValue("padding-bottom", value);
            }
        }
        public string PaddingLeft
        {
            get { return myPaddingLeft; }
            set
            {
                myPaddingLeft = value;
                setValue("padding-left", value);
            }
        }
        public string PaddingRight
        {
            get { return myPaddingRight; }
            set
            {
                myPaddingRight = value;
                setValue("padding-right", value);
            }
        }
        public string PaddingTop
        {
            get { return myPaddingTop; }
            set
            {
                myPaddingTop = value;
                setValue("padding-top", value);
            }
        }
        public string PageBreakAfter
        {
            get { return myPageBreakAfter; }
            set
            {
                myPageBreakAfter = value;
                setValue("page-break-after", value);
            }
        }
        public string PageBreakBefore
        {
            get { return myPageBreakBefore; }
            set
            {
                myPageBreakBefore = value;
                setValue("page-break-before", value);
            }
        }
        public int PixelBottom
        {
            get { return myPixelBottom; }
            set
            {
                myPixelBottom = value;
                setValue("pixel-bottom", value);
            }
        }
        public int PixelHeight
        {
            get { return myPixelHeight; }
            set
            {
                myPixelHeight = value;
                setValue("pixel-height", value);
            }
        }
        public int PixelLeft
        {
            get { return myPixelLeft; }
            set
            {
                myPixelLeft = value;
                setValue("pixel-left", value);
            }
        }
        public int PixelRight
        {
            get { return myPixelRight; }
            set
            {
                myPixelRight = value;
                setValue("pixel-right", value);
            }
        }
        public int PixelTop
        {
            get { return myPixelTop; }
            set
            {
                myPixelTop = value;
                setValue("pixel-top", value);
            }
        }
        public int PixelWidth
        {
            get { return myPixelWidth; }
            set
            {
                myPixelWidth = value;
                setValue("pixel-width", value);
            }
        }
        public int PosBottom
        {
            get { return myPosBottom; }
            set
            {
                myPosBottom = value;
                setValue("pos-bottom", value);
            }
        }
        public int PosHeight
        {
            get { return myPosHeight; }
            set
            {
                myPosHeight = value;
                setValue("pos-height", value);
            }
        }
        public string Position
        {
            get { return myPosition; }
            set
            {
                myPosition = value;
                setValue("position", value);
            }
        }
        public int PosLeft
        {
            get { return myPosLeft; }
            set
            {
                myPosLeft = value;
                setValue("pos-left", value);
            }
        }
        public int PosRight
        {
            get { return myPosRight; }
            set
            {
                myPosRight = value;
                setValue("pos-pight", value);
            }
        }
        public int PosTop
        {
            get { return myPosTop; }
            set
            {
                myPosTop = value;
                setValue("pos-top", value);
            }
        }
        public int PosWidth
        {
            get { return myPosWidth; }
            set
            {
                myPosWidth = value;
                setValue("pos-width", value);
            }
        }
        public string Right
        {
            get { return myRight; }
            set
            {
                myRight = value;
                setValue("right", value);
            }
        }
        public string StyleFloat
        {
            get { return myStyleFloat; }
            set
            {
                myStyleFloat = value;
                setValue("float", value);
            }
        }
        public string TableLayout
        {
            get { return myTableLayout; }
            set
            {
                myTableLayout = value;
                setValue("table-layout", value);
            }
        }
        public string TextAlign
        {
            get { return myTextAlign; }
            set
            {
                myTextAlign = value;
                setValue("text-align", value);
            }
        }
        public string TextDecoration
        {
            get { return myTextDecoration; }
            set
            {
                myTextDecoration = value;
                setValue("text-decoration", value);
            }
        }
        public string TextDecorationBlink
        {
            get { return myTextDecorationBlink; }
            set
            {
                myTextDecorationBlink = value;
                setValue("text-decoration-blink", value);
            }
        }
        public string TextDecorationLineThrough
        {
            get { return myTextDecorationLineThrough; }
            set
            {
                myTextDecorationLineThrough = value;
                setValue("text-decoration-line-through", value);
            }
        }
        public string TextDecorationNone
        {
            get { return myTextDecorationNone; }
            set
            {
                myTextDecorationNone = value;
                setValue("text-decoration-none", value);
            }
        }
        public string TextDecorationOverline
        {
            get { return myTextDecorationOverline; }
            set
            {
                myTextDecorationOverline = value;
                setValue("text-decoration-overline", value);
            }
        }
        public string TextDecorationUnderline
        {
            get { return myTextDecorationUnderline; }
            set
            {
                myTextDecorationUnderline = value;
                setValue("text-decoration-underline", value);
            }
        }
        public string TextIndent
        {
            get { return myTextIndent; }
            set
            {
                myTextIndent = value;
                setValue("text-indent", value);
            }
        }
        public string TextJustify
        {
            get { return myTextJustify; }
            set
            {
                myTextJustify = value;
                setValue("text-justify", value);
            }
        }
        public string TextOverflow
        {
            get { return myTextOverflow; }
            set
            {
                myTextOverflow = value;
                setValue("textOverflow", value);
            }
        }
        public string TextTransform
        {
            get { return myTextTransform; }
            set
            {
                myTextTransform = value;
                setValue("text-transform", value);
            }
        }
        public string Top
        {
            get { return myTop; }
            set
            {
                myTop = value;
                setValue("top", value);
            }
        }
        public string VerticalAlign
        {
            get { return myVerticalAlign; }
            set
            {
                myVerticalAlign = value;
                setValue("vertical-align", value);
            }
        }
        public string Visibility
        {
            get { return myVisibility; }
            set
            {
                myVisibility = value;
                setValue("visibility", value);
            }
        }
        public string WhiteSpace
        {
            get { return myWhiteSpace; }
            set
            {
                myWhiteSpace = value;
                setValue("white-space", value);
            }
        }
        public string Width
        {
            get { return myWidth; }
            set
            {
                myWidth = value;
                setValue("width", value);
            }
        }
        public string WordSpacing
        {
            get { return myWordSpacing; }
            set
            {
                myWordSpacing = value;
                setValue("word-spacing", value);
            }
        }
        public string WordWrap
        {
            get { return myWordWrap; }
            set
            {
                myWordWrap = value;
                setValue("word-wrap", value);
            }
        }
        public string WritingMode
        {
            get { return myWritingMode; }
            set
            {
                myWritingMode = value;
                setValue("writing-mode", value);
            }
        }
        public short ZIndex
        {
            get { return myZIndex; }
            set
            {
                myZIndex = value;
                setValue("z-index", value);
            }
        }
        public string Zoom
        {
            get { return myZoom; }
            set
            {
                myZoom = value;
                setValue("zoom", value);
            }
        }

        private InternalStyle(InternalStyle val)
        {
            Children = new List<InternalStyle>();

            if (val == null) return;

            myAccelerator = val.Accelerator;
            myBackground = val.Background;
            myBackgroundAttachment = val.BackgroundAttachment;
            myBoxShadow = val.BoxShadow;
            myBorderRadius = val.BorderRadius;
            myTransform = val.Transform;
            myBackgroundColor = val.BackgroundColor;
            myBackgroundImage = val.BackgroundImage;
            myBackgroundPosition = val.BackgroundPosition;
            myBackgroundPositionX = val.BackgroundPositionX;
            myBackgroundPositionY = val.BackgroundPositionY;
            myBackgroundRepeat = val.BackgroundRepeat;
            myBorder = val.Border;
            myBorderBottom = val.BorderBottom;
            myBorderBottomColor = val.BorderBottomColor;
            myBorderBottomStyle = val.BorderBottomStyle;
            myBorderBottomWidth = val.BorderBottomWidth;
            myBorderCollapse = val.BorderCollapse;
            myBorderColor = val.BorderColor;
            myBorderLeft = val.BorderLeft;
            myBorderLeftColor = val.BorderLeftColor;
            myBorderLeftStyle = val.BorderLeftStyle;
            myBorderLeftWidth = val.BorderLeftWidth;
            myBorderRight = val.BorderRight;
            myBorderRightColor = val.BorderRightColor;
            myBorderRightStyle = val.BorderRightStyle;
            myBorderRightWidth = val.BorderRightWidth;
            myBorderStyle = val.BorderStyle;
            myBorderTop = val.BorderTop;
            myBorderTopColor = val.BorderTopColor;
            myBorderTopStyle = val.BorderTopStyle;
            myBorderTopWidth = val.BorderTopWidth;
            myBorderWidth = val.BorderWidth;
            myBottom = val.Bottom;
            myClear = val.Clear;
            myClip = val.Clip;
            myColor = val.Color;
            myCssFloat = val.CssFloat;
            myCssText = val.CssText;
            myCursor = val.Cursor;
            myDirection = val.Direction;
            myDisplay = val.Display;
            myFilter = val.Filter;
            myFont = val.Font;
            myFontFamily = val.FontFamily;
            myFontSize = val.FontSize;
            myFontStyle = val.FontStyle;
            myFontVariant = val.FontVariant;
            myFontWeight = val.FontWeight;
            myHeight = val.Height;
            myLeft = val.Left;
            myLetterSpacing = val.LetterSpacing;
            myLineHeight = val.LineHeight;
            myListStyle = val.ListStyle;
            myListStyleImage = val.ListStyleImage;
            myListStylePosition = val.ListStylePosition;
            myListStyleType = val.ListStyleType;
            myMargin = val.Margin;
            myMarginBottom = val.MarginBottom;
            myMarginLeft = val.MarginLeft;
            myMarginRight = val.MarginRight;
            myMarginTop = val.MarginTop;
            myMaxHeight = val.MaxHeight;
            myMaxWidth = val.MaxWidth;
            myMinHeight = val.MinHeight;
            myMinWidth = val.MinWidth;
            myMsInterpolationMode = val.MsInterpolationMode;
            myOpacity = val.Opacity;
            myOverflow = val.Overflow;
            myOverflowX = val.OverflowX;
            myOverflowY = val.OverflowY;
            myPadding = val.Padding;
            myPaddingBottom = val.PaddingBottom;
            myPaddingLeft = val.PaddingLeft;
            myPaddingRight = val.PaddingRight;
            myPaddingTop = val.PaddingTop;
            myPageBreakAfter = val.PageBreakAfter;
            myPageBreakBefore = val.PageBreakBefore;
            myPixelBottom = val.PixelBottom;
            myPixelHeight = val.PixelHeight;
            myPixelLeft = val.PixelLeft;
            myPixelRight = val.PixelRight;
            myPixelTop = val.PixelTop;
            myPixelWidth = val.PixelWidth;
            myPosBottom = val.PosBottom;
            myPosHeight = val.PosHeight;
            myPosition = val.Position;
            myPosLeft = val.PosLeft;
            myPosRight = val.PosRight;
            myPosTop = val.PosTop;
            myPosWidth = val.PosWidth;
            myRight = val.Right;
            myStyleFloat = val.StyleFloat;
            myTableLayout = val.TableLayout;
            myTextAlign = val.TextAlign;
            myTextDecoration = val.TextDecoration;
            myTextDecorationBlink = val.TextDecorationBlink;
            myTextDecorationLineThrough = val.TextDecorationLineThrough;
            myTextDecorationNone = val.TextDecorationNone;
            myTextDecorationOverline = val.TextDecorationOverline;
            myTextDecorationUnderline = val.TextDecorationUnderline;
            myTextIndent = val.TextIndent;
            myTextJustify = val.TextJustify;
            myTextOverflow = val.TextOverflow;
            myTextTransform = val.TextTransform;
            myTop = val.Top;
            myVerticalAlign = val.VerticalAlign;
            myVisibility = val.Visibility;
            myWhiteSpace = val.WhiteSpace;
            myWidth = val.Width;
            myWordSpacing = val.WordSpacing;
            myWordWrap = val.WordWrap;
            myWritingMode = val.WritingMode;
            myZIndex = val.ZIndex;
            myZoom = val.Zoom;
        }

        public InternalStyle()
        {
            Children = new List<InternalStyle>();

            lastStyle = new InternalStyle(null);
        }

        public void AddChild(InternalStyle style)
        {
            Children.Add(style);
            style.Parent = this;
        }

        private void setValue(string name, object v)
        {
            keys[name] = v;
        }

        public void SetStyle(Element outerElement)
        {
            var fm = lastStyle.keys;
            foreach (var item in fm) {
                if (!keys.ContainsKey(item.Key)) outerElement.Style[item.Key] = null;
            }

            foreach (var key in keys) {
                if (fm.ContainsKey(key.Key)) {
                    if (fm[key.Key] != key.Value) outerElement.Style[key.Key] = key.Value == null ? null : key.Value.ToString();
                } else {
                    if (key.Value == null) {
                        if (outerElement.Style[key.Key] == null)
                            outerElement.Style[key.Key] = null;
                    } else outerElement.Style[key.Key] = key.Value.ToString();
                }
            }
            lastStyle = new InternalStyle(this);
        }
    }
}