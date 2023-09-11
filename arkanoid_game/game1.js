let game = {
    ctx: null,
    sprites: {
        background: null,
        ball: null,
        platform: null
    },
    init: function(){
        this.ctx = document.getElementById("mycanvas").getContext("2d");
    },
    preload(callback){
        let loaded = 0;
        let required = Object.keys(this.sprites).length;

        for (let key in this.sprites){
            this.sprites[key] = new Image();
            this.sprites[key].src = "img/" + key + ".png";
            this.sprites[key].addEventListener("load", () =>{
                ++loaded;
                if (loaded >= required){
                    callback();
                }
            });

            // Обработчик ошибок загрузки изображений
            this.sprites[key].addEventListener("error", () => {
                console.error("Ошибка загрузки изображения: " + key);
                ++loaded;
                if (loaded >= required) {
                    callback();
                }
            });
        }
    },
    run(){
        let x = 100; // Установите координату x
        let y = 200; // Установите координату y

        window.requestAnimationFrame(() => {
            this.render(x, y);
        });
    },
    render(x, y){
        this.ctx.drawImage(this.sprites.background, 0, 0);

        // Отрисовка шара и платформы на заданных координатах (x, y)
        this.ctx.drawImage(this.sprites.ball, x, y);
        this.ctx.drawImage(this.sprites.platform, x, y);
    },
    start: function(){
        this.preload(() => {
            this.init();
            this.run();
        }); 
    }
};

window.addEventListener("load", () =>{
    game.start();
});
