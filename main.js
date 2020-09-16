import { createElement, render, Component } from './toy-react'

class MyConponent extends Component {
    render() {
        return <div>
            <h1 id='1'>my</h1>
            {this.children}
        </div>
    }
}

render(<MyConponent className='1'>
    <div>1</div>
    <div>2</div>
    <div>3</div>
</MyConponent>, document.body)
