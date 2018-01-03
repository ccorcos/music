// TODO
// - some universal types / abstractions
// - some synth noises / helpers
// - some visualiations, linear, circle, piano, guitar, notes, scale

export interface Notes {
	// A list of midi notes
	notes: Array<string>
}

export interface Scale {
	// A list of peg positions [0-11]
	base: number
	pegs: Array<number>
}

export function pegsToBools(pegs: Array<number>): Array<boolean> {
	const bools = Array(12).fill(false)
	for (const peg of pegs) {
		bools[peg] = true
	}
	return bools
}
