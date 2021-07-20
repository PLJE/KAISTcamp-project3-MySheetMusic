# KAISTcamp-project3-MySheetMusic
> Web Application which converts audio file(mp4, m4a ..) to simple sheet music    
> 
> 'My Sheet Music'은 피아노 연주 오디오 파일(mp4 , m4a , wav 등)을 분석하여 간단한 악보를 띄워줍니다   

## Team   
> hyunsu0803 , PLJE   

## Project explanation
- Sound analysis     
> 음원 분석은 파이썬 모듈 ['madmom'](https://github.com/CPJKU/madmom)을 이용합니다.
> 
> server로부터 파일을 경로로 넘겨받습니다.
> 
> madmom library의 features package 속 CNNPianoNoteProcessor와 ADSRNoteTrackProcessor를 이용해 음원으로부터 MIDI note를 추출합니다.
> 
> 분석 결과는 2-dimensional numpy array로 반환합니다. 3개의 column과 음 개수만큼의 row로 이루어져 있으며 첫번째 column은 각 음의 attack timing, 두번쨰 column은 MIDI note입니다.
> 
> 음원 분석의 정확도를 높이기 위해 onset_threshold를 0.9로 높여주었습니다.
> 
> piano 소리를 분석하기 위해 pitch_offset을 21로 설정해주었습니다. 따라서 이 프로그램으로는 피아노 소리만을 MIDI note로 올바르게 변환할 수 있습니다.

```
main.py 프로젝트를 실행하려면 (음원 분석)
madmom 라이브러리를 설치하기 위해서 madmom library를 원하는 폴더에 recursive clone 한다. 
pip install madmom으로는 최신 버전의 madmom을 다운받을 수 없는 경우도 있으니 (필자의 경우가 그러했다.) 
안전하게 깃을 통해 다운받자.
https://madmom.readthedocs.io/en/latest/installation.html#install-from-source 을 따라하면 된다.
```

- Sheet music rendering     
> 악보는 ['vexflow'](https://github.com/0xfe/vexflow) 모듈을 이용하여 , react js 에서 렌더링합니다.   
> 
> 특히 악보를 쉽게 그리기 위해서 vexflow 내의 easyscore을 사용했습니다.
> 
> [EasyScore 공식 튜토리얼](https://github.com/0xfe/vexflow/wiki/Using-EasyScore) 의 예제를 활용했으나 EasyScore의 특성상 기본 생성자에 의해 한번에 4개의 음표만이 렌더링 될 수 있도록 제한 되어 있습니다.
> 
> 이를 해결하기 위해 setStrict를 false로 설정 해주어야 합니다.
> 

- Front   
> 웹 프론트는 React js 로 구현되었습니다.   
> 
> 디자인은 material-ui lib을 이용합니다. 
> 
> 업로드된 음원 파일을 FormData형식으로 flask 서버에 POST요청을 보냅니다. 
> 
> 서버에서 음원을 분석하여 얻은 JSON 데이터를 파싱하여 vexflow 모듈로 악보를 그립니다.

- Server [(Server Github link)](https://github.com/hyunsu0803/MadCamp_week3_FlaskServer)
> 웹 백엔드는 Flask로 구현되었습니다.   
> 
> 'axios' 모듈을 이용하여 react js와 flask 사이에서 통신합니다.
>    
> localhost:5000/react_to_flask 에서 POST 요청만을 처리합니다.
> 
> flask의 request로부터 file을 받아서 프로젝트 내의 data directory에 저장하고, 해당 파일을 main.audio_to_MIDI_notes()에 넘겨줍니다.
> 
> main.audio_to_MIDI_notes로부터 반환된 음원 분석 결과를 parsing 하여 json 형식으로 클라이언트에게 반환합니다.
> 
> 반환되는 정보에는 각 음이 attack된 timing ('second')과 MIDI note code ('code')가 각각 json 객체의 key-value pair로 들어가있습니다.
> 

## How to run?
<img src="https://user-images.githubusercontent.com/77712822/126349208-c82a9a13-caee-45e5-a4d5-477e76165bf3.png" width = "100%" height="100%">


<img src="https://user-images.githubusercontent.com/77712822/126349233-635bb578-963a-4b4a-b8c5-747aef36fc92.png" width = "100%" height="100%">

> music upload 버튼을 클릭하여 음원 파일을 업로드하고, sheet music 버튼을 누르면 악보와 파일의 이름을 띄워줍니다.   

<img src="https://user-images.githubusercontent.com/77712822/126349257-48b9c696-21cd-4e62-a6fc-e493ad81abe2.png" width = "100%" height="100%">   

> show notes버튼을 누르면, material ui 의 popover 창이 뜨고 , 해당 음원의 notes를 보여줍니다.  
>  
> 아래 상세 설명은 notes를 어떻게 해석하는지 보여줍니다. 

<img src="https://user-images.githubusercontent.com/77712822/126349273-3b2bbba2-5ee1-4b96-bce4-95b46f30fa05.png" width = "100%" height="100%">

> 첫 화면의 상단바에서 Online Piano를 클릭하면 피아노 화면으로 넘어갑니다.
> 
> 키보드를 이용하여 피아노를 연주할 수 있습니다. 

<img src="https://user-images.githubusercontent.com/77712822/126349301-3057e5ce-fd9f-4792-95cb-e5332c8a6e54.png" width = "100%" height="100%">

> 키보드로 피아노 건반을 누르면, 누른 건반의 색이 변하고, 어떤 건반을 눌렀는지 텍스트로 띄워줍니다.














