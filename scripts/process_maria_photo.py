#!/usr/bin/env python3
"""Prepare Dr. Maria Rodil headshot: crop, upscale, enhance."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

SRC = Path("/Users/janse/.cursor/projects/Users-janse-Documents-GitHub-vitalcareresearch/assets/Dr.-Maria-Rodil--0ee168a3-e3bc-4583-a06e-fbadfe319306.png")
OUT = Path(__file__).resolve().parents[1] / "img" / "maria-rodil.png"


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, (h - side) // 2 - int(side * 0.06))
    crop = img.crop((left, top, left + side, min(h, top + side)))

    size = 960
    crop = crop.resize((size, size), Image.Resampling.LANCZOS)
    crop = ImageEnhance.Brightness(crop).enhance(1.06)
    crop = ImageEnhance.Contrast(crop).enhance(1.12)
    crop = ImageEnhance.Color(crop).enhance(1.06)
    crop = ImageEnhance.Sharpness(crop).enhance(1.45)
    crop = crop.filter(ImageFilter.UnsharpMask(radius=1.6, percent=100, threshold=2))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    crop.save(OUT, "PNG", optimize=True, compress_level=9)
    print(f"wrote {OUT} ({size}x{size}, {OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
