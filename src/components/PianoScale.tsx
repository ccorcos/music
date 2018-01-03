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

// TODO: handle scale base number
export default class PianoScale extends Component {
	view() {
		const scale = world.scale.get()
		const pegs = music.pegsToBools(scale.pegs)
		const pianoWidth = noteSize * 12
		const pianoHeight = pianoWidth * 0.4
		const whiteNoteWidth = noteSize
		const blackNoteWidth = whiteNoteWidth * 0.5
		const blackNoteHeight = pianoHeight * 0.6
		const whiteNotes = [0, 2, 4, 5, 7, 9, 11]
		const blackNotes = [1, 3, 6, 8, 10]
		return (
			<div
				style={{
					position: "relative",
					width: pianoWidth,
					height: pianoHeight,
				}}
			>
				{Array(7)
					.fill(0)
					.map((_, index) => {
						const peg = whiteNotes[index]
						const bool = pegs[peg]
						return (
							<div
								key={`white-${index}`}
								onClick={togglePeg(peg)}
								style={{
									position: "absolute",
									height: pianoHeight,
									width: whiteNoteWidth,
									background: bool ? selectedColor : "white",
									boxSizing: "border-box",
									border: `1px solid ${borderColor}`,
									borderLeft: index === 0 ? `1px solid ${borderColor}` : "none",
									top: 0,
									left: index * whiteNoteWidth,
								}}
							/>
						)
					})}
				{Array(5)
					.fill(0)
					.map((_, index) => {
						const offset = index > 1 ? index + 1 : index
						const peg = blackNotes[index]
						const bool = pegs[peg]
						return (
							<div
								key={`black-${index}`}
								onClick={togglePeg(peg)}
								style={{
									position: "absolute",
									height: blackNoteHeight,
									width: blackNoteWidth,
									background: bool ? selectedColor : "black",
									boxSizing: "border-box",
									border: `1px solid ${borderColor}`,
									top: 0,
									left: (offset + 1) * whiteNoteWidth - blackNoteWidth / 2,
								}}
							/>
						)
					})}
			</div>
		)
	}
}
