module.exports = BlackJack = function() {
    var self = this;
    self.dealer = new Pile('dealer');

    self.cardGame = new CardGame({ numberOfCards: 52 });

    self.constructor = function() {
        self.cardGame.spaces.push(new TableSpace({
            visible: true,
            vertical: false,
            stack: false,
            name: 'Dealer',
            x: 8,
            y: 3,
            width: 5,
            height: 0,
            pile: self.dealer,
            numberOfCardsHorizontal: -1,
            numberOfCardsVertical: 1,
            resizeType: 1//todo:::'static'
        }));

        self.cardGame.textAreas.push(new TableTextArea({
            name: 'dealerText',
            x: 8,
            y: 3,
            text: 'Dealer'
        }));
    };
    
    function findSpaceByUser(user) {
        for (var i = 0; i < self.cardGame.spaces.length; i++) {
            if (self.cardGame.spaces[i].user == user) {
                return self.cardGame.spaces[i];
            }
        }
        return null;
    }

    self.createUser = function(user, userIndex, text) {
        var sp;
        var tta;
        //console.log("Create User " + userIndex);
        user.userIndex = userIndex;
        self.cardGame.spaces.push(sp = new TableSpace({
            vertical: false,
            visible: true,
            stack: false,
            name: 'User' + userIndex,
            width: 2,
            height: 0,
            bend: true,
        }));
        self.cardGame.textAreas.push(tta = new TableTextArea({
            name: 'Text' + userIndex,
            text: text
        }));
        sp.user = user;
        
        sp.x = (~~(userIndex/2)) * 5 + 2;
        sp.y = ((userIndex%2)==0?3:0) +12;

        var textArea = tta;
        textArea.x = sp.x;
        textArea.y = sp.y - 1;
        return sp;
    };

    function evaluateBlackJackHand(user) {
        var cards = user.cards.cards;

        var val = 0;
        for (var c = 0; c < cards.length; c++) {
            shuff.log('cc  ' + (cards[c].value + 1));
            val += cards[c].value + 1;
        }
//        shuff.log('user ' + JSON.stringify(cards));

        shuff.log('cc  ' + cards.length);
        var answers = [];


        answers.push('Stay');

        var pile = findSpaceByUser(user);

        if (val < 17) {
            answers.push('Hit');
            answers.push('Double Down');
        pile.appearance.effects.push(new Effect$Highlight({
                radius: val*4,
                color: 'rgba(0,241,58,0.7)',
                opacity: .5
            }));
            
            } else {
            shuff.log("Bust!!!");
            pile.appearance.effects.push(new Effect$Highlight({
                radius: 30,
                color: 'rgba(255,0,24,0.7)',
                opacity: .5
            }));
            

            return;
        }

        if (cards[0].value == cards[1].value)
            answers.push('Split');


        shuff.log('asking question');
        var de = shuff.askQuestion(user, 'What is your action?', answers, self.cardGame);

        shuff.log('user ' + user.name + " " + val + " " + answers[de]);


        switch (answers[de]) {
        case 'Stay':
            return;
        case 'Hit':
            user.cards.cards.push(self.cardGame.deck.cards[0]);
            self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);

            evaluateBlackJackHand(user);
            break;
        case 'Double Down':
            user.cards.cards.push(self.cardGame.deck.cards[0]);
            self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
        //bet *=2
        case 'Split':
            //lol
            break;
        }
    }

    function evaluateDealerHand(dealerPile) {
        var cards = dealerPile.cards;


        var val = 0;
        for (var c = 0; c < cards.length; c++) {
            val += cards[c].value;
        }
        shuff.log('dealer has ' + val);
    }


    self.runGame = function() {
        if (!self.cardGame.users || self.cardGame.users.length == 0) {
            console.log("baaad");
            return true;
        }
        _.numbers(1, 20).foreach(function() {
            self.cardGame.deck.cards = self.shuffle(self.cardGame.deck.cards);
        });

        self.cardGame.users.foreach(function(u, ind) {
            shuff.log('::' + u.userName);
            var sp = self.createUser(u, ind, u.userName);
            sp.pile = u.cards;
        });


        self.dealer.cards.push(self.cardGame.deck.cards[0]);
        self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
        self.cardGame.users.foreach(function(u) {
            if (self.cardGame.deck.cards.length > 0) {
                u.cards.cards.push(self.cardGame.deck.cards[0]);
                self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
            }
        });

        self.dealer.cards.push(self.cardGame.deck.cards[0]);
        self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
        self.cardGame.users.foreach(function(u) {
            if (self.cardGame.deck.cards.length > 0) {
                u.cards.cards.push(self.cardGame.deck.cards[0]);
                self.cardGame.deck.cards.remove(self.cardGame.deck.cards[0]);
            }
        });

        
        self.cardGame.users.foreach(function(u) {
            evaluateBlackJackHand(u);         
 

        });

        evaluateDealerHand(self.dealer);
        
                        shuff.declareWinner(self.cardGame.users[0]);
        return true;
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

    console.log('thiaas(');
    return self;
};