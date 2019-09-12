let scene = document.getElementById('mainscene');

window.state.lyrics.forEach((v,i) => {
  let e = document.createElement('a-entity');
  e.classList.add('lyric');
  e.setAttribute('geometry','primitive: plane; width: 4; height: 1;');
  e.setAttribute('material', 'color: grey');
  e.setAttribute('text', `value: ${v.v}; width=: 6; height: 2; align: center; font: monoid;`);
  e.setAttribute('rotation', v.r);
  e.setAttribute('position', v.p);
  e.setAttribute('cursor-listener', true);
  e.setAttribute('animation', 'property: scale; from: 0.7 0.7 0.7; to: 0.9 0.9 0.9; loop: true; dir: alternate; dur: 800;');
  scene.appendChild(e);
})


scene.addEventListener('enter-vr', function () {
  //console.log('enter');
  let player = document.querySelector('#player');
  player.object3D.position.y = 1.6;

  let e = document.createElement('a-entity');
  e.classList.add('escape-vr');
  e.setAttribute('geometry','primitive: plane; width: 0.5; height: 0.5;');
  e.setAttribute('material', 'color: red');
  e.setAttribute('text', `value: Exit VR Mode; width=: 6; height: 3; align: center; font: monoid;`);
  e.setAttribute('rotation', '90 0 0');
  e.setAttribute('position', '0 1.5 0');
  e.setAttribute('exit-vr', true);

  player.appendChild(e);
});

scene.addEventListener('exit-vr', function () {
  document.querySelectorAll('.escape-vr').forEach(x => x.remove());
});
