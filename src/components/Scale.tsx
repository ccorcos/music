import * as React from "react"
import Component from "reactive-magic/component"
import * as world from "../world"
import * as music from "../music"

const noteSize = 30
const margin = 1.4

interface ScaleProps {
	type: "linear" | "circle"
}

export default class Scale extends Component<ScaleProps> {
	viewLinear() {
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
						border: "0.5px solid black",
						boxSizing: "border-box",
						borderRadius: scaleSize,
					}}
				/>
				{music.pegsToBools(scale.pegs).map((bool, index) => {
					return (
						<div
							key={index}
							style={{
								position: "absolute",
								height: noteSize,
								width: noteSize,
								background: bool ? "red" : "white",
								boxSizing: "border-box",
								border: "1px solid black",
								borderRadius: noteSize,
								top: 0,
								left: index * noteSize * margin,
							}}
						/>
					)
				})}
			</div>
		)
	}

	viewCircle() {
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
						border: "1px solid black",
						boxSizing: "border-box",
						borderRadius: scaleSize,
					}}
				/>
				{music.pegsToBools(scale.pegs).map((bool, index) => {
					return (
						<div
							key={index}
							style={{
								position: "absolute",
								height: noteSize,
								width: noteSize,
								background: bool ? "red" : "white",
								boxSizing: "border-box",
								border: "1px solid black",
								borderRadius: noteSize,
								top: -Math.cos(index / 12 * 2 * Math.PI) * radius + radius,
								left: Math.sin(index / 12 * 2 * Math.PI) * radius + radius,
							}}
						/>
					)
				})}
			</div>
		)
	}

	view() {
		const renderers = {
			linear: this.viewLinear,
			circle: this.viewCircle,
		}
		return renderers[this.props.type]()
	}
}
