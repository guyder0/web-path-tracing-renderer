import mitsuba as mi

mi.set_variant(
    'llvm_ad_rgb' if 'llvm_ad_rgb' in mi.variants() else
    'scalar_rgb'
)

def render_scene(params):
    scene = mi.load_dict(params)
    img = mi.render(scene)
    return img