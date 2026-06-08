#!/usr/bin/env python3
"""Process portrait assets into img/ with target aspect ratios."""

from pathlib import Path

from PIL import Image, ImageEnhance

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path("/Users/janse/.cursor/projects/Users-janse-Documents-GitHub-vitalcareresearch/assets")
OUT = ROOT / "img"


def crop_aspect(img: Image.Image, ratio_w: int, ratio_h: int) -> Image.Image:
    w, h = img.size
    target = ratio_w / ratio_h
    current = w / h
    if current > target:
        new_w = int(h * target)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    new_h = int(w / target)
    top = (h - new_h) // 2
    return img.crop((0, top, w, top + new_h))


def save_portrait(src: str, out: str, ratio: tuple[int, int], max_side: int) -> None:
    img = Image.open(ASSETS / src).convert("RGB")
    img = crop_aspect(img, *ratio)
    img = ImageEnhance.Contrast(img).enhance(1.05)
    w, h = img.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    img.save(OUT / out, "PNG", optimize=True, compress_level=9)
    print(f"wrote {out} {img.size}")


def main() -> None:
    save_portrait("pi-new.png", "pi.png", (3, 4), 900)
    save_portrait("dir-new.png", "dir.png", (3, 4), 900)
    save_portrait("coord-new.png", "coord.png", (3, 4), 900)
    save_portrait("patientM-new.png", "patientM.png", (4, 4), 900)
    save_portrait("patientW-new.png", "patientW.png", (4, 4), 900)


if __name__ == "__main__":
    main()
