   
module.exports = Sevens = function() {
    var self = this;
    self.cardGame = new CardGame( );

    self.constructor = function () {

        self.spades = new Pile('spades');
        self.clubs = new Pile('clubs');
        self.hearts = new Pile('hearts');
        self.diamonds = new Pile('diamonds');

        self.cardGame.getSpaceByName('clubs').applyPile(self.clubs);
        self.cardGame.getSpaceByName('spades').applyPile(self.spades);
        self.cardGame.getSpaceByName('hearts').applyPile(self.hearts);
        self.cardGame.getSpaceByName('diamonds').applyPile(self.diamonds);
         
    }; 

    self.runGame = function () {
        debugger;

        if (!self.cardGame.users || self.cardGame.users.length == 0) {
            console.log("baaad");
            return true;
        }
        _.numbers(1, 20).foreach(function() {
            self.cardGame.deck.cards = self.shuffle(self.cardGame.deck.cards);
        });

        self.cardGame.users.foreach(function(u, ind) {
            shuff.log('::' + u.userName);

            self.cardGame.getSpaceByName('User' + ind).applyPile(u.cards); 
            self.cardGame.getTextByName('User' + ind).text = u.userName; 
        });


        while (self.cardGame.deck.cards.length > 0) {
            self.cardGame.users.foreach(function(u) {
                if (self.cardGame.deck.cards.length > 0) {
                    u.cards.cards.push(self.cardGame.deck.cards[0]);
                    self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
                }
            });
        }


        self.cardGame.users.foreach(function(u) {
            u.cards.cards.sortCards();
        });

        var CardTypes = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
        var CardNames = ['Ace', 'Deuce', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];

        while (true) {
            var result = self.cardGame.users.foreach(function(u) {

                var usable = u.cards.cards.where(function(c) {
                    return (c.type == 3 && (c.value == 6 || self.spades.cards.any(function(_c) {
                        return _c.value == c.value + 1 || _c.value == c.value - 1;
                    }))) ||
                    (c.type == 1 && (c.value == 6 || self.clubs.cards.any(function(_c) {
                        return _c.value == c.value + 1 || _c.value == c.value - 1;
                    }))) ||
                    (c.type == 2 && (c.value == 6 || self.hearts.cards.any(function(_c) {
                        return _c.value == c.value + 1 || _c.value == c.value - 1;
                    }))) ||
                    (c.type == 0 && (c.value == 6 || self.diamonds.cards.any(function(_c) {
                        return _c.value == c.value + 1 || _c.value == c.value - 1;
                    })));
                });
                var answers = [];
                answers.push('Skip');
                usable.sortCards().foreach(function(card) {
                    answers.push(CardNames[card.value] + ' Of ' + CardTypes[card.type]);
                });

                debugger;
                var sp = self.cardGame.spaces;
                for (var i = 0; i < sp.length; i++) {
                    //sp[i].rotate += 10;

                    sp[i].effects = [];


                    if (sp[i].user == u) {
                        if (usable.length == 0) {
                            sp[i].effects.push("CurrentPlayerNoCards");
                        } else {

                            sp[i].effects.push("CurrentPlayer");
                        }
                    } else if (sp[i].user) {
                        sp[i].effects.push("InactivePlayer");

                    }


                    if (!sp[i].user) {
                        //25 + sp[i].pile.cards.length * 2
                        sp[i].effects.push("CenterPiles");
                    } else {
                        sp[i].effects.push("Bend");
                    }

                    for (var ij = 0; ij < sp[i].pile.cards.length; ij++) {
                        var card = sp[i].pile.cards[ij];
                        card.effects = [];
                        /*

                        card.appearance.addEffect(new AnimatedEffect$Between(
                            {
                                from: { outer: { border: { all: "solid 2px black" }, padding: { all: "32px" }, } },
                                to: { outer: { border: { all: "solid 10px black" }, padding: { all: "12px" }, } }
                            }, 1000, "linear"
                        )).chainEffect(new AnimatedEffect$Between(
                            {
                                from: { outer: { rotate: 45, } },
                                to: { outer: { rotate: 97 } }
                            }, 1000, "linear"
                        )).chainEffect(new AnimatedEffect$Between(
                            {
                                from: { outer: { backColor: "#FFF", padding: { all: "52px" }, } },
                                to: { outer: { backColor: "#DD1", padding: { all: "12px" }, } }
                            }, 1000, "linear"
                        )).chainEffect(new Effect$Highlight({
                                radius: 19,
                                color: 'rgba(1,1,1,0.22)',
                                opacity: .55
                            }
                        )).chainEffect(new Effect$StyleProperty({ outer: { backColor: "#11F" } })).chainEffect(new AnimatedEffect$Between(
                            {
                                from: { outer: { rotate: 45, } },
                                to: { outer: { rotate:97 } }
                            }, 1000, "linear"
                        ));

                        card.addAction(new Action$CardDraggable({ droppableSpaces: [sp[i]], droppableLocations: [{ x: 0, y: 0, width: 1, height: 1 }] }));
                            
                            
                            

                        if(card.value==6 && !sp[i].user) {
                        card.appearance.effects.push(new Effect$StyleProperty({outer:{border:{all:"solid 2px black"},padding:{all:"2px"},}}));
                             
                        }*/

                        if (card.value == 6 && !sp[i].user) {

                            card.effects.push("Seven");
                        }

                        for (var j = 0; j < usable.length; j++) {
                            var m = usable[j];
                            if (m.value == card.value && m.type == card.type) {
                                card.effects.push("PlayableCard");
                                break;
                            }
                        }


                    }
                }


                shuff.log('asking question');
                var de = shuff.askQuestion(u, 'Which card would you like to play?', answers, self.cardGame);
                shuff.log('asked question: ' + de);

                if (de > 0 && usable.length >= de) {
                    var rm = usable[de - 1]; 

                    switch (rm.type) {
                    case 3:
                        u.cards.cards.remove(rm);
                        self.spades.cards.push(rm);
                        self.spades.cards.sortCards().reverse();
                        break;
                    case 1:
                        u.cards.cards.remove(rm);
                        self.clubs.cards.push(rm);
                        self.clubs.cards.sortCards().reverse();
                        break;
                    case 2:
                        u.cards.cards.remove(rm);
                        self.hearts.cards.push(rm);
                        self.hearts.cards.sortCards().reverse();
                        break;
                    case 0:
                        u.cards.cards.remove(rm);
                        self.diamonds.cards.push(rm);
                        self.diamonds.cards.sortCards().reverse();
                        break;
                    }

                    if (u.cards.cards.length == 0) {

                        for (var i = 0; i < sp.length; i++) {

                            if (sp[i].user == u) {
                                sp[i].effects.push("PlayerWon");
                                break;
                            }
                        }
                        shuff.declareWinner(u);

                        return true;
                    }
                }
                return false;
            });
            if (result) {
                return true;
            }

        }


    };


    self.shuffle = function(arbs) {
        var indes = 0;
        var vafb = _.clone(arbs);

        vafb.foreach(function(fs) {
            var vm = _.floor(_.random() * vafb.length);
            vafb[indes] = vafb[vm];
            indes++;
            vafb[vm] = fs;
        });

        arbs = vafb;

        return arbs;
    };
    return self;
};