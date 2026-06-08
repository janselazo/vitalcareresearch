#!/usr/bin/env python3
"""Prepare Dr. Maria Rodil headshot: fetch source, tighten crop, enhance, export."""

from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageEnhance, ImageFilter

SRC_URL = "https://peaceofmindmh.com/wp-content/uploads/2025/11/Dr.-Maria-Rodil-.jpg"
OUT = Path(__file__).resolve().parents[1] / "img" / "maria-rodil.png"


def load_source() -> Image.Image:
    req = Request(SRC_URL, headers={"User-Agent": "Mozilla/5.0"})
    data = urlopen(req, timeout=20).read()
    return Image.open(BytesIO(data)).convert("RGB")


def face_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    side = int(min(w, h) * 0.92)
    left = (w - side) // 2
    # Tighten framing and remove excess space above the head.
    top = max(0, int(h * 0.06))
    return img.crop((left, top, left + side, min(h, top + side)))


def enhance(img: Image.Image, size: int = 1024) -> Image.Image:
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    img = ImageEnhance.Brightness(img).enhance(1.05)
    img = ImageEnhance.Contrast(img).enhance(1.14)
    img = ImageEnhance.Color(img).enhance(1.08)
    img = ImageEnhance.Sharpness(img).enhance(1.65)
    return img.filter(ImageFilter.UnsharpMask(radius=1.4, percent=120, threshold=2))


def main() -> None:
    img = face_square(load_source())
    img = enhance(img)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True, compress_level=9)
    print(f"wrote {OUT} ({img.size[0]}x{img.size[1]}, {OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
