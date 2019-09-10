let scene = document.getElementById('mainscene');

window.state.lyrics.forEach((v,i) => {
  let e = document.createElement('a-entity');
  e.classList.add('lyric');
  e.setAttribute('geometry','primitive: plane; width: 4; height: 1;');
  e.setAttribute('material', 'color: grey');
  e.setAttribute('text', `value: ${v.v}; width=: 6; height: 2; align: center; font: monoid;`);
  e.setAttribute('rotation', v.r);
  e.setAttribute('position', v.p);
  e.setAttribute("cursor-listener", true);
  e.setAttribute('animation', 'property: scale; from: 0.7 0.7 0.7; to: 0.9 0.9 0.9; loop: true; dir: alternate; dur: 800;');
  scene.appendChild(e);
})


scene.addEventListener('enter-vr', function () {
  console.log('enter');
  let player = document.querySelector('#player');
  player.setAttribute('position', 'y', '1.6');
});
