from pathlib import Path
import re

E = Path(__file__).parent
old = Path('E:/codexwork/Site-Skin-edit-backups/20261007-mercury-white-register/backup.py')
code = old.read_text(encoding='utf-8')
code = code.replace('20261007-mercury-white-local','20261008-mercury-white-public-v1')
code = code.replace("BASE = '9d74a69464317fdef4f9872b0b00667f52f0aaf7'", "BASE = '11f6f9dc1e6923ce1d6e6bb9652c0e71a64f0705'")
code = code.replace("'registration.json'", "'publication.json'")
start = code.index('def preservation():')
end = code.index('\ndef baseline():',start)
code = code[:start]+'''def preservation():
    assert git(APP,'rev-parse','HEAD').decode().strip() == SOURCE_COMMIT
    assert git(APP,'branch','--show-current').decode().strip() == 'mercury-white-20261007'
    assert not git(APP,'remote').strip()
    assert not (APP/'.openai/hosting.json').exists()
    approved = read(EVIDENCE/'approved-source.json')
    release = PROJECT/'publish/site'
    differences = []
    for rec in approved['files']:
        assert sha((APP/rec['path']).read_bytes()) == rec['sha256'], rec['path']
        if sha((release/rec['path']).read_bytes()) != rec['sha256']:
            differences.append(rec['path'])
    assert set(differences) == {'.gitignore','vite.config.ts'}, differences
    assert git(release,'rev-parse','HEAD').decode().strip() == '694efe89b8f230030c21f554d674ab71617a60bc'
    assert not git(release,'status','--porcelain').strip()
    assert read(release/'.openai/hosting.json')['project_id'] == 'appgprj_6ac7523068808191aa0f1014883e0752'
    input_sha = sha((PROJECT/'input/mercury-palette_98.json').read_bytes())
    assert input_sha == sha((APP/'theme/mercury-palette_98.json').read_bytes()) == 'f8387c05ce6298592b1eca859f41dd1d4069a4a95ab9d7631fac9b4badc81ae5'
    return {'local_base_commit':SOURCE_COMMIT,'approved_local_source_files_verified':len(approved['files']),'local_source_bytes_unchanged':True,'local_remotes_unchanged':True,'release_commit':'694efe89b8f230030c21f554d674ab71617a60bc','release_only_differences':differences,'approved_input_sha256':input_sha,'sites_project_id':'appgprj_6ac7523068808191aa0f1014883e0752','deployment_performed':True,'public_version':1}
''' + code[end:]
code=code.replace("    assert not (REPO/'demo-sites/mercury-white-20261007').exists(), 'Destination project already exists'\n",'')
code=code.replace("d.startswith('runtime-retired-')", "d.startswith('runtime-')")
code=code.replace("for name in ['preflight.json','preflight.py','backup.py']:", "for name in ['approved-source.json','publication.json','live-status.json','public-browser-verification.json','public-http-verification.json','public-final.png','build.log','typecheck.log','backup.py','verify-public.py','update-docs.py','prepare-backup.py']:")
code=code.replace("'origin':'registration evidence'", "'origin':'publication evidence'")
code=code.replace("'MERCURY White local registration: current source, assets, documents, input and eligible QA. No Sites registration or deployment.'", "'MERCURY White PUBLIC v1: approved local source and release checkout, assets, documents, input, eligible QA and sanitized publication evidence.'")
code=code.replace("        assert not dst.exists() or rec['path'] in SHARED, rec['path']", "        assert not dst.exists() or rec['path'] in SHARED or rec['path'].startswith('demo-sites/mercury-white-20261007/'), rec['path']")
code=code.replace("'public_url':None", "'public_url':'https://mercury-white.kexxadrix.chatgpt.site/'")
start=code.index("    write(SNAP/'publication.json',")
end=code.index('\n    paths =',start)
code=code[:start]+"    write(SNAP/'publication.json',read(EVIDENCE/'publication.json'))"+code[end:]
dest=E/'backup.py'
assert not dest.exists(), dest
dest.write_text(code,encoding='utf-8')
print('Prepared current publication backup workflow')
