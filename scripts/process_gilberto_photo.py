#!/usr/bin/env python3
"""Prepare Dr. Gilberto Jimenez headshot: crop watermark, enhance, export."""

from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

SRC = Path("/Users/janse/.cursor/projects/Users-janse-Documents-GitHub-vitalcareresearch/assets/Gilberto-d2892294-846b-4203-ac59-6df727aff6d8.png")
OUT = Path(__file__).resolve().parents[1] / "img" / "gilberto-jimenez.png"


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    w, h = img.size
    # Remove Doximity logo in bottom-right corner.
    crop = img.crop((0, 0, int(w * 0.76), int(h * 0.76)))
    cw, ch = crop.size
    side = min(cw, ch)
    left = (cw - side) // 2
    top = max(0, (ch - side) // 2 - int(side * 0.04))
    crop = crop.crop((left, top, left + side, top + side))

    size = 960
    crop = crop.resize((size, size), Image.Resampling.LANCZOS)
    crop = ImageEnhance.Brightness(crop).enhance(1.08)
    crop = ImageEnhance.Contrast(crop).enhance(1.1)
    crop = ImageEnhance.Color(crop).enhance(1.04)
    crop = ImageEnhance.Sharpness(crop).enhance(1.35)
    crop = crop.filter(ImageFilter.UnsharpMask(radius=1.4, percent=90, threshold=2))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    crop.save(OUT, "PNG", optimize=True, compress_level=9)
    print(f"wrote {OUT} ({size}x{size}, {OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
