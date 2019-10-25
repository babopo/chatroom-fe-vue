<template>
    <canvas id="canvas"></canvas>
</template>
<script>
    //动画字体需要的资源
    export default {
        name: 'leonsans',
        props: ['showingText'],
        mounted() {
            let leon, canvas, ctx, sw, sh;
            
            if(document.body.offsetWidth > 700) {
                sw = 800;
                sh = 600;
            } else {
                sw = 400;
                sh = 300;
            }
            const pixelRatio = 2;

            const that = this

            function init() {
                canvas = document.querySelector('#canvas');
                ctx = canvas.getContext("2d");

                canvas.width = sw * pixelRatio;
                canvas.height = sh * pixelRatio;
                canvas.style.width = sw + 'px';
                canvas.style.height = sh + 'px';
                ctx.scale(pixelRatio, pixelRatio);

                leon = new LeonSans({
                    // 生命周期里的this
                    text: that.showingText,
                    color: ['#000000'],
                    size: 80,
                    weight: 200
                });

                requestAnimationFrame(animate);
            }

            function animate(t) {
                requestAnimationFrame(animate);

                ctx.clearRect(0, 0, sw, sh);

                const x = (sw - leon.rect.w) / 2;
                const y = (sh - leon.rect.h) / 2;
                leon.position(x, y);

                leon.draw(ctx);
            }
            //渲染并执行动画
            init();
            let i, total = leon.drawing.length;
            for (i = 0; i < total; i++) {
                TweenMax.fromTo(leon.drawing[i], 1.6, {
                    value: 0
                }, {
                    delay: i * 0.05,
                    value: 1,
                    ease: Power4.easeOut
                });
            }
        }
    }
</script>

<style lang="stylus">

</style>