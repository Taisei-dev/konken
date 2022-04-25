from urllib import response
from flask import Flask,request,render_template
import urllib.request,urllib.parse
import json

app=Flask(__name__)
@app.route('/trip')
def stop():
    sid=""
    if request.args.get('sid') != None:
        sid=request.args.get('sid')
    req=urllib.request.Request('https://kuruken.jp/Approach/BusLocationByCourseBusId?daiyaSid='+sid,data=json.dumps({'Content-Type': 'application/json'}).encode())
    return render_template('trip.html',response=urllib.request.urlopen(req).read().decode().replace("\\r\\n","\n").replace("\\u003c","<").replace("\\u003e",">").replace('\\"','"').replace("\\u0027","'").replace("<script","<!--<script").replace("</script>","</script>-->")[1:-1])

if __name__ == '__main__':
  app.run()
