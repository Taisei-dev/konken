from flask import Flask, render_template_string,request,render_template
import urllib.request,urllib.parse
import json

app=Flask(__name__)
@app.route('/search/on')
def search():
    q=""
    if request.args.get('q') != None:
        q=request.args.get('q')
    req=urllib.request.Request('https://kuruken.jp/Approach/GetKeywordCompletionByFreeword',json.dumps({'selectLang':'ja','freeword':q}).encode(),{'Content-Type': 'application/json'})
    stops=map(lambda val:val["Name"],json.loads(urllib.request.urlopen(req).read()))
    stations=[]
    for stop in stops:
        req=urllib.request.Request('https://kuruken.jp/Approach/StationCorrection?selectLang=ja&stationName='+urllib.parse.quote_plus(stop,encoding='utf-8'),data=json.dumps({'Content-Type': 'application/json'}).encode())
        stationcorrection = json.loads(urllib.request.urlopen(req).read())
        if len(stationcorrection) == 0:
            return ''
        for station in stationcorrection:
            req=urllib.request.Request('https://kuruken.jp/Approach/GetStationsForModalDialogByNoriba?selectLang=ja&startStaCode='+station['StationCode']+'&startCompId='+stationcorrection[0]['CompanyID'],data=json.dumps({'Content-Type': 'application/json'}).encode())
            stations+=json.loads(urllib.request.urlopen(req).read())
    #return json.dumps(stationcorrection)
    results=map(lambda val:f"""<a href="/stop?sid={val["Sid"]}" class="clearfix">
							<div class="cardHead">
								<div><p class="cardName">{val["Name"]}<span>{val["Yomigana"]}</span></p></div>
								<div class="cityInfo"></div>
							</div><!--/.cardHead-->
							<div class="bus_stand">
							{f'''<span class="stopNumber">
									のりば {val["RenbanName"][:val["RenbanName"].find('_')]}
								 </span>''' if val["RenbanName"].find('_') != 0 else ""
							}
							</div>
							<div class="cardFoot">
								<div>
									<span class="directionInfo">{val["RenbanName"][val["RenbanName"].find('_')+1:]}</span>
								</div>
								
								<div class="busIcon">
									<span class=" min">
                                    </span>
								</div>
							</div><!--/.cardFoot-->
						</a>""",stations)
    return render_template('search.html',q=q,results=results)


if __name__ == '__main__':
  app.run()