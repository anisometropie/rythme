// temps qui change une fois sur deux/trois
// add/remove voices
// change tempo,
// phase shift
// way save/load a tune (JSON ?)
// randomize that keep the main structure, but change just a few each time.
// boite à musique qui déroule le point d’avant.



var tempo = 60; //à la noire, rond vert = double croche
var debitRythmique = 15000/tempo;
var nombreTemps = 12;
var nombreVoix = 5;
var voix = [];
var frequences = [];
var notes = [24,28,31,33,35,36]; // tierce Majeure = 4, quinte = 7, septième mineure = 10

var buttonRandomize;
var buttonErase;
var buttonPlayPause;

var weDoRandomize = false;
var playing = false;
var counter;
var bgColor;
var hauteur = 60;

function setup()
{
    createCanvas(1400,600);
    bgColor = color(200);
    buttonRandomize = createButton("randomize");
    buttonRandomize.mousePressed(randomize);
    buttonErase = createButton("erase");
    buttonErase.mousePressed(erase);
    buttonPlayPause = createButton("play/stop");
    buttonPlayPause.mousePressed(playStop);
    var base = pow(2,1/12); // 2^(1/12)
    for (var i=0; i<12*6; i++)
    {
        frequences[i] = 55*pow(base,i); // la = 0, 12, 24
    }
    for (var i=0; i<nombreVoix; i++)
    {
        voix[i] = new Voix(i+1, frequences[notes[i]]);
    }

}

function draw()
{
    background(bgColor);
    for (var i=0; i<nombreVoix; i++)
    {
        voix[i].display();
    }
}

function temps() //called every debitRythmique ms
{
    for (var i=0; i<nombreVoix; i++)
    {
        voix[i].temps();
    }
}



function randomize()
{
    if (playing)
    {
        weDoRandomize = !weDoRandomize;
        if (weDoRandomize)
        {
            buttonRandomize.html("stop randomizing");
        }
        else
        {
            buttonRandomize.html("randomize");
        }
    }
    else
    {
        for (var i=0; i<nombreVoix; i++)
        {
            voix[i].randomize();
        }
    }
}

function erase()
{
    for (var i=0; i<nombreVoix; i++)
    {
        console.log("erasing voice " + i);
        voix[i].erase();
    }
}

function playStop()
{
    playing = !playing;
    if (playing)
    {
        if (weDoRandomize)
        {
            buttonRandomize.html("stop randomizing");
        }
        else
        {
            buttonRandomize.html("randomize");
        }
        temps();
        counter = setInterval(temps, debitRythmique);
    }
    else
    {
        buttonRandomize.html("randomize");
        clearInterval(counter);
        for (i=0; i<nombreVoix; i++)
        {
            voix[i].reset();
        }
    }
}

function mousePressed()
{
    for (var i=0; i<nombreTemps; i++)
    {
        for (var j=0; j<nombreVoix; j++)
        {
            if (dist(mouseX, mouseY, (i+1)*50, (nombreVoix-j)*hauteur)<=25/2)
            {
                voix[j].croches[i] = (voix[j].croches[i]+1) % 2;
            }
        }
    }
}
