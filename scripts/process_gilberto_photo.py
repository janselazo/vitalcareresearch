#!/usr/bin/env python3
"""Prepare Dr. Gilberto Jimenez headshot: fetch hi-res, crop, enhance, export."""

from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image, ImageEnhance, ImageFilter

SRC_URL = (
    "https://doximity-res.cloudinary.com/images/f_auto,q_auto:best,w_800,h_800,c_fill/"
    "hbslllzit9hll1pg6fjn/gilberto-jimenez-md-hialeah-fl.jpg"
)
OUT = Path(__file__).resolve().parents[1] / "img" / "gilberto-jimenez.png"


def load_source() -> Image.Image:
    req = Request(SRC_URL, headers={"User-Agent": "Mozilla/5.0"})
    data = urlopen(req, timeout=20).read()
    return Image.open(BytesIO(data)).convert("RGB")


def face_square(img: Image.Image) -> Image.Image:
    w, h = img.size
    # Trim any watermark band along the bottom edge.
    crop = img.crop((0, 0, w, int(h * 0.98)))
    cw, ch = crop.size
    side = min(cw, ch)
    left = (cw - side) // 2
    # Shift crop up so the full forehead stays visible in card frames.
    top = max(0, (ch - side) // 2 - int(side * 0.14))
    return crop.crop((left, top, left + side, top + side))


def enhance(img: Image.Image, size: int = 1024) -> Image.Image:
    img = img.resize((size, size), Image.Resampling.LANCZOS)
    img = ImageEnhance.Brightness(img).enhance(1.06)
    img = ImageEnhance.Contrast(img).enhance(1.12)
    img = ImageEnhance.Color(img).enhance(1.03)
    img = ImageEnhance.Sharpness(img).enhance(1.5)
    return img.filter(ImageFilter.UnsharpMask(radius=1.2, percent=110, threshold=2))


def main() -> None:
    img = face_square(load_source())
    img = enhance(img)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    img.save(OUT, "PNG", optimize=True, compress_level=9)
    print(f"wrote {OUT} ({img.size[0]}x{img.size[1]}, {OUT.stat().st_size // 1024}KB)")


if __name__ == "__main__":
    main()
