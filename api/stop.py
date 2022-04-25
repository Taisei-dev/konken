from urllib import response
from flask import Flask,request,render_template
import urllib.request,urllib.parse
import json

app=Flask(__name__)
@app.route('/stop')
def stop():
    sid=""
    if request.args.get('sid') != None:
        sid=request.args.get('sid')
    req=urllib.request.Request('https://kuruken.jp/Approach/ChangeNoriba',json.dumps({'selectLang':'ja','stationSid':sid,'goalStaCode':'','goalComId':'','listSortMode':'1'}).encode(),{'Content-Type': 'application/json'})
    return render_template('stop.html',response=urllib.request.urlopen(req).read().decode().replace("\\r\\n","\n").replace("\\u003c","<").replace("\\u003e",">").replace('\\"','"').replace("\\u0027","'").replace("<script","<!--<script").replace("</script>","</script>-->")[1:-1])

if __name__ == '__main__':
  app.run()