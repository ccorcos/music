import * as React from "react"
import Component from "reactive-magic/component"
import * as magic from "reactive-magic"
import * as world from "../world"
import * as music from "../music"
import CircleScale from "./CircleScale"

const intervalColor = ["red", "blue", "green", "orange", "indigo", "purple"]

const calcIntervals = (scale: music.Scale): Array<Array<number>> => {
	const { pegs } = scale
	const intervals = new Array(6).fill(0).map(_ => new Array())
	let diff
	for (let i = 0; i < pegs.length; i++) {
		for (let j = i + 1; j < pegs.length; j++) {
			diff = pegs[j] - pegs[i]
			if (diff > 6) diff = 12 - diff
			intervals[diff - 1].push([pegs[i], pegs[j]])
		}
	}
	return intervals
}

export default class IntervalCounter extends Component {
	view() {
		const scale = world.scale.get()
		const intervals = calcIntervals(scale)
		return (
			<div
				style={{
					maxWidth: "30em",
					position: "relative",
				}}
			>
				{intervals.map((interval, index) => {
					return (
						<div
							key={index}
							style={{
								display: "inline-block",
								margin: "0.5em",
							}}
						>
							<div
								style={{
									position: "relative",
									textAlign: "center",
									margin: "0.5em 0",
									fontSize: "1.2em",
								}}
							>
								{interval.length}
							</div>
							<CircleScale
								size={20}
								intervals={interval}
								lineColor={intervalColor[index]}
							/>
						</div>
					)
				})}
			</div>
		)
	}
}
