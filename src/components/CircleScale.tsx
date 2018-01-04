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

interface CircleProps {
	size?: number
	intervals?: Array<number>
	lineColor?: string
}

export default class CircleScale extends Component<CircleProps> {
	didUpdate() {
		this.updateCanvas()
	}

	didMount() {
		this.updateCanvas()
	}

	updateCanvas() {
		if (!this.props.intervals) return
		const intervals = this.props.intervals
		const size = this.props.size || noteSize
		const ctx = this.refs.canvas.getContext("2d")
		const radius = size * margin / (1 / 12 * 2 * Math.PI)
		let start, end
		ctx.strokeStyle = this.props.lineColor || "blue"
		ctx.lineWidth = 2
		ctx.clearRect(0, 0, 2 * radius, 2 * radius)

		intervals.forEach(interval => {
			start = {
				x: radius * (1 + Math.sin(Math.PI * interval[0] / 6)),
				y: radius * (1 - Math.cos(Math.PI * interval[0] / 6)),
			}
			end = {
				x: radius * (1 + Math.sin(Math.PI * interval[1] / 6)),
				y: radius * (1 - Math.cos(Math.PI * interval[1] / 6)),
			}
			ctx.beginPath()
			ctx.moveTo(start.x, start.y)
			ctx.lineTo(end.x, end.y)
			ctx.stroke()
		})
	}

	view() {
		const scale = world.scale.get()
		const size = this.props.size || noteSize
		const radius = size * margin / (1 / 12 * 2 * Math.PI)
		const scaleSize = 2 * radius + size
		return (
			<div
				style={{ position: "relative", width: scaleSize, height: scaleSize }}
			>
				<div
					style={{
						position: "absolute",
						height: scaleSize - size,
						width: scaleSize - size,
						top: size / 2,
						left: size / 2,
						border: `1px solid ${borderColor}`,
						boxSizing: "border-box",
						borderRadius: scaleSize,
					}}
				/>
				{music.pegsToBools(scale.pegs).map((bool, peg) => {
					return (
						<div
							key={peg}
							style={{
								position: "absolute",
								height: size,
								width: size,
								background: bool ? selectedColor : "white",
								boxSizing: "border-box",
								border: `1px solid ${borderColor}`,
								borderRadius: size,
								top: -Math.cos(peg / 12 * 2 * Math.PI) * radius + radius,
								left: Math.sin(peg / 12 * 2 * Math.PI) * radius + radius,
							}}
						/>
					)
				})}
				<canvas
					ref="canvas"
					width={2 * radius}
					height={2 * radius}
					style={{
						position: "relative",
						top: size / 2,
						left: size / 2,
					}}
				/>
				{Array(12)
					.fill(0)
					.map((_, peg) => {
						return (
							<div
								key={peg}
								onClick={togglePeg(peg)}
								style={{
									position: "absolute",
									height: size,
									width: size,
									background: "transparent",
									boxSizing: "border-box",
									borderRadius: size,
									zIndex: 1,
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
