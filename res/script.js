const fireworks = []
const particles = []
const explosions = []
const colors = [
    'red', 'yellow', 'orangered', 'deeppink', 'cyan', 'mediumspringgreen', 'mediumpurple' ,'gold', 'silver'
]

class Explosion {
    constructor() {
        this.x = 0;
        this.y = 0;

        this.speed = 3;
        this.angle = (Math.random() * Math.PI / 2) + Math.PI / 4;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = -Math.sin(this.angle) * this.speed;
        this.el = document.createElement('div');
        this.el.className = 'explosion';
        this.el.textContent = '10';
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.color = 'red';
        document.getElementById('animation').appendChild(this.el);

        setTimeout(() => {
            this.el.remove();
            explosions.splice(explosions.indexOf(this), 1);
        },400)
    }

    setColor(color) {
        this.el.style.color = color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.vy += 0.07;
    }

    update() {
        this.setPosition(this.x + this.vx,  this.y + this.vy);
        this.vy += 0.07;
    }

    // poolik
    withMouse(x, y) {
        this.setPosition(x + this.vx,  y + this.vy);
        this.vy += 0.07;
    }
}

class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.speed = Math.random() * 2 + 3;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = -Math.sin(this.angle) * this.speed;
        this.el = document.createElement('div');
        this.el.className = 'particle';
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.el.style.backgroundColor = 'red';
        document.getElementById('animation').appendChild(this.el);


        setTimeout(() => {
            this.el.remove();
            particles.splice(particles.indexOf(this), 1);
        },400)
    }

    setColor(color) {
        this.el.style.backgroundColor = color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
    }

    update() {
        this.setPosition(this.vx + this.x, this.vy + this.y);
        this.vy += 0.07;
    }

    // poolik
    withMouse(x, y) {
        this.setPosition(this.vx + x, this.vy + y);
        this.vy += 0.07;
    }
}

class Firework {

    constructor() {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight - 100;

        this.speed = 8;
        this.angle = (Math.random() * Math.PI / 2) + Math.PI / 4;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = -Math.sin(this.angle) * this.speed;


        this.el = document.createElement('div');
        this.el.className = 'firework';
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        document.getElementById('animation').appendChild(this.el);


        setTimeout(() => {
            this.el.remove();
            fireworks.splice(fireworks.indexOf(this), 1);
            this.explode()
        },1200)
    }
    explode() {
        const color = colors[parseInt(Math.random() * colors.length)];
        for (let i = 0; i < 50; i++) {
            const particle = new Particle();
            particle.setColor(color);
            particle.setPosition(this.x, this.y);
            particles.push(particle);
        }
        const explosion = new Explosion();
        explosion.setColor(color);
        explosion.setPosition(this.x, this.y);
        explosions.push(explosion);
    };

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.el.style.left = this.x + 'px';
        this.el.style.top = this.y + 'px';
        this.vy += 0.07;
    }

    // poolik
    withMouse(x, y) {
        this.el.style.left = x + 'px';
        this.el.style.top = y + 'px';
        this.vy += 0.07;
    }
}

setInterval(() => {
    fireworks.forEach(firework => firework.update());
    particles.forEach(particle => particle.update());
    explosions.forEach(explosion => explosion.update());
}, 10);

setInterval( () => {
    const firework = new Firework();
    fireworks.push(firework)
}, 300)


// poolik - pole päris see mis ma tahan
var firework = document.getElementById('animation')
document.addEventListener("mouseenter", function (e) {
    /*var x = e.pageX;
    var y = e.pageY;
    fireworks.forEach(firework => firework.withMouse(x, y));
    particles.forEach(particle => particle.withMouse(x, y));
    explosions.forEach(explosion => explosion.withMouse(x, y));*/
});

