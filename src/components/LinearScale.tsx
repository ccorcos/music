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

export default class LinearScale extends Component {
	view() {
		const scale = world.scale.get()
		const scaleSize = noteSize * 11 * margin + noteSize
		return (
			<div
				style={{
					position: "relative",
					width: scaleSize,
					height: noteSize,
				}}
			>
				<div
					style={{
						position: "absolute",
						height: 0,
						width: scaleSize - noteSize,
						top: noteSize / 2 - 0.5,
						left: noteSize / 2,
						border: `0.5px solid ${borderColor}`,
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
								top: 0,
								left: peg * noteSize * margin,
							}}
						/>
					)
				})}
			</div>
		)
	}
}
