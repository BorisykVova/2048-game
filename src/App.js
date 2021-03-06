import React, { Component } from 'react'
import Layout from 'UI/Layout'
import Field from 'UI/Field'
import ControllPanel from 'UI/ControllPanel'
import Button from 'UI/Button'
import {
  moveCells,
  directions,
  initCells,
  removeAndIncreaseCells,
  populateField,
} from 'logic'

class App extends Component {
  state = this.getNewState()

  mapKeyCodeToDirection = {
    KeyA: directions.LEFT,
    KeyS: directions.DOWN,
    KeyD: directions.RIGHT,
    KeyW: directions.UP,
  }

  newGame = () => {
    this.setState(this.getNewState())
  }

  getNewState() {
    return {
      cells: initCells()
    }
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKeyPress)
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleKeyPress)
  }

  handleKeyPress = async event => {

    if (['KeyA', 'KeyS', 'KeyD', 'KeyW'].includes(event.code))
      this.setState(state => ({
        ...state,
        cells: moveCells(state.cells, this.mapKeyCodeToDirection[event.code]),
      }))

    await delay(100)



    const ret = removeAndIncreaseCells(this.state.cells)


    this.setState(state => ({
      ...state,
      cells: ret,
    }))

    this.setState(state => ({
      ...state,
      cells: populateField(state.cells),
    }))
  }

  render() {
    const {cells} = this.state

    return (
      <Layout>
        <ControllPanel>
          <Button onClick={this.newGame}>New Game</Button>
        </ControllPanel>
        <Field cells={cells} />
      </Layout>
    )
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export default App
