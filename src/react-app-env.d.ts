/// <reference types="react-scripts" />
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      effectComposer: ReactThreeFiber.effectComposer<
        EffectComposer,
        typeof EffectComposer
      >
    }
    interface IntrinsicElements {
      renderPass: ReactThreeFiber.RenderPass<RenderPass, typeof RenderPass>
    }
    interface IntrinsicElements {
      filmPass: ReactThreeFiber.FilmPass<FilmPass, typeof FilmPass>
    }
    interface IntrinsicElements {
      shaderPass: ReactThreeFiber.ShaderPass<ShaderPass, typeof ShaderPass>
    }
  }
}
