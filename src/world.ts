import * as magic from "reactive-magic"
import * as music from "./music"

// Major Scale
export const scale = new magic.Value<music.Scale>({
	base: 60,
	pegs: [0, 2, 3, 5, 7, 9, 11],
})
