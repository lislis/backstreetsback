// game state
window.state = {
  current: 1,
  speed: 0.025,
  score: 0,
  mode: 'title',
  checkpoints: {
    1: {
      a: 'x',
      p: {x: -12}
    },
    2: {
      a: 'x',
      p: {x: -5},
    },
    3: {
      a: 'z',
      p: {z: 3},
    },
    4: {
      a: 'x',
      p: {x: -8},
    },
    5: {
      a: 'z',
      p: {z: 7},
    },
    6: {
      a: 'z',
      p: {z: 4},
    },
    7: {
      a: 'x',
      p: {x: 3},
    },
    8: {
      a: 'z',
      p: {z: 7.5},
    },
    9: {
      a: 'x',
      p: {x: 7.5},
    },
    10: {
      a: 'z',
      p: {z: -4},
    },
    11: {
      a: 'x',
      p: {x: 0},
    },
    12: {
      a: 'z',
      p: {z: -14}
    }
  },
  lyrics: [
       {v: "Everybody!", p: "-9 1.3 -11", r: "0 0 0"},
       {v: "Rock your body!", p: "-2.6 1.3 -6", r: "0 -90 0"},
       {v: "Everybody!", p: "-5.8 2.3 -4.3", r: "0 90 0"},
       {v: "Rock your body!", p: "-3 3 -1.3", r: "0 -90 0"},
       {v: "Backstreet's back!", p: "-9 4 0.1", r: "0 0 0"},
       {v: "Oh my god, we're back again!", p: "-11.3 3 4.5", r: "0 90 0"},
       {v: "Brothers, sisters everybody sing!", p: "-9.8 3.4 10.1", r: "0 -180 0"},
       {v: "Gonna bring the flavor, show you how!", p: "-6.1 2 8", r: "0 -90 0"},
       {v: "Got a question for you better answer now!", p: "-3.4 2.8 5.8", r: "0 -180 0"},
       {v: "Am I original?", p: "-0.1 1.3 5.9", r: "0 180 0"},
       {v: "Am I the only one?", p: "0 2.3 2.6", r: "0 0 0"},
       {v: "Am I sexual?", p: "3.3 3.1 2.6", r: "0 0 0"},
       {v: "Am I everything you need?", p: "4.8 3.3 10.4", r: "0 180 0"},
       {v: "You better rock your body now!", p: "10.4 1.4 6.4", r: "0 -90 0"},
       {v: "Everybody!", p: "10.4 1.4 0", r: "0 -90 0"},
       {v: "Rock your body!", p: "7.3 4.4 -4.7", r: "0 0 0"},
       {v: "Everybody!", p: "3.6 2.7 -2.7", r: "0 180 0"},
       {v: "Rock your body right!", p: "-1.2 1.3 -6.6", r: "0 90 0"},
       {v: "Backstreet's back!", p: "1.9 2.8 -8.8", r: "0 -90 0"},
       {v: "Alright!", p: "-1 2.2 -11", r: "0 90 0"}
     ]
};


AFRAME.registerShader('brix', {
  schema: {},
  vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,
  fragmentShader: `
varying vec2 vUv;

void main() {
  float single = (mod(vUv[0], 0.09) * 60.0) * mod(vUv[1], 0.06) * 100.0;
  vec3 construct = vec3(single);

  construct.b = 0.3 * construct.r;
  construct.g = 0.3 * construct.r;

  gl_FragColor = vec4(construct, 1.0);
  //gl_FragColor = vec4(0.4, 0.2, 0.2, 1.0);
}`
});

