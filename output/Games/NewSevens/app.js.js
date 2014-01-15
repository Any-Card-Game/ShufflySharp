function Sevens() {
        shuff.break_({
        ty: 1,
        line: 1,
        funcdef: 1,
        col: 0,
        isLast: 0,
        nodeID: 927
    }, typeof self != "undefined" && self.cardGame, function(variable) {
        var goodVar;
        eval("goodVar=" + variable);
        return goodVar;
    });
    {
                shuff.break_({
            ty: 2,
            line: 2,
            funcdef: 1,
            col: 4,
            isLast: 0,
            nodeID: 5
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
        var self = this;
                shuff.break_({
            ty: 3,
            line: 3,
            funcdef: 1,
            col: 19,
            isLast: false,
            nodeID: 5
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
    }
    {
                shuff.break_({
            ty: 2,
            line: 3,
            funcdef: 1,
            col: 4,
            isLast: 0,
            nodeID: 12
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
        self.cardGame = new CardGame();
                shuff.break_({
            ty: 3,
            line: 4,
            funcdef: 1,
            col: 35,
            isLast: false,
            nodeID: 12
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
    }
    {
                shuff.break_({
            ty: 2,
            line: 5,
            funcdef: 1,
            col: 4,
            isLast: 0,
            nodeID: 86
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
        self.constructor = function() {
                        shuff.break_({
                ty: 1,
                line: 5,
                funcdef: 2,
                col: 23,
                isLast: 0,
                nodeID: 84
            }, typeof self != "undefined" && self.cardGame, function(variable) {
                var goodVar;
                eval("goodVar=" + variable);
                return goodVar;
            });
            {
                                shuff.break_({
                    ty: 2,
                    line: 7,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 21
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.spades = new Pile("spades");
                                shuff.break_({
                    ty: 3,
                    line: 8,
                    funcdef: 2,
                    col: 40,
                    isLast: false,
                    nodeID: 21
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 8,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 29
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.clubs = new Pile("clubs");
                                shuff.break_({
                    ty: 3,
                    line: 9,
                    funcdef: 2,
                    col: 38,
                    isLast: false,
                    nodeID: 29
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 9,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 36
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.hearts = new Pile("hearts");
                                shuff.break_({
                    ty: 3,
                    line: 10,
                    funcdef: 2,
                    col: 40,
                    isLast: false,
                    nodeID: 36
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 10,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 43
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.diamonds = new Pile("diamonds");
                                shuff.break_({
                    ty: 3,
                    line: 11,
                    funcdef: 2,
                    col: 44,
                    isLast: false,
                    nodeID: 43
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 12,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 53
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.cardGame.getSpaceByName("clubs").assignPile(self.clubs);
                                shuff.break_({
                    ty: 3,
                    line: 13,
                    funcdef: 2,
                    col: 68,
                    isLast: false,
                    nodeID: 53
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 13,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 63
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.cardGame.getSpaceByName("spades").assignPile(self.spades);
                                shuff.break_({
                    ty: 3,
                    line: 14,
                    funcdef: 2,
                    col: 70,
                    isLast: false,
                    nodeID: 63
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 14,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 73
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.cardGame.getSpaceByName("hearts").assignPile(self.hearts);
                                shuff.break_({
                    ty: 3,
                    line: 15,
                    funcdef: 2,
                    col: 70,
                    isLast: false,
                    nodeID: 73
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 15,
                    funcdef: 2,
                    col: 8,
                    isLast: 0,
                    nodeID: 83
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.cardGame.getSpaceByName("diamonds").assignPile(self.diamonds);
                                shuff.break_({
                    ty: 3,
                    line: 16,
                    funcdef: 2,
                    col: 74,
                    isLast: true,
                    nodeID: 83
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
        };
                shuff.break_({
            ty: 3,
            line: 18,
            funcdef: 1,
            col: 5,
            isLast: false,
            nodeID: 86
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
    }
    {
                shuff.break_({
            ty: 2,
            line: 19,
            funcdef: 1,
            col: 4,
            isLast: 0,
            nodeID: 864
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
        self.runGame = function() {
                        shuff.break_({
                ty: 1,
                line: 19,
                funcdef: 3,
                col: 19,
                isLast: 0,
                nodeID: 862
            }, typeof self != "undefined" && self.cardGame, function(variable) {
                var goodVar;
                eval("goodVar=" + variable);
                return goodVar;
            });
            {
                                shuff.break_({
                    ty: 2,
                    line: 20,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 109
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                if (!self.cardGame.users || self.cardGame.users.length == 0) {
                                        shuff.break_({
                        ty: 1,
                        line: 20,
                        funcdef: 3,
                        col: 69,
                        isLast: 0,
                        nodeID: 108
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 21,
                            funcdef: 3,
                            col: 12,
                            isLast: 0,
                            nodeID: 104
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        console.log("baaad");
                                                shuff.break_({
                            ty: 3,
                            line: 22,
                            funcdef: 3,
                            col: 32,
                            isLast: false,
                            nodeID: 104
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 22,
                            funcdef: 3,
                            col: 12,
                            isLast: 0,
                            nodeID: 107
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        return true;
                                                shuff.break_({
                            ty: 3,
                            line: 23,
                            funcdef: 3,
                            col: 23,
                            isLast: true,
                            nodeID: 107
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                }
                                shuff.break_({
                    ty: 3,
                    line: 24,
                    funcdef: 3,
                    col: 8,
                    isLast: false,
                    nodeID: 109
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 24,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 132
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                _.numbers(1, 20).foreach(function() {
                                        shuff.break_({
                        ty: 1,
                        line: 24,
                        funcdef: 4,
                        col: 33,
                        isLast: 0,
                        nodeID: 130
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 25,
                            funcdef: 4,
                            col: 12,
                            isLast: 0,
                            nodeID: 128
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        self.cardGame.deck.cards = self.shuffle(self.cardGame.deck.cards);
                                                shuff.break_({
                            ty: 3,
                            line: 26,
                            funcdef: 4,
                            col: 77,
                            isLast: true,
                            nodeID: 128
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                });
                                shuff.break_({
                    ty: 3,
                    line: 27,
                    funcdef: 3,
                    col: 10,
                    isLast: false,
                    nodeID: 132
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 28,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 177
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.cardGame.users.foreach(function(u, ind) {
                                        shuff.break_({
                        ty: 1,
                        line: 28,
                        funcdef: 5,
                        col: 36,
                        isLast: 0,
                        nodeID: 175
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 29,
                            funcdef: 5,
                            col: 12,
                            isLast: 0,
                            nodeID: 146
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        shuff.log("::" + u.userName);
                                                shuff.break_({
                            ty: 3,
                            line: 30,
                            funcdef: 5,
                            col: 40,
                            isLast: false,
                            nodeID: 146
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 31,
                            funcdef: 5,
                            col: 12,
                            isLast: 0,
                            nodeID: 162
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        self.cardGame.getSpaceByName("User" + ind).assignPile(u.cards).assignUser(u);
                                                shuff.break_({
                            ty: 3,
                            line: 32,
                            funcdef: 5,
                            col: 88,
                            isLast: false,
                            nodeID: 162
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 32,
                            funcdef: 5,
                            col: 12,
                            isLast: 0,
                            nodeID: 174
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        self.cardGame.getTextByName("User" + ind).text = u.userName;
                                                shuff.break_({
                            ty: 3,
                            line: 33,
                            funcdef: 5,
                            col: 71,
                            isLast: true,
                            nodeID: 174
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                });
                                shuff.break_({
                    ty: 3,
                    line: 34,
                    funcdef: 3,
                    col: 10,
                    isLast: false,
                    nodeID: 177
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 36,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 239
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                while (self.cardGame.deck.cards.length > 0) {
                                        shuff.break_({
                        ty: 1,
                        line: 36,
                        funcdef: 3,
                        col: 52,
                        isLast: 0,
                        nodeID: 238
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 37,
                            funcdef: 3,
                            col: 12,
                            isLast: 0,
                            nodeID: 237
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        self.cardGame.users.foreach(function(u) {
                                                        shuff.break_({
                                ty: 1,
                                line: 37,
                                funcdef: 6,
                                col: 40,
                                isLast: 0,
                                nodeID: 235
                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                var goodVar;
                                eval("goodVar=" + variable);
                                return goodVar;
                            });
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 38,
                                    funcdef: 6,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 234
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                if (self.cardGame.deck.cards.length > 0) {
                                                                        shuff.break_({
                                        ty: 1,
                                        line: 38,
                                        funcdef: 6,
                                        col: 57,
                                        isLast: 0,
                                        nodeID: 233
                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                        var goodVar;
                                        eval("goodVar=" + variable);
                                        return goodVar;
                                    });
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 39,
                                            funcdef: 6,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 206
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        self.cardGame.deck.cards[0].state = 2;
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 40,
                                            funcdef: 6,
                                            col: 57,
                                            isLast: false,
                                            nodeID: 206
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 40,
                                            funcdef: 6,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 219
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        u.cards.cards.push(self.cardGame.deck.cards[0]);
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 41,
                                            funcdef: 6,
                                            col: 67,
                                            isLast: false,
                                            nodeID: 219
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 41,
                                            funcdef: 6,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 232
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 42,
                                            funcdef: 6,
                                            col: 80,
                                            isLast: false,
                                            nodeID: 232
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                }
                                                                shuff.break_({
                                    ty: 3,
                                    line: 43,
                                    funcdef: 6,
                                    col: 16,
                                    isLast: false,
                                    nodeID: 234
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                        });
                                                shuff.break_({
                            ty: 3,
                            line: 44,
                            funcdef: 3,
                            col: 14,
                            isLast: false,
                            nodeID: 237
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                }
                                shuff.break_({
                    ty: 3,
                    line: 45,
                    funcdef: 3,
                    col: 8,
                    isLast: false,
                    nodeID: 239
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 47,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 254
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                self.cardGame.users.foreach(function(u) {
                                        shuff.break_({
                        ty: 1,
                        line: 47,
                        funcdef: 7,
                        col: 36,
                        isLast: 0,
                        nodeID: 252
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 48,
                            funcdef: 7,
                            col: 12,
                            isLast: 0,
                            nodeID: 250
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        u.cards.cards.sortCards();
                                                shuff.break_({
                            ty: 3,
                            line: 49,
                            funcdef: 7,
                            col: 37,
                            isLast: true,
                            nodeID: 250
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                });
                                shuff.break_({
                    ty: 3,
                    line: 50,
                    funcdef: 3,
                    col: 10,
                    isLast: false,
                    nodeID: 254
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 51,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 262
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                var CardTypes = [ "Diamonds", "Clubs", "Hearts", "Spades" ];
                                shuff.break_({
                    ty: 3,
                    line: 52,
                    funcdef: 3,
                    col: 65,
                    isLast: false,
                    nodeID: 262
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 52,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 279
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                var CardNames = [ "Ace", "Deuce", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King" ];
                                shuff.break_({
                    ty: 3,
                    line: 53,
                    funcdef: 3,
                    col: 130,
                    isLast: false,
                    nodeID: 279
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 54,
                    funcdef: 3,
                    col: 8,
                    isLast: 0,
                    nodeID: 861
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                while (true) {
                                        shuff.break_({
                        ty: 1,
                        line: 54,
                        funcdef: 3,
                        col: 21,
                        isLast: 0,
                        nodeID: 860
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 55,
                            funcdef: 3,
                            col: 12,
                            isLast: 0,
                            nodeID: 854
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        var result = self.cardGame.users.foreach(function(u) {
                                                        shuff.break_({
                                ty: 1,
                                line: 55,
                                funcdef: 13,
                                col: 53,
                                isLast: 0,
                                nodeID: 851
                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                var goodVar;
                                eval("goodVar=" + variable);
                                return goodVar;
                            });
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 57,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 432
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                var usable = u.cards.cards.where(function(c) {
                                                                        shuff.break_({
                                        ty: 1,
                                        line: 57,
                                        funcdef: 12,
                                        col: 49,
                                        isLast: 0,
                                        nodeID: 429
                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                        var goodVar;
                                        eval("goodVar=" + variable);
                                        return goodVar;
                                    });
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 58,
                                            funcdef: 12,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 428
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        return c.type == 3 && (c.value == 6 || self.spades.cards.any(function(_c) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 58,
                                                funcdef: 8,
                                                col: 82,
                                                isLast: 0,
                                                nodeID: 322
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 59,
                                                    funcdef: 8,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 321
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 60,
                                                    funcdef: 8,
                                                    col: 81,
                                                    isLast: true,
                                                    nodeID: 321
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        })) || c.type == 1 && (c.value == 6 || self.clubs.cards.any(function(_c) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 61,
                                                funcdef: 9,
                                                col: 74,
                                                isLast: 0,
                                                nodeID: 355
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 62,
                                                    funcdef: 9,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 354
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 63,
                                                    funcdef: 9,
                                                    col: 81,
                                                    isLast: true,
                                                    nodeID: 354
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        })) || c.type == 2 && (c.value == 6 || self.hearts.cards.any(function(_c) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 64,
                                                funcdef: 10,
                                                col: 75,
                                                isLast: 0,
                                                nodeID: 389
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 65,
                                                    funcdef: 10,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 388
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 66,
                                                    funcdef: 10,
                                                    col: 81,
                                                    isLast: true,
                                                    nodeID: 388
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        })) || c.type == 0 && (c.value == 6 || self.diamonds.cards.any(function(_c) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 67,
                                                funcdef: 11,
                                                col: 77,
                                                isLast: 0,
                                                nodeID: 423
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 68,
                                                    funcdef: 11,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 422
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 69,
                                                    funcdef: 11,
                                                    col: 81,
                                                    isLast: true,
                                                    nodeID: 422
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        }));
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 70,
                                            funcdef: 12,
                                            col: 24,
                                            isLast: true,
                                            nodeID: 428
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                });
                                                                shuff.break_({
                                    ty: 3,
                                    line: 71,
                                    funcdef: 13,
                                    col: 18,
                                    isLast: false,
                                    nodeID: 432
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 71,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 437
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                var answers = [];
                                                                shuff.break_({
                                    ty: 3,
                                    line: 72,
                                    funcdef: 13,
                                    col: 32,
                                    isLast: false,
                                    nodeID: 437
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 72,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 442
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                answers.push("Skip");
                                                                shuff.break_({
                                    ty: 3,
                                    line: 73,
                                    funcdef: 13,
                                    col: 36,
                                    isLast: false,
                                    nodeID: 442
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 73,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 466
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                usable.sortCards().foreach(function(card) {
                                                                        shuff.break_({
                                        ty: 1,
                                        line: 73,
                                        funcdef: 14,
                                        col: 43,
                                        isLast: 0,
                                        nodeID: 464
                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                        var goodVar;
                                        eval("goodVar=" + variable);
                                        return goodVar;
                                    });
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 74,
                                            funcdef: 14,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 462
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        answers.push(CardNames[card.value] + " Of " + CardTypes[card.type]);
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 75,
                                            funcdef: 14,
                                            col: 87,
                                            isLast: true,
                                            nodeID: 462
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                });
                                                                shuff.break_({
                                    ty: 3,
                                    line: 76,
                                    funcdef: 13,
                                    col: 18,
                                    isLast: false,
                                    nodeID: 466
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 78,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 472
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                var sp = self.cardGame.spaces;
                                                                shuff.break_({
                                    ty: 3,
                                    line: 79,
                                    funcdef: 13,
                                    col: 45,
                                    isLast: false,
                                    nodeID: 472
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 79,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 655
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                for (var i = 0; i < sp.length; i++) {
                                                                        shuff.break_({
                                        ty: 1,
                                        line: 79,
                                        funcdef: 13,
                                        col: 52,
                                        isLast: 0,
                                        nodeID: 654
                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                        var goodVar;
                                        eval("goodVar=" + variable);
                                        return goodVar;
                                    });
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 82,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 489
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        sp[i].effects = [];
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 83,
                                            funcdef: 13,
                                            col: 38,
                                            isLast: false,
                                            nodeID: 489
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 85,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 534
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        if (sp[i].user == u) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 85,
                                                funcdef: 13,
                                                col: 41,
                                                isLast: 0,
                                                nodeID: 519
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 86,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 518
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                if (usable.length == 0) {
                                                                                                        shuff.break_({
                                                        ty: 1,
                                                        line: 86,
                                                        funcdef: 13,
                                                        col: 48,
                                                        isLast: 0,
                                                        nodeID: 508
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                    {
                                                                                                                shuff.break_({
                                                            ty: 2,
                                                            line: 87,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: 0,
                                                            nodeID: 507
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                        sp[i].effects.push("CurrentPlayerNoCards");
                                                                                                                shuff.break_({
                                                            ty: 3,
                                                            line: 88,
                                                            funcdef: 13,
                                                            col: 70,
                                                            isLast: false,
                                                            nodeID: 507
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                    }
                                                } else {
                                                                                                        shuff.break_({
                                                        ty: 1,
                                                        line: 88,
                                                        funcdef: 13,
                                                        col: 31,
                                                        isLast: 0,
                                                        nodeID: 517
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                    {
                                                                                                                shuff.break_({
                                                            ty: 2,
                                                            line: 90,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: 0,
                                                            nodeID: 516
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                        sp[i].effects.push("CurrentPlayer");
                                                                                                                shuff.break_({
                                                            ty: 3,
                                                            line: 91,
                                                            funcdef: 13,
                                                            col: 63,
                                                            isLast: false,
                                                            nodeID: 516
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                    }
                                                }
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 92,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: false,
                                                    nodeID: 518
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        } else {
                                                                                        shuff.break_({
                                                ty: 2,
                                                line: 92,
                                                funcdef: 13,
                                                col: 27,
                                                isLast: 0,
                                                nodeID: 533
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            if (sp[i].user) {
                                                                                                shuff.break_({
                                                    ty: 1,
                                                    line: 92,
                                                    funcdef: 13,
                                                    col: 43,
                                                    isLast: 0,
                                                    nodeID: 532
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                {
                                                                                                        shuff.break_({
                                                        ty: 2,
                                                        line: 93,
                                                        funcdef: 13,
                                                        col: 24,
                                                        isLast: 0,
                                                        nodeID: 531
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                    sp[i].effects.push("InactivePlayer");
                                                                                                        shuff.break_({
                                                        ty: 3,
                                                        line: 94,
                                                        funcdef: 13,
                                                        col: 60,
                                                        isLast: false,
                                                        nodeID: 531
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                }
                                            }
                                                                                        shuff.break_({
                                                ty: 3,
                                                line: 96,
                                                funcdef: 13,
                                                col: 20,
                                                isLast: false,
                                                nodeID: 533
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                        }
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 96,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: false,
                                            nodeID: 534
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 98,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 558
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        if (!sp[i].user) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 98,
                                                funcdef: 13,
                                                col: 37,
                                                isLast: 0,
                                                nodeID: 548
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 100,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 547
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                sp[i].effects.push("CenterPiles");
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 101,
                                                    funcdef: 13,
                                                    col: 57,
                                                    isLast: false,
                                                    nodeID: 547
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        } else {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 101,
                                                funcdef: 13,
                                                col: 27,
                                                isLast: 0,
                                                nodeID: 557
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 102,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 556
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                sp[i].effects.push("Bend");
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 103,
                                                    funcdef: 13,
                                                    col: 50,
                                                    isLast: false,
                                                    nodeID: 556
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        }
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 104,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: false,
                                            nodeID: 558
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 105,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 653
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        for (var ij = 0; ij < sp[i].pile.cards.length; ij++) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 105,
                                                funcdef: 13,
                                                col: 73,
                                                isLast: 0,
                                                nodeID: 652
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 106,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 582
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                var card = sp[i].pile.cards[ij];
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 107,
                                                    funcdef: 13,
                                                    col: 55,
                                                    isLast: false,
                                                    nodeID: 582
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 107,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 587
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                card.effects = [];
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 108,
                                                    funcdef: 13,
                                                    col: 41,
                                                    isLast: false,
                                                    nodeID: 587
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 146,
                                                    funcdef: 13,
                                                    col: 6,
                                                    isLast: 0,
                                                    nodeID: 595
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                shuff.log(sp[i].user);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 147,
                                                    funcdef: 13,
                                                    col: 27,
                                                    isLast: false,
                                                    nodeID: 595
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 147,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 613
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                if (card.value == 6 && !sp[i].user) {
                                                                                                        shuff.break_({
                                                        ty: 1,
                                                        line: 147,
                                                        funcdef: 13,
                                                        col: 60,
                                                        isLast: 0,
                                                        nodeID: 612
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                    {
                                                                                                                shuff.break_({
                                                            ty: 2,
                                                            line: 149,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: 0,
                                                            nodeID: 611
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                        card.effects.push("Seven");
                                                                                                                shuff.break_({
                                                            ty: 3,
                                                            line: 150,
                                                            funcdef: 13,
                                                            col: 54,
                                                            isLast: false,
                                                            nodeID: 611
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                    }
                                                }
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 151,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: false,
                                                    nodeID: 613
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 152,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 651
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                for (var j = 0; j < usable.length; j++) {
                                                                                                        shuff.break_({
                                                        ty: 1,
                                                        line: 152,
                                                        funcdef: 13,
                                                        col: 64,
                                                        isLast: 0,
                                                        nodeID: 650
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                    {
                                                                                                                shuff.break_({
                                                            ty: 2,
                                                            line: 153,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: 0,
                                                            nodeID: 629
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                        var m = usable[j];
                                                                                                                shuff.break_({
                                                            ty: 3,
                                                            line: 154,
                                                            funcdef: 13,
                                                            col: 45,
                                                            isLast: false,
                                                            nodeID: 629
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                    }
                                                    {
                                                                                                                shuff.break_({
                                                            ty: 2,
                                                            line: 154,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: 0,
                                                            nodeID: 649
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                        if (m.value == card.value && m.type == card.type) {
                                                                                                                        shuff.break_({
                                                                ty: 1,
                                                                line: 154,
                                                                funcdef: 13,
                                                                col: 78,
                                                                isLast: 0,
                                                                nodeID: 648
                                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                var goodVar;
                                                                eval("goodVar=" + variable);
                                                                return goodVar;
                                                            });
                                                            {
                                                                                                                                shuff.break_({
                                                                    ty: 2,
                                                                    line: 155,
                                                                    funcdef: 13,
                                                                    col: 32,
                                                                    isLast: 0,
                                                                    nodeID: 646
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                                card.effects.push("PlayableCard");
                                                                                                                                shuff.break_({
                                                                    ty: 3,
                                                                    line: 156,
                                                                    funcdef: 13,
                                                                    col: 65,
                                                                    isLast: false,
                                                                    nodeID: 646
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                            }
                                                            {
                                                                                                                                shuff.break_({
                                                                    ty: 2,
                                                                    line: 156,
                                                                    funcdef: 13,
                                                                    col: 32,
                                                                    isLast: 0,
                                                                    nodeID: 647
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                                break;
                                                                                                                                shuff.break_({
                                                                    ty: 3,
                                                                    line: 157,
                                                                    funcdef: 13,
                                                                    col: 37,
                                                                    isLast: false,
                                                                    nodeID: 647
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                            }
                                                        }
                                                                                                                shuff.break_({
                                                            ty: 3,
                                                            line: 158,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: false,
                                                            nodeID: 649
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                    }
                                                }
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 159,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: false,
                                                    nodeID: 651
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        }
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 162,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: false,
                                            nodeID: 653
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                }
                                                                shuff.break_({
                                    ty: 3,
                                    line: 163,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: false,
                                    nodeID: 655
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 163,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 660
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                shuff.log("asking question");
                                                                shuff.break_({
                                    ty: 3,
                                    line: 164,
                                    funcdef: 13,
                                    col: 44,
                                    isLast: false,
                                    nodeID: 660
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 164,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 671
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                var de = shuff.askQuestion(u, "Which card would you like to play?", answers, self.cardGame);
                                                                shuff.break_({
                                    ty: 3,
                                    line: 165,
                                    funcdef: 13,
                                    col: 107,
                                    isLast: false,
                                    nodeID: 671
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 165,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 678
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                shuff.log("asked question: " + de);
                                                                shuff.break_({
                                    ty: 3,
                                    line: 166,
                                    funcdef: 13,
                                    col: 50,
                                    isLast: false,
                                    nodeID: 678
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 167,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 848
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                if (de > 0 && usable.length >= de) {
                                                                        shuff.break_({
                                        ty: 1,
                                        line: 167,
                                        funcdef: 13,
                                        col: 51,
                                        isLast: 0,
                                        nodeID: 847
                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                        var goodVar;
                                        eval("goodVar=" + variable);
                                        return goodVar;
                                    });
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 168,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 694
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        var rm = usable[de - 1];
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 169,
                                            funcdef: 13,
                                            col: 43,
                                            isLast: false,
                                            nodeID: 694
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 169,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 699
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        rm.state = 0;
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 170,
                                            funcdef: 13,
                                            col: 32,
                                            isLast: false,
                                            nodeID: 699
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 171,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 802
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        switch (rm.type) {
                                          case 3:
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 172,
                                                funcdef: 13,
                                                col: 20,
                                                isLast: 0,
                                                nodeID: 726
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 173,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 709
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                u.cards.cards.remove(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 174,
                                                    funcdef: 13,
                                                    col: 48,
                                                    isLast: false,
                                                    nodeID: 709
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 174,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 716
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.spades.cards.push(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 175,
                                                    funcdef: 13,
                                                    col: 50,
                                                    isLast: false,
                                                    nodeID: 716
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 175,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 724
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.spades.cards.sortCards().reverse();
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 176,
                                                    funcdef: 13,
                                                    col: 63,
                                                    isLast: false,
                                                    nodeID: 724
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 176,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 725
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                break;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 177,
                                                    funcdef: 13,
                                                    col: 29,
                                                    isLast: false,
                                                    nodeID: 725
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }

                                          case 1:
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 177,
                                                funcdef: 13,
                                                col: 20,
                                                isLast: 0,
                                                nodeID: 751
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 178,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 734
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                u.cards.cards.remove(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 179,
                                                    funcdef: 13,
                                                    col: 48,
                                                    isLast: false,
                                                    nodeID: 734
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 179,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 741
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.clubs.cards.push(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 180,
                                                    funcdef: 13,
                                                    col: 49,
                                                    isLast: false,
                                                    nodeID: 741
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 180,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 749
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.clubs.cards.sortCards().reverse();
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 181,
                                                    funcdef: 13,
                                                    col: 62,
                                                    isLast: false,
                                                    nodeID: 749
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 181,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 750
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                break;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 182,
                                                    funcdef: 13,
                                                    col: 29,
                                                    isLast: false,
                                                    nodeID: 750
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }

                                          case 2:
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 182,
                                                funcdef: 13,
                                                col: 20,
                                                isLast: 0,
                                                nodeID: 776
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 183,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 759
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                u.cards.cards.remove(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 184,
                                                    funcdef: 13,
                                                    col: 48,
                                                    isLast: false,
                                                    nodeID: 759
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 184,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 766
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.hearts.cards.push(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 185,
                                                    funcdef: 13,
                                                    col: 50,
                                                    isLast: false,
                                                    nodeID: 766
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 185,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 774
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.hearts.cards.sortCards().reverse();
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 186,
                                                    funcdef: 13,
                                                    col: 63,
                                                    isLast: false,
                                                    nodeID: 774
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 186,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 775
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                break;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 187,
                                                    funcdef: 13,
                                                    col: 29,
                                                    isLast: false,
                                                    nodeID: 775
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }

                                          case 0:
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 187,
                                                funcdef: 13,
                                                col: 20,
                                                isLast: 0,
                                                nodeID: 801
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 188,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 784
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                u.cards.cards.remove(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 189,
                                                    funcdef: 13,
                                                    col: 48,
                                                    isLast: false,
                                                    nodeID: 784
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 189,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 791
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.diamonds.cards.push(rm);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 190,
                                                    funcdef: 13,
                                                    col: 52,
                                                    isLast: false,
                                                    nodeID: 791
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 190,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 799
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                self.diamonds.cards.sortCards().reverse();
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 191,
                                                    funcdef: 13,
                                                    col: 65,
                                                    isLast: false,
                                                    nodeID: 799
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 191,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 800
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                break;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 192,
                                                    funcdef: 13,
                                                    col: 29,
                                                    isLast: false,
                                                    nodeID: 800
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        }
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 193,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: false,
                                            nodeID: 802
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                    {
                                                                                shuff.break_({
                                            ty: 2,
                                            line: 194,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: 0,
                                            nodeID: 846
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                        if (u.cards.cards.length == 0) {
                                                                                        shuff.break_({
                                                ty: 1,
                                                line: 194,
                                                funcdef: 13,
                                                col: 51,
                                                isLast: 0,
                                                nodeID: 845
                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                var goodVar;
                                                eval("goodVar=" + variable);
                                                return goodVar;
                                            });
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 196,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 837
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                for (var i = 0; i < sp.length; i++) {
                                                                                                        shuff.break_({
                                                        ty: 1,
                                                        line: 196,
                                                        funcdef: 13,
                                                        col: 60,
                                                        isLast: 0,
                                                        nodeID: 836
                                                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                        var goodVar;
                                                        eval("goodVar=" + variable);
                                                        return goodVar;
                                                    });
                                                    {
                                                                                                                shuff.break_({
                                                            ty: 2,
                                                            line: 198,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: 0,
                                                            nodeID: 835
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                        if (sp[i].user == u) {
                                                                                                                        shuff.break_({
                                                                ty: 1,
                                                                line: 198,
                                                                funcdef: 13,
                                                                col: 49,
                                                                isLast: 0,
                                                                nodeID: 834
                                                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                var goodVar;
                                                                eval("goodVar=" + variable);
                                                                return goodVar;
                                                            });
                                                            {
                                                                                                                                shuff.break_({
                                                                    ty: 2,
                                                                    line: 199,
                                                                    funcdef: 13,
                                                                    col: 32,
                                                                    isLast: 0,
                                                                    nodeID: 832
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                                sp[i].effects.push("PlayerWon");
                                                                                                                                shuff.break_({
                                                                    ty: 3,
                                                                    line: 200,
                                                                    funcdef: 13,
                                                                    col: 63,
                                                                    isLast: false,
                                                                    nodeID: 832
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                            }
                                                            {
                                                                                                                                shuff.break_({
                                                                    ty: 2,
                                                                    line: 200,
                                                                    funcdef: 13,
                                                                    col: 32,
                                                                    isLast: 0,
                                                                    nodeID: 833
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                                break;
                                                                                                                                shuff.break_({
                                                                    ty: 3,
                                                                    line: 201,
                                                                    funcdef: 13,
                                                                    col: 37,
                                                                    isLast: false,
                                                                    nodeID: 833
                                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                                    var goodVar;
                                                                    eval("goodVar=" + variable);
                                                                    return goodVar;
                                                                });
                                                            }
                                                        }
                                                                                                                shuff.break_({
                                                            ty: 3,
                                                            line: 202,
                                                            funcdef: 13,
                                                            col: 28,
                                                            isLast: false,
                                                            nodeID: 835
                                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                            var goodVar;
                                                            eval("goodVar=" + variable);
                                                            return goodVar;
                                                        });
                                                    }
                                                }
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 203,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: false,
                                                    nodeID: 837
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 203,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 842
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                shuff.declareWinner(u);
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 204,
                                                    funcdef: 13,
                                                    col: 46,
                                                    isLast: false,
                                                    nodeID: 842
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                            {
                                                                                                shuff.break_({
                                                    ty: 2,
                                                    line: 205,
                                                    funcdef: 13,
                                                    col: 24,
                                                    isLast: 0,
                                                    nodeID: 844
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                                return true;
                                                                                                shuff.break_({
                                                    ty: 3,
                                                    line: 206,
                                                    funcdef: 13,
                                                    col: 35,
                                                    isLast: true,
                                                    nodeID: 844
                                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                                    var goodVar;
                                                    eval("goodVar=" + variable);
                                                    return goodVar;
                                                });
                                            }
                                        }
                                                                                shuff.break_({
                                            ty: 3,
                                            line: 207,
                                            funcdef: 13,
                                            col: 20,
                                            isLast: false,
                                            nodeID: 846
                                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                                            var goodVar;
                                            eval("goodVar=" + variable);
                                            return goodVar;
                                        });
                                    }
                                }
                                                                shuff.break_({
                                    ty: 3,
                                    line: 208,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: false,
                                    nodeID: 848
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 208,
                                    funcdef: 13,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 850
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                return false;
                                                                shuff.break_({
                                    ty: 3,
                                    line: 209,
                                    funcdef: 13,
                                    col: 28,
                                    isLast: true,
                                    nodeID: 850
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                        });
                                                shuff.break_({
                            ty: 3,
                            line: 210,
                            funcdef: 3,
                            col: 14,
                            isLast: false,
                            nodeID: 854
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 210,
                            funcdef: 3,
                            col: 12,
                            isLast: 0,
                            nodeID: 859
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        if (result) {
                                                        shuff.break_({
                                ty: 1,
                                line: 210,
                                funcdef: 3,
                                col: 24,
                                isLast: 0,
                                nodeID: 858
                            }, typeof self != "undefined" && self.cardGame, function(variable) {
                                var goodVar;
                                eval("goodVar=" + variable);
                                return goodVar;
                            });
                            {
                                                                shuff.break_({
                                    ty: 2,
                                    line: 211,
                                    funcdef: 3,
                                    col: 16,
                                    isLast: 0,
                                    nodeID: 857
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                                return true;
                                                                shuff.break_({
                                    ty: 3,
                                    line: 212,
                                    funcdef: 3,
                                    col: 27,
                                    isLast: true,
                                    nodeID: 857
                                }, typeof self != "undefined" && self.cardGame, function(variable) {
                                    var goodVar;
                                    eval("goodVar=" + variable);
                                    return goodVar;
                                });
                            }
                        }
                                                shuff.break_({
                            ty: 3,
                            line: 213,
                            funcdef: 3,
                            col: 12,
                            isLast: false,
                            nodeID: 859
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                }
                                shuff.break_({
                    ty: 3,
                    line: 215,
                    funcdef: 3,
                    col: 8,
                    isLast: false,
                    nodeID: 861
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
        };
                shuff.break_({
            ty: 3,
            line: 218,
            funcdef: 1,
            col: 5,
            isLast: false,
            nodeID: 864
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
    }
    {
                shuff.break_({
            ty: 2,
            line: 220,
            funcdef: 1,
            col: 4,
            isLast: 0,
            nodeID: 924
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
        self.shuffle = function(arbs) {
                        shuff.break_({
                ty: 1,
                line: 220,
                funcdef: 15,
                col: 19,
                isLast: 0,
                nodeID: 922
            }, typeof self != "undefined" && self.cardGame, function(variable) {
                var goodVar;
                eval("goodVar=" + variable);
                return goodVar;
            });
            {
                                shuff.break_({
                    ty: 2,
                    line: 221,
                    funcdef: 15,
                    col: 8,
                    isLast: 0,
                    nodeID: 871
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                var indes = 0;
                                shuff.break_({
                    ty: 3,
                    line: 222,
                    funcdef: 15,
                    col: 21,
                    isLast: false,
                    nodeID: 871
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 222,
                    funcdef: 15,
                    col: 8,
                    isLast: 0,
                    nodeID: 879
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                var vafb = _.clone(arbs);
                                shuff.break_({
                    ty: 3,
                    line: 223,
                    funcdef: 15,
                    col: 32,
                    isLast: false,
                    nodeID: 879
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 224,
                    funcdef: 15,
                    col: 8,
                    isLast: 0,
                    nodeID: 915
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                vafb.foreach(function(fs) {
                                        shuff.break_({
                        ty: 1,
                        line: 224,
                        funcdef: 16,
                        col: 21,
                        isLast: 0,
                        nodeID: 913
                    }, typeof self != "undefined" && self.cardGame, function(variable) {
                        var goodVar;
                        eval("goodVar=" + variable);
                        return goodVar;
                    });
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 225,
                            funcdef: 16,
                            col: 12,
                            isLast: 0,
                            nodeID: 894
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        var vm = _.floor(_.random() * vafb.length);
                                                shuff.break_({
                            ty: 3,
                            line: 226,
                            funcdef: 16,
                            col: 54,
                            isLast: false,
                            nodeID: 894
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 226,
                            funcdef: 16,
                            col: 12,
                            isLast: 0,
                            nodeID: 903
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        vafb[indes] = vafb[vm];
                                                shuff.break_({
                            ty: 3,
                            line: 227,
                            funcdef: 16,
                            col: 34,
                            isLast: false,
                            nodeID: 903
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 227,
                            funcdef: 16,
                            col: 12,
                            isLast: 0,
                            nodeID: 906
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        indes++;
                                                shuff.break_({
                            ty: 3,
                            line: 228,
                            funcdef: 16,
                            col: 19,
                            isLast: false,
                            nodeID: 906
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                    {
                                                shuff.break_({
                            ty: 2,
                            line: 228,
                            funcdef: 16,
                            col: 12,
                            isLast: 0,
                            nodeID: 912
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                        vafb[vm] = fs;
                                                shuff.break_({
                            ty: 3,
                            line: 229,
                            funcdef: 16,
                            col: 25,
                            isLast: true,
                            nodeID: 912
                        }, typeof self != "undefined" && self.cardGame, function(variable) {
                            var goodVar;
                            eval("goodVar=" + variable);
                            return goodVar;
                        });
                    }
                });
                                shuff.break_({
                    ty: 3,
                    line: 230,
                    funcdef: 15,
                    col: 10,
                    isLast: false,
                    nodeID: 915
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 231,
                    funcdef: 15,
                    col: 8,
                    isLast: 0,
                    nodeID: 919
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                arbs = vafb;
                                shuff.break_({
                    ty: 3,
                    line: 232,
                    funcdef: 15,
                    col: 19,
                    isLast: false,
                    nodeID: 919
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
            {
                                shuff.break_({
                    ty: 2,
                    line: 233,
                    funcdef: 15,
                    col: 8,
                    isLast: 0,
                    nodeID: 921
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
                return arbs;
                                shuff.break_({
                    ty: 3,
                    line: 234,
                    funcdef: 15,
                    col: 19,
                    isLast: true,
                    nodeID: 921
                }, typeof self != "undefined" && self.cardGame, function(variable) {
                    var goodVar;
                    eval("goodVar=" + variable);
                    return goodVar;
                });
            }
        };
                shuff.break_({
            ty: 3,
            line: 235,
            funcdef: 1,
            col: 5,
            isLast: false,
            nodeID: 924
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
    }
    {
                shuff.break_({
            ty: 2,
            line: 235,
            funcdef: 1,
            col: 4,
            isLast: 0,
            nodeID: 926
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
        return self;
                shuff.break_({
            ty: 3,
            line: 236,
            funcdef: 1,
            col: 15,
            isLast: true,
            nodeID: 926
        }, typeof self != "undefined" && self.cardGame, function(variable) {
            var goodVar;
            eval("goodVar=" + variable);
            return goodVar;
        });
    }
}

