import mitsuba as mi
import numpy as np
from PIL import Image
import io

mi.set_variant(
    'llvm_ad_rgb' if 'llvm_ad_rgb' in mi.variants() else
    'scalar_rgb'
)

def render_scene(params):
    scene = mi.load_dict(params)
    img = mi.render(scene)

    img_np = np.array(img)
    img_np = np.clip(img_np ** (1.0 / 2.2), 0.0, 1.0)
    img_np = (img_np * 255).astype(np.uint8)

    pil_img = Image.fromarray(img_np, mode='RGB')

    buf = io.BytesIO()
    pil_img.save(buf, format="PNG", optimize=True)
    return buf.getvalue()