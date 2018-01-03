// TODO
// - some universal types / abstractions
// - some synth noises / helpers
// - some visualiations, linear, circle, piano, guitar, notes, scale

export class Notes {
	// A list of midi notes
	notes: Array<string>
	constructor(notes: Array<string>) {
		this.notes = notes
	}
}

export class Scale {
	// A list of peg positions [0-11]
	base: number
	pegs: Array<number>
	constructor(base: number, pegs: Array<number>) {
		this.base = base
		this.pegs = pegs
	}
}
