<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";
import kaplay from "kaplay";

definePageMeta({
  layout: "studio",
});

onMounted(() => {
  kaplay({
    width: 1280,
    height: 720,
  });

  loadSprite("background-0", "/game/background_0.png");
  loadSprite("background-1", "/game/background_1.png");
  loadSprite("background-2", "/game/background_2.png");
   loadSpriteAtlas("/game/tileset.png", {
    "platform-left": { x: 82, y: 64, width: 16, height: 8 },
    "platform-middle": {
      x: 112,
      y: 64,
      width: 16,
      height: 8,
    },
    "platform-right": {
      x: 142,
      y: 64,
      width: 16,
      height: 8,
    },
    "smaller-tree": {
      x: 0,
      y: 80,
      width: 60,
      height: 65,
    },
    "bigger-tree": {
      x: 170,
      y: 10,
      width: 115,
      height: 200,
    },
    ground: {
      x: 80,
      y: 144,
      width: 16,
      height: 16,
    },
    "ground-deep": {
      x: 0,
      y: 144,
      width: 16,
      height: 16,
    },
  });

  loadSprite('idle-sprite', '/game/Idle_2.png', {
    sliceX: 6,
    sliceY: 1,
    anims: {'idle-anim': { from: 0, to: 5, loop: true }},
  });
  loadSprite('run-sprite', '/game/Run.png', {
    sliceX: 8,
    sliceY: 1,
    anims: {'run-anim': { from: 0, to: 7, loop: true }},
  });
  loadSprite('jump-sprite', '/game/Jump.png', {
    sliceX: 10,
    sliceY: 1,
    anims: {'jump-anim': { from: 0, to: 9, loop: true }},
  });
  loadSprite('fall-sprite', '/game/Jump.png', {
    sliceX: 10,
    sliceY: 1,
    anims: {'fall-anim': { from: 5, to: 9, loop: true }},
  });
  loadSprite('attack-sprite', '/game/Attack_1.png', {
    sliceX: 10,
    sliceY: 1,
    anims: {'attack-anim': { from: 4, to: 9, loop: true }},
  });
  
  setGravity(1000);

  add([sprite("background-0"), fixed(), scale(4)]);

  add([sprite("background-0"), fixed(), pos(1000, 0), scale(4)]).flipx = true;

  add([sprite("background-1"), fixed(), scale(4)]);

  add([sprite("background-1"), fixed(), pos(1000, 0), scale(4)]).flipx = true;

  add([sprite("background-2"), fixed(), scale(4)]);

  add([sprite("background-2"), fixed(), pos(1000, 0), scale(4)]).flipx = true;

  const biggerTree = add([sprite("bigger-tree"), pos(900, 104), scale(4)]);

  const tree = add([sprite("smaller-tree"), pos(70, 190), scale(4)]);

 
  const map = addLevel(
    [
      "5                                                     5",
      "5                                                     5",
      "5   012                  012                  012     5",
      "5        012                                          5",
      "5                                   012               5",
      "5   012              012                              5",
      "5             012                                     5",
      " 333333                      012           012        5",
      " 444444                                               5",
      " 444444   012                                         5",
      " 33333333333333333333333333333333333333333333333333333 ",
      " 44444444444444444444444444444444444444444444444444444 ",
    ],
    {
      tileWidth: 16,
      tileHeight: 16,
      tiles: {
        0: () => [sprite("platform-left"), area(), body({ isStatic: true })],
        1: () => [sprite("platform-middle"), area(), body({ isStatic: true })],
        2: () => [sprite("platform-right"), area(), body({ isStatic: true })],
        3: () => [sprite("ground"), area(), body({ isStatic: true })],
        4: () => [sprite("ground-deep"), area(), body({ isStatic: true })],
        5: () => [rect(16, 16), opacity(0), area(), body({ isStatic: true })],
      },
    },
  );

  map.use(scale(4));


  const player = add([
    sprite('idle-sprite'),
    scale(1),
    area({shape: new Rect(vec2(0), 32, 60), offset: vec2(0, 32)}),
    anchor("center"),
    body(),
    pos(900, 10),
    {
        speed: 300,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right',
        isAttacking: false
    }
])

player.play('idle-anim')

onKeyDown('right', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'right') player.direction = 'right'
    player.move(player.speed, 0)
})

onKeyRelease('right', () =>{
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyDown('left', () => {
    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('run-sprite'))
        player.play('run-anim')
    }

    if (player.direction !== 'left') player.direction = 'left'
    player.move(-player.speed, 0)
})

onKeyRelease('left', () =>{
    player.use(sprite('idle-sprite'))
    player.play('idle-anim')
})

onKeyPress('q', () => {
  if (player.isAttacking || !player.isGrounded()) return

  player.isAttacking = true
  const AttackDir = player.direction 


  player.use(sprite('attack-sprite'))
  player.flipX = AttackDir === 'left'
  player.play('attack-anim')

  wait(0.7, () => {
    player.isAttacking = false
  })
})


onKeyPress('up', () => {
    if (player.isGrounded()) {
        player.jump()
    }
})

camScale(1.3)


onUpdate(() => {
    if(player.isAttacking) return

    if(player.previousHeight) {
        player.heightDelta = player.previousHeight - player.pos.y
    }

    player.previousHeight = player.pos.y

    const cameraLeftBound = 550
    const cameraRigthBound = 3000
    const cameraVerticalOffset = player.pos.y - 100

    if (cameraLeftBound > player.pos.x) {
        camPos(cameraLeftBound, cameraVerticalOffset)
    } else if (cameraRigthBound < player.pos.x) {
        camPos(cameraRigthBound, cameraVerticalOffset)
    } else {
        camPos(player.pos.x, cameraVerticalOffset)
    }

    if (player.curAnim() !== 'run-anim' && player.isGrounded()) {
        player.use(sprite('idle-sprite'))
        player.play('idle-anim')
    }
    if (player.curAnim() !== 'jump-anim' && !player.isGrounded() && player.heightDelta > 0) {
        player.use(sprite('jump-sprite'))
        player.play('jump-anim')
    }
    if (player.curAnim() !== 'fall-anim' && !player.isGrounded() && player.heightDelta < 0) {
        player.use(sprite('fall-sprite'))
        player.play('fall-anim')
    }
    if (player.direction === "left") {
        player.flipX = true
    } else {
        player.flipX = false
    }
})
});


</script>
