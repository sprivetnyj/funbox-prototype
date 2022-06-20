import cheerio from "gulp-cheerio";
import svgSprite from "gulp-svg-sprite";

export const sprite = () => {
	return app.gulp.src(app.path.src.svgicons, {})
		.pipe(
			app.plugins.svgmin({
				multipass: true,
				js2svg: {
					pretty: true
				},
			})
		)
		.pipe(
			cheerio({
				run: function ($) {
					$('[fill]').removeAttr('fill');
					$('[stroke]').removeAttr('stroke');
					$('[style]').removeAttr('style');
				},
				parserOptions: {
					xmlMode: true
				},
			})
		)
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: `../icons/sprite.svg`
				}
			},
		}
		))
		.pipe(app.gulp.dest(app.path.build.images));
}