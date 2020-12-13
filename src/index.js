let fs = require('fs');
const glslify = require('glslify')
const dat = require('dat.gui');
const gui = new dat.GUI();

let params = {red: 1, green: 0, blue: 0};
gui.add(params, 'red', 0, 1);
gui.add(params, 'green', 0, 1);
gui.add(params, 'blue', 0, 1);

const regl = require('regl')(document.body)


const setupQuad = regl({
  vert: glslify('./vert.glsl'),
  frag: glslify('./frag.glsl'),

	attributes: {
		position: [ -4, -4, 4, -4, 0, 4 ]
	},

	uniforms: {
		tick: regl.context('tick'),
		red: () => {return params.red},
		green: () => {return params.green},
		blue: () => {return params.blue},
	},

	depth: { enable: false },

	count: 3
})

regl.frame(() => {
	setupQuad(() => {
		regl.draw()
	})
})
