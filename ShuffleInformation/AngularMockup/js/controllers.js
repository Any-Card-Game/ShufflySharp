'use strict';

/* Controllers */


function GameCtrl($scope) {
    $scope.MainArea = loadMainArea();

}

var Area = {
    spaces: [
        {}
    ],
    textAreas: [],
    size: {width: 10, height: 9}
};

var Space = {
    vertical: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    pile: {},
    appearance: 0,
    visible: 0,
    stackCards: 0,
    drawCardsBent: 0,
    name: 0,
    sortOrder: 0,
    numberOfCardsHorizontal: 0,
    numberOfCardsVertical: 0,
    resizeType: 0
};

var Pile = {
    name: 0,
    cards: [
        {}
    ]
};

var Card = {
    value: 0,
    type: 0,
    state: 0,
    appearance: 0
};


function loadMainArea() {
    return {
        "emulating": false,
        "name": null,
        "answerIndex": 1,
        "spaces": [
            {
                "vertical": true,
                "x": 5,
                "y": 4,
                "width": 0,
                "height": 6,
                "pile": {
                    "name": "clubs",
                    "cards": [

                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 25,
                            "color": "rgba(112,12,0,0)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "Clubs",
                "resizeType": 1
            },
            {
                "vertical": true,
                "x": 7,
                "y": 4,
                "width": 0,
                "height": 6,
                "pile": {
                    "name": "hearts",
                    "cards": [

                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 25,
                            "color": "rgba(112,12,0,0)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "Hearts",
                "resizeType": 1
            },
            {
                "vertical": true,
                "x": 9,
                "y": 4,
                "width": 0,
                "height": 6,
                "pile": {
                    "name": "diamonds",
                    "cards": [
                        {
                            "value": 6,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 90,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 27,
                            "color": "rgba(112,12,19,0.07692307692307693)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "Diamonds",
                "resizeType": 1
            },
            {
                "vertical": true,
                "x": 11,
                "y": 4,
                "width": 0,
                "height": 6,
                "pile": {
                    "name": "spades",
                    "cards": [

                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 25,
                            "color": "rgba(112,12,0,0)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "Spades",
                "resizeType": 1
            },
            {
                "vertical": false,
                "x": 4,
                "y": 2,
                "width": 3,
                "height": 0,
                "pile": {
                    "name": "aaa",
                    "cards": [
                        {
                            "value": 6,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 4,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 6,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 55,
                            "color": "rgba(119,25,84,0.2)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        },
                        {
                            "degrees": 15,
                            "type": 2,
                            "drawTime": 1,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "User0",
                "user": {
                    "userName": "aaa",
                    "playerDealingOrder": 0,
                    "cards": {
                        "name": "aaa",
                        "cards": [
                            {
                                "value": 6,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 9,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 10,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 2,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 4,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 5,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 5,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 6,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            }
                        ]
                    },
                    "userIndex": 0
                }
            },
            {
                "vertical": false,
                "x": 9,
                "y": 2,
                "width": 3,
                "height": 0,
                "pile": {
                    "name": "bbbb",
                    "cards": [
                        {
                            "value": 8,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 0,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 1,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 4,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 1,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 55,
                            "color": "rgba(255,0,84,0.7)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        },
                        {
                            "degrees": 15,
                            "type": 2,
                            "drawTime": 1,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "User1",
                "user": {
                    "userName": "bbbb",
                    "playerDealingOrder": 0,
                    "cards": {
                        "name": "bbbb",
                        "cards": [
                            {
                                "value": 8,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 9,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 10,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 11,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 0,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 1,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 4,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 1,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 2,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            }
                        ]
                    },
                    "userIndex": 1
                }
            },
            {
                "vertical": true,
                "x": 13,
                "y": 5,
                "width": 0,
                "height": 3,
                "pile": {
                    "name": "cccc",
                    "cards": [
                        {
                            "value": 0,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 8,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 55,
                            "color": "rgba(119,25,84,0.2)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        },
                        {
                            "degrees": 15,
                            "type": 2,
                            "drawTime": 1,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": -90,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "User2",
                "user": {
                    "userName": "cccc",
                    "playerDealingOrder": 0,
                    "cards": {
                        "name": "cccc",
                        "cards": [
                            {
                                "value": 0,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 11,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 12,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 3,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 7,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 8,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 10,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 2,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 7,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            }
                        ]
                    },
                    "userIndex": 2
                }
            },
            {
                "vertical": false,
                "x": 9,
                "y": 12,
                "width": 3,
                "height": 0,
                "pile": {
                    "name": "dddd",
                    "cards": [
                        {
                            "value": 0,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 4,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 8,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 55,
                            "color": "rgba(119,25,84,0.2)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        },
                        {
                            "degrees": -15,
                            "type": 2,
                            "drawTime": 1,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "User3",
                "user": {
                    "userName": "dddd",
                    "playerDealingOrder": 0,
                    "cards": {
                        "name": "dddd",
                        "cards": [
                            {
                                "value": 0,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 3,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 4,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 7,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 8,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 3,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 10,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 11,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 12,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            }
                        ]
                    },
                    "userIndex": 3
                }
            },
            {
                "vertical": false,
                "x": 4,
                "y": 12,
                "width": 3,
                "height": 0,
                "pile": {
                    "name": "eeee",
                    "cards": [
                        {
                            "value": 1,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 55,
                            "color": "rgba(119,25,84,0.2)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        },
                        {
                            "degrees": -15,
                            "type": 2,
                            "drawTime": 1,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "User4",
                "user": {
                    "userName": "eeee",
                    "playerDealingOrder": 0,
                    "cards": {
                        "name": "eeee",
                        "cards": [
                            {
                                "value": 1,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 3,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 5,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 9,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 2,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 12,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 9,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 11,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            }
                        ]
                    },
                    "userIndex": 4
                }
            },
            {
                "vertical": true,
                "x": 3,
                "y": 5,
                "width": 0,
                "height": 3,
                "pile": {
                    "name": "deddd",
                    "cards": [
                        {
                            "value": 4,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 0,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 6,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 8,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 1,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "appearance": {
                    "effects": [
                        {
                            "radius": 55,
                            "color": "rgba(119,25,84,0.2)",
                            "rotate": 0,
                            "offsetX": 0,
                            "offsetY": 0,
                            "type": 0,
                            "drawTime": 0,
                            "chainedEffect": null
                        },
                        {
                            "degrees": -15,
                            "type": 2,
                            "drawTime": 1,
                            "chainedEffect": null
                        }
                    ],
                    "outerStyle": {
                        "backColor": null,
                        "rotate": 0,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    },
                    "innerStyle": {
                        "backColor": null,
                        "rotate": -90,
                        "border": {
                            "top": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "bottom": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "left": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "right": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            },
                            "all": {
                                "color": "#FFF",
                                "radius": "0px",
                                "width": "0px",
                                "style": 0
                            }
                        },
                        "padding": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "margin": {
                            "top": 0,
                            "bottom": 0,
                            "left": 0,
                            "right": 0,
                            "all": 0
                        },
                        "zindex": 0,
                        "cursor": 0
                    }
                },
                "visible": true,
                "stackCards": false,
                "drawCardsBent": true,
                "name": "User5",
                "user": {
                    "userName": "deddd",
                    "playerDealingOrder": 0,
                    "cards": {
                        "name": "deddd",
                        "cards": [
                            {
                                "value": 4,
                                "type": 3,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 0,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 5,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 6,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 12,
                                "type": 1,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 8,
                                "type": 0,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 1,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            },
                            {
                                "value": 7,
                                "type": 2,
                                "state": 0,
                                "appearance": {
                                    "effects": [

                                    ],
                                    "outerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    },
                                    "innerStyle": {
                                        "backColor": null,
                                        "rotate": 0,
                                        "border": {
                                            "top": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "bottom": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "left": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "right": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            },
                                            "all": {
                                                "color": "#FFF",
                                                "radius": "0px",
                                                "width": "0px",
                                                "style": 0
                                            }
                                        },
                                        "padding": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "margin": {
                                            "top": 0,
                                            "bottom": 0,
                                            "left": 0,
                                            "right": 0,
                                            "all": 0
                                        },
                                        "zindex": 0,
                                        "cursor": 0
                                    }
                                }
                            }
                        ]
                    },
                    "userIndex": 5
                }
            }
        ],
        "textAreas": [
            {
                "name": "SpadesText",
                "x": 5,
                "y": 3,
                "text": "Clubs"
            },
            {
                "name": "HeartsText",
                "x": 7,
                "y": 3,
                "text": "Hearts"
            },
            {
                "name": "DiamondsText",
                "x": 9,
                "y": 3,
                "text": "Diamonds"
            },
            {
                "name": "SpadesText",
                "x": 11,
                "y": 3,
                "text": "Spades"
            },
            {
                "name": "Text0",
                "x": 4,
                "y": 1,
                "text": "aaa"
            },
            {
                "name": "Text1",
                "x": 9,
                "y": 1,
                "text": "bbbb"
            },
            {
                "name": "Text2",
                "x": 13,
                "y": 4,
                "text": "cccc"
            },
            {
                "name": "Text3",
                "x": 9,
                "y": 11,
                "text": "dddd"
            },
            {
                "name": "Text4",
                "x": 4,
                "y": 11,
                "text": "eeee"
            },
            {
                "name": "Text5",
                "x": 3,
                "y": 4,
                "text": "deddd"
            }
        ],
        "size": {
            "width": 16,
            "height": 12
        },
        "answers": [
            {
                "value": 2
            }
        ],
        "users": [
            {
                "userName": "aaa",
                "playerDealingOrder": 0,
                "cards": {
                    "name": "aaa",
                    "cards": [
                        {
                            "value": 6,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 4,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 6,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "userIndex": 0
            },
            {
                "userName": "bbbb",
                "playerDealingOrder": 0,
                "cards": {
                    "name": "bbbb",
                    "cards": [
                        {
                            "value": 8,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 0,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 1,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 4,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 1,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "userIndex": 1
            },
            {
                "userName": "cccc",
                "playerDealingOrder": 0,
                "cards": {
                    "name": "cccc",
                    "cards": [
                        {
                            "value": 0,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 8,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "userIndex": 2
            },
            {
                "userName": "dddd",
                "playerDealingOrder": 0,
                "cards": {
                    "name": "dddd",
                    "cards": [
                        {
                            "value": 0,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 4,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 8,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 10,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "userIndex": 3
            },
            {
                "userName": "eeee",
                "playerDealingOrder": 0,
                "cards": {
                    "name": "eeee",
                    "cards": [
                        {
                            "value": 1,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 3,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 2,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 9,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 11,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "userIndex": 4
            },
            {
                "userName": "deddd",
                "playerDealingOrder": 0,
                "cards": {
                    "name": "deddd",
                    "cards": [
                        {
                            "value": 4,
                            "type": 3,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 0,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 5,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 6,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 12,
                            "type": 1,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 8,
                            "type": 0,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 1,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        },
                        {
                            "value": 7,
                            "type": 2,
                            "state": 0,
                            "appearance": {
                                "effects": [

                                ],
                                "outerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                },
                                "innerStyle": {
                                    "backColor": null,
                                    "rotate": 0,
                                    "border": {
                                        "top": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "bottom": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "left": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "right": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        },
                                        "all": {
                                            "color": "#FFF",
                                            "radius": "0px",
                                            "width": "0px",
                                            "style": 0
                                        }
                                    },
                                    "padding": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "margin": {
                                        "top": 0,
                                        "bottom": 0,
                                        "left": 0,
                                        "right": 0,
                                        "all": 0
                                    },
                                    "zindex": 0,
                                    "cursor": 0
                                }
                            }
                        }
                    ]
                },
                "userIndex": 5
            }
        ],
        "deck": {
            "name": "deck",
            "cards": [

            ]
        },
        "numberOfCards": 52
    };
}