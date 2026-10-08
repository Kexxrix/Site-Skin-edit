from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.request import urlopen
from urllib.error import HTTPError
import hashlib, json

events = []
class Handler(BaseHTTPRequestHandler):
    def log_message(self, *args): pass
    def do_GET(self):
        if self.path.startswith('/__qa-blocked-typekit__/'):
            self.send_response(200)
            self.send_header('Content-Type', 'text/css' if '.css' in self.path else 'application/javascript')
            self.end_headers()
            return
        try:
            response = urlopen('http://127.0.0.1:5418' + self.path)
        except HTTPError as error:
            response = error
        body = response.read()
        mime = response.headers.get('Content-Type', 'application/octet-stream')
        original_hash = hashlib.sha256(body).hexdigest()
        if any(t in mime for t in ('text/html', 'javascript', 'text/css')):
            body = body.replace(b'https://use.typekit.net/', b'/__qa-blocked-typekit__/')
            body = body.replace(b'https://p.typekit.net/', b'/__qa-blocked-typekit__/')
        if 'text/html' in mime:
            shim = b"""<script>{const values=new Map();Object.defineProperty(window,'localStorage',{value:{getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,String(v)),removeItem:k=>values.delete(k),clear:()=>values.clear(),key:i=>Array.from(values.keys())[i]??null,get length(){return values.size}}});}</script>"""
            body = body.replace(b'<head>', b'<head>' + shim, 1)
        events.append({'path': self.path, 'status': response.status, 'originalSha256': original_hash, 'responseSha256': hashlib.sha256(body).hexdigest()})
        from pathlib import Path
        Path(__file__).with_name('qa-response-log.json').write_text(json.dumps(events, indent=2), encoding='utf-8')
        self.send_response(response.status)
        self.send_header('Content-Type', mime)
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

ThreadingHTTPServer(('127.0.0.1', 5498), Handler).serve_forever()
