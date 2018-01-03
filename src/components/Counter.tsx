import * as React from "react"
import * as magic from "reactive-magic"
import Component from "reactive-magic/component"

interface CounterProps {
	value: magic.Value<number>
	min?: number
	max?: number
}

export default class Counter extends Component<CounterProps> {
	increment = () => {
		this.props.value.update(count => count + 1)
	}

	decrement = () => {
		this.props.value.update(count => count - 1)
	}

	view() {
		const count = this.props.value.get()
		const cantDec =
			this.props.min === undefined ? false : count <= this.props.min
		const cantInc =
			this.props.max === undefined ? false : count >= this.props.max
		return (
			<div>
				<button onClick={this.decrement} disabled={cantDec}>
					{"-"}
				</button>
				<span>{count}</span>
				<button onClick={this.increment} disabled={cantInc}>
					{"+"}
				</button>
			</div>
		)
	}
}
