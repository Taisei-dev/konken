from flask import Flask,request,render_template
import urllib.request,urllib.parse
import json

app=Flask(__name__)
@app.route('/stop')
def stop():
    stationsid=""
    if request.args.get('stationsid') != None:
        stationsid=request.args.get('stationsid')
    req=urllib.request.Request('https://kuruken.jp/Approach/ChangeNoriba',json.dumps({'selectLang':'ja','stationSid':stationsid,'goalStaCode':'','goalComId':'','listSortMode':'1'}).encode(),{'Content-Type': 'application/json'})
    kurukendata=urllib.request.urlopen(req).read().decode().replace("\\r\\n","\n").replace("\\u003c","<").replace("\\u003e",">").replace('\\"','"').replace("\\u0027","'").replace("<script","<!--<script").replace("</script>","</script>-->")[1:-1]
    req=urllib.request.Request('https://kuruken.jp/Approach/StationInfo?sid='+stationsid,data=json.dumps({'Content-Type': 'application/json'}).encode())
    stationinfo=json.loads(urllib.request.urlopen(req).read().decode())
    req=urllib.request.Request('https://kuruken.jp/Approach/GetStationsForModalDialogByNoriba?selectLang=ja&goalStaCode=&goalCompId=&_=&startStaCode='+stationinfo['StationCode']+'&startCompId='+stationinfo['CompanyID'],data=json.dumps({'Content-Type': 'application/json'}).encode())
    noribas=json.loads(urllib.request.urlopen(req).read().decode())
    
    return render_template('stop.html',kurukendata=kurukendata,noribas=json.dumps(noribas))

if __name__ == '__main__':
  app.run()
