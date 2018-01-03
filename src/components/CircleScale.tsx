import * as React from "react"
import Component from "reactive-magic/component"
import * as world from "../world"
import * as music from "../music"

const { selectedColor, borderColor, noteSize } = world
const margin = 1.4

const togglePeg = (index: number) => () => {
	world.scale.update(({ base, pegs }) => {
		return {
			base,
			pegs: music.togglePeg(pegs, index),
		}
	})
}

export default class CircleScale extends Component {
	view() {
		const scale = world.scale.get()
		const radius = noteSize * margin / (1 / 12 * 2 * Math.PI)
		const scaleSize = 2 * radius + noteSize
		return (
			<div
				style={{ position: "relative", width: scaleSize, height: scaleSize }}
			>
				<div
					style={{
						position: "absolute",
						height: scaleSize - noteSize,
						width: scaleSize - noteSize,
						top: noteSize / 2,
						left: noteSize / 2,
						border: `1px solid ${borderColor}`,
						boxSizing: "border-box",
						borderRadius: scaleSize,
					}}
				/>
				{music.pegsToBools(scale.pegs).map((bool, peg) => {
					return (
						<div
							key={peg}
							onClick={togglePeg(peg)}
							style={{
								position: "absolute",
								height: noteSize,
								width: noteSize,
								background: bool ? selectedColor : "white",
								boxSizing: "border-box",
								border: `1px solid ${borderColor}`,
								borderRadius: noteSize,
								top: -Math.cos(peg / 12 * 2 * Math.PI) * radius + radius,
								left: Math.sin(peg / 12 * 2 * Math.PI) * radius + radius,
							}}
						/>
					)
				})}
			</div>
		)
	}
}
