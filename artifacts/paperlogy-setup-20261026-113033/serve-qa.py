"""Loopback-only temporary font QA. No production app imports this file."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import json

QA = Path(__file__).resolve().parent
ROOT = QA.parents[1]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_POST(self):
        if self.path != "/__paperlogy_qa_result":
            self.send_error(404)
            return
        size = int(self.headers.get("Content-Length", "0"))
        if size < 1 or size > 200_000:
            self.send_error(413)
            return
        result = json.loads(self.rfile.read(size))
        (QA / "browser-verification.json").write_text(
            json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        self.send_response(204)
        self.end_headers()


if __name__ == "__main__":
    print("Paperlogy isolated QA: http://127.0.0.1:5487/" + QA.relative_to(ROOT).as_posix() + "/font-check.html", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 5487), Handler).serve_forever()
