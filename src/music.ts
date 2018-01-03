export interface Notes {
	// A list of midi notes
	notes: Array<string>
}

export interface Scale {
	// A list of peg positions [0-11]
	base: number
	pegs: Array<number>
}

// TODO: handle scale base number?
export function pegsToBools(pegs: Array<number>): Array<boolean> {
	const bools = Array(12).fill(false)
	for (const peg of pegs) {
		bools[peg] = true
	}
	return bools
}

export function boolsToPegs(bools: Array<boolean>): Array<number> {
	const pegs: Array<number> = []
	for (let index = 0; index < bools.length; index++) {
		if (bools[index]) {
			pegs.push(index)
		}
	}
	return pegs
}

export function togglePeg(pegs: Array<number>, index: number): Array<number> {
	const bools = pegsToBools(pegs)
	bools[index] = !bools[index]
	return boolsToPegs(bools)
}
