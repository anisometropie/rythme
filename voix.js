function Voix(numero, freq)
{
    this.numero = numero;
    this.tempsActuel = nombreTemps-1;
    this.croches = [];
    this.env = new p5.Env();
    this.env.setADSR(0.01,0.02,0.15,0.15);
    this.env.setRange(0.25,0);
    this.osc = new p5.Oscillator("sine");
    this.osc.amp(this.env);
    this.osc.start();
    this.osc.freq(freq);
    this.randomize = function()
    {
        for (var i=0; i<nombreTemps; i++)
        {
            this.croches[i] = round(random(1));
        }
    }
    this.randomize();

    this.display = function()
    {
        for (var i=0; i<nombreTemps; i++)
        {
            if (this.croches[i]==1)
            {
                fill(50,175,50);
            }
            else
            {
                fill(125);
            }
            if (i==this.tempsActuel && playing)
            {
                stroke(255,100,100);
                strokeWeight(2);
            }
            else
            {
                stroke(0);
                strokeWeight(1);
            }
            ellipse((i+1)*50,(nombreVoix-this.numero+1)*hauteur,25,25); // +1 so that it’s not at (0,0)
        }
    }

    this.temps = function()
    {
        if (this.tempsActuel < nombreTemps-1)
        {
            this.tempsActuel++;
        }
        else
        {
            this.tempsActuel = 0;
            if (weDoRandomize)
            {
                this.randomize();
            }
        }
        if (this.croches[this.tempsActuel] == 1)
        {
            this.env.play();
        }
    }

    this.reset = function()
    {
        this.tempsActuel = nombreTemps-1;
    }

    this.erase = function()
    {
        for (i=0; i<nombreTemps; i++)
        {
            this.croches[i] = 0;
        }
    }
}
