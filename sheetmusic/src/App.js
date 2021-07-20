import React, { useRef, useEffect , useState } from 'react'
import Vex from 'vexflow'
import './App.css'
import axios from "axios";
import {Button, Input ,Popover} from "@material-ui/core";
import {AttachFile , MusicNote } from "@material-ui/icons"
import { MIDINOTE } from './global/midinote';
import Header from './components/Header';
import PlayCard from './Card';
import SimplePopover from './SimplePopover';

const refreshPage =() =>{
  window.location.reload();
}

export default function App() 
{
  const [tmpNotes , setTmpNotes] = useState("");

  useEffect(()=>{
    

    console.log("useEffect started.");
    // 컴포넌트 생성시 실행되어야 할것들
    const VF = Vex.Flow;
    var vf = new VF.Factory({renderer: {elementId: 'boo'}});
    var score = vf.EasyScore();
    var system = vf.System(); 

    console.log("draw stave");
    console.log(tmpNotes);

    if (!(tmpNotes.length === 0)) {
      console.log("@@@@ in if statement");

      var piano = score.factory.Voice();
      piano.setStrict(false);
      piano.addTickables(score.notes(tmpNotes))

      system.addStave({
        voices: [piano]
      }).addClef('treble').addTimeSignature('4/4');

      vf.draw();      
    }
    else {
      console.log("tmpNotes === null");
    }

    return () => {
      // 컴포넌트 사라질때 실행되어야 할것들fdfwefefwefwe
      console.log("useEffect return");
      vf.reset();
    }
  }, [tmpNotes])

  const [file,setFile] = useState();
  const [fileName,setFileName] = useState("");

  const saveFile = (e)=>{
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async(e)=>{
    const formData = new FormData();
    formData.append("file" ,file);
    formData.append("fileName" , fileName);

    try{
      const res = await axios.post(
        "http://192.249.28.86:5000/react_to_flask", //send file to flask 
        formData
      );

      console.log("send audio file & got MIDI notes"); //receive from flask
      console.log(res.data);

      var tmp = ""
      var first = true;
      // 받은 데이터 parsing
      for(var i=0;i<Object.keys(res.data).length ;i++){

        var note;
        if (48 <= res.data['note'+String(i)]['code'] && res.data['note'+String(i)]['code'] <= 83)
          note = MIDINOTE[res.data['note'+String(i)]['code']];
        else 
          note = 'B4/q/r';

        var beftime;
        var nowtime;
        var afttime;

        if (i-1 >= 0) beftime = res.data['note' + String(i-1)]['second'];
        else beftime = -1;
        nowtime = res.data['note' + String(i)]['second'];
        if (i+1 < Object.keys(res.data).length) afttime = res.data['note'+String(i+1)]['second'];
        else afttime = -1;

        if (beftime === -1 && afttime === -1) {
          tmp = note + "/q";
          first = false;
        }
        else if (beftime === -1 && (afttime - nowtime) <= 0.03) { // 시작부터 화음인 경우
          tmp = "(" + note;
        }
        else if ( ((nowtime - beftime) > 0.03) && (afttime - nowtime) <= 0.03) { // 그냥 화음의 시작 
          tmp = tmp + ", (" + note;

        }
        else if ((nowtime - beftime) <= 0.03 && ((afttime - nowtime) > 0.03 || (afttime === -1)) ) { // 화음의 끝
          tmp = tmp + " " + note + ")";
          if (first) {
            first = false;
            tmp = tmp + "/q";
          }
        }
        else if ((nowtime - beftime) <= 0.03 && (afttime - nowtime) <= 0.03) { // 화음의 중간 
          tmp = tmp + " " + note;
        }
        else if (beftime === -1 && first) {
          tmp = note + "/q";
          first = false;
        }
        else {
          tmp = tmp + ", " + note;
        }
        
      }
      console.log("whole notes : " + tmp);
      setTmpNotes(tmp);

      var remove = document.getElementById('boo')
      remove.removeChild(remove.childNodes[0])

      // parsing 끝 
    }catch(ex){
      console.log(ex);
    }
  };
  return (
      <div className="App">
        <Header/>
        <p>{fileName}</p>
        {/* <SimplePopover notes={staves}/> */}
        <SimplePopover notes={tmpNotes}/>
        {/* <div ref={container} /> */}
        <div className = "boo" id="boo"/>
        <Input type="file" onChange ={saveFile} id="icon-button-file" style={{display : 'none'}}/>
        <label htmlFor="icon-button-file">
          <Button variant="contained" component="span" 
          startIcon={<AttachFile/>} >
            Music Upload
          </Button>
        </label>
        <Button variant = "contained" onClick={uploadFile} startIcon={<MusicNote/>} >
          sheet music
        </Button>
        {/* <Backdrop open={open} onClick = {handleBackdrop}>
          <CircularProgress/>
        </Backdrop> */}
        <PlayCard/>
      </div>
  ) 
}
