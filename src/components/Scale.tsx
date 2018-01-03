import * as React from "react"
import Component from "reactive-magic/component"
import * as world from "../world"
import * as music from "../music"

const selectedColor = "#666"
const borderColor = "#DDD"
const noteSize = 30
const margin = 1

const togglePeg = (index: number) => () => {
	world.scale.update(({ base, pegs }) => {
		return {
			base,
			pegs: music.togglePeg(pegs, index),
		}
	})
}

export class LinearScale extends Component {
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

export class CircleScale extends Component {
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

// TODO: handle scale base number
export class PianoScale extends Component {
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

export class GuitarScale extends Component {
	view() {
		const scale = world.scale.get()
		const scaleSize = noteSize * 4 * margin + noteSize
		const bools = music.pegsToBools(scale.pegs)
		const strings = [bools.slice(0, 5), bools.slice(5, 10), bools.slice(10, 13)]
		return (
			<div
				style={{
					position: "relative",
					width: scaleSize,
					height: noteSize * margin * 2 + noteSize,
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
				<div
					style={{
						position: "absolute",
						height: 0,
						width: scaleSize - noteSize,
						top: noteSize * margin + noteSize / 2 - 0.5,
						left: noteSize / 2,
						border: `0.5px solid ${borderColor}`,
						boxSizing: "border-box",
						borderRadius: scaleSize,
					}}
				/>
				<div
					style={{
						position: "absolute",
						height: 0,
						width: noteSize * margin,
						top: noteSize * margin * 2 + noteSize / 2 - 0.5,
						left: noteSize / 2,
						border: `0.5px solid ${borderColor}`,
						boxSizing: "border-box",
						borderRadius: scaleSize,
					}}
				/>
				{strings.map((bools, string) => {
					return bools.map((bool, index) => {
						const peg = string * 5 + index
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
									top: string * noteSize * margin,
									left: index * noteSize * margin,
								}}
							/>
						)
					})
				})}
			</div>
		)
	}
}

export class LinearStackScale extends Component {
	view() {
		const stacks = 12
		const width = 12
		const offset = 5
		const scale = world.scale.get()
		const scaleSize = noteSize * 11 * margin + noteSize
		return (
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
									width: scaleSize - noteSize,
									top: noteSize * margin * stack + noteSize / 2 - 0.5,
									left: noteSize / 2,
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
						bools = bools.slice(stackOffset).concat(bools.slice(0, stackOffset))
						return bools.map((bool, index) => {
							const peg = (stackOffset + index) % 12
							return (
								<div
									key={`${stack}-${peg}`}
									onClick={togglePeg(peg)}
									style={{
										position: "absolute",
										height: noteSize,
										width: noteSize,
										background: bool ? selectedColor : "white",
										boxSizing: "border-box",
										// border: `1px solid ${borderColor}`,
										// borderRadius: noteSize,
										top: noteSize * margin * stack,
										left: index * noteSize * margin,
									}}
								/>
							)
						})
					})}
			</div>
		)
	}
}

interface ScaleProps {
	type: "linear" | "circle" | "piano" | "guitar" | "linear-stack"
}

export default class Scale extends Component<ScaleProps> {
	view() {
		switch (this.props.type) {
			case "linear":
				return <LinearScale />
			case "circle":
				return <CircleScale />
			case "piano":
				return <PianoScale />
			case "guitar":
				return <GuitarScale />
			case "linear-stack":
				return <LinearStackScale />
			default:
				return null
		}
	}
}
