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

export default class GuitarScale extends Component {
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
