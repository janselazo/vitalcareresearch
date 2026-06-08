#!/usr/bin/env python3
"""Crop, enhance, and export facility images from staged reference photos."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "img" / "source" / "enhanced"
OUT = ROOT / "img"

STYLE = {
    "brightness": 1.03,
    "contrast": 1.05,
    "color": 1.02,
    "sharpness": 1.08,
}


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


def enhance(img: Image.Image) -> Image.Image:
    img = ImageEnhance.Brightness(img).enhance(STYLE["brightness"])
    img = ImageEnhance.Contrast(img).enhance(STYLE["contrast"])
    img = ImageEnhance.Color(img).enhance(STYLE["color"])
    img = ImageEnhance.Sharpness(img).enhance(STYLE["sharpness"])
    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=80, threshold=2))


def export_png(src_name: str, out_name: str, ratio: tuple[int, int], max_side: int = 1400) -> None:
    img = Image.open(SRC / src_name).convert("RGB")
    img = crop_aspect(img, *ratio)
    img = enhance(img)
    w, h = img.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    out = OUT / out_name
    img.save(out, "PNG", optimize=True, compress_level=9)
    print(f"wrote {out.name} ({img.size[0]}x{img.size[1]})")


def export_jpg(src_name: str, out_name: str, ratio: tuple[int, int], size: tuple[int, int]) -> None:
    img = Image.open(SRC / src_name).convert("RGB")
    img = crop_aspect(img, *ratio)
    img = enhance(img)
    img = img.resize(size, Image.Resampling.LANCZOS)
    out = OUT / out_name
    img.save(out, "JPEG", quality=82, optimize=True, progressive=True)
    print(f"wrote {out.name} ({size[0]}x{size[1]})")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    ratio_45 = (4, 5)
    ratio_43 = (4, 3)
    ratio_169 = (16, 9)

    export_png("V1-exterior.png", "exterior.png", ratio_45)
    export_png("V2-reception.png", "reception.png", ratio_45)
    export_png("V3-conference.png", "conference.png", ratio_45)
    export_png("V4-office.png", "office.png", ratio_45)
    export_png("V5-storage.png", "storage.png", ratio_45)
    export_png("V6-lab.png", "lab.png", ratio_45)
    export_png("V7-cold-storage.png", "cold-storage.png", ratio_45)
    export_png("V8-exam.png", "exam.png", ratio_45)
    export_png("V2-reception-waiting.jpg", "bp.png", ratio_43)
    export_png("V4-team.png", "team.png", ratio_45)
    export_jpg("V2-reception.png", "office-tour-poster.jpg", ratio_169, (1920, 1080))


if __name__ == "__main__":
    main()
