import React, { Component } from 'react';
import Markdown from 'markdown-to-jsx';
import AceEditor from 'react-ace'
// @ts-ignore
import brace from 'brace'
import  'brace/mode/markdown'
import 'brace/theme/monokai'
import styled from 'styled-components'

const { ipcRenderer } = window.require('electron');

class App extends Component {
  state = {
    loadedFile: ''
  }
  constructor() {
    super();
    ipcRenderer.on('new-file', (event, fileContent) => {
      console.log(fileContent);
      this.setState({
        loadedFile: fileContent
      });
    });
  }

  render() {
    return (
      <Split>
            <AceEditor 
            mode="markdown"
            theme="monokai"
            onChange={newContent=>{
              this.setState({loadedFile: newContent})
            }}
            name='markdown_editor'
            value={this.state.loadedFile}
            />
          <Markdown>{this.state.loadedFile}</Markdown>
        
      </Split>
    );
  }
}

export default App;

const Split = styled.div`
display: flex;
height: 100vh;
`
