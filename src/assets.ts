// === PIXI ===
export const pixiAssetNames = [
  'smoke1',
  'smoke2',
  'smoke3',
  'smoke4',
  'smokeLight',
  'dustMask',
  'dustMaskBig',
  'dustOverlayMask',
  'dustParticle',
  'fireworksSmoke',
  'fireworksParticle',
  'airBullet',
  'airPlane1',
  'airPlane2',
] as const
export type TPixiAssetName = typeof pixiAssetNames[number]
type TPixiAssetSources = Record<TPixiAssetName, string>
export const pixiAssetSources: TPixiAssetSources = {
  smoke1: 'pixi/smoke1.png',
  smoke2: 'pixi/smoke2.png',
  smoke3: 'pixi/smoke3.png',
  smoke4: 'pixi/smoke4.png',
  smokeLight: 'pixi/smoke-light.png',
  dustMask: 'pixi/dust-mask.png',
  dustMaskBig: 'pixi/dust-mask-big.png',
  dustOverlayMask: 'pixi/dust-overlay-mask.png',
  dustParticle: 'pixi/dust-particle.png',
  fireworksParticle: 'pixi/fireworks-particle.png',
  fireworksSmoke: 'pixi/fireworks-smoke.png',
  airBullet: 'pixi/air-bullet.png',
  airPlane1: 'pixi/air-plane1.png',
  airPlane2: 'pixi/air-plane2.png',
}
export type TPixiResources = Partial<
  Record<TPixiAssetName, PIXI.LoaderResource>
>

// === IMAGES ===
export const imageAssetNames = [
  'inkOverlay',
  'filmOverlay',
  'dirtOverlay',

  'i1941Layer1Aerostat',
  'i1941Layer2Buildings',
  'i1941Layer3Buildings',
  'i1941Layer4Aerostats',
  'i1941Ray',

  'i1942Layer1Right',
  'i1942Layer2Center',
  'i1942Layer3Left',
  'i1942Layer3Right',
  'i1942Layer4Right',

  'i1943Hammer',
  'i1943Layer1LeftHedgehog',
  'i1943Layer1RightHedgehog',
  'i1943Layer2Ground',
  'i1943Layer2Tank',
  'i1943Layer3Ground',
  'i1943Layer3Tank',
  'i1943Layer4Trees',

  'i1944Bags',
  'i1944Gun',
  'i1944Helmet1',
  'i1944Helmet2',
  'i1944Helmet3',

  'i1945Layer1',
  'i1945Layer2',
  'i1945Layer3',
  'i1945Glare',
] as const
export type TImageAssetName = typeof imageAssetNames[number]
type TImageAssetSources = Record<
  TImageAssetName,
  { webp?: string; png: string }
