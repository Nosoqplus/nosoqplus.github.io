
class Interactable{
    constructor(positionX, positioinY, action){
        this.x = positionX;
        this.y = positioinY;
        this.onInteract = action;
    }
}

class InteractableArea extends Interactable{
    constructor(positionX, positioinY, width, height, action){
        super(positionX, positioinY, action);
        this.width = width;
        this.height = height;
    }
}

class Map{
    constructor(tiles, interactables, onUpdate, onInitialLoad){
        this.tiles = tiles;
        this.interactables = interactables ? interactables : {};
        this.onUpdate = onUpdate ? onUpdate : () => {};
        this.onInitialLoad = onInitialLoad ? onInitialLoad : () => {};
    }
}

function changeMapWithFadeIn(map, playerDirection, x, y){
    window.addAnimation('fadeIn', {
        animationLength: 500,
        onAnimationEnd: () => {
            window.changeMap(map);
            window.movePlayer(playerDirection, x, y);
        }
    })
}


const solidTiles = [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41, 42, 43, 45, 46, 46, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63];

window.isSolid = function(tileX, tileY){
    try{
        return solidTiles.includes(window.currentMap.tiles[tileY][tileX]);
    }catch{}
}


window.maps = {
    enterence: new Map(window.tiles.enterence,
{
    sign: new Interactable(13, 11, ()=> {
        window.addPhraseToQueue('На знаке написано: Кто прочитал, тот гей.');
        window.addPhraseToQueue('Сука', 'larry');
        window.addPhraseToQueue('Да иди нахуй', 'larry');
    }),
    spruce: new Interactable(10, 12, ()=> 
        {
            window.addPhraseToQueue('Привет', 'larry');
            window.addPhraseToQueue('Привет', 'spruce');
        }),
    spruce2: new Interactable(7, 12, ()=> 
        {
            window.addPhraseToQueue('Пиздец... Это тоже елка', 'larry');
            window.addPhraseToQueue('Но у этой иголки подлиньше', 'larry');
        }),
    larry: new Interactable(15, 5, ()=> 
        {
            window.addPhraseToQueue('Почему все путают нас с тобой?', 'larry');
            window.addPhraseToQueue('А ты не знаешь?', 'larry');
            window.addPhraseToQueue('Нет, не знаю', 'larry');
            window.addPhraseToQueue('Нет, знаешь', 'larry');
            window.addPhraseToQueue('Мы - один человек?', 'larry', () => {
                maps.enterence.onUpdate = () => {};
                delete maps.enterence.interactables.larry;
            });
            window.addPhraseToQueue('...', 'larry');


            
        }),
    exitArea1: new InteractableArea(0, 15, 0, 5,  ()=> {
            window.addPhraseToQueue('Не стоит уходить пока', 'larry');
        }),
    exitArea2: new InteractableArea(0, 19, 29, 0,  ()=> {
            window.addPhraseToQueue('Мне стоит собрать яйца в кулак. И очень сильно сжать.', 'larry');
        }),
    exitArea3: new InteractableArea(30, 15, 0, 5,  ()=> {
            window.addPhraseToQueue('Только трусы сдаются без боя.', 'larry');
        }),

    // LOCATION ENTERENCES
    enterenceLeftArea: new InteractableArea(0, 10, 0, 5, () => {
            window.addAnimation('fadeIn', 
                {
                    name: 'locationChange', 
                    animationLength: 500,
                    onAnimationEnd: () => {
                        window.changeMap('enterenceLeft');
                        window.movePlayer('left' ,29, 15);

                        window.currentSong = 'BreakCore1';
                    }
                });
        })
}, 
    () => {
        window.ctx.drawImage(window.images.entities.larry.down, 15 * window.TILE, 5 * window.TILE);
    },
    () => {
        window.createAnimation({
                    name: 'larry',
                    animationLength: 100,
                    repeatable: false,
                }, 
                ()=> {
                    const currentAnimation = window.getAnimationObject('larry')

                    if(currentAnimation.timesRepeated % 2 > 0){
                        window.ctx.drawImage(window.images.entities.larry.down, window.gameEvents.hasDick ? 100 : 50, 100);
                    }else{
                        window.ctx.drawImage(window.images.entities.larry.up, 100, 100);
                    }
                })
    }
),

enterenceLeft: new Map(window.tiles.enterenceLeft,


{
    animatedLarry: new Interactable(20, 20, ()=> {
        if(window.gameEvents.hasDick === true){
            if(window.gameEvents.isLarry){
                window.addPhraseToQueue('Этот Ларри не хочет разговаривать, даже не смотря на то, что ты Ларри');
                
                window.addAnimation('glitch', {
                    name: 'Larry glitch',
                    repeatable: true,
                    animationLength: 100,
                    position: {
                        x: 20,
                        y: 20,
                    },
                    size: {
                        width: 1,
                        height: 1,
                    }
                });
            }else{
                window.addPhraseToQueue('Ты должен быть Ларри, чтобы говорить с Ларри');
            }
        }
    }),
    
},

() => {},

() => {
    window.createAnimation({
            name: 'larry',
            animationLength: 1000,
            repeatable: true,
        }, 
        ()=> {
            const currentAnimation = window.getAnimationObject('larry')

            if(currentAnimation.timesRepeated % 2 > 0){
                window.ctx.drawImage(window.images.entities.larry.down, 20 * window.TILE, 20 * window.TILE);
            }else{
                window.ctx.drawImage(window.images.entities.larry.up, 20 * window.TILE, 20 * window.TILE);

            }
        });
    },
),

    // INTRO ===================================================================================================

    // BEACH 1 ===============================================================================================
    beach1: new Map(window.tiles.beach1,
        {
            ml: new Interactable(10, 10, ()=> {
                if(window.gameEvents.bagTaken === false){
                    window.addPhraseToQueue('Привет, Ларри', 'ml');
                    window.addPhraseToQueue('Ghbdtn? ljhjufz', 'larry');
                    window.addPhraseToQueue('Че? По-русски говори', 'ml');
                    window.addPhraseToQueue('П-п-привет...', 'larry');
                    window.addPhraseToQueue('Вот так то лучше', 'ml');
                    window.addPhraseToQueue('Слушай, я оставила сумку на пляже. Розовенькая такая, с блестками.', 'ml');
                    window.addPhraseToQueue('Не мог бы ты мне ее принести?', 'ml');
                    window.addPhraseToQueue('Мгм...', 'larry');
                    window.addPhraseToQueue('Голос, шавка', 'ml');
                    window.addPhraseToQueue('СЭР ДА СЭР', 'larry');
                    window.addPhraseToQueue('Буду ждать тебя в пещере, как и договаривались', 'ml');
    
                    window.maps.beach1.interactables.exitArea4 = new InteractableArea(15, 0, 1, 10, ()=> {
                        changeMapWithFadeIn('beach2', 'right' ,1, 9)
                    });
                }
            }),

            exitArea1: new InteractableArea(0, 0, 0, 16, ()=> {
                window.addPhraseToQueue('Мне туда не нужно', 'larry');
            }),
            exitArea2: new InteractableArea(0, 15, 16, 1, ()=> {
                window.addPhraseToQueue('Мне туда не нужно', 'larry');
            }),
            exitArea3: new InteractableArea(16, 6, 1, 10, ()=> {
                window.addPhraseToQueue('Мне туда не нужно', 'larry');
            }),
            exitArea4: new InteractableArea(15, 0, 1, 10, ()=> {
                window.addPhraseToQueue('Мне туда не нужно (пока)', 'larry');
            }),
        },
        () => {
            if(window.gameEvents.bagTaken === false){
                window.ctx.drawImage(window.images.entities.ml.left, 10 * window.TILE, 10 * window.TILE);
            }
        }
    ),
    
    // BEACH 2 =================================================================================================
    beach2: new Map(window.tiles.beach2,
        {
            mrPenis: new InteractableArea( 5, 5, 1, 10, ()=> {
                window.addPhraseToQueue('Добрый господин, не могли бы вы подать мне мелочи?...', 'mrpenis');
                window.addPhraseToQueue('С чего бы? Иди работай', 'larry');
                window.addPhraseToQueue('Я не могу... Я в тяжелом положении', 'mrpenis');
                window.addPhraseToQueue('Все конечности у тебя на месте', 'larry');
                window.addPhraseToQueue('Можете не верить, но я не вру. У меня диагностирован рак 5 степени.', 'mrpenis');
                window.addPhraseToQueue('И во что еще труднее поверить - он излечим', 'mrpenis');
                window.addPhraseToQueue('Поэтому я собираю деньги, поэтому у меня есть смысл бороться', 'mrpenis');
                window.addPhraseToQueue('...', 'larry');
                window.addPhraseToQueue('ЕБАТЬ ТЫ ЛОХ ААХХХАХАХАХАХАХАХА', 'larry');
                window.addPhraseToQueue('Съеби в страхе, пока я не заставил твой рак сбежать в море к другим ракам', 'larry');

                window.addPhraseToQueue('Я отомщу...', 'mrpenis', ()=> {
                    window.maps.beach2.onUpdate = () => {
                        window.ctx.drawImage(window.images.other.bag, 14 * window.TILE, 7 * window.TILE);
                        
                    };
                    delete window.maps.beach2.interactables.mrPenis;
                });
                
            }),
            
            bag: new Interactable(14, 7, ()=> {
                window.gameEvents.bagTaken = true;
                window.maps.beach2.onUpdate = () => {};
                delete window.maps.beach2.interactables.bag;
                delete window.maps.beach1.interactables.ml;

                window.maps.beach1.interactables['caveEnter'] = new Interactable(13, 9, ()=> {
                    window.changeMap('cave');
                    window.movePlayer('up', 8, 14);

                    window.setMusic('SadSong');
                    window.forceMusicChange();
                })
            }),

            exitArea1: new InteractableArea(0, 0, 1, 16, ()=> {
                changeMapWithFadeIn('beach1', 'left', 15, 2);
            }),
            exitArea2: new InteractableArea(16, 0, 1, 16, ()=> {
                
                if(!window.gameEvents.bagTaken){
                    window.addPhraseToQueue('Нахуя? Сумка же тут.', 'larry');
                }else{
                    window.addPhraseToQueue('Нужно вернутся к М.Л.', 'larry');
                }
            }),
        },
        () => {
            window.ctx.drawImage(window.images.entities.mrpenis.left, 5 * window.TILE, 9 * window.TILE);
            window.ctx.drawImage(window.images.other.bag, 14 * window.TILE, 7 * window.TILE);
        }
    ),

    // CAVE ===============================================================================================================
    cave: new Map(window.tiles.cave,
        {
            exitArea1: new InteractableArea(0, 15, 16, 0, ()=> {
                window.addPhraseToQueue('Что это там лежит?', 'larry');
            }),
            
            letter: new Interactable(8, 8, ()=> {
                window.addPhraseToQueue('Ларри поднимает письмо, написанное очень агрессивным почерком.');
                window.addPhraseToQueue('Здравствуй. Хочу уведомить, что твоя невеста теперь у меня в заложниках', 'letter');
                window.addPhraseToQueue('Так же я забрал твою машину. Такая развалюха.', 'letter');
                window.addPhraseToQueue('И твой дом я забрал. Хватило одного звонка юристам, чтобы он стал моим.', 'letter');
                window.addPhraseToQueue('И твою ипотеку я тоже забрал!!!', 'letter');
                window.addPhraseToQueue('Какая жалость, да? Уже предвижу, как ты надул губки, черножопая гнида.', 'letter');
                window.addPhraseToQueue('Последние строки письма: С ненавистью, от Мистера П.');
                window.addPhraseToQueue('Что же мне теперь делать?..', 'larry', ()=> {
                    window.addAnimation('fadeIn', {
                        animationLength: 8000,
                        onAnimationEnd: () => {
                            window.changeMap('forest1');
                            window.movePlayer('up', 16, 28);
                            window.addPhraseToQueue('Прошло пару дней');
                            window.addPhraseToQueue('Кажется, я наконец-то нашел место, куда забрали мою М.Л.', 'larry');
                            window.addPhraseToQueue('Это не просто гнев...', 'larry');
                            window.addPhraseToQueue('То, что живет во мне...', 'larry');

                            window.setMusic('ForestTheme');
                        }
                    })
                });

            }),
        },
        () => {
            window.ctx.drawImage(window.images.other.letter, 8 * window.TILE, 8 * window.TILE);
        }

    ),


    // MAIN GAME ============================================================================

    // FOREST 1 ==============================================================================
    forest1: new Map (window.tiles.forest1,
        {
            stone: new Interactable(16, 19, ()=> {
                window.addPhraseToQueue('Это ДжоДжо референс?', 'larry');
            }),

            sing1: new Interactable(13, 27, ()=> {
                
                window.addPhraseToQueue('Ты отсюда пришел. Забыл?', 'sign');
                
                if(window.gameEvents.sing1Intracted){
                    return;
                }
                window.gameEvents.gaslightingSigns++;
                window.gameEvents.sing1Intracted = true;
                
                if(window.gameEvents.gaslightingSigns === 2){
                    window.addPhraseToQueue('Эй, я не отсюда пришел!', 'larry');
                    window.addPhraseToQueue('Ебаные знаки меня газлайтят', 'larry');

                    window.gameEvents.sing1Intracted = false;
                    window.gameEvents.sing2Intracted = false;
                    window.gameEvents.sing3Intracted = false;
                    window.gameEvents.sing4Intracted = false;
                }

                if(window.gameEvents.gaslightingSigns === 3){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Лично я не пизжу, честно честно', 'sign');
                    window.addPhraseToQueue('Не верю я вам больше', 'larry');
                }

                if(window.gameEvents.gaslightingSigns === 4){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Мухахаха. Как тебе моя новейшая разработка, мистер Ларри?', 'sign');
                    window.addPhraseToQueue('Ладно, я понял...', 'larry');
                }

                if(window.gameEvents.gaslightingSigns >= 5){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Эй, не игнорируй знаки!!!!', 'sign');
                    window.addPhraseToQueue('...', 'larry');
                }
            }),
            
            sing2: new Interactable(21, 15, ()=> {
                
                window.addPhraseToQueue('Ты отсюда пришел. Забыл?', 'sign');
                
                
                if(window.gameEvents.sing2Intracted){
                    return;
                }
                window.gameEvents.gaslightingSigns++;
                window.gameEvents.sing2Intracted = true;
                

                if(window.gameEvents.gaslightingSigns === 2){
                    window.addPhraseToQueue('Эй, я не отсюда пришел!', 'larry');
                    window.addPhraseToQueue('Ебаные знаки меня газлайтят', 'larry');

                    window.gameEvents.sing1Intracted = false;
                    window.gameEvents.sing2Intracted = false;
                    window.gameEvents.sing3Intracted = false;
                    window.gameEvents.sing4Intracted = false;
                }

                if(window.gameEvents.gaslightingSigns === 3){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Лично я не пизжу, честно честно', 'sign');
                    window.addPhraseToQueue('Не верю я вам больше', 'larry');
                }

                if(window.gameEvents.gaslightingSigns === 4){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Мухахаха. Как тебе моя новейшая разработка, мистер Ларри?', 'sign');
                    window.addPhraseToQueue('Ладно, я понял...', 'larry');
                }

                if(window.gameEvents.gaslightingSigns >= 5){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Эй, не игнорируй знаки!!!!', 'sign');
                    window.addPhraseToQueue('...', 'larry');
                }
            }),

            sing3: new Interactable(9, 15, ()=> {
                
                window.addPhraseToQueue('Ты отсюда пришел. Забыл?', 'sign');
                
                
                if(window.gameEvents.sing3Intracted){
                    return;
                }
                window.gameEvents.gaslightingSigns++;
                window.gameEvents.sing3Intracted = true;
                

                if(window.gameEvents.gaslightingSigns === 2){
                    window.addPhraseToQueue('Эй, я не отсюда пришел!', 'larry');
                    window.addPhraseToQueue('Ебаные знаки меня газлайтят', 'larry');

                    window.gameEvents.sing1Intracted = false;
                    window.gameEvents.sing2Intracted = false;
                    window.gameEvents.sing3Intracted = false;
                    window.gameEvents.sing4Intracted = false;
                }

                if(window.gameEvents.gaslightingSigns === 3){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Лично я не пизжу, честно честно', 'sign');
                    window.addPhraseToQueue('Не верю я вам больше', 'larry');
                }

                if(window.gameEvents.gaslightingSigns === 4){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Мухахаха. Как тебе моя новейшая разработка, мистер Ларри?', 'sign');
                    window.addPhraseToQueue('Ладно, я понял...', 'larry');
                }

                if(window.gameEvents.gaslightingSigns >= 5){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Эй, не игнорируй знаки!!!!', 'sign');
                    window.addPhraseToQueue('...', 'larry');
                }
            }),
            
            sing4: new Interactable(13, 12, ()=> {
                window.addPhraseToQueue('Ты отсюда пришел. Забыл?', 'sign');
                
                
                if(window.gameEvents.sing4Intracted){
                    return;
                }
                window.gameEvents.gaslightingSigns++;
                window.gameEvents.sing4Intracted = true;
                

                if(window.gameEvents.gaslightingSigns === 2){
                    window.addPhraseToQueue('Эй, я не отсюда пришел!', 'larry');
                    window.addPhraseToQueue('Ебаные знаки меня газлайтят', 'larry');

                    window.gameEvents.sing1Intracted = false;
                    window.gameEvents.sing2Intracted = false;
                    window.gameEvents.sing3Intracted = false;
                    window.gameEvents.sing4Intracted = false;
                }

                if(window.gameEvents.gaslightingSigns === 3){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Лично я не пизжу, честно честно', 'sign');
                    window.addPhraseToQueue('Не верю я вам больше', 'larry');
                }

                if(window.gameEvents.gaslightingSigns === 4){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Мухахаха. Как тебе моя новейшая разработка, мистер Ларри?', 'sign');
                    window.addPhraseToQueue('Ладно, я понял...', 'larry');
                }

                if(window.gameEvents.gaslightingSigns >= 5){
                    window.addPhraseToQueue('Под этим еще подписано:');
                    window.addPhraseToQueue('Эй, не игнорируй знаки!!!!', 'sign');
                    window.addPhraseToQueue('...', 'larry');
                }
            }),
            
            
            exitArea1: new InteractableArea(0, 32, 32, 1, ()=> {
                window.addPhraseToQueue('Я пришел отсюда.', 'larry');
            }),
            exitArea2: new InteractableArea(0, 0, 1, 32, ()=> {
                changeMapWithFadeIn('forest2', 'left', 31, 20);
            }),
            exitArea3: new InteractableArea(0, 0, 32, 0, ()=> {
                changeMapWithFadeIn('gate1', 'up', 7, 15);
            }),
            exitArea4: new InteractableArea(32, 0, 0, 32, ()=> {
                changeMapWithFadeIn('forest3','right', 1, 19);
            })
        },
        
    ),
    
    // FOREST 2 =======================================================================================
    forest2: new Map(window.tiles.forest2,
        {
            cultist1: new Interactable(13, 17, ()=> {
                window.addPhraseToQueue('Хозяин этого места из древного аристократического рода.', 'cultist');
                window.addPhraseToQueue('Он умен, он силен. Он обладает знаниями, недоступные простолюдинам', 'cultist');
                window.addPhraseToQueue('БОЙСЯ', 'cultist');
                window.addPhraseToQueue('РАЗВЕРНИСЬ И БЕГИ, ПОКА МОЖЕШЬ', 'cultist');
                window.addPhraseToQueue('Ну не', 'larry');
                
                window.gameEvents.talkedToCultist = true;
            }),
            
            cultist2: new Interactable(15, 17, ()=> {
                window.addPhraseToQueue('Мы поклоняемся хозяину. Хозяин - наше все', 'cultist2');
                window.addPhraseToQueue('Он дал нам веру. Дал нам правду. И дал указание предупредить тебя', 'cultist2');
                window.addPhraseToQueue('БОЙСЯ', 'cultist2');
                window.addPhraseToQueue('РАЗВЕРНИСЬ И БЕГИ, ПОКА МОЖЕШЬ', 'cultist2');
                window.addPhraseToQueue('Не', 'larry');
                
                window.gameEvents.talkedToCultist = true;
            }),
            
            exitArea1: new InteractableArea(0, 0, 0, 32, ()=> {
                changeMapWithFadeIn('forest4', 'left' ,30, 16);
            }),
            
            exitArea2: new InteractableArea(0, 0, 32, 0, ()=> {
                changeMapWithFadeIn('gate2', 'up', 6, 15);
            }),
            exitArea3: new InteractableArea(32, 0, 0, 32, ()=> {
                changeMapWithFadeIn('forest1', 'right', 1, 18);
            }),
            
            sign: new Interactable(3, 18, ()=>{
                window.addPhraseToQueue('Захоронение славных Пенисов', 'sign');
                
                if(window.gameEvents.talkedToCultist){
                    window.addPhraseToQueue('Древний аристократический род, да?', 'larry');       
                }
                
                
            })
            
        },
        () => {
            window.ctx.drawImage(window.images.entities.cultist.down, 13 * window.TILE, 17 * window.TILE);
            window.ctx.drawImage(window.images.entities.cultist.down, 15 * window.TILE, 17 * window.TILE);
        }
    ),
    
    // FOREST 4 =======================================================================================
    forest4: new Map(window.tiles.forest4,
        {
        grave1: new Interactable(3, 7, () => {window.addPhraseToQueue('Здесь похоронен Фуриеб Пенис', 'grave')}),
        grave2: new Interactable(8, 7, () => {window.addPhraseToQueue('Здесь похоронен Подмыхонюх Пенис', 'grave')}),
        grave3: new Interactable(13, 7, () => {window.addPhraseToQueue('Здесь похоронен Очколизус Пенис', 'grave')}),
        grave4: new Interactable(18, 7, () => {window.addPhraseToQueue('Здесь похоронен Дрочеслав Пенис', 'grave')}),
        grave5: new Interactable(23, 7, () => {window.addPhraseToQueue('Здесь похоронен Драстоспермич Пенис', 'grave')}),
        grave6: new Interactable(3, 11, () => {window.addPhraseToQueue('Здесь похоронен Хуерез Пенис', 'grave')}),
        grave7: new Interactable(8, 11, () => {window.addPhraseToQueue('Здесь похоронен Хачерез Пенис', 'grave')}),
        grave8: new Interactable(13, 11, () => {window.addPhraseToQueue('Здесь похоронен Сергей Пенис', 'grave')}),
        grave9: new Interactable(18, 11, () => {window.addPhraseToQueue('Здесь похоронен Сосунок Пенис', 'grave')}),
        grave10: new Interactable(23, 11, () => {window.addPhraseToQueue('Здесь похоронен Сиськодав Пенис', 'grave')}),
        grave11: new Interactable(3, 20, () => {window.addPhraseToQueue('Здесь похоронен Титьковалентин Пенис', 'grave')}),
        grave12: new Interactable(8, 20, () => {window.addPhraseToQueue('Здесь похоронен Трубоебыч Пенис', 'grave')}),
        grave13: new Interactable(13, 20, () => {window.addPhraseToQueue('Здесь похоронен Сэм Хайд', 'grave')}),
        grave14: new Interactable(18, 20, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        grave15: new Interactable(23, 20, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        grave16: new Interactable(3, 24, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        grave17: new Interactable(8, 24, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        grave18: new Interactable(13, 24, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        grave19: new Interactable(18, 24, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        grave20: new Interactable(23, 24, () => {window.addPhraseToQueue('Написано на непонятном языке, не прочитать', 'larry')}),
        
        arsen: new Interactable(30, 12, () => {
            window.addPhraseToQueue('АРСЕН МАКАРОН???', 'larry');
            window.addPhraseToQueue('Привет, Ларри. Я опять сказал какую-то хуйню в сети, поэтому меня пытаются посадить на бутылку.', 'arsen');
            window.addPhraseToQueue('Так что времени мало...', 'arsen');
            window.addPhraseToQueue('Хочешь послушать про то, как нужно общаться с женщинами?', 'arsen');
            window.addPhraseToQueue('КОНЕЧНО!!!!', 'larry');
            window.addPhraseToQueue('В общем, такое дело...', 'arsen');
            window.addPhraseToQueue('Многие думают, что для того, чтобы выглядить крутым', 'arsen');
            window.addPhraseToQueue('в глазах женщины, нужно быть либо богатым, либо высоким,', 'arsen');
            window.addPhraseToQueue('либо заботливым, либо все сразу.', 'arsen');
            window.addPhraseToQueue('Так же можно назвать много других СпоСОбОв, которые на самом деле не работают.', 'arsen');
            window.addPhraseToQueue('Женщина - существо полумифическое и обладает сокрытыми от себя же способностями и особенностями.', 'arsen');
            window.addPhraseToQueue('Одна из таких способностей - возможность видеть течение ауры.', 'arsen');
            window.addPhraseToQueue('По ауре, на самом деле, женщина и выбирает партнера, сама того не замечая.', 'arsen');
            window.addPhraseToQueue('По этому нужно фармить ауру.', 'arsen');
            window.addPhraseToQueue('Будь крутым: матерись, употребляй, пристрастись к нюханию клея.', 'arsen');
            window.addPhraseToQueue('Все в твоих руках, забавный кошкомальчик.', 'arsen');
            window.addPhraseToQueue('На этом мои полномочия все. АУЕ!', 'arsen');
            window.addPhraseToQueue('СПАСИБО, АРСЕН МАКАРОН', 'larry');
            window.addPhraseToQueue('', '', ()=> {
                window.maps.forest4.onUpdate = () => {};
            });
            
            window.gameEvents.talkedToArsen = true;
        }),
        
        exitArea1: new InteractableArea(32, 0, 0, 32, () => {
            changeMapWithFadeIn('forest2', 'right', 1, 21);
        }),
        exitArea2: new InteractableArea(0, 0, 32, 0, () => {
            changeMapWithFadeIn('gate4', 'right', 13, 14);
        }),
        exitArea3: new InteractableArea(28, 32, 5, 0, () => {
            changeMapWithFadeIn('forest1', 'up', 16, 28);
            
            if(!window.gameEvents.graveyardLoop){
                setTimeout(()=> {
                    if(window.gameEvents.talkedToArsen){
                        window.addPhraseToQueue('Бля, я заблудился чет', 'larry');
                        window.addPhraseToQueue('...', 'larry');
                        window.addPhraseToQueue('О да, я чувствую прилив ауры', 'larry');
                    }else{
                        window.addPhraseToQueue('Я заблудился чет', 'larry');
                    }
                    
                    window.addPhraseToQueue('Заблудился? Прочитай меня!', 'sign');
                    
                    if(window.gameEvents.gaslightingSigns > 2){
                        window.addPhraseToQueue('Пошел нахуй', 'larry');
                    }
                    
                    window.gameEvents.graveyardLoop = true;
                    
                }, 2000);
            }
        }),
        
    },
    () => {
        window.ctx.drawImage(window.images.entities.arsen.down, 30 * window.TILE, 12 * window.TILE);
    },
    
    () => {window.gameEvents.visitedGraveyard = true;},
),


    // FOREST 3 =======================================================================================
    forest3: new Map(window.tiles.forest3, 
        {
            cultist: new Interactable(19, 14, () => {
                window.addPhraseToQueue('Привет.', 'cultist3');
                window.addPhraseToQueue('Даров', 'larry');
                window.addPhraseToQueue('Когда я родился, меня уронили головой вниз в родильном отделении', 'cultist3');
            window.addPhraseToQueue('Круто...', 'larry');
            window.addPhraseToQueue('Было трудно, однако я выжил... Наверное зря', 'cultist3');
            window.addPhraseToQueue('Меня никто никогда не любил. И никогда не полюбит.', 'cultist3');
            window.addPhraseToQueue('Родители отказались от меня, когда я остался на второй год в подготовительной группе', 'cultist3');
            window.addPhraseToQueue('Это было больно... Очень больно...', 'cultist3');
            window.addPhraseToQueue('Потом меня бросили друзья. Им не нравилось, что я обзывал их', 'cultist3');
            window.addPhraseToQueue('Они просто не понимали, что мне пришлось пережить!', 'cultist3');
            window.addPhraseToQueue('И вот теперь я здесь... Должен выполнять какую-то невероятно', 'cultist3');
            window.addPhraseToQueue('ТУПУЮ', 'cultist3');
            window.addPhraseToQueue('РАБОТУ', 'cultist3');
            window.addPhraseToQueue('Аэаэаэ... А нахуя ты мне это все рассказал?', 'larry');
            window.addPhraseToQueue('Чтобы похвастаться, как мне плохо', 'cultist3');
        }),
        
        tree: new Interactable(23, 10, () => {
            window.movePlayer('right', 23, 10);
            window.addPhraseToQueue('Секунду', 'larry');
            window.addPhraseToQueue('Без комментариев', '', () => {
                window.audio.sounds.zipper.play();
                window.audio.sounds.water.play();
                
                window.createAnimation(
                    {
                        name: 'censorship', 
                        animationLength: 3000, 
                        other: {x: 23, y: 10.5, width: 2, height: 0.5}, 
                        onAnimationEnd: () => {window.tiles.forest3[10][24] = '8'; window.audio.sounds.zipper.play();}
                    }, function(){
                        window.ctx.fillStyle = 'black';
                        window.ctx.fillRect(this.other.x * window.TILE, this.other.y * window.TILE, this.other.width * window.TILE, this.other.height * window.TILE);
                        
                    }
                )
            });
        }),
        
        
        exitArea1: new InteractableArea(0, 0, 0, 32, () => {changeMapWithFadeIn('forest1', 'left', 30, 18)}),
        exitArea2: new InteractableArea(32, 0, 0, 32, () => {changeMapWithFadeIn('forest5', 'right', 1, 7)}),
    },
    
    () => {
        window.ctx.drawImage(window.images.entities.cultist.down, 19 * window.TILE, 14 * window.TILE);
    }
    
),
    // FOREST 5 =======================================================================================
    forest5: new Map(window.tiles.forest5,
        {
            lever: new Interactable(7, 7, ()=> {
                window.gameEvents.firstLeverPushed = true;
                window.tiles.forest5[7][7] = '46';
            }),

            exitArea1: new InteractableArea(0, 0, 0, 16, ()=> {changeMapWithFadeIn('forest3', 'left', 30, 15)}),
        }
    ),
    // GATES =======================================================================================

    // GATE 1 =======================================================================================
    gate1: new Map(window.tiles.gate1, 
        {
            gates: new Interactable(7, 9, ()=> {
                window.addPhraseToQueue('Закрыто', '')
            }),
            
            exitArea1: new InteractableArea(0, 0, 0, 8, ()=> {changeMapWithFadeIn('gate2', 'left', 14, 5)}),
            exitArea2: new InteractableArea(0, 10, 0, 8, ()=> {changeMapWithFadeIn('gate2', 'left', 14, 10)}),
            exitArea3: new InteractableArea(0, 16, 16, 1, ()=> {changeMapWithFadeIn('forest1', 'down', 17, 0)}),
            exitArea4: new InteractableArea(16, 10, 0, 8, ()=> {changeMapWithFadeIn('gate3', 'right', 0, 11)}),
            exitArea5: new InteractableArea(16, 0, 0, 8, ()=> {changeMapWithFadeIn('gate3', 'right', 0, 4)}),
            exitArea6: new InteractableArea(0, 0, 16, 0, ()=> {changeMapWithFadeIn('garden1', 'up', 14, 30)}),
            
            cultist: new Interactable(9,4, () => {
                window.addPhraseToQueue('Ты никогда не задумывался, почему во всех детских мультфильмах', 'cultist4');
                window.addPhraseToQueue('c антропоморфными животными одна семья - это один вид?', 'cultist4');
                window.addPhraseToQueue('Ну то есть, в свинке пеппе нет РАСЫ свиней, есть только одна семья свиней', 'cultist4');
                window.addPhraseToQueue('И для того, чтобы им продолжить свой род, им нужно', 'cultist4');
                window.addPhraseToQueue('Не продолжай', 'larry')
            })
        },
        () => {
            window.ctx.drawImage(window.images.entities.cultist.right, 9 * window.TILE, 4 * window.TILE);
        }
    ),

    
    // GATE 2 =======================================================================================
    gate2: new Map(window.tiles.gate2, 
        {
            exitArea1: new InteractableArea(0, 0, 0, 8, ()=> {changeMapWithFadeIn('gate4', 'left', 14, 5)}),
            exitArea2: new InteractableArea(0, 10, 0, 8, ()=> {changeMapWithFadeIn('gate4', 'left', 14, 12)}),
            exitArea3: new InteractableArea(0, 0, 16, 0, ()=> {changeMapWithFadeIn('garden2', 'up', 19, 30)}),
            exitArea4: new InteractableArea(16, 0, 0, 8, ()=> {changeMapWithFadeIn('gate1', 'right', 1, 6)}),
            exitArea5: new InteractableArea(16, 10, 0, 8, ()=> {changeMapWithFadeIn('gate1', 'right', 1, 10)}),
            exitArea6: new InteractableArea(0, 16, 16,0, ()=> {changeMapWithFadeIn('forest2', 'down', 19, 1)}),
            cave: new Interactable(3, 12, ()=> {changeMapWithFadeIn('denisCave', 'up', 8, 15)})
        }
    ),
    
    // DENIS CAVE =======================================================================================
    denisCave: new Map(window.tiles.cave,
        {
            denis: new Interactable(7,2, () => {
                window.addPhraseToQueue('Почему все путают нас с тобой?', 'larry');
                window.addPhraseToQueue('А ты не знаешь?', 'denis');
                window.addPhraseToQueue('Нет, не знаю', 'larry');
                window.addPhraseToQueue('Нет, знаешь', 'denis');
                window.addPhraseToQueue('Почему все путают нас с тобой?', 'denis');
                window.addPhraseToQueue('Мы - один человек?', 'larry', () => {
                    maps.denisCave.onUpdate = () => {};
                    delete maps.denisCave.interactables.denis;
                });
                window.addPhraseToQueue('...', 'larry');

                }),

                exitArea1: new InteractableArea(0, 16, 16, 0, ()=> {changeMapWithFadeIn('gate2', 'down', 3, 14)})
        },
        () => {
            window.ctx.drawImage(window.images.entities.larry.down, 7 * window.TILE, 2 * window.TILE);
        },
        () => {}
    ),

    // GATE 4 ============================================================================================
    gate4: new Map(window.tiles.gate4, 
        {
            exitArea1: new InteractableArea(16, 0, 0, 8, ()=> {changeMapWithFadeIn('gate2', 'right', 1, 4)}),
            exitArea2: new InteractableArea(16, 8, 0, 8, ()=> {changeMapWithFadeIn('gate2', 'right', 1, 12)}),
            exitArea3: new InteractableArea(0, 16, 16, 0, ()=> {changeMapWithFadeIn('forest4', 'right', 29, 1)}),
            letter: new Interactable(9,2, ()=> {
                window.addPhraseToQueue('Начайника,', 'letter');
                window.addPhraseToQueue('мы принэсти каробки бочки быстро вкусно', 'letter');
                window.addPhraseToQueue('мы не ипать что \"забор\" значaт', 'letter');
                window.addPhraseToQueue('патаму ставь как знай', 'letter');
            })
        },
        () => {
            window.ctx.drawImage(window.images.other.letter, 9 * window.TILE, 2 * window.TILE);
        }
    ),
    
    
    // GATE 3 ==============================================================================================
    gate3: new Map(window.tiles.gate3, {
        exitArea1: new InteractableArea(16, 0, 0, 8, ()=> {changeMapWithFadeIn('gate5', 'right', 1, 4)}),
        exitArea2: new InteractableArea(16, 9, 0, 8, ()=> {changeMapWithFadeIn('gate5', 'right', 1, 12)}),
        exitArea3: new InteractableArea(0, 0, 0, 8, ()=> {changeMapWithFadeIn('gate1', 'left', 14, 4)}),
        exitArea4: new InteractableArea(0, 9, 0, 8, ()=> {changeMapWithFadeIn('gate1', 'left', 14, 10)}),
        
        sing: new Interactable(11, 9, ()=> {
            window.addPhraseToQueue('Кто прочитал, тот гей.', 'sign');
            window.addPhraseToQueue('Сука', 'larry');
        }),
        
        underground: new Interactable(10, 8, ()=> {changeMapWithFadeIn('gate5', 'down', 10, 5)}),
    }),
    // GATE 5 ==============================================================================================
    gate5: new Map(window.tiles.gate5, {
        exitArea1: new InteractableArea(0, 0, 0, 8, ()=> {changeMapWithFadeIn('gate3', 'left', 14, 4)}),
        exitArea2: new InteractableArea(0, 9, 0, 8, ()=> {changeMapWithFadeIn('gate3', 'left', 14, 10)}),
        
        chest: new Interactable(11, 11, ()=> {
            window.addPhraseToQueue('Разраб не придумал функционала сундукам');
            window.addPhraseToQueue('Cry about it');
        }),
        underground: new Interactable(10, 5, ()=> {changeMapWithFadeIn('gate3', 'down', 10, 9)}),
    }),
    
    // GARDEN 1 ==============================================================================================
    garden1: new Map(window.tiles.garden1,
        {
            exitArea1: new InteractableArea(0, 32, 32, 0, () => {changeMapWithFadeIn('gate1', 'down', 7 , 1)}),
            exitArea2: new InteractableArea(0, 0, 0, 32, () => {changeMapWithFadeIn('garden2', 'left', 30, 'default')}),
            exitArea3: new InteractableArea(32, 0, 0, 32, () => {changeMapWithFadeIn('garden3', 'right', 1, 'default')}),
            exitArea4: new InteractableArea(0, 0, 32, 0, () => {changeMapWithFadeIn('castle1', 'up', 'default', 31)}),
            sign: new Interactable(11, 15, () => {
                if(window.gameEvents.gaslightingSigns > 2){
                    window.addPhraseToQueue('Ну а ты меня чем удивишь?', 'larry');
                    window.addPhraseToQueue('Шла Саша по шоссе и сосала сушку', 'sign');
                    window.addPhraseToQueue('😲​', 'larry');
                }else{
                    window.addPhraseToQueue('Куда ведет эта тропинка?', 'larry');
                    window.addPhraseToQueue('На пляж, бро. Можешь покупаться в море.', 'sign');
                    window.addPhraseToQueue('В этой игре есть такая возможность', 'sign');
                    window.addPhraseToQueue('Ема, спасибо', 'larry');
                }
                
            })
        }
    ),
    // GARDEN 2 ==============================================================================================
    garden2: new Map(window.tiles.garden2, 
        {
            exitArea1: new InteractableArea(0, 32, 32, 0, () => {changeMapWithFadeIn('gate2', 'down', 1 , 1)}),
            exitArea2: new InteractableArea(0, 0, 0, 32, () => {window.addPhraseToQueue('Мне туда не нужно', 'larry')}),
            exitArea3: new InteractableArea(32, 0, 0, 32, () => {changeMapWithFadeIn('garden1', 'right', 1, 'default')}),
            exitArea4: new InteractableArea(0, 0, 32, 0, () => {changeMapWithFadeIn('castle2', 'left', 30, 23)}),
        }),

        
    // GARDEN 3 ==============================================================================================
    garden3: new Map(window.tiles.garden3,
        {
            exitArea1: new InteractableArea(0, 0, 0, 32, () => {changeMapWithFadeIn('garden1', 'left', 30, 'default')}),
            exitArea2: new InteractableArea(0, 0, 32, 0, () => {changeMapWithFadeIn('castle2', 'right', 1, 23)}),
            chest: new Interactable(27, 11, ()=> {
                window.addPhraseToQueue('Разраб не придумал функционала сундукам');
                window.addPhraseToQueue('Cry about it');
            }),
            
        }),
        
    
    // CASTLE 1 ==============================================================================================
    castle1: new Map(window.tiles.castle1, 
        {
            exitArea1: new InteractableArea(0, 0, 0, 32, () => {changeMapWithFadeIn('castle2', 'left', 30, 23)}),
            exitArea2: new InteractableArea(32, 0, 0, 32, () => {changeMapWithFadeIn('castle2', 'right', 1, 23)}),
            exitArea3: new InteractableArea(0, 32, 32, 0, () => {changeMapWithFadeIn('garden1', 'down', 'default', 1)}),
            
            castleEnterence: new Interactable(15, 18, () => {
                if(window.gameEvents.firstCastleEnter){
                    if(window.gameEvents.talkedToArsen){
                        window.addPhraseToQueue('Аура переполняет Ларри, когда он заходит в логово злодея');
                        window.addPhraseToQueue('', '', () => {changeMapWithFadeIn('firstfloor1', 'up', 7, 14 )});
                    }else{
                        window.addPhraseToQueue('Ларри играет мышцами, прежде чем зайти в логово злодея');
                        window.addPhraseToQueue('', '', () => {changeMapWithFadeIn('firstfloor1', 'up', 7, 14 )});
                    }
                }else{
                    changeMapWithFadeIn('firstfloor1', 'up', 7, 14 );
                }

                window.gameEvents.firstCastleEnter = false;
            })
        },
        () => {},
        () => {        
            window.setMusic('ForestTheme') ;
            window.forceMusicChange();
        }
    ),
    
        

    // CASTLE 2 ==============================================================================================
        
    castle2: new Map(window.tiles.castle2,
        {
            exitArea1: new InteractableArea(0, 0, 0, 32, () => {changeMapWithFadeIn('castle1', 'left', 30, 23)}),
            exitArea2: new InteractableArea(32, 0, 0, 32, () => {changeMapWithFadeIn('castle1', 'right', 1, 23)}),
            dungeonEnter1: new Interactable(5, 15, () => {changeMapWithFadeIn('dungeon1', 'up', 5, 30)}),
            dungeonEnter2: new Interactable(11, 15, () => {changeMapWithFadeIn('dungeon1', 'up', 9, 30)}),
            dungeonEnter3: new Interactable(16, 15, () => {changeMapWithFadeIn('dungeon1', 'up', 13, 30)}),
            dungeonEnter4: new Interactable(21, 15, () => {changeMapWithFadeIn('dungeon1', 'up', 17, 30)}),
            dungeonEnter5: new Interactable(26, 15, () => {changeMapWithFadeIn('dungeon1', 'up', 21, 30)}),
        },
        () => {},
        () => {
            window.setMusic('ForestTheme') ;
            window.forceMusicChange();
        }
    ),
    
    // DUNGEON 1 ==============================================================================================
    dungeon1: new Map(window.tiles.dungeon1, 
        {
            dungeonExit1: new Interactable(5, 31, ()=> {changeMapWithFadeIn('castle2', 'down', 5, 16)}),
            dungeonExit2: new Interactable(9, 31, ()=> {changeMapWithFadeIn('castle2', 'down', 11, 16)}),
            dungeonExit3: new Interactable(13, 31, ()=> {changeMapWithFadeIn('castle2', 'down', 16, 16)}),
            dungeonExit4: new Interactable(17, 31, ()=> {changeMapWithFadeIn('castle2', 'down', 21, 16)}),
            dungeonExit5: new Interactable(21, 31, ()=> {changeMapWithFadeIn('castle2', 'down', 26, 16)}),

            monster: new Interactable(9, 29, () => {window.addPhraseToQueue('Спокуха, это просто папье-маше ', 'larry')}),

            mazeSkip1: new Interactable(9, 26, () => {window.movePlayer('down', 26, 3)}),
            mazeSkip2: new Interactable(26, 2, () => {window.movePlayer('down', 9, 27)}),

            leverRoomEnter: new Interactable(16, 0, ()=> {changeMapWithFadeIn('dungeon8', 'down', 1, 7)}),
        },
        () => {},
        () => {
            if(window.gameEvents.firstDungeonEnter){
                window.addPhraseToQueue('Выбор - это иллюзия', 'larry');
            }
            window.gameEvents.firstDungeonEnter = false;

            window.setMusic('DungeonTheme');
            window.forceMusicChange();
        }
    ),

    // DUNGEON 8 ==============================================================================================
    dungeon8: new Map(window.tiles.dungeon8, 
        {
            exitArea1: new Interactable(0,7, ()=> {changeMapWithFadeIn('dungeon1', 'down', 16, 1)}),
            lever: new Interactable(12, 7, () => {
                window.gameEvents.secondLeverPushed = true;
                window.tiles.dungeon8[7][12] = '46';
            })
        }
    ),

    
    firstfloor1: new Map(window.tiles.firstfloor1,
        {
            exitArea1: new InteractableArea(0, 0, 16, 0, ()=> {changeMapWithFadeIn('firstfloor2', 'up', 7, 14)}),
            exitArea2: new InteractableArea(0, 16, 16, 0, ()=> {changeMapWithFadeIn('castle1', 'down', 15, 19)}),
        },
        () => {},
        () => {
            window.setMusic('DungeonTheme');
            window.forceMusicChange();
        }
    ),
    firstfloor2: new Map(window.tiles.firstfloor2,
        {
            exitArea1: new InteractableArea(0, 0, 16, 0, ()=> {changeMapWithFadeIn('firstfloor3', 'up', 7, 14)}),
            exitArea2: new InteractableArea(0, 16, 16, 0, ()=> {changeMapWithFadeIn('firstfloor1', 'down', 7, 1)}),
            
            doorway1: new Interactable(0, 7, () => {window.addPhraseToQueue('Здесь нечего делать');}),
            doorway2: new Interactable(15, 7, () => {window.addPhraseToQueue('Здесь нечего делать');}),
        }
    ),
    firstfloor3: new Map(window.tiles.firstfloor3,
        {
            exitArea1: new InteractableArea(0, 0, 16, 0, ()=> {changeMapWithFadeIn('firstfloor6', 'up', 7, 14)}),
            exitArea2: new InteractableArea(0, 16, 16, 0, ()=> {changeMapWithFadeIn('firstfloor2', 'down', 7, 1)}),
            
            doorway1: new Interactable(0, 8, () => {window.addPhraseToQueue('Здесь нечего делать');}),
            doorway2: new Interactable(15, 8, () => {window.addPhraseToQueue('Здесь нечего делать');}),        
        }
    ),
    
    firstfloor6: new Map(window.tiles.firstfloor6,
        {
            exitArea2: new InteractableArea(0, 16, 16, 0, ()=> {changeMapWithFadeIn('firstfloor3', 'down', 7, 1)}),
            secondfloor: new Interactable(14, 8, () => {changeMapWithFadeIn('secondfloor', 'down', 8, 5)})
        },
        () => {},
    ),
    secondfloor: new Map(window.tiles.secondfloor, 
    {
        thirdfloor: new Interactable(9,9, ()=> {changeMapWithFadeIn('thirdfloor1', 'left', 2, 2)}),
        firstfloor: new Interactable(9,5, ()=> {changeMapWithFadeIn('firstfloor6', 'left', 13, 8)}),
        doorway: new Interactable(0,7, ()=> {
            if(window.gameEvents.talkedToArsen){
                window.addAnimation('fadeIn', {
                    name: 'gameEnd',
                    animationLength: 8000,
                    onAnimationEnd: () => {
                        window.setMusic('SadSong');
                        window.forceMusicChange();
                        window.maps.secondfloor.onUpdate = () => {window.ctx.fillRect(0,0,1000, 1000)}
    
                        window.addPhraseToQueue('Ларри на ауре проходит в дверной проем.');
                        window.addPhraseToQueue('К сожалению, в комнате не оказалось пола.');
                        window.addPhraseToQueue('Ларри упал на первый этаж и сломал ноги.', '');
                        window.addPhraseToQueue('Но все могло быть иначе...', '');
                        window.addPhraseToQueue('', '', () => {
                            window.location.href = "./index.html";
                        });
                    }
                })
            }else{
                window.addPhraseToQueue('Ларри попытался пройти в дверной проем, но вовремя остановился', '');
                window.addPhraseToQueue('Ого, комната без пола', 'larry');
            }
        }),
    }),

    thirdfloor1: new Map(window.tiles.thirdfloor1,
        {
            secondfloor: new Interactable(3, 2, ()=> {changeMapWithFadeIn('secondfloor', 'left', 8, 9)}),

            abyss1: new InteractableArea(5, 0, 6, 6, ()=> {window.addPhraseToQueue('Я не вижу дна', 'larry')}),
            abyss2: new InteractableArea(5, 9, 6, 15, ()=> {window.addPhraseToQueue('Я не вижу дна', 'larry')}),
            abyss3: new InteractableArea(5, 7, 6, 2, ()=> {window.addPhraseToQueue('Я не вижу дна', 'larry')}),

            letter: new Interactable(2, 9, ()=> {
                window.addPhraseToQueue('Начайника', 'letter');
                window.addPhraseToQueue('Мы делать мост рычаг вж вж праход открываться', 'letter');
                window.addPhraseToQueue('Паставь рычаг в лэсу, как ты просыл', 'letter');
                window.addPhraseToQueue('Паставь рычаг в поддоме, как ты просыл', 'letter');
                window.addPhraseToQueue('Я захочу кебаб завтра', 'letter');

            }),

            doorway: new Interactable(15, 7, ()=> {
                window.changeMapWithFadeIn('thirdfloor2','right', 1, 8);
            })
        },
        () => {
            window.ctx.drawImage(window.images.other.letter, 2 * window.TILE, 9 * window.TILE);
        },
        () => {
            if(window.gameEvents.firstLeverPushed){
                window.tiles.thirdfloor1[7][5] = '6';
                window.tiles.thirdfloor1[7][6] = '6';
                window.tiles.thirdfloor1[7][7] = '6';
                window.tiles.thirdfloor1[8][5] = '6';
                window.tiles.thirdfloor1[8][6] = '6';
                window.tiles.thirdfloor1[8][7] = '6';
            }
            if(window.gameEvents.secondLeverPushed){
                window.tiles.thirdfloor1[7][8] = '6';
                window.tiles.thirdfloor1[7][9] = '6';
                window.tiles.thirdfloor1[7][10] = '6';
                window.tiles.thirdfloor1[7][11] = '6';
                window.tiles.thirdfloor1[8][8] = '6';
                window.tiles.thirdfloor1[8][9] = '6';
                window.tiles.thirdfloor1[8][10] = '6';
                window.tiles.thirdfloor1[8][11] = '6';
            }

            if(window.gameEvents.secondLeverPushed && window.gameEvents.firstLeverPushed){
                delete window.maps.thirdfloor1.interactables.abyss3;
            }
        }
    ),

    thirdfloor2: new Map(window.tiles.thirdfloor2,
        {
            exitArea1: new InteractableArea(0, 0, 0, 16, ()=> {changeMapWithFadeIn('thirdfloor1', 'left', 14, 7)}),
            mrpenis: new InteractableArea(5, 0, 0, 16, ()=> {
                window.addPhraseToQueue('То, как этот культист стоит напротив Ларри...');
                window.addPhraseToQueue('...Говорит о серьезных намерениях дать ему пизды...');
                window.addPhraseToQueue('Покажи себя, убогий вор чужих ипотек', 'larry');
                window.addPhraseToQueue('Убогий вор чужих ипотек срывает с себя мантию', '', ()=> {
                    window.maps.thirdfloor2.onUpdate = () =>  {
                        window.ctx.drawImage(window.images.entities.mrpenis.left, 11 * window.TILE, 8 * window.TILE);};})
                        
                window.addPhraseToQueue('Спустись на две ступеньки, если хочешь жить', 'mrpenis');
                window.addPhraseToQueue('Так это ты!', 'larry');
                window.addPhraseToQueue('У тебя слишком много шерсти для больного раком', 'larry');
                window.addPhraseToQueue('Я собрал достаточно мелочи, чтобы изобрести свое лекарство', 'mrpenis');
                window.addPhraseToQueue('И избежать химиотерапии', 'mrpenis');
                window.addPhraseToQueue('А так же купить этот замок и платить каким-то бомжам,', 'mrpenis');
                window.addPhraseToQueue('чтобы те ходили по округе и делали вид, что я важная шишка.', 'mrpenis');
                if(window.gameEvents.visitedGraveyard){
                    window.addPhraseToQueue('Если этот замок только недавно стал твоим,', 'larry');
                    window.addPhraseToQueue('почему тогда памятники твоей родни стоят на кладбище', 'larry');
                    window.addPhraseToQueue('Они умерли недавно. Рак у нас семейный.', 'mrpenis');
                }
                window.addPhraseToQueue('Пиздец', 'larry');
                window.addPhraseToQueue('Ты... очень хорошо устроился', 'larry');
                window.addPhraseToQueue('Рад за тебя', 'larry');
                window.addPhraseToQueue('Спасибо, наверное', 'mrpenis');
                window.addPhraseToQueue('...', 'larry');
                window.addPhraseToQueue('Я хотел бы извинится, что так грубо над тобой пошутил', 'larry');
                window.addPhraseToQueue('Бывает, на меня находит такое. Забываю, что нахожусь в обществе', 'larry');
                window.addPhraseToQueue('и говорю то, о чем жалею потом', 'larry');
                window.addPhraseToQueue('🤨​', 'mrpenis');
                window.addPhraseToQueue('Я хотел дать тебе пизды, чтобы укрепить свое жалкое эго за твой счет', 'mrpenis');
                window.addPhraseToQueue('Но твоих извинений мне хватило', 'mrpenis');
                window.addPhraseToQueue('Забери свою невесту и проваливай', 'mrpenis', ()=> {
                    window.setMusic('SadSong');
                    window.forceMusicChange();

                    window.maps.thirdfloor2.interactables.mrpenis = new Interactable(10, 5, () => {window.addPhraseToQueue('Забери свою невесту и проваливай', 'mrpenis')});
                    window.maps.thirdfloor2.onUpdate = () => {
                        window.ctx.drawImage(window.images.entities.mrpenis.down, 10 * window.TILE, 5 * window.TILE);

                    }
                });
                

            }),

            roomEnter: new Interactable(15, 7, ()=> {changeMapWithFadeIn('thirdfloor3', 'right', 1, 6)}),

        },
        () => {
            window.ctx.drawImage(window.images.entities.cultist.left, 11 * window.TILE, 8 * window.TILE);
        },
        () => {
            window.setMusic('MrPenisTheme');
            window.forceMusicChange();
        },
    ),
    thirdfloor3: new Map(window.tiles.thirdfloor3, 
        {
            ml: new Interactable(5, 2, () => {
                window.addPhraseToQueue('Привет, я пришел за тобой', 'larry');
                window.addPhraseToQueue('Давай останемся друзьями, Ларри', 'ml');
                window.addPhraseToQueue('Что?', 'larry');
                window.addPhraseToQueue('Почему?', 'larry');
                window.addPhraseToQueue('Разве я сделал что-то не так?', 'larry');
                window.addPhraseToQueue('...', 'larry');
                
                if(window.gameEvents.talkedToArsen){
                    window.addPhraseToQueue('Пошла нахуй)', 'larry',  ()=> {
                        window.addAnimation('fadeIn', {name: 'gameEnd', animationLength: 3000, 
                            onAnimationEnd: () => {
                                window.maps.thirdfloor3.onUpdate = () => {window.ctx.fillRect(0, 0, 1000, 1000)}
                                
                                window.addPhraseToQueue('Ларри бросил М.Л.', '');
                                window.addPhraseToQueue('Стал фармить ауру', '');
                                window.addPhraseToQueue('И стал самым главным ебырем в своем селе', '');
                                window.addPhraseToQueue('Конец', '');
                                window.addPhraseToQueue('', '', () => {
                                    window.location.href = './index.html';
                                });
                            }
                        });
                        
                    });
                }else{
                    window.addAnimation('fadeIn', {name: 'gameEnd', animationLength: 8000, onAnimationEnd:() => {
                        window.maps.thirdfloor3.onUpdate = () => {window.ctx.fillRect(0, 0, 1000, 1000)}


                        window.addPhraseToQueue('Ларри стал куколдом', '');
                        window.addPhraseToQueue('И умер от перемастурбации в возрасте 14 лет', '');
                        window.addPhraseToQueue('Но все могло быть иначе...', '');
                        window.addPhraseToQueue('', '', () => {
                            window.location.href = './index.html';
                        });
                    }});


                }

            }),
        },
        () => {
            window.ctx.drawImage(window.images.entities.ml.down, 5* window.TILE, 2 * window.TILE);
        }
    ),

    
    // dungeon2: new Map(window.tiles.dungeon2),
    // dungeon3: new Map(window.tiles.dungeon3),
    // dungeon4: new Map(window.tiles.dungeon4),
    // dungeon5: new Map(window.tiles.dungeon5),
    // dungeon6: new Map(window.tiles.dungeon6),
    // dungeon7: new Map(window.tiles.dungeon7),
    // firstfloor4: new Map(window.tiles.firstfloor4),
    // firstfloor5: new Map(window.tiles.firstfloor5),
    // firstfloor7: new Map(window.tiles.firstfloor7),
}
