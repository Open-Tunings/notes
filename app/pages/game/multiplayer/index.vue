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

  loadSprite('idle-sprite', '/game/Idle.png', {
    sliceX: 8,
    sliceY: 1,
    anims: {'idle-anim': { from: 0, to: 7, loop: true }},
  });
  loadSprite('run-sprite', '/game/Run.png', {
    sliceX: 8,
    sliceY: 1,
    anims: {'run-anim': { from: 0, to: 7, loop: true }},
  });
  loadSprite('jump-sprite', '/game/Jump.png', {
    sliceX: 2,
    sliceY: 1,
    anims: {'jump-anim': { from: 0, to: 1, loop: true }},
  });
  loadSprite('fall-sprite', '/game/Fall.png', {
    sliceX: 8,
    sliceY: 1,
    anims: {'fall-anim': { from: 0, to: 7, loop: true }},
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
    scale(2),
    area({shape: new Rect(vec2(0), 32, 32), offset: vec2(0, 32)}),
    anchor("center"),
    body(),
    pos(900, 10),
    {
        speed: 500,
        previousHeight: null,
        heightDelta: 0,
        direction: 'right'
    }
])

player.play('idle-anim')
});



</script>
