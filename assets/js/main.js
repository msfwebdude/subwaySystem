self.map = [
    {
        title: 'Shinjuku',
        side: 'left',
        rotation: 100,
        location: {
            top:  284,
            left: 124
        }
    },
    {
        title: 'Yoyogi',
        side: 'left',
        rotation: 90,
        location: {
            top:  332,
            left: 117
        }
    },
    {
        title: 'Harajuku',
        side: 'right',
        rotation: 80,
        location: {
            top:  378,
            left: 120
        }
    },
    {
        title: 'Shibuya',
        side: 'left',
        rotation: 70,
        location: {
            top:  414,
            left: 126
        }
    },
    {
        title: 'Ebisu',
        side: 'right',
        rotation: 60,
        location: {
            top:  456,
            left: 143
        }
    },
    {
        title: 'Meguro',
        side: 'right',
        rotation: 50,
        location: {
            top:  494,
            left: 170
        }
    },
    {
        title: 'Gotanda',
        side: 'right',
        rotation: 40,
        location: {
            top:  527,
            left: 197
        }
    },
    {
        title: 'Osaki',
        side: 'left',
        rotation: 30,
        location: {
            top:  556,
            left: 239
        }
    },
    {
        title: 'Shinagawa',
        side: 'right',
        rotation: 0,
        location: {
            top:  589,
            left: 333
        }
    },
    {
        title: 'Takanawa',
        side: 'left',
        rotation: 350,
        location: {
            top:  590,
            left: 426
        }
    },
    {
        title: 'Tamachi',
        side: 'left',
        rotation: 330,
        location: {
            top:  576,
            left: 476
        }
    },
    {
        title: 'Hamamatsucho',
        side: 'left',
        rotation: 330,
        location: {
            top:  547,
            left: 531
        }
    },
    {
        title: 'Shimbashi',
        side: 'left',
        rotation: 320,
        location: {
            top:  513,
            left: 567
        }
    },
    {
        title: 'Yurakucho',
        side: 'left',
        rotation: 300,
        location: {
            top:  476,
            left: 596
        }
    },
    {
        title: 'Tokyo',
        side: 'left',
        rotation: 290,
        location: {
            top:  436,
            left: 616
        }
    },
    {
        title: 'Kanda',
        side: 'left',
        rotation: 280,
        location: {
            top:  398,
            left: 629
        }
    },
    {
        title: 'Akihabara',
        side: 'left',
        rotation: 270,
        location: {
            top:  353,
            left: 634
        }
    },
    {
        title: 'Okachimachi',
        side: 'left',
        rotation: 260,
        location: {
            top:  313,
            left: 631
        }
    },
    {
        title: 'Ueno',
        side: 'left',
        rotation: 250,
        location: {
            top:  267,
            left: 621
        }
    },
    {
        title: 'Uguisudani',
        side: 'left',
        rotation: 240,
        location: {
            top:  227,
            left: 602
        }
    },
    {
        title: 'Nippori',
        side: 'left',
        rotation: 230,
        location: {
            top:  188,
            left: 575
        }
    },
    {
        title: 'Nishi-Nippori',
        side: 'left',
        rotation: 220,
        location: {
            top:  153,
            left: 541
        }
    },
    {
        title: 'Tabata',
        side: 'left',
        rotation: 210,
        location: {
            top:  124,
            left: 495
        }
    },
    {
        title: 'Komagome',
        side: 'right',
        rotation: 190,
        location: {
            top:  100,
            left: 432
        }
    },
    {
        title: 'Sugamo',
        side: 'right',
        rotation: 180,
        location: {
            top:  95,
            left: 366
        }
    },
    {
        title: 'Otsuka',
        side: 'right',
        rotation: 160,
        location: {
            top:  104,
            left: 305
        }
    },
    {
        title: 'Ikebukuro',
        side: 'left',
        rotation: 140,
        location: {
            top:  133,
            left: 237
        }
    },
    {
        title: 'Mejiro',
        side: 'right',
        rotation: 130,
        location: {
            top:  169,
            left: 194
        }
    },
    {
        title: 'Takadanobaba',
        side: 'right',
        rotation: 120,
        location: {
            top:  206,
            left: 164
        }
    },
    {
        title: 'Shin-Okubo',
        side: 'right',
        rotation: 110,
        location: {
            top:  250,
            left: 138
        }
    },
]

self.rotate = 0
self.trainStop = 0;

self.plot = (e) => {
    console.log(e)
    self.car.style.left = `${e.x}px`
    self.car.style.top  = `${e.y}px`
    console.log(self.car.style)

    if (e.shiftKey) self.rotate += 10;
    if (e.ctrlKey)  self.rotate -= 10;
    if (self.rotate < 1)   self.rotate = 360 - self.rotate
    if (self.rotate > 359) self.rotate = 0
    self.car.style.transform = `rotate(${self.rotate}deg)` 

}

self.nextStation = () => {
    self.trainStop--;
    if (self.trainStop < 0) self.trainStop = self.map.length - 1

    var nextStop = self.map[self.trainStop]
    
    var message = `Now arriving ${nextStop.title} station. The doors on the ${nextStop.side} side will open.`
    self.messageBoard.innerHTML = message

    if(self.speechSynthesis) {
        var utter   = new SpeechSynthesisUtterance(message)
        utter.lang  = 'ja-JP'
        utter.rate  = 1.1
        utter.onend = () => { self.setTimeout(self.nextStation, 3000) }
        self.speechSynthesis.speak(utter)

    }
    else {
        self.setTimeout(self.nextStation, 3000)
    } 

    self.car.style.top       = `${nextStop.location.top}px`
    self.car.style.left      = `${nextStop.location.left}px`
    self.car.style.transform = `rotate(${nextStop.rotation}deg)`
}
document.addEventListener("DOMContentLoaded", () => { self.nextStation() } );
