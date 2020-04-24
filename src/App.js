import React, { useState } from 'react';
import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './tools'

let editorInstance
function App () {

  const [eData, setEData] = useState({
    time: Date.now(),
    blocks: [
      {
        type: 'header',
          data: {
          text: '',
          level: 0
        }
      },
      {
        type: 'paragraph',
        data: {
          text: ""
        }
      },
    ],
    version: "2.17.0"
  })
  const onChange = (e) => {
    editorInstance.save().then(data => {
      console.log(JSON.stringify(data.blocks, null, 2))
      setEData(data)
    })
  }

  const onSave = async () => {
    console.log('onSave')
    console.log(await editorInstance.render(eData))
  }

  const CustomComponent = () => (
    <div style={{backgroundColor: '#cccc', display: 'flex', marginTop: 100, width: '100%', maxWidth: '900px', paddingLeft: 34, paddingRight: 34, paddingTop: 20, paddingBottom: 20, }}>

      <EditorJs holder="custom2" tools={EDITOR_JS_TOOLS}>
        <div id="custom2" style={{ width: '100%'}}/>
      </EditorJs>

      <EditorJs holder="custom">
        <div id="custom" style={{ width: '100%'}}/>
      </EditorJs>

      
    </div>
  )

  console.log(eData)

  return (
    <div style={{ minHeight: '100vh', width: '100%', maxWidth: '100vw', backgroundColor: '#e0e0e0', paddingLeft: 20, paddingRight: 20, display: 'flex', flexDirection: 'column', }}>
      <h1 style={{ maxWidth: '900px', width: '100%', margin: 'auto', paddingTop: 20, paddingBottom: 20 }}>
        Editor da Guia Xai
      </h1>
      <div style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '900px', margin: 'auto', backgroundColor: 'white', paddingLeft: 34, paddingRight: 34, paddingTop: 20, paddingBottom: 20, height: '100%' }}>
        <EditorJs
          tools={EDITOR_JS_TOOLS}
          onChange={onChange}
          data={eData}
          instanceRef={instance => { editorInstance = instance }}
        />

        {/* <CustomComponent /> */}


      </div>
      <div style={{ maxWidth: '900px', width: '100%', margin: 'auto', marginTop: 20, paddingBottom: 20 }}>
        <button onClick={onSave}>Salvar esse post incrível!</button>
      </div>
      {/* <CustomComponent /> */}
    </div>
  );
}

export default App;