AFRAME.registerComponent('cursor-listener', {
  init: function () {
    // Prep the speech synthesis voice
    var synth = window.speechSynthesis;
    var voice = synth.getVoices()[1];
    var otherVoice = synth.getVoices()[1];

    this.el.addEventListener('click', function (evt) {
      if (window.state.mode === 'play') {
        //console.log(window.state)
        this.setAttribute('material', 'color', 'white');
        this.setAttribute('animation', 'property: rotation; to: 0 0 180; loop: false; dur: 800;');
        var utterThis = new SpeechSynthesisUtterance(this.getAttribute('text')['value']);
        utterThis.voice = voice;
        synth.speak(utterThis);
      }
    });

    this.el.addEventListener('animationcomplete', function (evt) {
      if (window.state.mode === 'play' ) {
        this.remove();
        var utterPoint = new SpeechSynthesisUtterance('Yeah!');
        utterPoint.voice = otherVoice;
        synth.speak(utterPoint);
        window.state.score ++;
        document.querySelector("#score-card").setAttribute('text', 'value', `${window.state.score}/20`);
        document.querySelector('#score-hud').setAttribute('text', 'value', `score ${window.state.score}`);
      }
    });
  }
});

AFRAME.registerComponent('title-plane', {
  init: function () {
    var synth = window.speechSynthesis;
    var voice = synth.getVoices()[0];
    this.el.setAttribute('animation', 'property: scale; from: 0.7 0.7 0.7; to: 1 1 1; loop: true; dir: alternate; dur: 800;');
    this.el.addEventListener('click', function (evt) {
      this.setAttribute('animation', 'property: rotation; to: 0 0 180; dir: normal; dur: 1000; loop: 1;');
      var utterThis = new SpeechSynthesisUtterance(this.getAttribute('text')['value']);
      utterThis.voice = voice;
      synth.speak(utterThis);
    });
    this.el.addEventListener('animationcomplete', function (evt) {
      this.parentNode.remove();
      window.state.mode = 'play';
    });
  }
});

AFRAME.registerComponent('end-plane', {
  init: function () {
    this.el.setAttribute('animation', 'property: scale; from: 0.7 0.7 0.7; to: 1 1 1; loop: true; dir: alternate; dur: 800;');
    this.el.addEventListener('click', function (evt) {
      window.location.reload();
    });
  }
});

AFRAME.registerComponent('player-auto-move', {
  init: function () {
    //console.log('init player');
  },
  tick: function () {
    if (window.state.mode === 'play') {
      let current = window.state.checkpoints[state.current];

      if (current) {
        let checked = this.checkAxis(current);
        if (checked) {
          //console.log(current);
          window.state.current += 1;
        }
      } else {
        window.state.mode = 'end';
      }
    }
  },

  checkAxis: function (current) {
    let axis = current.a;
    let pos = current.p;
    let player_ax = this.el.object3D.position[axis];
    let goal_ax = pos[axis];

    if (player_ax <= goal_ax) {
      this.el.object3D.position[axis] += state.speed;
    } else if (player_ax >= goal_ax) {
      this.el.object3D.position[axis] -= state.speed;
    }

    if (this.el.object3D.position[axis].toFixed(2) == goal_ax) {
      return true;
    } else {
      return false;
    }
  }
});


AFRAME.registerComponent('scene-play-music', {
  schema: {},
  init: function() {
    // TinyMusic action!
    var ac = new AudioContext();
    var tempo = 130;

    // https://tabs.ultimate-guitar.com/tab/backstreet_boys/everybody_backstreets_back_tabs_2427811
    // rests are gut feeling ¯\_(ツ)_/¯
    var sequence = new TinyMusic.Sequence( ac, tempo, [
      'B3 e',
      '- e',
      'B3 e',
      'A#3 e',
      'A3 e',
      'G#3 e',
      'G3 e',
      '- e',
      'G3 e',
      '- e',
      'G3 e',
      'A3 e',
      'F#3 e',
      '- h'
    ]);

    sequence.waveType = 'sine';
    sequence.staccato = 0.05;
    sequence.bass.gain.value = 30;
    sequence.mid.gain.value = 5;
    sequence.loop = true ;
    sequence.gain.gain.value =  0.2;
    sequence.play
    (); // and never stop!
  }
});


AFRAME.registerComponent('exit-vr', {
  init: function() {
    this.el.addEventListener('click', function (evt) {
      let scene = document.getElementById('mainscene');
      scene.exitVR();
    });
  }
});
