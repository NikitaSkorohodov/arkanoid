let game = {
    canvas: null,
    ctx: null,
    platform: {
        x: 0,
        y: 0,
        width: 100,
        height: 10,
        velocity: 5,
        dx: 0
    },
    ball: {
        x: 0,
        y: 0,
        radius: 10
    },
    blocks: [],
    rows: 4,
    cols: 8,
    sprites: {
        background: null,
        platform: null,
        block: null
    },
    init: function () {
        this.canvas = document.getElementById("mycanvas");
        this.ctx = this.canvas.getContext("2d");
        this.setEvents();
    },
    setEvents: function () {
        document.addEventListener("keydown", (e) => {
            if (e.keyCode === 37) {
                this.platform.dx = -this.platform.velocity; // Move left
            } else if (e.keyCode === 39) {
                this.platform.dx = this.platform.velocity; // Move right
            }
        });

        document.addEventListener("keyup", (e) => {
            if (e.keyCode === 37 || e.keyCode === 39) {
                this.platform.dx = 0;
            }
        });
    },
    preload: function (callback) {
        let loaded = 0;
        let required = Object.keys(this.sprites).length;
        let onImageLoad = () => {
            ++loaded;
            if (loaded >= required) {
                callback();
            }
        };
        for (let key in this.sprites) {
            this.sprites[key] = new Image();
            this.sprites[key].src = "img/" + key + ".png";
            this.sprites[key].addEventListener("load", onImageLoad);
        }
    },
    create: function () {
        // Create blocks
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.blocks.push({
                    x: 64 * col + 65,
                    y: 24 * row + 35,
                    width: 60,
                    height: 20
                });
            }
        }

        // Initialize platform and ball positions
        this.platform.x = this.canvas.width / 2 - this.platform.width / 2;
        this.platform.y = this.canvas.height - this.platform.height - 10;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height - this.platform.height - this.ball.radius - 10;
    },
    update: function () {
        // Move platform
        this.platform.x += this.platform.dx;
    },
    run: function () {
        this.update();
        this.render();
        requestAnimationFrame(() => {
            this.run();
        });
    },
    render: function () {
        this.ctx.drawImage(this.sprites.background, 0, 0);
        this.ctx.drawImage(
            this.sprites.platform,
            this.platform.x,
            this.platform.y,
            this.platform.width,
            this.platform.height
        );
        this.renderBlocks();
    },
    renderBlocks: function () {
        for (let block of this.blocks) {
            this.ctx.drawImage(this.sprites.block, block.x, block.y, block.width, block.height);
        }
    },
    start: function () {
        this.init();
        this.preload(() => {
            this.create();
            this.run();
        });
    }
};

game.start();
