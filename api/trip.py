from urllib import response
from flask import Flask,request,render_template
import urllib.request,urllib.parse
import json

app=Flask(__name__)
@app.route('/trip')
def stop():
    daiyasid=""
    if request.args.get('daiyasid') != None:
        daiyasid=request.args.get('daiyasid')
    stationsid=""
    if request.args.get('stationsid') != None:
        stationsid=request.args.get('stationsid')
    req=urllib.request.Request('https://kuruken.jp/Approach/BusLocationByCourseBusId?daiyaSid='+daiyasid,data=json.dumps({'Content-Type': 'application/json'}).encode())
    jsondata=urllib.request.urlopen(req).read().decode().replace("\\r\\n","\n").replace("\\u003c","<").replace("\\u003e",">").replace('\\"','"').replace("\\u0027","'").replace("<script","<!--<script").replace("</script>","</script>-->")[1:-1]
    return render_template('trip.html',jsondata=jsondata if jsondata else "{}")
    req=urllib.request.Request('https://kuruken.jp/ViewTimeTable/RouteDetail?selectLang=ja&ikisakiSEQ=0&selectedTime=0&parentCompanyCode=73000000&stationSid='+stationsid+'&DaiyaSid='+daiyasid,data=json.dumps({'Content-Type': 'application/json'}).encode())
    #return render_template('trip.html',jsondata=jsondata if jsondata else "{}",response=urllib.request.urlopen(req).read().decode().replace("\\r\\n","\n").replace("\\u003c","<").replace("\\u003e",">").replace('\\"','"').replace("\\u0027","'").replace("<script","<!--<script").replace("</script>","</script>-->"))


if __name__ == '__main__':
  app.run()
  