>
export const imageAssetSources: TImageAssetSources = {
  inkOverlay: {
    webp: 'images/ink-overlay.webp',
    png: 'images/ink-overlay.png',
  },
  filmOverlay: {
    webp: 'images/film-overlay.webp',
    png: 'images/film-overlay.png',
  },
  dirtOverlay: {
    webp: 'images/dirt-overlay.webp',
    png: 'images/dirt-overlay.png',
  },

  i1941Layer1Aerostat: { png: 'images/1941/layer1-aerostat.png' },
  i1941Layer2Buildings: { png: 'images/1941/layer2-buildings.png' },
  i1941Layer3Buildings: { png: 'images/1941/layer3-buildings.png' },
  i1941Layer4Aerostats: { png: 'images/1941/layer4-aerostats.png' },
  i1941Ray: { png: 'images/1941/ray.png' },

  i1942Layer1Right: { png: 'images/1942/layer1-right.png' },
  i1942Layer2Center: { png: 'images/1942/layer2-center.png' },
  i1942Layer3Left: { png: 'images/1942/layer3-left.png' },
  i1942Layer3Right: { png: 'images/1942/layer3-right.png' },
  i1942Layer4Right: { png: 'images/1942/layer4-right.png' },

  i1943Hammer: { png: 'images/1943/hammer.png' },
  i1943Layer1LeftHedgehog: { png: 'images/1943/layer1-left-hedgehog.png' },
  i1943Layer1RightHedgehog: { png: 'images/1943/layer1-right-hedgehog.png' },
  i1943Layer2Ground: { png: 'images/1943/layer2-ground.png' },
  i1943Layer2Tank: { png: 'images/1943/layer2-tank.png' },
  i1943Layer3Ground: { png: 'images/1943/layer3-ground.png' },
  i1943Layer3Tank: { png: 'images/1943/layer3-tank.png' },
  i1943Layer4Trees: { png: 'images/1943/layer4-trees.png' },

  i1944Bags: { png: 'images/1944/bags.png' },
  i1944Gun: { png: 'images/1944/gun.png' },
  i1944Helmet1: { png: 'images/1944/helmet1.png' },
  i1944Helmet2: { png: 'images/1944/helmet2.png' },
  i1944Helmet3: { png: 'images/1944/helmet3.png' },

  i1945Layer1: { png: 'images/1945/layer1.png' },
  i1945Layer2: { png: 'images/1945/layer2.png' },
  i1945Layer3: { png: 'images/1945/layer3.png' },
  i1945Glare: { png: 'images/1945/glare.png' },
}

// === VIDEOS ===
export const videoAssetNames = ['loadingAnimation'] as const
export type TVideoAssetName = typeof videoAssetNames[number]
type TVideoAssetSources = Record<TVideoAssetName, { webm: string; mp4: string }>
export const videoAssetSources: TVideoAssetSources = {
  loadingAnimation: {
    webm: 'videos/loading-animation.webm',
    mp4: 'videos/loading-animation.mp4',
  },
}

// === FONTS ===
export const fontAssetNames = [
  'Nothing You Could Do',
  'PT Root UI',
  'NK169',
] as const
export type TFontAssetName = typeof fontAssetNames[number]
type TFontAssetSources = Record<TFontAssetName, string>
export const fontAssetSources: TFontAssetSources = {
  'Nothing You Could Do': 'url(/fonts/nothing-you-could-do.woff2)',
  'PT Root UI': 'url(/fonts/pt-root-ui-regular.woff2)',
  NK169: 'url(/fonts/nk169.otf)',
}

// === SOUNDS ===
export const soundAssetNames = [
  'metalHit1',
  'metalHit2',
  'metalHit3',
  'firework',
  'artillery',
  'battle',
  'brownThrashes',
  'projector',
  'levitanWarStarted',
  'battleSounds',
  'levitanWarEnded',
  'hooray',
] as const
export type TSoundAssetName = typeof soundAssetNames[number]
type TSoundAssetSources = Record<
  TSoundAssetName,
  { url: string; loop: boolean }
>
export const soundAssetSources: TSoundAssetSources = {
  metalHit1: { url: 'sounds/metal-hit1.mp3', loop: false },
  metalHit2: { url: 'sounds/metal-hit2.mp3', loop: false },
  metalHit3: { url: 'sounds/metal-hit3.mp3', loop: false },
  firework: { url: 'sounds/firework.mp3', loop: false },
  artillery: { url: 'sounds/artillery.mp3', loop: true },
  battle: { url: 'sounds/battle.mp3', loop: true },
  brownThrashes: { url: 'sounds/brown-thrashes.mp3', loop: true },
  projector: { url: 'sounds/projector.mp3', loop: true },
  levitanWarStarted: { url: 'sounds/levitan-war-started.mp3', loop: false },
  battleSounds: { url: 'sounds/battle-sounds.mp3', loop: true },
  levitanWarEnded: { url: 'sounds/levitan-war-ended.mp3', loop: false },
  hooray: { url: 'sounds/hooray.mp3', loop: true },
}
