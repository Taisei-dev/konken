from flask import Flask,request
import urllib.request
import json

app=Flask(__name__)

@app.route('/api/autocomplete')
def autocomplete():
    word=""
    if request.args.get('word') is not None:
        word=request.args.get('word')
    req=urllib.request.Request('https://kuruken.jp/Approach/GetKeywordCompletionByFreeword',json.dumps({'selectLang':'ja','freeword':word}).encode(),{'Content-Type': 'application/json'})
    return json.dumps(list(map(lambda val:val["Name"],json.loads(urllib.request.urlopen(req).read()))))

if __name__ == '__main__':
  app.run()