// CommonJS:
const dat = require('dat.gui');
const gui = new dat.GUI();

var params = {red: 1, green: 0, blue: 0};
gui.add(params, 'red', 0, 1);
gui.add(params, 'green', 0, 1);
gui.add(params, 'blue', 0, 1);

const regl = require('regl')(document.body)


const setupQuad = regl({
  frag: `
  precision mediump float;
  varying vec2 uv;
	uniform float red;
	uniform float green;
	uniform float blue;
  void main() {
    gl_FragColor = vec4(red, green, blue, 1.);
  }`,

  vert: `
  precision mediump float;
  attribute vec2 position;
  varying vec2 uv;
  void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
  }`,

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
