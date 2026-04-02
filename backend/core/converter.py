import mitsuba as mi
import json

class Utils:
    @staticmethod
    def hex_to_rgb(hex_str):
        hex_str = hex_str.lstrip('#')
        return [int(hex_str[i:i+2], 16) / 255.0 for i in (0, 2, 4)]

    @staticmethod
    def cord_to_list(v):
        return [v['x'], v['y'], v['z']]

def _convert_object(obj):
    transform = (mi.ScalarTransform4f.translate([obj['position']['x'], obj['position']['y'], obj['position']['z']])
                 .rotate([0, 0, 1], obj['rotation']['z'])
                 .rotate([0, 1, 0], obj['rotation']['y'])
                 .rotate([1, 0, 0], obj['rotation']['x'])
                 .scale([obj['scale']['x'], obj['scale']['y'], obj['scale']['z']]))

    mi_obj = {
        "type": obj['type'],
        "to_world": transform,
    }

    if obj['material'] in ['diffuse', 'emitter']:
        mi_obj['bsdf'] = {
            "type": 'diffuse',
            "reflectance": {
                "type": "rgb",
                "value": Utils.hex_to_rgb(obj['color'])
            }
        }
    else:
        mi_obj['bsdf'] = obj['bsdfProps']
    if obj['material'] == 'emitter':
        mi_obj['emitter'] = obj['emitterProps']

    return mi_obj

def _convert_sensor(sensor, width, height, spp):
    mi_sensor = {
        "type": "perspective",
        "fov": sensor['fov'],
        "fov_axis": "smaller",
        "to_world": mi.ScalarTransform4f.look_at(
            origin=Utils.cord_to_list(sensor['position']),
            target=Utils.cord_to_list(sensor['lookAt']),
            up=Utils.cord_to_list(sensor['up'])
        ),
        "sampler": {
            "type": "independent",
            "sample_count": spp
        },
        "film": {
            "type": "hdrfilm",
            "width": width,
            "height": height,
            "rfilter": { "type": "gaussian" } # Фильтр для сглаживания пикселей
        }
    }
    return mi_sensor

def json_to_mitsuba(json_fmt):
    scene_dict = {
        "type": "scene",
        "integrator": {"type": "path"},
        "sensor": _convert_sensor(json_fmt['sensor'], json_fmt['width'], json_fmt['height'], json_fmt['spp']),
    }

    for raw_object in json_fmt['objects']:
        scene_dict[f'obj_{raw_object['id']}'] = _convert_object(raw_object)

    return scene_dict