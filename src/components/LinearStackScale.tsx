import * as React from "react"
import Component from "reactive-magic/component"
import * as magic from "reactive-magic"
import * as world from "../world"
import * as music from "../music"
import Counter from "./Counter"

const { selectedColor, borderColor, noteSize } = world
const margin = 1

const togglePeg = (index: number) => () => {
	world.scale.update(({ base, pegs }) => {
		return {
			base,
			pegs: music.togglePeg(pegs, index),
		}
	})
}

interface LinearStackScaleProps {
	size?: number
	offset?: number
	style?: React.CSSProperties
}

export default class LinearStackScale extends Component<LinearStackScaleProps> {
	offset = new magic.Value(this.props.offset || 5)

	view() {
		const stacks = 12
		const width = 12
		const offset = this.offset.get()
		const scale = world.scale.get()
		const size = this.props.size || noteSize
		const scaleSize = size * 11 * margin + size
		return (
			<div style={this.props.style}>
				<div style={{ margin: "1em 0" }}>
					Offset:{" "}
					<Counter
						style={{ display: "inline" }}
						value={this.offset}
						min={0}
						max={11}
					/>
				</div>
				<div
					style={{
						position: "relative",
						width: scaleSize,
						height: scaleSize,
					}}
				>
					{Array(stacks)
						.fill(0)
						.map((_, stack) => {
							return (
								<div
									key={`string-${stack}`}
									style={{
										position: "absolute",
										height: 0,
										width: scaleSize - size,
										top: size * margin * stack + size / 2 - 0.5,
										left: size / 2,
										border: `0.5px solid ${borderColor}`,
										boxSizing: "border-box",
										borderRadius: scaleSize,
									}}
								/>
							)
						})}

					{Array(stacks)
						.fill(0)
						.map((_, stack) => {
							const stackOffset = (stack * offset) % 12
							// Rotate the bools
							let bools = music.pegsToBools(scale.pegs)
							bools = bools
								.slice(stackOffset)
								.concat(bools.slice(0, stackOffset))
							return bools.map((bool, index) => {
								const peg = (stackOffset + index) % 12
								return (
									<div
										key={`${stack}-${peg}`}
										onClick={togglePeg(peg)}
										style={{
											position: "absolute",
											height: size,
											width: size,
											background: bool ? selectedColor : "white",
											boxSizing: "border-box",
											// border: `1px solid ${borderColor}`,
											// borderRadius: size,
											top: size * margin * stack,
											left: index * size * margin,
										}}
									/>
								)
							})
						})}
				</div>
			</div>
		)
	}
}
