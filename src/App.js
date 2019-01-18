import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'
import AceEditor from 'react-ace'
// @ts-ignore
import brace from 'brace'
import 'brace/mode/markdown'
import 'brace/theme/monokai'
import styled from 'styled-components'

// @ts-ignore
const { ipcRenderer } = window.require('electron')

class App extends Component {
  state = {
    loadedFile: ''
  }
  constructor(props) {
    super(props)
    ipcRenderer.on('new-file', (event, fileContent) => {
      console.log(fileContent)
      this.setState({
        loadedFile: fileContent
      })
    })
  }

  render() {
    return (
      <div>
        <Split>
          <CodeWIndow>
          <AceEditor
            mode="markdown"
            theme="monokai"
            onChange={newContent => {
              this.setState({ loadedFile: newContent })
            }}
            name="markdown_editor"
            value={this.state.loadedFile}
            />
          </CodeWIndow>
          <RenderedWindow>
            <Markdown>{this.state.loadedFile}</Markdown>
          </RenderedWindow>
        </Split>
      </div>
    )
  }
}

export default App

const Split = styled.div`
  display: flex;
  height: 100vh;
`

const CodeWIndow = styled.div`
  flex: 1;
  padding-top: 2rem;
  background-color: #191324;
`

const RenderedWindow = styled.div`
  background-color: #191324;
  width: 35%;
  padding: 20px;
  border-left: 1px solid #302b31;

  h1,
  h2,
  h3,
  h4,
  h5,
  h5 {
    color: #82d8d8;
  }

  h1 {
    border-bottom: solid 3px #e54b4b;
  }

  a {
    color: #e54b4b;
  }
`
