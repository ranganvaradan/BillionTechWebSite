import zipfile
import re
import xml.etree.ElementTree as ET
from pathlib import Path

pptx = Path(r"D:\CurrentAug032025\Platform\BillionTechWebsite\docs\BillionTech_BigBasket_Proposal_v2.pptx")
out = Path(r"D:\CurrentAug032025\Platform\BillionTechWebsite\docs\_extracted_bigbasket.txt")

NS = "{http://schemas.openxmlformats.org/drawingml/2006/main}t"

with zipfile.ZipFile(pptx) as z:
    slides = sorted(
        [n for n in z.namelist() if n.startswith("ppt/slides/slide") and n.endswith(".xml")],
        key=lambda x: int(re.search(r"slide(\d+)", x).group(1)),
    )
    chunks = []
    for s in slides:
        root = ET.fromstring(z.read(s))
        texts = [t.text for t in root.iter(NS) if t.text and t.text.strip()]
        chunks.append(f"=== {s} ===\n" + "\n".join(texts))
    out.write_text("\n\n".join(chunks), encoding="utf-8")
    print(f"Wrote {out} ({len(slides)} slides)")
