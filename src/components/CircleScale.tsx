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
	intervals?: Array<Array<number>>
	lineColor?: string
}

export default class CircleScale extends Component<CircleProps> {
	didMount() {
		this.updateCanvas()
	}

	didUpdate() {
		this.updateCanvas()
	}

	updateCanvas() {
		if (!this.props.intervals) return
		const intervals = this.props.intervals
		const size = this.props.size || noteSize
		const radius = size * margin / (2 * Math.PI / 12)
		const ctx = this.refs.canvas.getContext("2d")
		let line
		ctx.strokeStyle = this.props.lineColor || "blue"
		ctx.lineWidth = 2
		ctx.clearRect(0, 0, 2 * radius, 2 * radius)

		intervals.forEach(interval => {
			line = interval.map(peg => {
				return {
					x: radius * (1 + Math.sin(Math.PI * peg / 6)),
					y: radius * (1 - Math.cos(Math.PI * peg / 6)),
				}
			})
			ctx.beginPath()
			ctx.moveTo(line[0].x, line[0].y)
			ctx.lineTo(line[1].x, line[1].y)
			ctx.stroke()
		})
	}

	view() {
		const scale = world.scale.get()
		const size = this.props.size || noteSize
		const radius = size * margin / (2 * Math.PI / 12)
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
								top: radius * (1 - Math.cos(2 * Math.PI * peg / 12)),
								left: radius * (1 + Math.sin(2 * Math.PI * peg / 12)),
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
				{Array(12) //invisible togglePeg buttons that float over canvas
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
									top: radius * (1 - Math.cos(2 * Math.PI * peg / 12)),
									left: radius * (1 + Math.sin(2 * Math.PI * peg / 12)),
								}}
							/>
						)
					})}
			</div>
		)
	}
}
