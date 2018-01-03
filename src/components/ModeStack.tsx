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

const calcOffset = (index: number, offset: number): number => {
	return music.mod(index - offset, 12)
}

export default class ModeStack extends Component {
	offsets = [
		new magic.Value(7),
		new magic.Value(0),
		new magic.Value(5),
		new magic.Value(10),
		new magic.Value(3),
		new magic.Value(8),
		new magic.Value(1),
	]

	view() {
		const stacks = 7
		const width = 12
		const offsets = this.offsets.map(offset => offset.get())
		const scale = world.scale.get()
		const scaleSize = 12 * noteSize
		return (
			<div
				style={{
					position: "relative",
					width: scaleSize,
					height: scaleSize,
					margin: "2em 0",
				}}
			>
				{Array(stacks)
					.fill(0)
					.map((_, stack) => {
						const stackOffset = offsets[stack]
						// Rotate the bools
						let bools = music.pegsToBools(scale.pegs)
						bools = bools
							.slice(calcOffset(12, stackOffset))
							.concat(bools.slice(0, calcOffset(12, stackOffset)))
						return (
							<div key={stack}>
								{bools.map((bool, index) => {
									const peg = calcOffset(index, stackOffset)
									const pegIdx = bool ? scale.pegs.indexOf(peg) + 1 : ""
									return (
										<div
											key={`${stack}-${peg}`}
											onClick={togglePeg(peg)}
											style={{
												position: "absolute",
												height: noteSize,
												width: noteSize,
												background: bool ? "#888" : "white",
												boxSizing: "border-box",
												top: noteSize * margin * stack,
												left: index * noteSize * margin,
												textAlign: "center",
												paddingTop: 5,
											}}
										>
											{pegIdx}
										</div>
									)
								})}
								<Counter
									value={this.offsets[stack]}
									key={`counter-${stack}`}
									min={-84}
									max={84}
									style={{
										position: "relative",
										height: noteSize,
										top: 4,
										left: scaleSize + noteSize / 2,
									}}
								/>
							</div>
						)
					})}
			</div>
		)
	}
}
