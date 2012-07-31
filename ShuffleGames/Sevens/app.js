﻿
module.exports = Sevens = function () {
    var self = this;
    self.spades = new Pile('spades');
    self.clubs = new Pile('clubs');
    self.hearts = new Pile('hearts');
    self.diamonds = new Pile('diamonds');

    self.cardGame = new CardGame({ numberOfCards: 52 });

    self.constructor = function () {

        self.cardGame.spaces.push(new TableSpace({
            visible: true,
            vertical: true,
            stack: false,
            name: 'Clubs',
            x: 5,
            y: 3,
            width: 0,
            height: 6,
            pile: self.clubs,
            numberOfCardsHorizontal: 1,
            numberOfCardsVertical: -1,
            resizeType:'static'
        }));
        self.cardGame.spaces.push(new TableSpace({
            visible: true,
            vertical: true,
            stack: false,
            name: 'Hearts',
            x: 7,
            y: 3,
            width: 0,
            height: 6,
            pile: self.hearts,
            numberOfCardsHorizontal: 1,
            numberOfCardsVertical: -1,
            resizeType:'static'
        }));
        self.cardGame.spaces.push(new TableSpace({
            visible: true,
            vertical: true,
            stack: false,
            name: 'Diamonds',
            x: 9,
            y: 3,
            width: 0,
            height: 6,
            pile: self.diamonds,
            numberOfCardsHorizontal: 1,
            numberOfCardsVertical: -1,
            resizeType:'static'
        }));
        self.cardGame.spaces.push(new TableSpace({
            visible: true,
            vertical: true,
            stack: false,
            name: 'Spades',
            x: 11,
            y: 3,
            width: 0,
            height: 6,
            pile: self.spades,
            numberOfCardsHorizontal: 1,
            numberOfCardsVertical: -1,
            resizeType:'static'
        }));

        self.cardGame.textAreas.push(new TableTextArea({
            name: 'SpadesText',
            x: 5,
            y: 3,
            text: 'Clubs'
        }));
        self.cardGame.textAreas.push(new TableTextArea({
            name: 'HeartsText',
            x: 7,
            y: 3,
            text: 'Hearts'
        }));
        self.cardGame.textAreas.push(new TableTextArea({
            name: 'DiamondsText',
            x: 9,
            y: 3,
            text: 'Diamonds'
        }));
        self.cardGame.textAreas.push(new TableTextArea({
            name: 'SpadesText',
            x: 11,
            y: 3,
            text: 'Spades'
        }));
    };
    self.createUser = function (user,userIndex, text) {
        var sp;
        var tta;
        //console.log("Create User " + userIndex);
        user.userIndex = userIndex;
        switch (userIndex) {
            case 0:
            case 1:
            case 3:
            case 4:
                self.cardGame.spaces.push(sp = new TableSpace({
                    vertical: false,
                    visible: true,
                    stack: false,
                    name: 'User' + userIndex,
                    width: 3,
                    height: 0,
                    bend: true,
                }));
                self.cardGame.textAreas.push(tta = new TableTextArea({
                    name: 'Text' + userIndex,
                    text: text
                }));
                break;
            case 2:
            case 5:
                var rotate = 0;
                if (userIndex == 2) {
                    rotate = -90;
                } else {
                    rotate = -90;
                }
                self.cardGame.spaces.push(sp = new TableSpace({
                    vertical: true,
                    visible: true,
                    stack: false,
                    name: 'User' + userIndex,
                    width: 0,
                    rotate: rotate,
                    height: 3,
                    bend: true
                }));
                self.cardGame.textAreas.push(tta = new TableTextArea({ name: 'Text' + userIndex, text: text }));
                break;
        }
        sp.user = user;
        sp.effects.push(new Effect$Bend({ degrees:  userIndex > 2 ? -10 : 10 }));
        
        var space = sp;
        switch (userIndex) {
            case 0:
                space.x = 4;
                space.y = 1;
                break;
            case 1:
                space.x = 8;
                space.y = 1;
                break;
            case 2:
                space.x = 13;
                space.y = 4;
                break;
            case 3:
                space.x = 8;
                space.y = 11;
                break;
            case 4:
                space.x = 4;
                space.y = 11;
                break;
            case 5:
                space.x = 3;
                space.y = 4;
                break;
        }
        var textArea = tta;
        textArea.x = space.x;
        textArea.y = space.y - 1;
        return sp;
    };

    self.runGame = function () {
        if (!self.cardGame.users || self.cardGame.users.length == 0) {
            console.log("baaad");
            return true;
        }
        _.numbers(1, 20).foreach(function () {
            self.cardGame.deck.cards = self.shuffle(self.cardGame.deck.cards);
        });

        self.cardGame.users.foreach(function (u, ind) {
                shuff.log('::'+u.userName);
            
            var sp = self.createUser(u,ind, u.userName);
            sp.pile = u.cards;
        });


        while (self.cardGame.deck.cards.length > 0) {
            self.cardGame.users.foreach(function (u) {
                if (self.cardGame.deck.cards.length > 0) {
                    u.cards.cards.push(self.cardGame.deck.cards[0]);
                    self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
                }
            });
        }


        self.cardGame.users.foreach(function (u) {
            u.cards.cards.sortCards();
        });

        var CardTypes = ['Diamonds', 'Clubs', 'Hearts', 'Spades'];
        var CardNames = ['Ace', 'Deuce', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];

        while (true) {
            var result = self.cardGame.users.foreach(function (u) {

                var usable = u.cards.cards.where(function (c) {
                    return (c.type == 3 && (c.value == 6 || self.spades.cards.any(function (_c) {
                        return _c.value == c.value + 1 || _c.value == c.value - 1;
                    }))) ||
                        (c.type == 1 && (c.value == 6 || self.clubs.cards.any(function (_c) {
                            return _c.value == c.value + 1 || _c.value == c.value - 1;
                        }))) ||
                            (c.type == 2 && (c.value == 6 || self.hearts.cards.any(function (_c) {
                                return _c.value == c.value + 1 || _c.value == c.value - 1;
                            }))) ||
                                (c.type == 0 && (c.value == 6 || self.diamonds.cards.any(function (_c) {
                                    return _c.value == c.value + 1 || _c.value == c.value - 1;
                                })));
                });
                var answers = [];
                answers.push('Skip');
                usable.sortCards().foreach(function (card) {
                    answers.push(CardNames[card.value] + ' Of ' + CardTypes[card.type]);
                });


                var sp = self.cardGame.spaces;
                for (var i = 0; i < sp.length; i++) {
                    //sp[i].rotate += 10;

                        sp[i].effects = [];
                    

                    if(sp[i].user==u) {
                        if(usable.length==0) {
                            sp[i].effects.push(new Effect$Highlight({
                                radius: 70,
                                color: 'rgba(255,0,84,0.7)',
                                opacity: .7
                            }));
                        }else {
                            sp[i].effects.push(new Effect$Highlight({
                                radius: 70,
                                color: 'rgba(112,255,84,0.7)',
                                opacity: .7
                            }));
                        }
                    }
                    if(!sp[i].user) {
                        var op = sp[i].pile.cards.length/13;
                            
                        var red = "112";
                        if(sp[i].pile.cards.length==13) {
                            red = "255";
                        } 

                        sp[i].effects.push(new Effect$Highlight({
                            radius: 25+sp[i].pile.cards.length*2,
                            color: 'rgba('+red+',12,'+parseInt(op*255)+','+op+')',
                            opacity: op
                        }));   
                    }else {
                        sp[i].effects.push(new Effect$Bend({ degrees: sp[i].user.userIndex > 2 ? -10 : 10 }));

                    }
                    
                    for (var ij = 0; ij < sp[i].pile.cards.length; ij++) {
                        var card = sp[i].pile.cards[ij];
                        card.effects = [];

                        if(card.value==6 && !sp[i].user) {
                              card.effects.push(new Effect$Rotate({
                                    degrees: 90,
                                }));
                        }

                        for (var j = 0; j < usable.length; j++) {
                            var m = usable[j];
                            if (m.value == card.value && m.type == card.type) {
                                card.effects.push(new Effect$Highlight({
                                    radius: 14,
                                    color: 'rgba(255,11,84,0.55)',
                                    opacity: .55
                                }));
                                break; ;
                            }
                        }
                        if(card.effects.length==10) {
                            card.effects.push(new Effect$Highlight({
                                radius: Math.random() * 6,
                                color: 'rgba(114,255,84,0.2)',
                                opacity: .20
                            }));

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
                                  sp[i].effects.push(new Effect$Highlight({
                                      radius: 100,
                                      color: 'rgba(255,255,255,0.7)',
                                      opacity: .7
                                  }));
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


    self.shuffle = function (arbs) {
        var indes = 0;
        var vafb = _.clone(arbs);

        vafb.foreach(function (fs) {
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