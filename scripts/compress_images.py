#!/usr/bin/env python3
"""Recompress site images to web-friendly sizes."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "img"

PNG_FILES = [
    "exterior.png", "reception.png", "conference.png", "office.png",
    "storage.png", "lab.png", "cold-storage.png", "exam.png", "bp.png",
    "team.png", "gilberto-jimenez.png", "maria-rodil.png", "patientM.png", "patientW.png",
]


def compress_png(name: str) -> None:
    path = ROOT / name
    img = Image.open(path).convert("RGB")
    w, h = img.size
    max_side = 1200
    scale = min(1.0, max_side / max(w, h))
    if scale < 1.0:
        img = img.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    tmp = path.with_suffix(".tmp.png")
    img.save(tmp, "PNG", optimize=True, compress_level=9)
    tmp.replace(path)
    print(f"{name}: {path.stat().st_size // 1024}KB")


def compress_jpg(name: str) -> None:
    path = ROOT / name
    img = Image.open(path).convert("RGB")
    img.save(path, "JPEG", quality=78, optimize=True, progressive=True)
    print(f"{name}: {path.stat().st_size // 1024}KB")


def main() -> None:
    for name in PNG_FILES:
        compress_png(name)
    compress_jpg("office-tour-poster.jpg")


if __name__ == "__main__":
    main()
